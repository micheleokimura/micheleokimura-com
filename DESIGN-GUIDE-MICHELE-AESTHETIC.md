# Michele's Design Aesthetic - North-Star Style Guide

Derived from seven print-ready PDFs Michele art-directed, 315 spreads in all. This is the
complete style-guide reference set. Nothing else is needed.

Page renders live in `design-references/pages-web/`. Extracted photography lives in
`public/images/lifestyle/`. Cover and section-opener art lives in `public/images/banner-art/`.

## The corpus

**Brave & Beautiful family** (4 books, broad graphic vocabulary)

| File | Sheets | Slug |
|---|---|---|
| `23BraveBeautiful_Journey_Sec_Vol_01_v5.pdf` | 45 | `bb-journey-vol1` |
| `23BraveBeautiful_Book_Vol_02_Sec_v5.pdf` | 39 | `bb-vol2` |
| `23BraveBeautiful_Book_Vol_03_Sec_v5.pdf` | 39 | `bb-vol3` |
| `23BraveBeautiful_Book_Vol_04_Sec_v5.pdf` | 36 | `bb-vol4` |

**Brave Together family** (3 books, tropical lean, long-form editorial)

| File | Sheets | Slug |
|---|---|---|
| `26BTHawaii_Volume_4_Classic_v4_1_1.pdf` | 13 | `bt-hawaii-vol4` |
| `25BT_Volume_2_Classic_v2.pdf` | 53 | `bt-vol2-classic` |
| `25BT_Volume_3_Faith_v8.pdf` | 90 | `bt-vol3-faith` |

Interiors are two-up spreads at 5100x3300 (300 DPI), except `bt-vol3-faith`, which is
single pages throughout. Covers are single 2550x3300 pages.

---

## 1. Two families, one designer

Michele works in two distinct registers, and the difference is not decoration. It is
structural.

**Brave Together is subtractive.** Black or white ground, one photograph carrying the
whole emotional load, editorial type discipline, almost no ornament. The kapa band is
practically the only graphic element in the book. It reads like a well-made magazine.

**Brave & Beautiful is additive.** Blush ground, navy ink, dense botanical illustration,
circular photo masks, polaroid stickers, confetti dots, dotted paths, flat vector people,
hand-lettering, line-art motifs. It reads like a beautifully made workbook that wants to
be written in.

Both are hers. The site should use both, and the choice per page should follow the job
that page is doing: **Brave Together for arrival and authority, Brave & Beautiful for
invitation and participation.**

### Where they overlap

Three accent colours are shared almost exactly across both families, which is what makes
a single site palette possible:

- Coral `#F15C3D` (identical in both)
- Gold `#E9AE3F` / `#F0B44B` (a hair warmer in Brave & Beautiful)
- Teal `#00B09F` / `#00AC9B` (the Brave Series signature; appears on the Journey cover)

Both families also share: a heavy neo-grotesque display sans for headlines, a
high-contrast serif for long-form reading, coral-tab section markers, hard-edged
photography with no rounded corners or drop shadows, and generous white space.

### Where they diverge

| | Brave Together | Brave & Beautiful |
|---|---|---|
| Ground | True black `#000000` / pure white | Blush `#FDEAE7` |
| Ink | Black | Navy `#1F2744` |
| Ornament | Kapa band only | Botanical pattern, dots, line art, stickers |
| Photo shape | Full bleed or hard rectangle | Also circles, polaroids, arch masks |
| Illustration | Rare (the tree-on-soil motif) | Constant, flat vector, a co-equal voice |
| Voice | Grown-up, editorial, unhurried | Warm, participatory, energetic |
| Reader posture | Reading | Reading and writing |

---

## 2. Locked palette

