import AVFoundation
import CoreImage
import Foundation

let exUrl = URL(fileURLWithPath: "/Users/micheleokimura/Downloads/EX New Hope Day 1.mp4")
let storyUrl = URL(fileURLWithPath: "/Users/micheleokimura/Downloads/Our Story Promo Video.mp4")
let outputPath = "/Users/micheleokimura/dev/micheleokimura-com/public/videos/michele-hero.mp4"

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

func processFrame(_ src: CIImage, isStage: Bool) -> CIImage {
    let scaled = src.transformed(by: CGAffineTransform(scaleX: 1.5, y: 1.5))
    let vf = CIFilter(name: "CIVignette")!
    vf.setValue(scaled, forKey: kCIInputImageKey)
    vf.setValue(0.7, forKey: kCIInputIntensityKey)
    vf.setValue(1.5, forKey: kCIInputRadiusKey)
    var out = vf.outputImage!
    let targetRect = CGRect(x: 0, y: 0, width: 1920, height: 1080)
    // No gaussian blur: Michele reads soft on the stage clips when it is applied.
    // isStage is kept only so the call sites stay identical to the original build.
    _ = isStage
    out = out.cropped(to: targetRect)
    return out
}

func decodeAndProcess(url: URL, inSec: Double, outSec: Double, isStage: Bool) -> [(rel: Double, image: CIImage)] {
    let asset = AVURLAsset(url: url)
    let track = loadFirstVideoTrack(asset)
    let reader = try! AVAssetReader(asset: asset)
    let output = AVAssetReaderTrackOutput(track: track, outputSettings: [
        kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA
    ])
    output.alwaysCopiesSampleData = false
    reader.add(output)
    let inTime = CMTime(seconds: inSec, preferredTimescale: 90000)
    let outTime = CMTime(seconds: outSec, preferredTimescale: 90000)
    reader.timeRange = CMTimeRange(start: inTime, end: outTime)
    reader.startReading()

    var result: [(Double, CIImage)] = []
    var t0: Double? = nil
    while let sb = output.copyNextSampleBuffer() {
        guard let pb = CMSampleBufferGetImageBuffer(sb) else { continue }
        let pts = CMSampleBufferGetPresentationTimeStamp(sb)
        let ptsSec = CMTimeGetSeconds(pts)
        if t0 == nil { t0 = ptsSec }
        let rel = ptsSec - t0!
        let ci = processFrame(CIImage(cvPixelBuffer: pb), isStage: isStage)
        result.append((rel, ci))
    }
    print("decoded \(result.count) frames from \(url.lastPathComponent) [\(inSec)-\(outSec)]")
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
let adaptorAttrs: [String: Any] = [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: 1920,
    kCVPixelBufferHeightKey as String: 1080
]
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: adaptorAttrs)
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
    let t = CMTime(seconds: timeSec, preferredTimescale: 90000)
    if !adaptor.append(buffer, withPresentationTime: t) {
        print("append FAILED at \(timeSec): \(String(describing: writer.error))")
    }
}

func writeClipFrames(_ frames: [(rel: Double, image: CIImage)], rate: Double, cursorStart: Double) {
    for f in frames {
        appendFrame(f.image, at: cursorStart + f.rel / rate)
    }
}

// Half-second dissolve. Six beats need six of these, so they stay short.
let transitionDur = 0.5

func writeTransition(from: CIImage, to: CIImage, cursorStart: Double) {
    let halfDur = transitionDur / 2.0
    let fps = 30.0
    let stepCount = Int(halfDur * fps)
    for k in 0..<stepCount {
        let t = Double(k) / fps
        let alpha = 1.0 - (t / halfDur)
        appendFrame(fadeImage(from, alpha: alpha), at: cursorStart + t)
    }
    for k in 0..<stepCount {
        let t = Double(k) / fps
        let alpha = t / halfDur
        appendFrame(fadeImage(to, alpha: alpha), at: cursorStart + halfDur + t)
    }
}

// --- The beat list ---
//
// Michele on the Day 1 stage is angled camera-right, so every audience cutaway
// is a shot where the room is looking camera-left. The old build's single
// cutaway (Our Story 237.0-240.0) held three shots inside three seconds, the
// last of which was a girl taking notes in a classroom. That whole range is out.
//
// isStage marks the Day 1 stage footage; it no longer changes the treatment.
struct Beat {
    let name: String
    let url: URL
    let inSec: Double
    let outSec: Double
    let rate: Double
    let isStage: Bool
    var screenDur: Double { (outSec - inSec) / rate }
}

let beats: [Beat] = [
    Beat(name: "michele 1",  url: exUrl,    inSec: 1590.00, outSec: 1591.40, rate: 0.7, isStage: true),
    Beat(name: "audience 1", url: storyUrl, inSec:  153.80, outSec:  155.50, rate: 1.0, isStage: false),
    Beat(name: "michele 2",  url: exUrl,    inSec: 1594.40, outSec: 1595.80, rate: 0.7, isStage: true),
    Beat(name: "audience 2", url: storyUrl, inSec:  298.05, outSec:  298.95, rate: 0.6, isStage: false),
    Beat(name: "michele 3",  url: exUrl,    inSec: 1613.80, outSec: 1615.20, rate: 0.7, isStage: true),
    Beat(name: "audience 3", url: storyUrl, inSec:  299.55, outSec:  301.35, rate: 1.0, isStage: false),
]

print("Decoding \(beats.count) beats...")
let decoded: [[(rel: Double, image: CIImage)]] = beats.map {
    print("  \($0.name) \($0.url.lastPathComponent) [\($0.inSec)-\($0.outSec)]")
    return decodeAndProcess(url: $0.url, inSec: $0.inSec, outSec: $0.outSec, isStage: $0.isStage)
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
