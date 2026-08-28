import AVFoundation
import CoreImage
import Foundation

let exUrl = URL(fileURLWithPath: "/Users/micheleokimura/Downloads/EX New Hope Day 1.mp4")
let storyUrl = URL(fileURLWithPath: "/Users/micheleokimura/Downloads/Our Story Promo Video.mp4")
let outputPath = "/Users/micheleokimura/dev/micheleokimura-com/public/videos/michele-hero.mp4"

let outW = 1920.0, outH = 1080.0
let srcW = 1280.0, srcH = 720.0
let outFPS = 30

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

// Raw source frames for one beat, kept at 1280x720 so a whole beat fits in
// memory. alwaysCopiesSampleData has to stay true: the blender reads two
// neighbouring frames at once, and the decoder recycles uncopied buffers.
func decodeRaw(url: URL, inSec: Double, outSec: Double) -> [(rel: Double, image: CIImage)] {
    let asset = AVURLAsset(url: url)
    let track = loadFirstVideoTrack(asset)
    let reader = try! AVAssetReader(asset: asset)
    let output = AVAssetReaderTrackOutput(track: track, outputSettings: [
        kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA
    ])
    output.alwaysCopiesSampleData = true
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
        result.append((ptsSec - t0!, CIImage(cvPixelBuffer: pb)))
    }
    return result
}

// Cross-fade two neighbouring source frames. Holding a 1.3s crowd shot for a
// full 3s means showing roughly two output frames per source frame, and
// repeating frames outright judders badly at 24fps source. Blending the pair
// either side of the wanted instant smooths that out. Both inputs share one
// extent, so the transition needs no clamping.
func blend(_ a: CIImage, _ b: CIImage, _ t: Double) -> CIImage {
    if t <= 0.0001 { return a }
    if t >= 0.9999 { return b }
    let f = CIFilter(name: "CIDissolveTransition")!
    f.setValue(a, forKey: kCIInputImageKey)
    f.setValue(b, forKey: "inputTargetImage")
    f.setValue(t, forKey: "inputTime")
    return f.outputImage!.cropped(to: a.extent)
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

var frameIndex: Int64 = 0

func appendFrame(_ image: CIImage) {
    while !input.isReadyForMoreMediaData { usleep(2000) }
    var pb: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &pb)
    guard let buffer = pb else { fatalError("no pixel buffer") }
    ciContext.render(image, to: buffer)
    // Exact 30fps timestamps, so the cut points land on whole frames.
    let t = CMTime(value: frameIndex, timescale: CMTimeScale(outFPS))
    if !adaptor.append(buffer, withPresentationTime: t) {
        print("append FAILED at frame \(frameIndex): \(String(describing: writer.error))")
    }
    frameIndex += 1
}