> **IMPLEMENTATION LOCKED. See `DESIGN-RULES.md` for canonical tokens.**
>
> As of August 2026 this palette won. Brett and Michele adopted the shared
> core below (coral `#F15C3D`, gold `#E9AE3F`, teal `#00B09F`) plus Brave &
> Beautiful's navy `#1F2744` as the sitewide palette, and `DESIGN-RULES.md`
> has been rewritten around it. The site no longer runs the old teal
> `#0F766E` plus terracotta `#D4735A` scheme.
>
> The hexes in this section remain as the SOURCE palette: what Michele's
> printed books actually measure. They are the reference, and they should not
> be edited to match the site.
>
> The implementation uses adjusted values in two places, both for contrast
> and both documented in `DESIGN-RULES.md`:
>
> - **Ground and dark surfaces.** The site grounds on warm cream `#F2ECDF`
>   rather than the books' true black or blush, and its dark surfaces are
>   navy `#1F2744` rather than black.
> - **Text colours.** Coral, gold, and teal are display colours and cannot
>   carry small text on a light ground. Each has a measured stand-in in the
>   token file. Gold carries no text at all.
>
> When this file and `DESIGN-RULES.md` disagree about a value that ships,
> `DESIGN-RULES.md` wins. Read section 2.5 below for the full mapping.

### Shared core

| Token | Hex | Use |
|---|---|---|
| `coral` | `#F15C3D` | The primary accent in both families. Section tabs, subheads, callouts. |
| `gold` | `#E9AE3F` | Second accent. Bars, badges, ornament. |
| `teal` | `#00B09F` | Brave Series signature. Sparing. |

### Brave Together

| Token | Hex | Source |
|---|---|---|
| `ink` | `#000000` | Cover field, section grounds |
| `paper` | `#FFFFFF` | Text pages |
| `deep-sea` | `#233D38` | Nā Pali cliffs in shadow |
| `sea-green` | `#4F6E68` | Nā Pali mid-tones |
| `valley` | `#6E8055` | Waterfall valley greenery |
| `black-sand` | `#2D2C32` | Volcanic shore |
| `shell` | `#E8E0CC` | Sea foam and warm sand |

### Brave & Beautiful

| Token | Hex | Source |
|---|---|---|
| `blush` | `#FDEAE7` | The ground on all four covers |
| `navy` | `#1F2744` | Botanical line work, body ink |
| `rose` | `#F8B6C3` | Vol 2 cover florals |
| `sun` | `#F8CD4F` | Vol 2 cover florals |
| `terracotta` | `#E47249` | Vol 3 geometric shape spreads |
| `dusty-rose` | `#E99794` | Vol 3 geometric shape spreads |
| `forest` | `#3F503D` | Vol 3 geometric shape spreads |
| `brave-blue` | `#0B5DA9` | Journey cover, Brave Series collateral |

### Rules of use

- Pick one family per page and stay inside it. Mixing black ground with blush ground on
  one screen breaks both.
- Ground and ink do the structural work. Accents appear in small doses: a rule, a tab, one
  word in a headline, an oversized quotation mark.
- Never run two accents at full strength in the same block. The books pick one per spread.
- The photography supplies every other colour. Do not tint or overlay it. The one exception
  is Brave & Beautiful Vol 4, which duotones photographs in coral for its heaviest chapter.
  That is a deliberate signal for difficult subject matter, and it should stay rare.


### 2.5 Relationship to DESIGN-RULES.md

Settled, August 2026. The two files no longer hold competing palettes.

- **This file holds the SOURCE palette.** Sampled off Michele's printed books.
  Its job is fidelity, and it is the reference for anyone designing new print or
  banner art.
- **`DESIGN-RULES.md` holds the IMPLEMENTATION palette.** Its job is contrast. It
  now derives from this file rather than from a separate scheme.

Use the print values for large fields, photographic areas, banner art, and ornament,
where contrast ratios do not apply. Use the `DESIGN-RULES.md` tokens for anything a
person has to read or click. On any text colour, `DESIGN-RULES.md` wins.

**Source to implementation mapping:**

