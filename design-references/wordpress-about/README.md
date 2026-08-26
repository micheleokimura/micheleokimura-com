# WordPress About page: the photo mosaic

Crawled 2026-08-23 from `https://micheleokimura.com/about/` (still the live
Elementor 3.34 site at that date). This is the reference Michele pointed at when
she said the new About page photographs were wrong: "it's all one big mosaic
together, and when the cursor hovers over each picture, some verbiage appears."

`/about-me/` returns 403. `/about/` is the page.

## Files

| File | What it is |
| --- | --- |
| `about.html` | The page as served, unmodified |
| `post-202.css` | Elementor's generated CSS for post 202, which holds the grid and the hover overlay |
| `mosaic-tiles.json` | The 24 tiles in document order: WordPress filename, full-size URL, caption |

## The layout, measured in the browser

The mosaic sits under an `<h2>My Story</h2>` and is a single Elementor grid
container (`.elementor-element-1bc1124`) holding 24 `image-box` widgets.

```
container inner width   1140px
grid-template-columns   repeat(3, 1fr)     -> 366.66px per tile at 1280px
gap                     20px  (row and column)
tile aspect             1 / 1  (source images are 2560x2560)
mobile                  repeat(1, 1fr)
```

There is no masonry and there are no varying tile sizes. Every tile is the same
square. The 20px gutter is Elementor's container default, not an authored value.

## The hover overlay

Per-widget custom CSS, copied verbatim from `post-202.css`. The same block is
repeated for each of the 24 widget ids.

```css
.elementor-element-8d212d0 {
  position: relative;
  overflow: hidden;
}
.elementor-element-8d212d0 .elementor-image-box-content {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);   /* overlay background */
  color: #fff;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  padding: 20px;
}
.elementor-element-8d212d0:hover .elementor-image-box-content {
  opacity: 1;
}
```

Caption type runs 20px to 28px depending on breakpoint. Titles are empty on
every tile; all the verbiage is in `.elementor-image-box-description`.

Note the overlay is opacity-only, so on a touch device the caption is
unreachable. The rebuild pins captions visible below `sm` for that reason.

## Known defects in the WordPress caption copy

Carried into `AboutMosaic.tsx` as-is except where noted, so Michele can rule on
each one.

| Tile | Caption says | Issue |
| --- | --- | --- |
| 2 | "1955: Oldest of two beautiful younger sisters." | Michele was born in 1962, so 1955 cannot be right. Left verbatim. |
| 8 | "older than than Aaron" | Doubled word. Left verbatim. |
| 13 | "repeated our! high school conference" | Stray exclamation mark. Left verbatim. |
| 17 | "2018: Published  2018: Published The Birth of..." | Paste artifact, the opening clause is duplicated. This one IS corrected in the rebuild, since it is mechanical rather than authored. |
| 22 | A literal tab between "Green." and "Humbled" | Collapsed to a space. |
| 23 | "our non- profit organization" | Stray space inside the hyphenation. Left verbatim. |

Doubled spaces appear mid-sentence on tiles 3, 7, 12, 14, 15, 21, 22, and 24.
All collapsed to single spaces, since the rebuild renders captions with
`whitespace-pre-line` and would otherwise show the gaps.

"Hawaii" is set as "Hawaiʻi" in the rebuild per `DESIGN-RULES.md`. No words
changed.

## Photos that exist on WordPress but not in this repo

Four of the 24 tiles have no equivalent in `public/images/about-timeline/`:

| Tile | WordPress file | Caption |
| --- | --- | --- |
| 10 | `Renaissance-2010-and-2011-scaled.jpeg` | Renaissance Conferences in 2010 and 2011 |
| 12 | `11-2014-EX-conference-.jpeg` | 2014, first island-wide youth and parent conference |
| 19 | `Kingdom-Kids-Workshops.jpeg` | 2019, equipping events for parents, teachers, and leaders |
| 20 | `ReThink-Creativity-2020-and-2021-scaled.jpeg` | Online Creativity Conferences 2020 and 2021 |

Their URLs are in `mosaic-tiles.json`, but those URLs are dead. Hunted again on
2026-08-26 when Michele asked for the mosaic to be finished, with no result:

