# WordPress About page: the full crawl

Crawled 2026-08-25 from `https://micheleokimura.com/about/`, which on that date
is still the live Elementor 3.34 WordPress install. This is the source of record
for the `/about` rebuild on branch `about-wordpress-mirror`.

Brett's walkthrough, quoting Michele: "That's the exact copywriting that we
want. That's the exact photos that we want." Treat everything here as copy to
mirror, not copy to improve.

## Slugs

| URL | Result |
| --- | --- |
| `https://micheleokimura.com/about/` | 200. This is the page. |
| `https://micheleokimura.com/about-me/` | 404. Does not exist. |

## Files

| File | What it is |
| --- | --- |
| `about.html` | The page as served, unmodified |
| `post-202.css` | Elementor's generated CSS for post 202: the mosaic grid and the hover overlay |
| `theme-post-10.css` | The Elementor kit CSS, for type and colour reference |
| `mosaic-tiles.json` | All 24 tiles: WordPress filename, source URL, verbatim caption, HTTP status, byte count, local path |

## What is actually on the page

Three things, in this order, and nothing else:

1. An eyebrow `About Michele`, an `<h2>Welcome.</h2>`, a one-line lead, an
   Instagram icon, an `<h3>Maybe dreams give purpose a voice.</h3>`, and eight
   body paragraphs.
2. An `<h2>My Story</h2>` over the 24-tile photo mosaic.
3. The theme footer.

Plus a hero photograph above all of it. It is NOT an `<img>`: it is a
`background-image` on the hero container, so a markup-only crawl misses it
entirely. It is declared in `post-202.css`:

```
.elementor-202 .elementor-element.elementor-element-84b19fb { --min-height: 500px }
  background-image: url(".../2025/09/Untitled-1920-x-640-px-1.jpg");
  background-size: cover;
  background-position: -422px 0px;
```

Source: `https://micheleokimura.com/wp-content/uploads/2025/09/Untitled-1920-x-640-px-1.jpg`
(1920x640, HTTP 200). Local: `public/images/about/wordpress-mirror/00-hero-banner.jpg`.
The rebuild runs it as its own band under the banner at 220/300/380px rather
than 500px, per Brett: right-sized, not oversized.

There is **no** "Honors & Recognition" section and **no** "Roles & Work"
section. Apart from the hero photograph and the mosaic, the only other image on
the page is the header wordmark. Those two sections on the rebuilt page are this
site's own and have no WordPress counterpart.

## The layout, measured off the live DOM

The mosaic is a single Elementor grid container (`.elementor-element-1bc1124`)
holding 24 `image-box` widgets.

```
container inner width   1140px
grid-template-columns   repeat(3, 1fr)     -> 366.66px per tile at 1280px
gap                     20px  (row and column)
tile aspect             1 / 1
mobile                  repeat(1, 1fr)
corner radius           0
```

No masonry, no varying tile sizes. Every tile is the same square.

## The hover overlay

Per-widget custom CSS from `post-202.css`, repeated for each of the 24 widget
ids. This is the interaction the rebuild reproduces.

```css
.elementor-element-8d212d0 { position: relative; overflow: hidden; }
.elementor-element-8d212d0 .elementor-image-box-content {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center; text-align: center;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  padding: 20px;
}
.elementor-element-8d212d0:hover .elementor-image-box-content { opacity: 1; }
```

Titles are empty on every tile. All the verbiage is in
`.elementor-image-box-description`.

The overlay is opacity-only, so on a touch device the caption is unreachable.
The rebuild pins captions visible below `sm` for that reason.

## Photos

All 24 mosaic tiles plus the hero photograph pulled 2026-08-25. Every one returned HTTP 200. Nothing 404ed, nothing
was substituted. Local copies are in `public/images/about/wordpress-mirror/`,
named by mosaic position so the order is readable on disk.

Every source image is square. Sixteen were 2560x2560 and were downscaled to
1600px on the long edge, which is still better than 4x the largest size the
tile is ever displayed at. The photographs themselves are untouched.

