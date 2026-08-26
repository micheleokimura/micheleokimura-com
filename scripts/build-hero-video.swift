import AVFoundation
import CoreImage
import Foundation

let exUrl = URL(fileURLWithPath: "/Users/micheleokimura/Downloads/EX New Hope Day 1.mp4")
let storyUrl = URL(fileURLWithPath: "/Users/micheleokimura/Downloads/Our Story Promo Video.mp4")
let outputPath = "/Users/micheleokimura/dev/micheleokimura-com/public/videos/michele-hero.mp4"

let outW = 1920.0, outH = 1080.0
let srcW = 1280.0, srcH = 720.0

let ciContext = CIContext()

func loadFirstVideoTrack(_ asset: AVURLAsset) -> AVAssetTrack {
    let sem = DispatchSemaphore(value: 0)
    var result: AVAssetTrack!
    Task {
        let tracks = try! await asset.loadTracks(withMediaType: .video)
        result = tracks.first!
        sem.signal()
    }
    sem.wait()
    return result
}

// Scale the 1280x720 source up by `scale`, then slide a 1920x1080 window over it
// centred on (focusX, focusY) given as fractions of the frame, focusY from the top.
// scale 1.5 lands exactly on 1920x1080, so the window is the whole frame and the
// focus point stops mattering. Anything above 1.5 is a punch-in.
func processFrame(_ src: CIImage, scale: Double, focusX: Double, focusY: Double) -> CIImage {
    let scaled = src.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
    let sw = srcW * scale, sh = srcH * scale

    let ox = min(max(focusX * sw - outW / 2, 0), max(sw - outW, 0))
    let oyTop = min(max(focusY * sh - outH / 2, 0), max(sh - outH, 0))
    // Core Image counts y from the bottom.
    let oy = max(sh - outH, 0) - oyTop

    let window = scaled
        .cropped(to: CGRect(x: ox, y: oy, width: outW, height: outH))
        .transformed(by: CGAffineTransform(translationX: -ox, y: -oy))

    // Vignette last, so it sits on the final framing rather than on the raw
    // upscale. No gaussian blur: Michele reads soft on the stage clips with it.
    let vf = CIFilter(name: "CIVignette")!
    vf.setValue(window, forKey: kCIInputImageKey)
    vf.setValue(0.7, forKey: kCIInputIntensityKey)
    vf.setValue(1.5, forKey: kCIInputRadiusKey)
    return vf.outputImage!.cropped(to: CGRect(x: 0, y: 0, width: outW, height: outH))
}

func decodeAndProcess(url: URL, inSec: Double, outSec: Double,
                      scale: Double, focusX: Double, focusY: Double) -> [(rel: Double, image: CIImage)] {
    let asset = AVURLAsset(url: url)
    let track = loadFirstVideoTrack(asset)
    let reader = try! AVAssetReader(asset: asset)
    let output = AVAssetReaderTrackOutput(track: track, outputSettings: [
        kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA
    ])
    output.alwaysCopiesSampleData = false
    reader.add(output)
    reader.timeRange = CMTimeRange(start: CMTime(seconds: inSec, preferredTimescale: 90000),
                                   end: CMTime(seconds: outSec, preferredTimescale: 90000))
    reader.startReading()

    var result: [(Double, CIImage)] = []
    var t0: Double? = nil
    while let sb = output.copyNextSampleBuffer() {
        guard let pb = CMSampleBufferGetImageBuffer(sb) else { continue }
        let ptsSec = CMTimeGetSeconds(CMSampleBufferGetPresentationTimeStamp(sb))
        if t0 == nil { t0 = ptsSec }
        let ci = processFrame(CIImage(cvPixelBuffer: pb), scale: scale, focusX: focusX, focusY: focusY)
        result.append((ptsSec - t0!, ci))
    }
    print("  decoded \(result.count) frames from \(url.lastPathComponent) [\(inSec)-\(outSec)] @\(scale)x")
    return result
}

func fadeImage(_ img: CIImage, alpha: CGFloat) -> CIImage {
    let f = CIFilter(name: "CIColorMatrix")!
    f.setValue(img, forKey: kCIInputImageKey)
    f.setValue(CIVector(x: alpha, y: 0, z: 0, w: 0), forKey: "inputRVector")
    f.setValue(CIVector(x: 0, y: alpha, z: 0, w: 0), forKey: "inputGVector")
    f.setValue(CIVector(x: 0, y: 0, z: alpha, w: 0), forKey: "inputBVector")
    f.setValue(CIVector(x: 0, y: 0, z: 0, w: 1), forKey: "inputAVector")
    f.setValue(CIVector(x: 0, y: 0, z: 0, w: 0), forKey: "inputBiasVector")
    return f.outputImage!
}

// --- Writer setup ---
let outputURL = URL(fileURLWithPath: outputPath)
try? FileManager.default.removeItem(at: outputURL)
let writer = try! AVAssetWriter(outputURL: outputURL, fileType: .mp4)
let videoSettings: [String: Any] = [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: 1920,
    AVVideoHeightKey: 1080,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: 2_300_000,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
        AVVideoMaxKeyFrameIntervalKey: 60
    ] as [String: Any]
]
let input = AVAssetWriterInput(mediaType: .video, outputSettings: videoSettings)
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: 1920,
    kCVPixelBufferHeightKey as String: 1080
])
writer.add(input)
writer.shouldOptimizeForNetworkUse = true
writer.startWriting()
writer.startSession(atSourceTime: .zero)

func appendFrame(_ image: CIImage, at timeSec: Double) {
    while !input.isReadyForMoreMediaData { usleep(2000) }
    var pb: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &pb)
    guard let buffer = pb else { fatalError("no pixel buffer") }
    ciContext.render(image, to: buffer)
    if !adaptor.append(buffer, withPresentationTime: CMTime(seconds: timeSec, preferredTimescale: 90000)) {
        print("append FAILED at \(timeSec): \(String(describing: writer.error))")
    }
}

