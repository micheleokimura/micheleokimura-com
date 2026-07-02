#!/bin/bash
# convert-to-webp.command - generates WebP copies of every downloaded image.
#
# Run download-images.command FIRST. This script reads from images/<page>/original/
# and writes WebP copies into images/<page>/webp/.
#
# Settings used:
#   - PNG with transparency: lossless WebP (preserves transparency exactly)
#   - JPEG / non-transparent PNG: quality 85 WebP (visually identical, ~30% smaller)
#
# How to use:
#   1. Make sure download-images.command has already populated images/*/original/.
#   2. Double-click this file.
#   3. WebP versions appear in images/*/webp/.

set -u
cd "$(dirname "$0")"
ARCHIVE_DIR="$(pwd)"

# Make sure Python and Pillow are available.
if ! command -v python3 >/dev/null 2>&1; then
  echo "ERROR: python3 not found. macOS should include it."
  read -r -p "Press Enter to close..." _
  exit 1
fi

# Install Pillow if not already present (per-user, so no sudo needed).
python3 -c "from PIL import Image" >/dev/null 2>&1 || {
  echo "Pillow not found. Installing into your user Python..."
  python3 -m pip install --user --quiet Pillow || {
    echo "ERROR: could not install Pillow. Try opening Terminal and running:"
    echo "  python3 -m pip install --user Pillow"
    read -r -p "Press Enter to close..." _
    exit 1
  }
}

python3 << 'PYEOF'
import os
import sys
from pathlib import Path
from PIL import Image

archive_dir = Path(os.environ.get("PWD", "."))
images_root = archive_dir / "images"
if not images_root.is_dir():
    print(f"ERROR: {images_root} does not exist. Run download-images.command first.")
    sys.exit(1)

total = 0
converted = 0
skipped = 0
failed = 0

for page_dir in sorted(images_root.iterdir()):
    if not page_dir.is_dir():
        continue
    orig_dir = page_dir / "original"
    webp_dir = page_dir / "webp"
    if not orig_dir.is_dir():
        continue
    webp_dir.mkdir(exist_ok=True)

    for src in sorted(orig_dir.iterdir()):
        if not src.is_file():
            continue
        if src.name.startswith("."):
            continue
        total += 1
        dest = webp_dir / (src.stem + ".webp")
        if dest.exists() and dest.stat().st_size > 0:
            print(f"[skip]  {src.parent.parent.name}/{src.name}")
            skipped += 1
            continue
        try:
            with Image.open(src) as img:
                has_alpha = (img.mode in ("RGBA", "LA")) or (
                    img.mode == "P" and "transparency" in img.info
                )
                if has_alpha:
                    img.save(dest, "WEBP", lossless=True, method=6)
                    label = "lossless"
                else:
                    if img.mode != "RGB":
                        img = img.convert("RGB")
                    img.save(dest, "WEBP", quality=85, method=6)
                    label = "q85"
            print(f"[get]   {page_dir.name}/{dest.name}  ({label})")
            converted += 1
        except Exception as e:
            print(f"        FAILED on {src.name}: {e}")
            failed += 1

print("")
print("===============================")
print(f"Total source images: {total}")
print(f"Newly converted:     {converted}")
print(f"Already present:     {skipped}")
print(f"Failed:              {failed}")
print("===============================")
PYEOF

echo ""
read -r -p "Done. Press Enter to close this window..." _
