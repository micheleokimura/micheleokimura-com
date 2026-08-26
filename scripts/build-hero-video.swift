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

// Optionally mirror the source, then scale the 1280x720 frame up by `scale` and
// slide a 1920x1080 window over it centred on (focusX, focusY) given as
// fractions of the frame, focusY from the top. scale 1.5 lands exactly on
// 1920x1080, so the window is the whole frame and the focus point stops
// mattering. Anything above 1.5 is a punch-in.
//
// The mirror happens before the scale, so focusX on a flipped beat is read in
// mirrored space: 0.6 means 60% from the left of the picture you actually see.
func processFrame(_ src: CIImage, scale: Double, focusX: Double, focusY: Double,
                  flip: Bool) -> CIImage {
    var base = src
    if flip {
        base = src.transformed(by: CGAffineTransform(scaleX: -1, y: 1)
            .concatenating(CGAffineTransform(translationX: srcW, y: 0)))
    }
    let scaled = base.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
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
                      scale: Double, focusX: Double, focusY: Double,
                      flip: Bool) -> [(rel: Double, image: CIImage)] {
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
        let ci = processFrame(CIImage(cvPixelBuffer: pb), scale: scale,
                              focusX: focusX, focusY: focusY, flip: flip)
        result.append((ptsSec - t0!, ci))
    }
    print("  decoded \(result.count) frames from \(url.lastPathComponent) [\(inSec)-\(outSec)] @\(scale)x flip=\(flip)")
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
// Three rules drive this cut.
//
// 1. This is a speaking reel, so every crowd beat has to read as a room
//    listening. The two beats that used to sit here (Our Story 191.55-192.55
//    and 143.08-144.75) were pulled from worship segments: the first holds a
//    boy mid-clap next to a man singing, the second is a whole row clapping
//    with a young man moving to the beat. Both said music time rather than
//    talk time, so both are out. Nothing that claps, dances, or raises hands
//    goes back in.
//
// 2. Michele never follows Michele. Every stage beat is separated by a crowd
//    beat, AND each stage beat is a different shot size (wide, medium, medium
//    wide) off the same locked-off Day 1 camera. Three identical framings
//    separated by cutaways still read as one shot resuming, which is what
//    Brett saw.
//
// 3. Michele is angled camera-right, so every crowd beat must look camera-LEFT.
//    Checked at full resolution, one frame from the middle of each clip, not off
//    contact-sheet thumbnails: at 320px the back of a head and a face read the
//    same and I scored three right-facing clips as left-facing.
//
// The two replacement beats are seated men, which is what Michele asked for and
// what the very first build had at Our Story 237-240. Both are the same room and
// the same pink conference chairs as crowd A, so they cut together cleanly. Both
// happen to face camera-right in the source, and there is no seated-men shot in
// this b-roll that faces left, so both are mirrored to hold the eyeline. Neither
// carries text, a logo, or lettering of any kind, so the flip leaves no tell.
//
// Every in/out point below sits inside a single shot. The boundaries came from
// scripts-local frame-differencing (32x18 luma grid, consecutive-frame delta),
// not from reading contact sheets: the promo cuts on motion and several of these
// shots are barely over a second. Shot bounds measured: crowd A 155.947-157.657,
// men A 238.113-239.406 (the next shot is a classroom, so the out point has to
// clear 239.40), men B 294.836-297.255.
// The Day 1 stage ranges are a locked-off camera with max frame delta 3.2, no cuts.
//
// Rejected for facing RIGHT and unfixable by a mirror because of on-screen text
// or a stage in shot: Our Story 205-207, 208.5-209.3, 141.5-142.5. Rejected for
// facing the camera: 190.4-191.3, 204-206. Rejected for heads bowed / eyes
// closed rather than watching: 146-147, 232, 236.7-238.1, 299.5-302.
struct Beat {
    let name: String
    let url: URL
    let inSec: Double
    let outSec: Double
    let rate: Double
    let scale: Double
    let focusX: Double
    let focusY: Double
    let flip: Bool
    var screenDur: Double { (outSec - inSec) / rate }
}

let beats: [Beat] = [
    // Wide. Establishes the stage.
    Beat(name: "michele wide",   url: exUrl,    inSec: 1590.00, outSec: 1591.40,
         rate: 0.7, scale: 1.50, focusX: 0.50, focusY: 0.50, flip: false),
    // Room of young women, all facing left. Punched in to 1.75x with the window
    // pinned left, which pushes the slide monitor and its text off the right edge.
    Beat(name: "crowd left A",   url: storyUrl, inSec:  155.99, outSec:  157.62,
         rate: 1.0, scale: 1.75, focusX: 0.40, focusY: 0.50, flip: false),
    // Medium. Same camera as the wide, but a clearly different shot.
    Beat(name: "michele medium", url: exUrl,    inSec: 1594.40, outSec: 1595.80,
         rate: 0.7, scale: 2.15, focusX: 0.47, focusY: 0.40, flip: false),
    // Seated men, mirrored. Young man in a backwards cap watching the stage with
    // two more men behind him. Punched to 1.75x and centred so the mirror leaves
    // him right of frame with the looking room on his left.
    Beat(name: "men seated A",   url: storyUrl, inSec:  238.25, outSec:  239.35,
         rate: 0.75, scale: 1.75, focusX: 0.50, focusY: 0.42, flip: true),
    // Medium wide. Third distinct size.
    Beat(name: "michele med-wide", url: exUrl,  inSec: 1613.80, outSec: 1615.20,
         rate: 0.7, scale: 1.75, focusX: 0.47, focusY: 0.42, flip: false),
    // Seated men, mirrored. A row of men in the same chairs, the nearest one
    // taking notes through the whole beat. Left at 1.50x so the row reads.
    Beat(name: "men seated B",   url: storyUrl, inSec:  295.10, outSec:  296.90,
         rate: 1.0, scale: 1.50, focusX: 0.50, focusY: 0.50, flip: true),
]

print("Decoding \(beats.count) beats...")
let decoded: [[(rel: Double, image: CIImage)]] = beats.map {
    print("  \($0.name)")
    return decodeAndProcess(url: $0.url, inSec: $0.inSec, outSec: $0.outSec,
                            scale: $0.scale, focusX: $0.focusX, focusY: $0.focusY,
                            flip: $0.flip)
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
