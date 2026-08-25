import Foundation
import AppKit

// Fans Michele's own covers into one still life. Transparent PNG, so it sits on
// the Author hero's blush wash without a rectangle edge around it.

struct Book {
    let path: String
    /// Fraction trimmed off each side. The Brave Series art is a product
    /// PHOTOGRAPH with a pale margin around the book; the rest are flat covers.
    let inset: CGFloat
    let height: CGFloat   // rendered height in canvas px
    let cx: CGFloat
    let cy: CGFloat       // centre, from the bottom
    let angle: CGFloat    // degrees
}

let IMG = "/private/tmp/claude-501/-Users-micheleokimura-dev-micheleokimura-com/e279a66f-d534-4e77-ab70-3fbc885d456e/scratchpad/author-wt/public/images"

let W = 1920, H = 1040

// Left to right: navy, black, white, the painted centre, blue floral, yellow,
// blue and gold. Ordered for colour rhythm rather than by series, so no two
// neighbours read as the same book from across a room.
//
// Drawn back to front, centre LAST, so the fan opens toward the viewer instead
// of shingling off to one side.
let books: [Book] = [
    Book(path: "\(IMG)/journals/dream-big-with-god-journal-youth-and-adults@2x.jpg",
         inset: 0, height: 512, cx: 330, cy: 404, angle: -21),
    Book(path: "\(IMG)/brave-series/optimized/brave-and-bold-vol1.jpg",
         inset: 0.085, height: 544, cx: 528, cy: 436, angle: -14),
    Book(path: "\(IMG)/books/birth-of-explicit-movement-cover@2x.jpg",
         inset: 0, height: 584, cx: 744, cy: 468, angle: -7),

    Book(path: "\(IMG)/books/kingdom-kids.webp",
         inset: 0, height: 512, cx: 1590, cy: 404, angle: 21),
    Book(path: "\(IMG)/journals/dream-big-with-god-journal-preschool@2x.jpg",
         inset: 0, height: 544, cx: 1392, cy: 436, angle: 14),
    Book(path: "\(IMG)/brave-series/optimized/brave-and-beautiful-vol1.jpg",
         inset: 0.085, height: 584, cx: 1176, cy: 468, angle: 7),

    Book(path: "\(IMG)/books/dancing-with-father.webp",
         inset: 0, height: 624, cx: 960, cy: 500, angle: 0),
]

guard let rep = NSBitmapImageRep(
    bitmapDataPlanes: nil, pixelsWide: W, pixelsHigh: H,
    bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
    colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)
else { fatalError("no bitmap") }

guard let ctx = NSGraphicsContext(bitmapImageRep: rep) else { fatalError("no ctx") }
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = ctx
ctx.imageInterpolation = .high

for b in books {
    guard let img = NSImage(contentsOfFile: b.path) else {
        FileHandle.standardError.write("MISSING \(b.path)\n".data(using: .utf8)!)
        continue
    }
    let s = img.size
    let src = NSRect(x: s.width * b.inset, y: s.height * b.inset,
                     width: s.width * (1 - 2 * b.inset),
                     height: s.height * (1 - 2 * b.inset))
    let ratio = src.width / src.height
    let h = b.height, w = h * ratio

    NSGraphicsContext.saveGraphicsState()
    let shadow = NSShadow()
    // Warm and soft. This wants to be barely there. At 0.30 alpha with a
    // 16px drop and a 34px blur it read as a dark slab BEHIND each cover
    // rather than as a shadow under it, and the slab was clearly visible
    // past the left edge of every rotated book.
    shadow.shadowColor = NSColor(srgbRed: 0.22, green: 0.16, blue: 0.12, alpha: 0.13)
    shadow.shadowBlurRadius = 20
    shadow.shadowOffset = NSSize(width: 0, height: -6)
    shadow.set()

    let t = NSAffineTransform()
    t.translateX(by: b.cx, yBy: b.cy)
    t.rotate(byDegrees: b.angle)
    t.concat()
    img.draw(in: NSRect(x: -w / 2, y: -h / 2, width: w, height: h),
             from: src, operation: .sourceOver, fraction: 1.0)
    NSGraphicsContext.restoreGraphicsState()
}

NSGraphicsContext.restoreGraphicsState()

let out = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "/tmp/shelf.png"
guard let data = rep.representation(using: .png, properties: [:]) else { fatalError("no png") }
try! data.write(to: URL(fileURLWithPath: out))
print("wrote \(out)  \(data.count / 1024) KB  \(W)x\(H)")
