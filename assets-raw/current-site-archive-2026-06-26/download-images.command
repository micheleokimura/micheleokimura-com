#!/bin/bash
# download-images.command - downloads every image from micheleokimura.com referenced by this archive.
#
# Why this script exists: the Cowork sandbox that built this archive could not reach
# micheleokimura.com directly to fetch binary files. It captured all the page copy and
# the image URLs, but the photos themselves still need to be downloaded.
#
# How to use:
#   1. Open Finder. Navigate to this folder.
#   2. Double-click this file. (If macOS warns about an unidentified developer:
#      right-click -> Open -> Open. You only have to do that the first time.)
#   3. Terminal will open and run the downloads. When it finishes, every photo will be
#      sitting in the images/<page>/original/ subfolders.
#   4. Optional step after: if you want WebP copies, run download-images.command first,
#      then have Claude run the WebP conversion step in a follow-up session (it needs
#      cwebp or Python Pillow installed locally to do that).
#
# What it does:
#   - Reads metadata.json from the same folder.
#   - For every image URL, downloads it to the appropriate images/<page>/original/ folder.
#   - Preserves the original WordPress filename (so links match what's documented).
#   - Skips files that already exist (safe to re-run).
#   - Prints a summary at the end.

set -u

# Move to the folder this script lives in (works even when double-clicked).
cd "$(dirname "$0")"

ARCHIVE_DIR="$(pwd)"
echo "Archive folder: $ARCHIVE_DIR"
echo ""

# Sanity check.
if ! command -v curl >/dev/null 2>&1; then
  echo "ERROR: curl is not installed. macOS normally has it - if this fails, install it via brew."
  read -r -p "Press Enter to close..." _
  exit 1
fi

# All the URLs to download, keyed by destination subfolder.
# Format: SUBFOLDER<TAB>URL
read -r -d '' MANIFEST << 'IMAGES_EOF' || true
shared	https://micheleokimura.com/wp-content/uploads/2025/07/MOkimura_Logo_white-1024x595.png
shared	https://micheleokimura.com/wp-content/uploads/2025/07/MOkimura_Logo-scaled.png
home	https://micheleokimura.com/wp-content/uploads/2025/09/dream-big-books-3-1024x848.png
home	https://micheleokimura.com/wp-content/uploads/2025/08/–-Audrey-Hepburn-4000-x-1000-px-scaled.png
home	https://micheleokimura.com/wp-content/uploads/2025/09/gears.jpg
home	https://micheleokimura.com/wp-content/uploads/2025/09/family-1024x576.jpg
home	https://micheleokimura.com/wp-content/uploads/2025/09/bridge-1024x576.jpg
home	https://micheleokimura.com/wp-content/uploads/2025/09/hawaii-DOE.jpg
home	https://micheleokimura.com/wp-content/uploads/2025/08/missionary-church.png
home	https://micheleokimura.com/wp-content/uploads/2025/08/transform-our-world.png
home	https://micheleokimura.com/wp-content/uploads/2025/08/island-pacific-academy.png
home	https://micheleokimura.com/wp-content/uploads/2025/08/missio-nexus.png
home	https://micheleokimura.com/wp-content/uploads/2025/08/kupu.png
home	https://micheleokimura.com/wp-content/uploads/2025/08/nancy-vuu.png
home	https://micheleokimura.com/wp-content/uploads/2025/08/the-foursquare-church.png
home	https://micheleokimura.com/wp-content/uploads/2025/08/hawaii-pacific-academy.png
home	https://micheleokimura.com/wp-content/uploads/2025/08/hawaii-catholic-schools.png
home	https://micheleokimura.com/wp-content/uploads/2025/08/hanalani-schools.png
home	https://micheleokimura.com/wp-content/uploads/2025/08/hale-kipa.png
home	https://micheleokimura.com/wp-content/uploads/2025/08/christian-academy.png
home	https://micheleokimura.com/wp-content/uploads/2025/08/arise-native-american-family-camp.png
home	https://micheleokimura.com/wp-content/uploads/2025/06/3-1024x576.jpg
home	https://micheleokimura.com/wp-content/uploads/2025/09/2-1-1024x576.jpg
home	https://micheleokimura.com/wp-content/uploads/2025/09/1-1-1024x576.jpg
about	https://micheleokimura.com/wp-content/uploads/2025/09/1-mom-and-dad-scaled.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/2-sisters--scaled.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/3-MIss-Teen-USA-scaled.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/4-HS-Graduation-scaled.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/5-UH-graduation.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/6-wedding-scaled.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/7-Aaron-scaled.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/8-Jessica-joned--scaled.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/9-LIfespring-Church.png
about	https://micheleokimura.com/wp-content/uploads/2025/09/Renaissance-2010-and-2011-scaled.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/10-Dancing-with-Father-scaled.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/11-2014-EX-conference-.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/12-Middle-School-Conf.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/13-Philippines.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/14-Singapore.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/15-PACRIM.png
about	https://micheleokimura.com/wp-content/uploads/2025/09/16-EX-books-scaled.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/17-SoCal-scaled.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/Kingdom-Kids-Workshops.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/ReThink-Creativity-2020-and-2021-scaled.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/18-B-and-Beautiful-.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/19-award.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/20-10th-Annniversary-scaled.jpeg
about	https://micheleokimura.com/wp-content/uploads/2025/09/21-dream-books-scaled.jpeg
books	https://micheleokimura.com/wp-content/uploads/2025/09/1-2-1024x1024.jpg
books	https://micheleokimura.com/wp-content/uploads/2025/09/2-2-1024x1024.jpg
books	https://micheleokimura.com/wp-content/uploads/2025/09/3-1-1024x1024.jpg
books	https://micheleokimura.com/wp-content/uploads/2025/09/4-1024x1024.jpg
posts	https://micheleokimura.com/wp-content/uploads/2025/06/Screenshot-2025-09-10-at-10.10.03-PM-1024x1019.png
posts	https://micheleokimura.com/wp-content/uploads/2025/09/the-mantle.jpg
posts	https://micheleokimura.com/wp-content/uploads/2025/09/Screenshot-2025-09-10-at-10.08.48-PM.png
IMAGES_EOF

