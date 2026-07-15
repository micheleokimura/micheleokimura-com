#!/usr/bin/env python3
"""
Process raw church logos into 3 monochrome variants each (black / white / yellow).

- Extracted raster logos: take the alpha silhouette, recolor RGB, keep alpha.
- Opaque-on-white logos (no real alpha): knock out near-white to build an alpha mask.
- Failed extractions / unusable assets: render a clean typographic wordmark instead.

Output: public/church-logos/<slug>-{black,white,yellow}.png  (uniform PNG)
"""
import os, glob
import numpy as np
from PIL import Image, ImageFont, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "public/church-logos/_raw")
OUT = os.path.join(ROOT, "public/church-logos")

COLORS = {
    "black":  (0, 0, 0),
    "white":  (255, 255, 255),
    "yellow": (0xEE, 0xDD, 0x47),
}

# slug -> display name. Order matches the component data array.
CHURCHES = {
    "fcc-santa-maria": "First Christian Church Santa Maria",
    "faith-community-fellowship": "Faith Community Fellowship",
    "the-grove-church": "The Grove Church",
    "sanibel-community-church": "Sanibel Community Church",
    "community-christian-church": "Community Christian Church",
    "centerpoint-utah": "Centerpoint Church Utah",
    "cornerstone-buzz": "Cornerstone Church Buzz",
    "for-the-one-church": "For The One Church",
    "shelby-church": "Shelby Church",
    "faith-bible-ok": "Faith Bible Church OK",
    "northpointe-community-church": "Northpointe Community Church",
    "eastown-church": "Eastown Church",
    "lifepoint-church": "Lifepoint Church",
    "ignite-church": "Ignite Church",
    "holland-chapel": "Holland Chapel",
    "central-coast-young-adults": "Central Coast Young Adults",
    "swg-leadership": "SWG Leadership",
    "calvary-fort-worth": "Calvary Fort Worth",
    "cornerstone-manteca": "Cornerstone Manteca",
    "the-crossing-church": "The Crossing Church",
    "lifechurch-atlanta": "LifeChurch Atlanta",
    "yit-indianapolis": "YIT Indianapolis",
}

# Slugs that must use a typographic wordmark (no usable logo asset on site).
WORDMARK = {
    "fcc-santa-maria",            # text-only header, no image
    "sanibel-community-church",   # og:image is a building photo, not a logo
    "holland-chapel",             # site dead / compromised
    "central-coast-young-adults", # site expired
    "calvary-fort-worth",         # JS-rendered SPA, no static logo
    "faith-community-fellowship", # site asset was a wrong/unrelated mark ("ABM")
    "for-the-one-church",         # site asset was the ONEkids kids-ministry sub-brand
}

MAX_W, MAX_H = 600, 200          # retina-scaled cap for the ~56px display height
PAD = 8                          # transparent padding around trimmed content

FONT_PATH = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def load_rgba(path):
    return Image.open(path).convert("RGBA")


def has_real_alpha(rgba):
    a = np.array(rgba.split()[-1])
    return (a < 250).mean() > 0.02  # at least 2% non-opaque pixels


def alpha_from_white(rgba):
    """Build an alpha mask by knocking out a near-white background.
    Uses the min channel: white(255) -> transparent, colored/gray -> opaque,
    with a narrow anti-aliased ramp on the boundary."""
    arr = np.array(rgba).astype(np.float32)
    minc = arr[:, :, :3].min(axis=2)            # white=255, gray=128, saturated color=low
    lo, hi = 220.0, 250.0                        # minc>=hi -> transparent, <=lo -> opaque
    alpha = np.clip((hi - minc) / (hi - lo), 0.0, 1.0) * 255.0
    return alpha.astype(np.uint8)


def trim(arr_alpha):
    """Return bbox (l, t, r, b) of pixels with alpha > 12, else None."""
    ys, xs = np.where(arr_alpha > 12)
    if len(xs) == 0:
        return None
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def fit(alpha):
    """Trim transparent padding, scale to fit MAX_W x MAX_H, add PAD. Returns alpha array."""
    bbox = trim(alpha)
    if bbox is None:
        return alpha
    l, t, r, b = bbox
    cropped = alpha[t:b, l:r]
    h, w = cropped.shape
    scale = min(MAX_W / w, MAX_H / h, 1.0 if max(w, h) <= max(MAX_W, MAX_H) else 999)
    # always allow upscaling small logos a bit, but never beyond caps
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


def process_logo(slug, path):
    rgba = load_rgba(path)
    if has_real_alpha(rgba):
        alpha = np.array(rgba.split()[-1])
    else:
        alpha = alpha_from_white(rgba)
    alpha = fit(alpha)
    write_variants(slug, alpha)


def render_wordmark(slug, name):
    """Render a clean typographic wordmark to an alpha mask, then color it."""
    # Render large in white-on-transparent, then use luminance as alpha.
    font_size = 120
    font = ImageFont.truetype(FONT_PATH, font_size)
    # measure
    tmp = Image.new("L", (10, 10), 0)
    d = ImageDraw.Draw(tmp)
    bbox = d.textbbox((0, 0), name, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    img = Image.new("L", (tw + 40, th + 40), 0)
    d = ImageDraw.Draw(img)
    d.text((20 - bbox[0], 20 - bbox[1]), name, font=font, fill=255)
    alpha = fit(np.array(img))
    write_variants(slug, alpha)


def main():
    raws = {}
    for f in glob.glob(os.path.join(RAW, "*")):
        slug = os.path.splitext(os.path.basename(f))[0]
        raws[slug] = f

    done, words = [], []
    for slug, name in CHURCHES.items():
        if slug in WORDMARK or slug not in raws:
            render_wordmark(slug, name)
            words.append(slug)
        else:
            process_logo(slug, raws[slug])
            done.append(slug)

    print(f"Logos processed: {len(done)} -> {sorted(done)}")
    print(f"Wordmark fallbacks: {len(words)} -> {sorted(words)}")
    total = len(glob.glob(os.path.join(OUT, '*-black.png')))
    print(f"Variant sets written: {total} (expect {len(CHURCHES)})")


if __name__ == "__main__":
    main()
