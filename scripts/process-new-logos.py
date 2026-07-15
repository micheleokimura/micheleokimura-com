#!/usr/bin/env python3
"""
Process a specific set of newly-found raw logos into the 3 monochrome variants
(black / white / yellow), overwriting only those slugs in public/church-logos/.

Unlike process-church-logos.py (which regenerates ALL logos and would re-render
the wordmark fallbacks), this touches only the slugs passed on the command line,
so the 13 already-good logos are left untouched.

Usage:
  python3 scripts/process-new-logos.py <slug>=<rawpath> [<slug>=<rawpath> ...]

Reuses the exact recolor logic from process-church-logos.py: use the real alpha
channel when present, otherwise knock out a near-white background.
"""
import os, sys
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public/church-logos")

COLORS = {
    "black":  (0, 0, 0),
    "white":  (255, 255, 255),
    "yellow": (0xEE, 0xDD, 0x47),
}
MAX_W, MAX_H = 600, 200
PAD = 8


def has_real_alpha(rgba):
    a = np.array(rgba.split()[-1])
    return (a < 250).mean() > 0.02


def alpha_from_white(rgba):
    arr = np.array(rgba).astype(np.float32)
    minc = arr[:, :, :3].min(axis=2)
    lo, hi = 220.0, 250.0
    alpha = np.clip((hi - minc) / (hi - lo), 0.0, 1.0) * 255.0
    return alpha.astype(np.uint8)


def trim(a):
    ys, xs = np.where(a > 12)
    if len(xs) == 0:
        return None
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def fit(alpha):
    bbox = trim(alpha)
    if bbox is None:
        return alpha
    l, t, r, b = bbox
    cropped = alpha[t:b, l:r]
    h, w = cropped.shape
    scale = min(MAX_W / w, MAX_H / h)
    nw, nh = max(1, round(w * scale)), max(1, round(h * scale))
    im = Image.fromarray(cropped, mode="L").resize((nw, nh), Image.LANCZOS)
    canvas = Image.new("L", (nw + 2 * PAD, nh + 2 * PAD), 0)
    canvas.paste(im, (PAD, PAD))
    return np.array(canvas)


def write_variants(slug, alpha):
    h, w = alpha.shape
    a_img = Image.fromarray(alpha, mode="L")
    for name, rgb in COLORS.items():
        solid = Image.new("RGBA", (w, h), rgb + (0,))
        solid.putalpha(a_img)
        solid.save(os.path.join(OUT, f"{slug}-{name}.png"))


def process(slug, path):
    rgba = Image.open(path).convert("RGBA")
    alpha = np.array(rgba.split()[-1]) if has_real_alpha(rgba) else alpha_from_white(rgba)
    alpha = fit(alpha)
    write_variants(slug, alpha)
    print(f"  {slug}: {os.path.basename(path)} -> 3 variants")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    print("Processing new logos:")
    for arg in sys.argv[1:]:
        slug, path = arg.split("=", 1)
        process(slug, path)


if __name__ == "__main__":
    main()
