# Website Archive - micheleokimura.com

**Crawl date:** May 22, 2026
**Source:** https://micheleokimura.com/ (live site, verified accessible)
**Purpose:** Preserve all current page copy, image references, and structure ahead of the website rebuild.

---

## Status at a glance

| Part | Status |
|---|---|
| Page copy (8 pages) | Captured verbatim into `pages/*.md` |
| Image manifest (56 unique URLs) | Captured into `metadata.json` |
| About-page photo captions | Mapped image-by-image in `pages/about-page-photos.md` |
| Image downloads (binary files) | NOT yet downloaded - run `download-images.command` on Michele's Mac (see below) |
| WebP copies | NOT yet generated - run `convert-to-webp.command` after the images come down |
| Raw HTML (true `<html>` source) | NOT captured - see `raw-html/README.md` for why |

The page copy is complete. The images need one double-click step on Michele's computer because the sandbox that built this archive couldn't reach micheleokimura.com directly to pull binary files. Two scripts in this folder handle that step.

---

## What's in this folder

```
Website-Archive-2026-05-16/
|
|-- README.md                       <- this file
|-- metadata.json                   <- canonical list of pages and image URLs
|-- download-images.command         <- double-click on Mac to download all 56 images
|-- convert-to-webp.command         <- double-click after downloads to make WebP copies
|
|-- pages/
|   |-- home.md                     <- the home page, captured verbatim
|   |-- about.md                    <- the about page, captured verbatim
|   |-- about-page-photos.md        <- image-to-caption mapping for the timeline photos (priority)
|   |-- books.md                    <- the books page, captured verbatim
|   |-- blog.md                     <- the blog index, captured verbatim
|   |-- contact.md                  <- the contact page, captured verbatim
|   `-- posts/
|       |-- the-great-dance.md      <- blog post, June 18 2025
|       |-- the-mantle.md           <- blog post, May 2 2025
|       `-- dreaming-big.md         <- blog post, April 11 2025
|
|-- images/
|   |-- shared/      original/ webp/   <- 4 Michele logos at root, 14 partner-org logos under organizations/
|   |-- home/        original/ webp/   <- hero + section + client-logo images
|   |-- about/       original/ webp/   <- 20 photos from Michele's life timeline (v2 migration)
|   |-- books/       original/ webp/   <- book cover graphics, one subfolder per book
|   |-- blog/        original/ webp/   <- (empty - blog index uses post images from posts/)
|   |-- contact/     original/ webp/   <- Audrey Hepburn quote banner
|   |-- posts/       original/ webp/   <- featured images for the three blog posts
|   |-- photos/      original/ webp/   <- general photos. "possible-*" subfolders are CANDIDATES (see below)
|   `-- links/                          <- (empty in source as of 2026-05-22)
|
`-- raw-html/
    `-- README.md                   <- note explaining why no true raw HTML was captured
```

The `original/` folders will be empty until `download-images.command` runs. The `webp/` folders will be empty until `convert-to-webp.command` runs.

---

## How to finish the archive (two double-clicks)

Both scripts live in this folder. They are macOS `.command` files - just double-click them in Finder.

### Step 1: download the images

1. In Finder, navigate to this folder (`Website-Archive-2026-05-16`).
2. Double-click `download-images.command`.
3. Terminal will open and start fetching photos from micheleokimura.com. Expect a couple of minutes for 56 files.
4. When it finishes, every `images/<page>/original/` subfolder will have its photos.

If macOS warns "cannot be opened because it is from an unidentified developer," right-click the file -> Open -> Open. You only have to do that the first time.

### Step 2: generate WebP copies

1. Double-click `convert-to-webp.command`.
2. It uses Python (already on macOS) and installs the Pillow image library if needed (per-user, no admin password required).
3. Each photo gets a WebP copy in `images/<page>/webp/`. PNGs with transparency become lossless WebP. Everything else becomes quality-85 WebP.

You can skip this step if you only need the originals for the rebuild.

---

## How to share this folder with Brett

Google Drive sharing is a manual step (Cowork cannot change Drive permissions for you).

1. Open https://drive.google.com/ in a browser.
2. Navigate to `Claude-Workspace/Website-Archive-2026-05-16/`.
3. Right-click the folder.
4. Click "Share" -> "Share."
5. Type `brett@brettkmoore.com`.
6. Set the role to "Editor" (so he can add notes) or "Commenter" (read + comment only).
7. Click "Send."

---

## Flags for the rebuild (worth raising with the developer)

A few things noticed during the crawl that are worth fixing on the new site:

1. **Default WordPress tagline still in `<title>`.** Every page tag reads "Michele Okimura - Come up with a tagline for your business here." The default tagline was never customized. The rebuild should set a real tagline (or remove the trailing "Come up with..." text from the site title pattern).

2. **About-page typos.** See `pages/about-page-photos.md` for details, but in short:
   - The "1955" caption with the "sisters" photo is most likely a typo - Michele was born in 1962.
   - The "2018: Published" prefix is duplicated on the EX Books caption: "2018: Published 2018: Published The Birth of Explicit Movement..."

3. **Default WordPress placeholder comment.** The Great Dance post shows the default "Hi, this is a comment" placeholder from "A WordPress Commenter." Should be removed.

4. **Hover-text vs always-visible captions on About page.** The crawl couldn't tell which Elementor widget Michele used (image-box vs overlay). If the captions on the live site only appear on hover, the rebuild needs to preserve that interaction. To check: open the About page in a browser; if you can see the captions under each photo without moving your mouse, they're always-visible. If you have to hover to see them, they're hover-reveal. See `pages/about-page-photos.md` note.

5. **Publishing nav link is external.** Top nav has "Publishing" pointing to `https://dreambigpublish.com/`, which is a separate Squarespace site. Confirm whether that link stays in the rebuild and whether the Publishing brand should look connected to micheleokimura.com or stay distinct.