// --- The beat list ---
//
// Four rules drive this cut.
//
// 1. This is a speaking reel, so every crowd beat has to read as a room
//    listening. Nothing that claps, dances, or raises hands belongs here.
//
// 2. Michele never follows Michele. Every stage beat is separated by a crowd
//    beat, AND each stage beat is a different shot size (wide, medium, medium
//    wide) off the same locked-off Day 1 camera. Three identical framings
//    separated by cutaways still read as one shot resuming.
//
// 3. Michele is angled camera-right, so every crowd beat must look camera-LEFT.
//    Where the source looks the wrong way the fix is a horizontal mirror rather
//    than a hunt for a different shot: same shot, same room, reversed eyeline.
//    "crowd left A" was the beat that broke this. The girl in the maroon hoodie
//    looks camera-right in the source and was wrongly logged as left-facing on
//    an earlier pass, so she is now mirrored along with the two seated-men
//    beats. focusX moves 0.40 -> 0.60 because focusX is read in mirrored space,
//    which keeps the identical framing and keeps the slide monitor and its text
//    cropped out, now off the left edge instead of the right.
//
// 4. Every beat holds 3.00s and every join is a hard cut. No fades to black, no
//    dissolves, including across the loop seam.
//
// The Day 1 stage ranges are one locked-off camera: a frame-difference scan of
// 1560-1660 found no cuts at all and a max frame delta of 3.94, so the Michele
// beats are extended with real frames rather than pushed into heavier slow-mo.
// The Our Story beats sit inside measured shot bounds, from a 32x18 luma
// frame-difference scan: crowd A 155.947-157.657, men A 238.113-239.406 (the
// next shot is a classroom, so the out point has to clear 239.40), men B
// 294.836-297.255. Those are short, so they carry the heavier `rate` values and
// lean on frame blending to hold 3s without judder.
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
    Beat(name: "michele wide",   url: exUrl,    inSec: 1590.00, outSec: 1592.10,
         rate: 0.70, scale: 1.50, focusX: 0.50, focusY: 0.50, flip: false),
    // Room of young women. Mirrored so the hero girl watches camera-left.
    Beat(name: "crowd left A",   url: storyUrl, inSec:  155.96, outSec:  157.64,
         rate: 0.56, scale: 1.75, focusX: 0.60, focusY: 0.50, flip: true),
    // Medium. Same camera as the wide, but a clearly different shot.
    Beat(name: "michele medium", url: exUrl,    inSec: 1594.40, outSec: 1596.50,
         rate: 0.70, scale: 2.15, focusX: 0.47, focusY: 0.40, flip: false),
    // Seated men, mirrored. Young man in a backwards cap watching the stage with
    // two more men behind him.
    Beat(name: "men seated A",   url: storyUrl, inSec:  238.15, outSec:  239.40,
         rate: 0.4167, scale: 1.75, focusX: 0.50, focusY: 0.42, flip: true),
    // Medium wide. Third distinct size.
    Beat(name: "michele med-wide", url: exUrl,  inSec: 1613.80, outSec: 1615.90,
         rate: 0.70, scale: 1.75, focusX: 0.47, focusY: 0.42, flip: false),
    // Seated men, mirrored. A row of men in the same chairs, the nearest one
    // taking notes through the whole beat.
    Beat(name: "men seated B",   url: storyUrl, inSec:  294.90, outSec:  297.20,
         rate: 0.7667, scale: 1.50, focusX: 0.50, focusY: 0.50, flip: true),
]

print("Building \(beats.count) beats, hard cuts only...")
var cursor = 0.0
for beat in beats {
    let raw = decodeRaw(url: beat.url, inSec: beat.inSec, outSec: beat.outSec)
    if raw.isEmpty { fatalError("beat \(beat.name) decoded no frames") }
    let steps = Int((beat.screenDur * Double(outFPS)).rounded())
    for k in 0..<steps {
        // Where this output frame sits inside the source clip.
        let srcT = (Double(k) / Double(outFPS)) * beat.rate
        var i = 0
        while i + 1 < raw.count && raw[i + 1].rel <= srcT { i += 1 }
        let mixed: CIImage
        if i + 1 < raw.count {
            let span = raw[i + 1].rel - raw[i].rel
            let w = span > 0 ? (srcT - raw[i].rel) / span : 0
            mixed = blend(raw[i].image, raw[i + 1].image, min(max(w, 0), 1))
        } else {
            mixed = raw[i].image
        }
        appendFrame(processFrame(mixed, scale: beat.scale, focusX: beat.focusX,
                                 focusY: beat.focusY, flip: beat.flip))
    }
    print(String(format: "  %-16@ %6.2fs -> %6.2fs  src %.2fs @rate %.4f  %d frames from %d",
                 beat.name as NSString, cursor, cursor + Double(steps) / Double(outFPS),
                 beat.outSec - beat.inSec, beat.rate, steps, raw.count))
    cursor += Double(steps) / Double(outFPS)
}

print("Total timeline: \(String(format: "%.2f", cursor))s, \(frameIndex) frames at \(outFPS)fps")

input.markAsFinished()
let sem = DispatchSemaphore(value: 0)
writer.finishWriting {
    print("finishWriting status: \(writer.status.rawValue), error: \(String(describing: writer.error))")
    sem.signal()
}
sem.wait()
print("DONE")
