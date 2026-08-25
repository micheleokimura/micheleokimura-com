import AppKit
import WebKit

// Builds /public/og-image.jpg, the 1200x630 card every page hands to iMessage,
// Facebook, LinkedIn and X. Run it after editing scripts/og-card.html:
//
//     swiftc -O -o /tmp/build-og-card scripts/build-og-card.swift && /tmp/build-og-card
//
// It has to be compiled, and it has to run from the repo root. Through `swift`
// in interpreter mode it traps inside AppKit before drawing anything.
//
// Why WebKit and not a CoreGraphics drawing script like build-books-hero.swift:
// this Mac has no node, no ImageMagick and no ffmpeg, and the card needs the
// real Mona Sans variable font at 'wdth' 125. Loading a woff2 into CoreText
// means converting it first. A WKWebView just reads the same @font-face the
// site does, off the same file in src/fonts, so the card cannot drift from the
// site's own type.

// #filePath is not usable to find the repo: compiled from a relative path it
// stays relative, then resolves against wherever the binary is run from.
let repoRoot = URL(fileURLWithPath: FileManager.default.currentDirectoryPath, isDirectory: true)
let cardURL = repoRoot.appendingPathComponent("scripts/og-card.html")
let outURL = repoRoot.appendingPathComponent("public/og-image.jpg")

guard FileManager.default.fileExists(atPath: cardURL.path) else {
    fputs("build-og-card: no scripts/og-card.html under \(repoRoot.path). Run this from the repo root.\n", stderr)
    exit(1)
}

let cardW = 1200.0, cardH = 630.0
/// CSS-side upscale before the snapshot, resampled back down afterwards, so the
/// type edges stay clean. WebKit applies the backing scale on top of this.
let supersample = 2.0
let renderW = cardW * supersample, renderH = cardH * supersample

let app = NSApplication.shared
app.setActivationPolicy(.accessory)

final class Handler: NSObject, WKNavigationDelegate {
    var finished = false
    var failure: String?
    func webView(_ w: WKWebView, didFinish n: WKNavigation!) { finished = true }
    func webView(_ w: WKWebView, didFail n: WKNavigation!, withError e: Error) {
        failure = e.localizedDescription
    }
    func webView(_ w: WKWebView, didFailProvisionalNavigation n: WKNavigation!, withError e: Error) {
        failure = e.localizedDescription
    }
}

let handler = Handler()
let webView = WKWebView(frame: NSRect(x: 0, y: 0, width: renderW, height: renderH),
                        configuration: WKWebViewConfiguration())
webView.navigationDelegate = handler

// An offscreen web view still needs a host window, or WebKit never gives it a
// layer to rasterise into. Parked far off the desktop so nothing flashes.
let window = NSWindow(contentRect: NSRect(x: 0, y: 0, width: renderW, height: renderH),
                      styleMask: [.borderless], backing: .buffered, defer: false)
window.contentView = webView
window.setFrameOrigin(NSPoint(x: -20000, y: -20000))
window.orderFrontRegardless()

/// Pumps the runloop, since none of this is on an app event loop.
func pump(_ seconds: TimeInterval) {
    let deadline = Date().addingTimeInterval(seconds)
    while Date() < deadline {
        RunLoop.current.run(mode: .default, before: Date().addingTimeInterval(0.02))
    }
}

func spin(until done: () -> Bool, seconds: TimeInterval, label: String) {
    let deadline = Date().addingTimeInterval(seconds)
    while !done() && Date() < deadline {
        RunLoop.current.run(mode: .default, before: Date().addingTimeInterval(0.05))
    }
    if !done() { fputs("build-og-card: timed out \(label)\n", stderr); exit(1) }
}

/// Runs one snippet and hands back whatever it evaluated to.
func evaluate(_ js: String, seconds: TimeInterval = 15) -> Any? {
    var result: Any?
    var done = false
    webView.evaluateJavaScript(js) { value, _ in
        result = value
        done = true
    }
    let deadline = Date().addingTimeInterval(seconds)
    while !done && Date() < deadline {
        RunLoop.current.run(mode: .default, before: Date().addingTimeInterval(0.02))
    }
    return result
}

webView.loadFileURL(cardURL, allowingReadAccessTo: repoRoot)
spin(until: { handler.finished || handler.failure != nil }, seconds: 60, label: "loading the card")
if let failure = handler.failure {
    fputs("build-og-card: \(failure)\n", stderr)
    exit(1)
}