---

## Assets migrated from Brett's master Drive folder (2026-05-22, v2 + v3)

In addition to the live-site crawl above, two follow-up passes pulled image assets from `brett@podcastnetwork.org`'s `michele okimura / website /` folder (shared with Michele):

- **v2 pass (about page priority):** 20 numbered timeline photos -> `images/about/original/`. See the activity log entry for details.
- **v3 pass (remaining subfolders):** logos, book cover graphics, and general photos. Counts and structure below.

### What's in `images/shared/`

4 Michele branded logos at `shared/original/` (regular + icon-only, black + white). Under `shared/original/organizations/`: 14 logos for partner schools and ministries (ARISE Camp, Christian Academy, Foursquare, HBA, Hale Kipa, Hanalani, Hawaii Catholic Schools, Ho'okupu Center, Island Pacific Academy, Kamehameha Schools, MissioNexus, Missionary Church, Nancy Vuu, Transform Our World). These came from a separate source folder ("LOGOS of Organizations Michele Helped") and are useful for any partner-grid / credibility section on the rebuild.

### What's in `images/books/`

Book cover and promotional graphics, organized one subfolder per book:

- `dancing-with-father/` - 2 cover JPGs
- `kingdom-kids/` - 1 curriculum cover PNG
- `birth-of-explicit-movement/` - 3 cover / thumbnail JPGs
- `dream-big-journals/` - 3 mockup JPGs (Youth/Adults, Younger Elementary, Older Elementary editions)

### What's in `images/photos/`

General photo library. **Most subfolders here are CANDIDATES, not final picks.** They came from exploratory selections Michele and the team made for various website sections. Treat them as a shortlist to choose from, not as approved.

- `possible-flourish-and-thrive/` - 3 candidates (sprout, healing waters, sunrise)
- `possible-creative-sessions/` - 3 candidates (child painting, kids with kite, woman painting)
- `possible-dreaming-big/` - 4 candidates (dandelions, butterflies, woman looking to stars)
- `possible-events/` - 9 photos tagged with event dates (DOE counselors, NASSP, KAM, Hanalani, dream expo, etc.) - some are real event photos, some are shutterstock placeholders
- `thumbnail-books/` - candidate cover-art alternates for each book (dancing-with-father, dream-book, kingdom-kids, ex-birth-book)
- `new-folder/` - 11 assorted JPGs from Brett's folder labeled "New Folder" plus 1 top-level `1.jpg` at the root of `photos/`. Mostly numbered files (1.jpg through 11.jpg); some have promotional-text overlay. Unclear curation status.

A larger sub-subfolder named "photos by nancy April 2025" (100+ raw photoshoot JPGs, 2-10 MB each) was found inside `new-folder/` in the source but **was not migrated** - it's a raw photoshoot dump, not curated for web use. Note this if a Michele headshot pass is needed later; the raw set lives in Brett's master folder under `photos/New Folder/photos by nancy April 2025/`.

### Non-image files found in source

Some source subfolders included PDFs, a ZIP, and a `.pub` file. None were copied (they're not image assets). See `_non-image-files.md` in this folder for the full list with source IDs.

---

## Provenance notes

- Page copy was pulled via `web_fetch` against the live URLs on 2026-05-22 (today).
- Image binary files could not be downloaded from the sandbox - the outbound proxy returned `blocked-by-allowlist` for every external HTTP request, the SOCKS5 proxy refused the connection, and the WordPress REST API URL was not in this session's provenance set. The image URLs themselves are recorded in `metadata.json` and pulled down by `download-images.command` on Michele's Mac.
- Verbatim text is preserved exactly as it appears on the live site (per the workspace-wide rule). Section structure was reorganized into markdown for readability; no copy was paraphrased.