| Where | Outcome |
| --- | --- |
| `public/images/about-timeline/` | Not there. The migration in `df736e0` carried 20 of 24. |
| Brett's master folder, mirrored at `assets-raw/current-site-archive-2026-06-26/images/about/original/` | Not there. Source numbering skips 11, and the other three were never in it. |
| The live site | `micheleokimura.com` now serves this Next.js app, so `/wp-content/uploads/2025/09/` returns a Vercel 403. The WordPress install is no longer reachable at that host. |
| Wayback Machine | No snapshot of any of the four files. |
| Michele's Google Drive, both accounts, and Dropbox | Spotlight and `find` by filename and by keyword return nothing. Nearby folders exist (`Kingdom Kids Workshop 2024`, `old-info@rethinkcreativity.org`) but hold later years and video, not these images. |
| Canva | Searched 2026-05-22, see the note further down. Nothing identifiable. |

**Resolved the same day.** Michele sent all four herself, so the mosaic is
complete and nothing is outstanding. They live in `public/images/about/`
rather than `public/images/about-timeline/`, because they came from her rather
than from the timeline migration:

| Tile | File in the repo | Source pixels |
| --- | --- | --- |
| 10, left of the Dancing with Father book | `renaissance-2010-2011.jpeg` | 2988 square |
| 12, right of the Dancing with Father book | `explicit-movement-2014.jpeg` | 451 square |
| 19, far left of the second-to-last row | `kingdom-kids-workshops.jpeg` | 714 square |
| 20, middle of the second-to-last row | `rethink-creativity-2020-2021.jpeg` | 2998 square |

All four are perfect squares, so they need no cropping to sit in a 1:1 tile.
Two are smaller than a desktop tile wants: a tile renders 392 CSS px, so a
retina screen asks for about 784, and `explicit-movement-2014.jpeg` at 451 and
`kingdom-kids-workshops.jpeg` at 714 will soften slightly there. Worth
replacing if larger originals ever turn up. The other two are oversized and
downscale cleanly.

## Michele's own screenshots, 2026-08-23

`michele-screenshot-1-rows-1-to-3.png` and
`michele-screenshot-2-renaissance-hover.png` are the two captures Michele sent.
They are contiguous: the cropped sliver along the top of the second is the
bottom edge of row 3 (Aaron, Jessica, Lifespring), not a separate row of
dance photos.

They confirm the measurements taken off the live DOM, and settle two questions.

**Gutters are 20px, not hairlines.** Measured in screenshot 1, tiles run about
565px wide with 31px between them. That is 5.5%. The live page runs 366.66px
tiles with a 20px gap, which is also 5.5%. The gutters look thin next to a
2560px photo, but relative to the tile they are substantial, and a 2px gutter
would be a quarter the size and read as a completely different grid.

**The hover scrim is translucent.** On the Renaissance tile in screenshot 2 the
poster underneath stays readable straight through the overlay: "DISCOVER why
you were created uniquely for this time and place in history", the
"Renaissance: a Journey to Creativity" title, and "JULY 8-9, 2011" are all
legible. The scrim dims the photograph, it does not hide it. An opaque panel
is the wrong reading of this reference.

Corner radius is 0 on every tile.

## Captions: blank on 2026-08-23, wired in on 2026-08-26

The first rebuild shipped `caption: ''` on every tile except Renaissance, by
direction, while Michele considered sending fresh per-tile copy.

She then asked for the hover verbiage to be live: "when the cursor hovers over
each photo, there should be words that appear in a transparent way but pop."
So `AboutMosaic.tsx` now carries her WordPress copy for all 24 tiles, taken
from `mosaic-tiles.json`, with the mechanical defects listed above corrected
and "Hawaii" set as "Hawaiʻi". The component header lists every edit.

Two items are still open for Michele:

1. Tile 2 reads "1955", which cannot square with the 1962 birth year on tile 1.
   Shipped as she wrote it.
2. Tile 22 has been reworded to name Releasing Generations as the recipient of
   the 2023 Outstanding Advocate award. Her WordPress caption reads as though
   the award were hers personally. `src/lib/credentials.ts` records that the
   recipient is the organisation and says not to put her name alone back.

If she sends new copy it supersedes all of this.