| Source (this file) | Implementation | Why it changed |
|---|---|---|
| `coral` `#F15C3D` | unchanged, as `--color-coral` | Ships as-is for CTA fills |
| `gold` `#E9AE3F` | unchanged, as `--color-gold` | Ornament only, so no ratio applies |
| `teal` `#00B09F` | unchanged, as `--color-teal` | Ships as-is for glows and marks |
| `navy` `#1F2744` | unchanged, as `--color-navy` | Body text and dark surfaces |
| `paper` `#FFFFFF` / `blush` `#FDEAE7` / `ink` `#000000` | warm cream `#F2ECDF` ground, navy dark surfaces | See the note below |
| coral as text | `#B8431F` (`--color-coral-text`) | `#F15C3D` is 2.81:1 on cream |
| teal as text on cream | `#0F766E` (`--color-teal-text`) | `#00B09F` is 2.31:1, missing even the 3:1 large-text floor |
| teal as text on navy | `#9FE8DF` (`--color-teal-on-dark`) | Holds 6.84:1 at the lit centre of the banner glow |
| text on a coral fill | `#1B2239` (`--color-coral-ink`) | Cream on coral is 2.81:1; coral is a light colour |
| gold as text | none, deliberately | Gold on cream is 1.68:1. Gold never spells a word |

**The one remaining divergence, now a made decision rather than drift:** the books
ground on true black or blush, and the site grounds on warm cream `#F2ECDF` with navy
`#1F2744` dark surfaces. Cream appears nowhere in the seven books. It was kept because
it is the ground the site was built on, it flatters the coral, and it reads
masculine-neutral in a way blush does not. Navy replaces black for the same reason navy
was already in Brave & Beautiful: it carries cream text at 12.46:1 and reads warmer than
a true black panel.

---

## 3. Typography

Both families run the same four-voice system with different emphasis.

### 3.1 Display sans (the spine)

Wide, heavy neo-grotesque. Flat apex on the A, straight angled leg on the R, tight
letterspacing at large sizes. Used for `BRAVE`, all article headlines, and reverse type
over photographs. Identical across both families.

- **Likely original:** Helvetica Now Display Bold/Black, or Neue Haas Grotesk Display.
- **Web substitutes:** `Archivo` / `Archivo Expanded` (closest proportions), `Inter Tight`
  Bold, `Anton` for poster weight only.
- **Behaviour:** ALL CAPS or sentence case, never title case. Tracking tightens as size
  grows. Headlines break across two or three short lines, hard against the left margin.

### 3.2 Body serif (the reading voice)

High-contrast transitional serif with ball terminals and a high x-height. Carries every
long-form article and every pull quote in both families.

- **Likely original:** Freight Text Pro, or Chronicle Text.
- **Web substitutes:** `Source Serif 4`, `Newsreader`, `Spectral`, `Crimson Pro`.
- **Behaviour:** justified in narrow editorial columns, first-line indents rather than
  paragraph spacing, italic for emphasis inside running text.

### 3.3 Display serif (Brave & Beautiful only)

The `Brave & Beautiful.` wordmark is a high-contrast Didone with fine hairlines and a
crisp ball terminal on the ampersand. This is the single most elegant thing in the corpus
and the strongest candidate for a site wordmark treatment.

- **Likely original:** Playfair Display, Prata, or Canela.
- **Web substitutes:** `Playfair Display`, `Prata`, `Bodoni Moda`.
- **Behaviour:** sentence case with a full stop. Always ends in a period. Set large, set
  once, never for body copy.

Related: the `She Arises.` / `She Blooms.` section openers use the same serif at display
size, sometimes in a red script-serif variant (`blooming in your season.`) that reads as
a warmer cousin. `Playfair Display` italic covers that.

### 3.4 Blackletter (Brave Together only)

Textura blackletter for chapter openers and moments of weight: "Hawai'i Journey", "Become
a Freedom Fighter", "Values to Live By". Reads as Hawai'i street and tattoo culture rather
than medieval pastiche. Easily botched.

- **Web substitutes:** `Grenze Gotisch`, `Pirata One`, `UnifrakturCook`.
- **Behaviour:** one line, one moment per spread. Never for body copy or navigation.

### 3.5 Script and hand (both families)