func writeClipFrames(_ frames: [(rel: Double, image: CIImage)], rate: Double, cursorStart: Double) {
    for f in frames { appendFrame(f.image, at: cursorStart + f.rel / rate) }
}

let transitionDur = 0.5

func writeTransition(from: CIImage, to: CIImage, cursorStart: Double) {
    let halfDur = transitionDur / 2.0
    let fps = 30.0
    let stepCount = Int(halfDur * fps)
    for k in 0..<stepCount {
        let t = Double(k) / fps
        appendFrame(fadeImage(from, alpha: 1.0 - (t / halfDur)), at: cursorStart + t)
    }
    for k in 0..<stepCount {
        let t = Double(k) / fps
        appendFrame(fadeImage(to, alpha: t / halfDur), at: cursorStart + halfDur + t)
    }
}

// --- The beat list ---
//
// Two rules drive this cut.
//
// 1. Michele never follows Michele. Every stage beat is separated by a crowd
//    beat, AND each stage beat is a different shot size (wide, medium, medium
//    wide) off the same locked-off Day 1 camera. Three identical framings
//    separated by cutaways still read as one shot resuming, which is what
//    Brett saw.
//
// 2. Michele is angled camera-right, so every crowd beat must look camera-LEFT.
//    Checked at full resolution, one frame from the middle of each clip, not off
//    contact-sheet thumbnails: at 320px the back of a head and a face read the
//    same and I scored three right-facing clips as left-facing.
//
// Every in/out point below sits inside a single shot. The boundaries came from
// scripts-local frame-differencing (32x18 luma grid, consecutive-frame delta),
// not from reading contact sheets: the promo cuts on motion and three of these
// shots are under two seconds, so eyeballing put the old crowd A 0.24s into the
// next interview and started it 0.24s inside the previous, right-facing shot.
// Shot bounds measured: A 155.947-157.657, B 191.483-192.609, C 143.018-144.811.
// The Day 1 stage ranges are a locked-off camera with max frame delta 3.2, no cuts.
//
// Rejected for facing RIGHT: Our Story 153.8-155.5, 295-298, 298-299, 299.5-302,
// 208.5-209.3, 141.5-142.5. Rejected for facing the camera: 190.4-191.3,
// 204-206. Rejected for heads bowed / eyes closed rather than watching:
// 146-147, 232, 299.5-302.
struct Beat {
    let name: String
    let url: URL
    let inSec: Double
    let outSec: Double
    let rate: Double
    let scale: Double
    let focusX: Double
    let focusY: Double
    var screenDur: Double { (outSec - inSec) / rate }
}

let beats: [Beat] = [
    // Wide. Establishes the stage.
    Beat(name: "michele wide",   url: exUrl,    inSec: 1590.00, outSec: 1591.40,
         rate: 0.7, scale: 1.50, focusX: 0.50, focusY: 0.50),
    // Room of young women, all facing left. Punched in to 1.75x with the window
    // pinned left, which pushes the slide monitor and its text off the right edge.
    Beat(name: "crowd left A",   url: storyUrl, inSec:  155.99, outSec:  157.62,
         rate: 1.0, scale: 1.75, focusX: 0.40, focusY: 0.50),
    // Medium. Same camera as the wide, but a clearly different shot.
    Beat(name: "michele medium", url: exUrl,    inSec: 1594.40, outSec: 1595.80,
         rate: 0.7, scale: 2.15, focusX: 0.47, focusY: 0.40),
    // Standing crowd in profile, facing left.
    Beat(name: "crowd left B",   url: storyUrl, inSec:  191.55, outSec:  192.55,
         rate: 0.75, scale: 1.50, focusX: 0.50, focusY: 0.50),
    // Medium wide. Third distinct size.
    Beat(name: "michele med-wide", url: exUrl,  inSec: 1613.80, outSec: 1615.20,
         rate: 0.7, scale: 1.75, focusX: 0.47, focusY: 0.42),
    // Warmer room, crowd side-on facing left.
    Beat(name: "crowd left C",   url: storyUrl, inSec:  143.08, outSec:  144.75,
         rate: 1.0, scale: 1.50, focusX: 0.50, focusY: 0.50),
]

print("Decoding \(beats.count) beats...")
let decoded: [[(rel: Double, image: CIImage)]] = beats.map {
    print("  \($0.name)")
    return decodeAndProcess(url: $0.url, inSec: $0.inSec, outSec: $0.outSec,
                            scale: $0.scale, focusX: $0.focusX, focusY: $0.focusY)
}
for (i, d) in decoded.enumerated() where d.isEmpty {
    fatalError("beat \(beats[i].name) decoded no frames")
}

// Clip, then dissolve into the next beat. The final dissolve lands back on the
// first frame of beat 1 so the loop seam is not a hard cut.
var cursor = 0.0
for (i, beat) in beats.enumerated() {
    print("Writing \(beat.name) at \(String(format: "%.2f", cursor))s...")
    writeClipFrames(decoded[i], rate: beat.rate, cursorStart: cursor)
    cursor += beat.screenDur
    let next = decoded[(i + 1) % beats.count]
    writeTransition(from: decoded[i].last!.image, to: next.first!.image, cursorStart: cursor)
    cursor += transitionDur
}

print("Total timeline: \(String(format: "%.2f", cursor))s")

input.markAsFinished()
let sem = DispatchSemaphore(value: 0)
writer.finishWriting {
    print("finishWriting status: \(writer.status.rawValue), error: \(String(describing: writer.error))")
    sem.signal()
}
sem.wait()
print("DONE")