TOTAL=0
DOWNLOADED=0
SKIPPED=0
FAILED=0
FAILED_URLS=()

UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

while IFS=$'\t' read -r SUB URL; do
  [ -z "${SUB:-}" ] && continue
  [ -z "${URL:-}" ] && continue
  TOTAL=$((TOTAL+1))

  DEST_DIR="$ARCHIVE_DIR/images/$SUB/original"
  mkdir -p "$DEST_DIR"

  # Pull the filename portion of the URL (the last path segment, URL-decoded).
  FILENAME=$(printf '%s' "$URL" | sed 's|.*/||')
  FILENAME=$(python3 -c "import sys, urllib.parse; print(urllib.parse.unquote(sys.argv[1]))" "$FILENAME" 2>/dev/null || echo "$FILENAME")

  DEST="$DEST_DIR/$FILENAME"

  if [ -f "$DEST" ] && [ -s "$DEST" ]; then
    echo "[skip]  $SUB/$FILENAME (already present)"
    SKIPPED=$((SKIPPED+1))
    continue
  fi

  echo "[get]   $SUB/$FILENAME"
  if curl -fsSL -A "$UA" --max-time 60 "$URL" -o "$DEST"; then
    DOWNLOADED=$((DOWNLOADED+1))
  else
    echo "        FAILED: $URL"
    FAILED=$((FAILED+1))
    FAILED_URLS+=("$URL")
    # Clean up any partial file curl left behind.
    [ -f "$DEST" ] && rm -f "$DEST"
  fi
done <<< "$MANIFEST"

echo ""
echo "==============================="
echo "Total URLs:       $TOTAL"
echo "Newly downloaded: $DOWNLOADED"
echo "Already present:  $SKIPPED"
echo "Failed:           $FAILED"
echo "==============================="

if [ $FAILED -gt 0 ]; then
  echo ""
  echo "URLs that failed (copy these to Claude to retry):"
  for u in "${FAILED_URLS[@]}"; do
    echo "  $u"
  done
fi

echo ""
read -r -p "Done. Press Enter to close this window..." _
