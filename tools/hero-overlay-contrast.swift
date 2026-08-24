import AVFoundation
import AppKit
import CoreGraphics
import Foundation

// Verification for the SHIPPED overlay. Reproduces the exact two-layer stack
// (25% flat wash + the 4-stop scrim) at the real screen positions of the H1 and
// the subhead, and reports the worst contrast any frame produces for cream text.

let videoPath = CommandLine.arguments[1]
let asset = AVURLAsset(url: URL(fileURLWithPath: videoPath))
let gen = AVAssetImageGenerator(asset: asset)
gen.appliesPreferredTrackTransform = true
gen.requestedTimeToleranceBefore = .zero
gen.requestedTimeToleranceAfter = .zero
let sem = DispatchSemaphore(value: 0)
var duration: Double = 0
Task { if let d = try? await asset.load(.duration) { duration = CMTimeGetSeconds(d) }; sem.signal() }
sem.wait()

func lin(_ c: Double) -> Double {
    let s = c / 255.0
    return s <= 0.04045 ? s / 12.92 : pow((s + 0.055) / 1.055, 2.4)
}
func relLum(_ r: Double, _ g: Double, _ b: Double) -> Double {
    0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
func contrast(_ a: Double, _ b: Double) -> Double {
    let hi = max(a, b), lo = min(a, b); return (hi + 0.05) / (lo + 0.05)
}
let creamL = relLum(242, 236, 223)
_ = creamL
let navy = (r: 31.0, g: 39.0, b: 68.0)

let WASH = 0.25

/// The shipped scrim, as a function of distance from the bottom of the gradient
/// box expressed as a fraction of that box's height.
/// linear-gradient(to top, .78 0%, .66 40%, .45 70%, 0 100%)
func scrim(_ f: Double) -> Double {
    switch f {
    case ..<0.40: return 0.78 + (0.70 - 0.78) * (f / 0.40)
    case ..<0.70: return 0.70 + (0.52 - 0.70) * ((f - 0.40) / 0.30)
    default:      return 0.52 + (0.00 - 0.52) * ((f - 0.70) / 0.30)
    }
}

// Geometry at lg, measured off the rendered page (1440px wide, hero 810px).
// Gradient box = pt-56 (224px) + copy block (~426px) = 650px, bottom-anchored.
let boxH = 650.0
// Distance from the bottom of that box, in px.
let h1Top = 460.0, h1Bot = 396.0        // H1, large text, 3:1
let subTop = 336.0, subBot = 208.0      // subhead, body text, 4.5:1

// Convert a distance-from-bottom to a fraction of the HERO frame, so the right
// video pixels get sampled. Hero is 810px; the box sits at its bottom.
func heroFracFromBottom(_ d: Double) -> Double { 1.0 - (d / 810.0) }

// `textAlpha` matters: the copy is not all full-strength cream. Tailwind's
// /90 and /75 blend the glyph toward whatever is behind it, which costs
// contrast, so measuring against solid cream would flatter the result.
struct Probe { let name: String; let dTop: Double; let dBot: Double; let floor: Double; let textAlpha: Double }
let probes = [
    Probe(name: "H1 (cream)", dTop: h1Top, dBot: h1Bot, floor: 3.0, textAlpha: 1.0),
    Probe(name: "subhead (solid cream)", dTop: subTop, dBot: subBot, floor: 4.5, textAlpha: 1.0),
    // Award line: lead/tail at /75, honor span at solid cream. d 128..188.
    Probe(name: "award lead/tail (cream/75)", dTop: 188, dBot: 128, floor: 4.5, textAlpha: 0.75),
    Probe(name: "award honor (cream)", dTop: 188, dBot: 128, floor: 4.5, textAlpha: 1.0),
    // Roles line sits between the H1 and the subhead, in pale teal #9FE8DF.
    Probe(name: "roles (solid cream)", dTop: 380, dBot: 352, floor: 4.5, textAlpha: 1.0),
]

var minC = [Double](repeating: .infinity, count: probes.count)
var effAt = [Double](repeating: 0, count: probes.count)
var fails = [Int](repeating: 0, count: probes.count)
var totals = [Int](repeating: 0, count: probes.count)

var t = 0.0
let step = 0.25
while t < duration {
    guard let cg = try? gen.copyCGImage(at: CMTime(seconds: t, preferredTimescale: 600), actualTime: nil)
    else { t += step; continue }
    let w = cg.width, h = cg.height
    var buf = [UInt8](repeating: 0, count: w * h * 4)
    guard let ctx = CGContext(data: &buf, width: w, height: h, bitsPerComponent: 8,
                              bytesPerRow: w * 4, space: CGColorSpaceCreateDeviceRGB(),
                              bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { t += step; continue }
    ctx.draw(cg, in: CGRect(x: 0, y: 0, width: w, height: h))

    for (pi, p) in probes.enumerated() {
        // Worst point in the band is where the scrim is weakest, i.e. the top.
        let fracInBox = p.dTop / boxH
        let a = 1.0 - (1.0 - WASH) * (1.0 - scrim(fracInBox))
        effAt[pi] = a
        let yTopFrac = heroFracFromBottom(p.dTop), yBotFrac = heroFracFromBottom(p.dBot)
        let px0 = Int(Double(w) * 0.05), px1 = Int(Double(w) * 0.56)
        let py0 = Int(Double(h) * (1.0 - yBotFrac)), py1 = Int(Double(h) * (1.0 - yTopFrac))
        var y = min(py0, py1)
        let yEnd = max(py0, py1)
        while y < yEnd {
            var x = px0
            while x < px1 {
                let o = (y * w + x) * 4
                let R = Double(buf[o]), G = Double(buf[o+1]), B = Double(buf[o+2])
                let cr = navy.r * a + R * (1 - a)
                let cg2 = navy.g * a + G * (1 - a)
                let cb = navy.b * a + B * (1 - a)
                let bgL = relLum(cr, cg2, cb)
                // The glyph itself, blended toward the background by its own alpha.
                let ta = p.textAlpha
                let ink = (242.0, 236.0, 223.0)
                let tr = ink.0 * ta + cr * (1 - ta)
                let tg = ink.1 * ta + cg2 * (1 - ta)
                let tb = ink.2 * ta + cb * (1 - ta)
                let c = contrast(relLum(tr, tg, tb), bgL)
                totals[pi] += 1
                if c < minC[pi] { minC[pi] = c }
                if c < p.floor { fails[pi] += 1 }
                x += 2
            }
            y += 2
        }
    }
    t += step
}

print("=== SHIPPED OVERLAY VERIFICATION ===")
print(String(format: "flat wash = %.0f%% navy over the whole frame", WASH * 100))
for (pi, p) in probes.enumerated() {
    print(String(format: "%@: effective alpha at its weakest point = %.3f", p.name, effAt[pi]))
    print(String(format: "   worst contrast across the clip = %.2f:1  (floor %.1f:1)", minC[pi], p.floor))
    print(String(format: "   failing pixels = %d / %d (%.4f%%)", fails[pi], totals[pi],
                 100.0 * Double(fails[pi]) / Double(max(totals[pi], 1))))
}
// What the top of the frame, where Michele is, actually gets.
print(String(format: "top of frame (Michele's head/shoulders): effective alpha = %.2f (wash only)", WASH))
