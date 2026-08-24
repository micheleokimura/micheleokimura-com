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

Their URLs are in `mosaic-tiles.json` if they are ever pulled across.