Two tiles are low resolution AT SOURCE, and will look soft at any size. These
are the largest files WordPress holds for them, so this is not a crawl defect:

| Tile | File | Source size |
| --- | --- | --- |
| 5 | `5-UH-graduation.jpeg` | 225x225 |
| 16 | `15-PACRIM.png` | 225x225 |

Re-uploading those two at full resolution is the only way to fix them.

## Known defects in Michele's caption copy

PRESERVED VERBATIM in the rebuild, deliberately. Michele rules on each one;
they are not for anyone else to quietly correct.

| Tile | Caption says | Issue |
| --- | --- | --- |
| 2 | "1955: Oldest of two beautiful younger sisters." | Michele was born in 1962, so 1955 cannot be right |
| 8 | "older than than Aaron" | Doubled word |
| 13 | "repeated our! high school conference" | Stray exclamation mark |
| 17 | "2018: Published  2018: Published The Birth of..." | Opening clause duplicated |
| 23 | "our non- profit organization" | Stray space inside the hyphenation |

Doubled spaces appear mid-sentence on tiles 2, 3, 7, 8, 11, 15, 16, 17, 21, 22
and 24. They are left in the source strings and collapse at render, because
`white-space: pre-line` keeps newlines and collapses runs of spaces. Tile 1
needs its newline, which is why that rule is used.

## Edits made to WordPress copy, and nothing beyond these

1. **Em dashes removed.** Two, both in the body prose, none in the captions:
   in body paragraph 1 ("ignited a fire in me") and body paragraph 7
   ("every person's story"). Both replaced with commas per the house rule.
2. **"Hawaii" -> "Hawaiʻi"** with the ʻokina (U+02BB, not U+2018). Twice in
   body paragraph 2, once in caption 1, twice in caption 22.
3. **A literal tab** inside caption 22, between "Green." and "Humbled",
   collapsed to a space. It cannot render.

## Wording that contradicts the rest of the repo

Kept verbatim, flagged for Michele, NOT reconciled:

| WordPress says | The repo says |
| --- | --- |
| "chairman of Releasing Generations" | Founder and Executive Director (`CLAUDE.md`, the bios) |
| "Michele Okimura Consulting", established 2017 | Michele Okimura LLC (`CLAUDE.md`) |
| "For 15 years, I was an elementary school teacher" | 17 years (`src/lib/credentials.ts`), roughly fourteen (`CLAUDE.md`) |

The teaching-years conflict is the sharp one: 15 and 17 now both appear on the
rebuilt `/about`, a few screens apart.

## Not carried across

- The Instagram icon in the WordPress hero. The rebuilt site puts social links
  in the footer. Say the word if it should sit in the hero too.
- WordPress centres the hero eyebrow, "Welcome.", and the lead. The rebuild
  left-justifies them to the wordmark, per Brett's explicit instruction.

## Michele's own screenshots, 2026-08-23

`michele-screenshot-1-rows-1-to-3.png` and
`michele-screenshot-2-renaissance-hover.png` are the two captures Michele sent.
They are contiguous: the cropped sliver along the top of the second is the
bottom edge of row 3 (Aaron, Jessica, Lifespring), not a separate row of dance
photos. They confirm the measurements taken off the live DOM and settle two
questions.

**Gutters are 20px, not hairlines.** Measured in screenshot 1, tiles run about
565px wide with 31px between them, which is 5.5%. The live page runs 366.66px
tiles with a 20px gap, also 5.5%. The gutters look thin next to a 2560px photo,
but relative to the tile they are substantial.

**The hover scrim is translucent.** On the Renaissance tile in screenshot 2 the
poster underneath stays readable straight through the overlay: the
"Renaissance: a Journey to Creativity" title and "JULY 8-9, 2011" are both
legible. The scrim dims the photograph, it does not hide it. An opaque panel is
the wrong reading of this reference.

This directory replaces the earlier `design-references/wordpress-about/`, whose
crawl was partial and whose README described a state where 23 of the 24
captions were deliberately blank. That state is over; every tile now carries
its verbatim caption. The old directory is in git history.