Brave Together uses a heavy retro brush script once per surface, for the word "Hawai'i" on
the cover. Brave & Beautiful uses an all-caps marker hand constantly, for margin notes,
activity prompts, and pull quotes over photographs ("LOVE EVERYONE, BUT DON'T GIVE YOUR
HEART TO JUST ANYONE"), plus a looser lowercase script for section labels
("your creative flow", "letting go:").

- **Brush script substitutes:** `Yellowtail`, `Kaushan Script`, `Streetwear`.
- **Marker hand substitutes:** `Caveat`, `Permanent Marker`, `Architects Daughter`.
- **Behaviour:** the marker hand is the reader's voice, so it belongs on prompts and
  asides. Never use it for anything the site itself is asserting.

---

## 4. Graphic design elements

This is the vocabulary Brett asked to be catalogued. Almost all of it is Brave & Beautiful.

**Botanical pattern band.** Dense flat-vector florals and leaves in a repeating band,
navy line work over blush, with coral, gold, and sage fills. It frames every cover and
every section opener. This is the single most reusable element in the corpus: it works as
a page header, a footer, a divider, or a full banner ground.

**Kapa band.** Brave Together's counterpart. A repeating Polynesian triangle and chevron
motif used as a horizontal rule at the top or bottom of a page. It is a rule, never a
background.

**Circular photo mask.** Photographs cropped to perfect circles and dropped into text
columns. Used constantly in Brave & Beautiful. Reads warm and editorial.

**Polaroid sticker.** Photographs with a thick white border, slightly rotated, sometimes
overlapping each other, occasionally with a drawn pushpin or tape. Used for the informal,
scrapbook register.

**Bleeding accent tab.** A small solid coral or gold rectangle bleeding off the left edge
beside an article headline. Present in both families. Cheap, effective, and the easiest
thing to carry to the web as a section marker.

**Confetti dots and sparkles.** Small navy or gold four-point stars and filled circles
scattered near headlines. Sparing, always in threes or fives.

**Dotted path.** A dotted or beaded line running horizontally across a spread, sometimes
with small circular nodes, used as a soft divider or as a timeline.

**Flat vector people.** Simplified figures with no facial detail, in the blush and navy
palette, illustrating activities. They carry the workbook prompts.

**Line-art motifs.** Single-weight outline drawings at large scale, half off the page:
a lightbulb, a hot air balloon, a birdcage, a tree with visible roots. Usually gold or
navy, always behind or beside the text rather than under it.

**Geometric shape composition.** Vol 3 pages 42-43 build a whole spread from overlapping
circles, half-rounds, and rectangles in terracotta, dusty rose, and forest green, with
type set inside the shapes. This is the boldest layout in the corpus and would make a
striking interactive section on the web.

**Cloud and blob shapes.** Soft organic white shapes overlaying photographs to carry text,
instead of dimming the photo.

**Journal furniture.** Dotted rules for handwriting, tan and cream boxes for prompts,
checkbox lists, and date blanks. Only relevant if the site ever ships a worksheet.

**The tree on soil.** A white or navy line-drawn tree with exposed roots against a dark
soil photograph. Appears in both Brave Together Hawai'i and Vol 2 Classic. The closest
thing to a house illustration.

---

## 5. Photo treatment

The photography is **naturalistic and ungraded** in both families. No unified filter, no
warm LUT, no fade. Each photograph keeps its own temperature, and the tension between
temperatures is the point.

Two families run side by side:

- **Cool and moody.** Nā Pali cliffs under overcast light, the waterfall valley, black
  volcanic sand, an ocean swell at dusk, a lake dock at last light. Desaturated greens and
  teals, soft contrast, weather in the frame.
- **Hot and saturated.** The turquoise wave barrel, palms against a blown-out sun, red
  ʻōhiʻa lehua on grey lava, a fence of painted surfboards, a wall of pink roses. Full
  saturation, hard light.

Human moments are shot at golden hour or in open shade, close in, faces filling the frame.
Brave & Beautiful leans harder on hands than on faces: hands clasped, hands reaching,
hands planting, hands stacked.

### The signature POV pair

Both families repeatedly use two camera positions, and this is the most distinctive thing
about Michele's photo editing:

1. **Looking straight up** (palms into the sun, a canopy, a lightbulb).
2. **Looking straight down at your own feet** (slippers in wet grass, bare feet on black
   sand, boots among autumn leaves, feet in a stream, feet among scattered paper).

Sky above you, ground under you. It puts the reader inside the frame instead of in front
of it. Six of the extracted assets are this pair, five of them in `lifestyle/details/`.

### Rules

- No overlays, no gradient scrims, no duotone on real photographs. The Vol 4 coral duotone
  is the deliberate exception, reserved for the hardest subject matter.
- When type must sit on a photo, find a genuinely quiet region and put it there, or float
  it on a white cloud shape. The books never dim a photo to make text work.
- Photos either bleed fully off the page edge, sit as a hard-edged rectangle with clear
  margin, or take a circular or polaroid mask. No rounded corners, no drop shadows.
- Botanical macro against hard texture is a recurring pairing: soft flower, hard lava.

---

## 6. Interior page banner heroes - cover art mapping

Home page keeps the video hero. These are for interior pages. All assets are 1920px wide,
quality 88, in `public/images/banner-art/`.

- **/author → `brave-beautiful-journey-vol1-cover.jpg`** because the `Brave & Beautiful.`
  Didone wordmark is the most book-like, most authored thing in the corpus, and the Journey
  cover is the richest of the four colourways (it carries both the brave-blue and the teal).
  It says "this person makes books" before a word is read.

- **/speak → `opener-she-arises.jpg`** because the section openers are built as wide bands
  with a single large word, which is exactly a banner's geometry, and "arises" carries the
  platform energy without shouting. Runner-up: `opener-she-celebrates.jpg` for a warmer,
  more event-flavoured read.

- **/coaching → `journey-map-wayfinding.jpg`** because the wayfinding map spread literally
  depicts a guided route from one place to another, which is the Brave Purpose Author Method
  in one image. Runner-up: `opener-she-creates.jpg` if the map reads too busy at banner crop.

- **/about → `brave-together-hawaii-vol4-cover.jpg`** because the black ground, the kapa
  band, and the teal "Hawai'i" script place her geographically and personally in one frame.
  This is the page where the tropical family should win.

- **/projects → `opener-she-releases-stands-cries.jpg`** because it carries three words in
  the botanical band, which signals range and multiplicity, and the projects index is about
  breadth. Runner-up: `brave-beautiful-vol2-cover.jpg`.

- **Case study pages → match the subject.** A Brave & Beautiful case study takes its own
  cover (`brave-beautiful-vol2/3/4-cover.jpg`). A Brave Together case study takes
  `brave-together-vol2-classic-cover.jpg` or `brave-together-vol3-faith-cover.jpg`. A
  Hawai'i or place-based study takes `brave-together-hawaii-vol4-cover.jpg`. For the two
  2027 Brave Purpose books, which have no cover yet, use `opener-she-dreams.jpg`.

Remaining openers held in reserve: `opener-she-loves`, `opener-she-gives`,
`opener-she-protects`, `opener-she-blooms`, `opener-she-perseveres`,
`opener-she-discovers`, `opener-brave-and-beautiful-wordmark`, `opener-listen-coral`.

Note on crop: the openers are full two-up spreads at roughly 1.55:1. At a 280-320px banner
height they will need a focal crop rather than a squash. The big word sits centre-left on
most of them, so crop from the right.

---

## 7. Applying it to the site

### Which family drives which surface

| Surface | Family | Why |
|---|---|---|
| Home hero | Brave Together | Full-bleed tropical photography, black ground, arrival and authority |
| /about | Brave Together | Place and person |
| /author | Brave & Beautiful | Editorial, book-like, the Didone wordmark |
| /speak | Brave & Beautiful | Section-opener banners, warmth, energy |
| /coaching | Brave & Beautiful | Participatory, workbook register, the journey map |
| /projects index | Brave & Beautiful | Breadth, pattern, colour range |
| Case studies | Match the book | The case study is the book |
| Long-form articles and blog | Brave Together | Editorial column discipline, serif body |

### Hero style (Brave Together)

Full-bleed photograph, no scrim, no overlay. Prefer `tropical/waterfall-valley-green-ridges.jpg`
or `tropical/palms-looking-up-sunburst.jpg` at full viewport width. Headline in the display
sans, white, anchored bottom-left with a generous margin, broken across two or three short
lines, tracking tight. One line of body sans beneath at roughly a quarter the headline size.
A kapa band as a hairline rule directly under the hero, full width, black on white. No
buttons floating over the photograph; the call to action sits in the white band below.

### Banner hero style (Brave & Beautiful)

280-320px tall, cover or opener art as the ground, botanical band bleeding to both edges,
page title in the display sans reversed out or in navy depending on the artwork's value at
that point. No pills, matching the existing `BannerHero` component convention.

### Content section style

White or blush ground depending on family. Section marked by a coral or gold tab bleeding
off the left edge, with the section label in small-caps display sans beside it. Body copy
in the serif at 62 to 70 characters, first-line indents. Photographs break the column as
half-width hard-edged rectangles with real white space beside them.

For Brave & Beautiful surfaces, add: circular photo masks in text columns, a dotted-path
divider between major sections, and confetti dots near headlines in threes.

Pull quotes get their own full-width block: centred serif, oversized coral quotation mark,
final phrase in accent-coloured italic.

### What to carry over, and what to leave in print

**Carry over:** black as a real surface colour, the kapa band and the botanical band as
dividers, the bleeding accent tab, circular photo masks, the half-and-half photo-and-whitespace
spread, the display-sans-plus-serif pairing, the Didone wordmark, ungraded photography, the
up-and-down POV pair, line-art motifs at large scale.

**Leave in print:** justified multi-column text, type on a curved path, blackletter for
anything a user has to click, the marker hand for anything longer than a phrase, journal
furniture (dotted writing rules, checkboxes), and the polaroid rotation, which reads as
dated on screen.

### Voice check

The Brave Series one-pager opens with "Unlock Purpose", and Brave & Beautiful Vol 3 uses
"leverage" in running text. Both are on the banned list in `CLAUDE.md`. The design system
in these PDFs is sound and worth following closely; the print copy is not a copy reference.
Take layout, colour, and type from these books, and take words from
`content/brand/voice-guide.md`.

---

## 8. Asset inventory

**48 photographs**, each 1600px on the long side (quality 85) plus an 800px mobile variant
(quality 82), under `public/images/lifestyle/`.

| Folder | Count | Contents |
|---|---|---|
| `tropical/` | 15 | Hawai'i, ocean, sky, palms, beach, and wider natural landscape |
| `details/` | 11 | Hands, feet, still-life vignettes, the POV-down shots |
| `people/` | 9 | Warm human moments, hands, portraits |
| `botanical/` | 6 | Plants, flowers, close-up growth |
| `textures/` | 7 | Abstract, painted, atmospheric, background |

Note on `tropical/`: it is the natural-landscape bucket, so it holds ocean, sky, palms, and
beach as specified, plus non-Hawai'i landscape (a lake dock, a ridge hike) that had nowhere
better to live and reads the same way in a hero slot.

**21 banner-art assets**, 1920px wide at quality 88, under `public/images/banner-art/`:
7 book covers and 14 section-opener or illustrated spreads.

Every crop was inspected on a contact sheet and re-cut where a headline, caption, folio, or
page furniture intruded. Several went through three passes. All 48 are clean photography
with no type in frame. Seven candidates were cut rather than shipped with type in them.

### Provenance and rights

The Brave Together Vol 4 colophon credits photography to Unsplash and Shutterstock, with
art direction and graphic design by Sakura Reese. The Brave & Beautiful books credit
individual photographers in captions (for example "Peaceful Ocean by Asia Brynne Anderson")
and at least one painting to Francis Oda.

**Confirm licensing before any of these ship to production.** Three specific flags:

1. Shutterstock standard licences often exclude web use at scale. Check the actual licence.
2. Named contributor work (Asia Brynne Anderson's photograph, Francis Oda's painting) is
   credited in print and needs either the same credit on the web or explicit permission.
3. These images show identifiable faces and want a release check:
   `people/youth-circle-maile-lei`, `people/portrait-quiet-strength-bw`,
   `people/young-man-framing-hands`, `people/volleyball-golden-hour`,
   `people/hands-planting-garden-warm`, `botanical/eye-through-agave-leaves`,
   `tropical/palm-street-mist`.

### Reproducing this work

This Mac has no Homebrew, poppler, Ghostscript, ImageMagick, or Python PIL, and `sips`
renders only page one of a PDF. All rendering, cropping, palette sampling, and contact-sheet
generation was done with a small Swift tool built against PDFKit and ImageIO, which ship
with the macOS command line tools. See `design-references/README.md`.