// Poll from Swift rather than having the page post a message back. Both
// page-side ways of signalling are unreliable in an offscreen window:
// requestAnimationFrame is throttled to never, and a script message handler
// never delivers.
let readyCheck = """
document.fonts.status === 'loaded'
  && [...document.images].every(i => i.complete && i.naturalWidth > 0)
"""
spin(until: { evaluate(readyCheck) as? Bool == true }, seconds: 60,
     label: "waiting for the font and the headshot")

/// Takes one snapshot and resamples it to the exact 1200x630 that Facebook and
/// X both expect.
func snapshot() -> NSBitmapImageRep? {
    let config = WKSnapshotConfiguration()
    config.rect = NSRect(x: 0, y: 0, width: renderW, height: renderH)
    config.snapshotWidth = NSNumber(value: renderW)

    var shot: NSImage?
    var done = false
    webView.takeSnapshot(with: config) { image, _ in
        shot = image
        done = true
    }
    let deadline = Date().addingTimeInterval(30)
    while !done && Date() < deadline {
        RunLoop.current.run(mode: .default, before: Date().addingTimeInterval(0.05))
    }
    guard let shot else { return nil }

    // The rep has to carry an alpha channel even though the JPEG will not: a
    // 24-bit rep cannot back an NSGraphicsContext, and drawing into the nil
    // context that comes back traps the process.
    guard let out = NSBitmapImageRep(bitmapDataPlanes: nil,
                                     pixelsWide: Int(cardW), pixelsHigh: Int(cardH),
                                     bitsPerSample: 8, samplesPerPixel: 4,
                                     hasAlpha: true, isPlanar: false,
                                     colorSpaceName: .deviceRGB,
                                     bytesPerRow: 0, bitsPerPixel: 0),
          let ctx = NSGraphicsContext(bitmapImageRep: out) else { return nil }
    out.size = NSSize(width: cardW, height: cardH)

    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = ctx
    ctx.imageInterpolation = .high
    // Social scrapers that ignore alpha would otherwise composite the card onto
    // black, so lay down an opaque ground first.
    NSColor.white.setFill()
    NSRect(x: 0, y: 0, width: cardW, height: cardH).fill()
    shot.draw(in: NSRect(x: 0, y: 0, width: cardW, height: cardH),
              from: .zero, operation: .sourceOver, fraction: 1.0)
    ctx.flushGraphics()
    NSGraphicsContext.restoreGraphicsState()
    return out
}

/// WebKit reports the headshot `complete` well before it has rasterised a
/// 6000px JPEG into the layer, and a snapshot taken in that window comes back
/// with the photo panel left as bare background. There is no event for it, so
/// the check is the picture itself: the photo sits against dark green wood, and
/// these two points are inside it.
func photoPanelIsPainted(_ rep: NSBitmapImageRep) -> Bool {
    for point in [NSPoint(x: 120, y: 300), NSPoint(x: 260, y: 120)] {
        guard let c = rep.colorAt(x: Int(point.x), y: Int(point.y)) else { return false }
        let luma = 0.299 * c.redComponent + 0.587 * c.greenComponent + 0.114 * c.blueComponent
        if luma > 0.75 { return false }
    }
    return true
}

var rep: NSBitmapImageRep?
for attempt in 1...6 {
    pump(TimeInterval(attempt))
    guard let candidate = snapshot() else { continue }
    if photoPanelIsPainted(candidate) {
        rep = candidate
        break
    }
    fputs("build-og-card: photo panel still blank, retrying (\(attempt)/6)\n", stderr)
}

guard let rep else {
    fputs("build-og-card: gave up waiting for the headshot to rasterise\n", stderr)
    exit(1)
}

guard let jpeg = rep.representation(using: .jpeg,
                                    properties: [.compressionFactor: 0.9]) else {
    fputs("build-og-card: could not encode the JPEG\n", stderr)
    exit(1)
}
do {
    try jpeg.write(to: outURL)
} catch {
    fputs("build-og-card: \(error)\n", stderr)
    exit(1)
}

let kb = (jpeg.count + 512) / 1024
print("build-og-card: wrote public/og-image.jpg at \(Int(cardW))x\(Int(cardH)), \(kb) KB")
