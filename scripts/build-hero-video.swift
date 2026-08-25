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

func writeTransition(from: CIImage, to: CIImage, cursorStart: Double) {
    let halfDur = 0.75
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

// --- Decode all clips first (cheap: CIImage wraps existing pixel buffers) ---
print("Decoding clip 1 (stage, 26:30.0-26:33.5)...")
let clip1 = decodeAndProcess(url: exUrl, inSec: 1590.0, outSec: 1593.5, isStage: true)
print("Decoding clip 2 (crowd, 3:57.0-4:00.0)...")
let clip2 = decodeAndProcess(url: storyUrl, inSec: 237.0, outSec: 240.0, isStage: false)
print("Decoding clip 3 (stage, 26:34.0-26:37.5)...")
let clip3 = decodeAndProcess(url: exUrl, inSec: 1594.0, outSec: 1597.5, isStage: true)

guard let clip1First = clip1.first?.image, let clip1Last = clip1.last?.image,
      let clip2First = clip2.first?.image, let clip2Last = clip2.last?.image,
      let clip3First = clip3.first?.image else {
    fatalError("empty clip frames")
}

// --- Sequence: clip1(5.0s) -> transition(1.5s) -> clip2(3.0s) -> transition(1.5s) -> clip3(5.0s) = 16.0s ---
var cursor = 0.0
print("Writing clip 1...")
writeClipFrames(clip1, rate: 0.7, cursorStart: cursor)
cursor += 3.5 / 0.7

print("Writing transition 1...")
writeTransition(from: clip1Last, to: clip2First, cursorStart: cursor)
cursor += 1.5

print("Writing clip 2...")
writeClipFrames(clip2, rate: 1.0, cursorStart: cursor)
cursor += 3.0

print("Writing transition 2...")
writeTransition(from: clip2Last, to: clip3First, cursorStart: cursor)
cursor += 1.5

print("Writing clip 3...")
writeClipFrames(clip3, rate: 0.7, cursorStart: cursor)
cursor += 3.5 / 0.7

print("Total timeline: \(cursor)s")

input.markAsFinished()
let sem = DispatchSemaphore(value: 0)
writer.finishWriting {
    print("finishWriting status: \(writer.status.rawValue), error: \(String(describing: writer.error))")
    sem.signal()
}
sem.wait()
print("DONE")
