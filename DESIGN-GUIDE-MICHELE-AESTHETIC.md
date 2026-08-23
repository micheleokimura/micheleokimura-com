# Michele's Design Aesthetic - North-Star Style Guide

Derived from print-ready PDFs Michele art-directed for the Brave Series, principally
**Brave Together Hawai'i, Volume 4, Classic** (2026, "Daring Pursuit"), with
**Brave Together Volume 3, Classic** ("Develop Foundation") as a cross-check that the
system is consistent across volumes rather than a one-off.

Reference page renders live in `design-references/pdf-pages/` (300 DPI, reference only, never deployed).
Extracted photography lives in `public/images/lifestyle/`.

---

## 1. The one-sentence read

**Black is the ground. Photography is the light. Everything else gets out of the way.**

Michele's books do not decorate. They set a heavy black or white field, drop in one
photograph that carries the entire emotional load, and set type with real editorial
discipline around it. The result reads like a well-made magazine that happens to be
about hard subjects, and it is unmistakably Hawai'i without ever resorting to hibiscus
clip art.

---

## 2. Locked palette

### Primary

| Token | Hex | Where it came from | Use |
|---|---|---|---|
| `ink` | `#000000` | Cover field, section grounds | The dominant surface. True black, not off-black. |
| `paper` | `#FFFFFF` | Text pages, half-spreads | The other dominant surface. Pure white, high contrast. |
| `teal` | `#00B09F` | Cover "Hawai'i" script, Vol 3 volume badge | The signature accent. Sampled at `#00B09F` on Vol 4 and `#00AC9B` on Vol 3, so the family is stable. |
| `coral` | `#F15C3D` | Article accent tabs, subheads, callout box | The workhorse accent for editorial furniture. |
| `gold` | `#E9AE3F` | "The Global Crisis" tab, spread footer bar | The second accent, used for weight and warmth. |

### Secondary, drawn from the photography

| Token | Hex | Source |
|---|---|---|
| `deep-sea` | `#233D38` | Nā Pali cliffs in shadow |
| `sea-green` | `#4F6E68` | Nā Pali mid-tones |
| `valley` | `#6E8055` | Waterfall valley greenery |
| `black-sand` | `#2D2C32` | Volcanic shore |
| `shell` | `#E8E0CC` | Sea foam and warm sand |
| `brave-blue` | `#135DAB` | Brave Series one-pager field |

### Rules of use

- Black and white do the structural work. Teal, coral, and gold appear in small doses:
  a rule, a tab, one word in a headline, a quotation mark.
- Never run two accents at full strength in the same block. The books pick one per spread.
- `brave-blue` belongs to Brave Series marketing collateral. Treat it as a sibling brand
  colour, and keep it off the Michele Okimura personal pages unless the page is about the curriculum.
- The photography supplies every other colour. Do not tint or overlay it.

---

## 3. Typography

Michele's system runs four voices. Getting the count right matters more than matching
the exact foundry file.

### 3.1 Display sans (the spine of the system)

Wide, heavy neo-grotesque. Flat apex on the A, straight angled leg on the R, tight
letterspacing at large sizes. Used for `BRAVE`, all article headlines, and reverse type
over photographs.

- **Likely original:** Helvetica Now Display Bold/Black, or Neue Haas Grotesk Display.
- **Web substitutes, in order:** `Archivo` / `Archivo Expanded` (closest proportions),
  `Inter Tight` Bold, `Anton` for poster-weight only.
- **Behaviour:** ALL CAPS or sentence case, never title case. Tracking tightens as size
  grows. Headlines break across two or three short lines and sit hard against the left margin.

### 3.2 Body serif (the reading voice)

High-contrast transitional serif with ball terminals and a high x-height. Carries every
long-form article and every pull quote. This is the choice that makes the books feel
grown-up rather than youth-ministry.

- **Likely original:** Freight Text Pro, or Chronicle Text.
- **Web substitutes:** `Source Serif 4`, `Newsreader`, `Spectral`, `Crimson Pro`.
- **Behaviour:** justified in narrow editorial columns, first-line indents rather than
  paragraph spacing, italic used for emphasis inside running text.

### 3.3 Blackletter (the ceremonial voice)

Textura blackletter for chapter openers and moments of weight: "Hawai'i Journey",
"Become a Freedom Fighter", "Passing On Your Wisdom." This is the single most distinctive
and most easily botched element in the system. It reads as Hawai'i street and tattoo
culture rather than as medieval pastiche.

- **Web substitutes:** `Grenze Gotisch`, `Pirata One`, `UnifrakturCook`.
- **Behaviour:** one line, one moment per spread. Never for body copy, never for navigation.

### 3.4 Brush script (the signature)

Heavy connected retro brush script, used once, for the word "Hawai'i" on the cover lockup.

- **Web substitutes:** `Yellowtail`, `Kaushan Script`, `Streetwear`.
- **Behaviour:** exactly one appearance per surface, always as a place or personal name,
  always overlapping the sans lockup slightly.

A fifth voice, an all-caps marker hand, appears in Volume 3 for margin notes and activity
prompts. `Caveat` or `Permanent Marker` covers it. Use it only for genuinely handwritten-feeling
asides.

---

## 4. Photo treatment

The photography is **naturalistic and ungraded**. There is no unified filter, no warm LUT,
no fade. Michele lets each photograph keep its own temperature, and the tension between
temperatures is the point.

Two families run side by side:

- **Cool and moody.** Nā Pali cliffs under overcast light, the waterfall valley, black
  volcanic sand. Desaturated greens and teals, soft contrast, weather in the frame.
- **Hot and saturated.** The turquoise wave barrel, palms against a blown-out sun, red
  ʻōhiʻa lehua on grey lava, a fence of surfboards. Full saturation, hard light.

Human moments are shot at golden hour or in open shade, close in, faces filling the frame.

### The signature POV pair

The books repeatedly use two camera positions, and this is worth carrying to the site:

1. **Looking straight up** (palms into the sun, the canopy).
2. **Looking straight down at your own feet** (slippers in wet grass, bare feet on black sand).

Sky above you, ground under you. It puts the reader inside the frame instead of in front
of it. Two of the extracted assets are exactly this pair.

### Rules

- No overlays, no gradient scrims, no duotone on real photographs.
- When type must sit on a photo, find a genuinely quiet region of the image and put it
  there. The books never dim a photo to make text work.
- Photos either bleed fully off the page edge, or sit as a hard-edged rectangle inside a
  black field with clear margin. There is no third treatment, and there are no rounded
  corners or drop shadows anywhere in the source.
- Botanical macro against hard texture is a recurring pairing: soft flower, hard lava.

---

## 5. Layout patterns

1. **Half-and-half spread.** Full-bleed photograph occupying one half, generous empty
   white on the other, with a small text block set toward the outer edge. The white is not
   filler. It is roughly 50% of the spread and it is doing the work.
2. **Framed window on black.** Cover pattern. Black field, type lockup centred, photograph
   inset as a hard rectangle with margin on all sides. The photo reads as a window cut into the dark.
3. **Kapa band.** A repeating Polynesian triangle and chevron motif used as a horizontal
   rule, running the full measure at the top or bottom of a page. This is the cultural
   signature of the series and appears on both volumes. It is a rule, never a background.
4. **Bleeding accent tab.** A small solid rectangle of coral or gold that bleeds off the
   left edge, sitting beside an article headline. Cheap, effective, very reusable as a
   section marker on the web.
5. **Reverse type, bottom-left.** White display sans anchored to the lower left of a
   full-bleed photograph, with a small italic credit line under it.
6. **Editorial column grid.** Three to four narrow justified serif columns with coral sans
   subheads. Real magazine density. Michele is comfortable with a lot of words on a page.
7. **Centred pull quote.** High-contrast serif, centred, with an oversized coral quotation
   mark above it and the final word set in italic and in the accent colour.
8. **Type on a path.** Copy set along a large curve across a full-bleed photograph. Used
   once, as a set piece.

---

## 6. Applying it to the site

### Hero style

Full-bleed photograph, no scrim, no overlay. Prefer `waterfall-valley-green-ridges.jpg`
or `palms-looking-up-sunburst.jpg` at full viewport width. Headline in the display sans,
white, anchored bottom-left with a generous margin, broken across two or three short
lines, tracking tight. One line of body sans beneath it at roughly a quarter the headline
size. A kapa band as a hairline rule directly under the hero, full width, black on white.
No buttons floating over the photograph. The call to action sits in the white band below.

An alternative hero, closer to the cover: black field, headline centred, and a single
hard-edged photograph inset below it with clear black margin on all four sides.

### Content section style

White ground. Section marked by a coral or gold tab bleeding off the left edge, with the
section label in small caps display sans beside it. Body copy in the serif at a
comfortable reading measure of 62 to 70 characters, with first-line indents. Photographs
break the column as half-width hard-edged rectangles with real white space beside them,
never as full-width bands with text on top.

Pull quotes get their own full-width white block: centred serif, oversized coral quotation
mark, final phrase in accent-coloured italic.

### What to carry over, and what to leave in print

**Carry over:** black as a real surface colour, the kapa band as a divider, the bleeding
accent tab, the half-and-half photo-and-whitespace spread, the display-sans-plus-serif
pairing, the ungraded photography, the up-and-down POV pair.

**Leave in print:** justified multi-column text, type on a curved path, blackletter for
anything a user has to click, and the marker hand for anything longer than a phrase.

### Voice check

The one-pager in the source set opens with "Unlock Purpose." That word is on the
banned list in `CLAUDE.md`. The design system here is sound and worth following closely;
the print copy is not a copy reference. Keep taking layout, colour, and type from these
PDFs, and keep taking words from `content/brand/voice-guide.md`.

---

## 7. Asset inventory

18 photographs extracted, each at 1600px on the long side (quality 85) plus an 800px
mobile variant (quality 82), in `public/images/lifestyle/`.

**Island and landscape:** `napali-coast-cliffs-turquoise`, `waterfall-valley-green-ridges`,
`wave-barrel-turquoise`, `ocean-sunrise-glow`, `palms-looking-up-sunburst`,
`black-sand-shorebreak-foam`, `hikers-ridge-golden-light`

**Botanical and texture:** `ohia-lehua-blossom-lava`, `tropical-grass-fallen-leaves`

**Place and object:** `surfboard-fence-beach`, `friends-walking-palm-street`

**Human moments:** `youth-circle-maile-lei`, `hands-stacked-together`,
`hands-planting-garden-warm`, `volleyball-golden-hour`, `portrait-quiet-strength-bw`

**The POV pair:** `feet-slippers-plumeria-grass`, `feet-black-sand-beach`

Every crop was visually checked and re-cut where a caption or headline intruded, so all
18 are clean photography with no type in frame.

### Provenance and rights

The Vol 4 colophon credits photography to Unsplash and Shutterstock, with art direction
and graphic design by Sakura Reese. Confirm the Shutterstock licence covers web use before
any of these ship to production. `youth-circle-maile-lei` and `portrait-quiet-strength-bw`
show identifiable faces and need a release check in particular.

---

## 8. Sources processed

| File | Pages | Role |
|---|---|---|
| `26BTHawaii_Volume_4_Classic_v4_1_1.pdf` | 13 spreads (24 book pages) | Primary north star |
| `25BT_Volume_3_Classic_v1.pdf` | 46 spreads | Cross-check, plus 5 photographs |
| `Brave-Series-One-Pager.pdf` | 1 | Brand-blue sample, no usable photography |

A parallel task was writing more Brave Series PDFs to the shared Drive folder
`Claude-Workspace/projects/michele-okimura-llc/press-kit-assets/brave-series-source-pdfs/`.
At the time of writing, four further filenames were present but still zero bytes:
`Brave-Beautiful-Fac-Guide-Vol-1-Classic.pdf`, `Brave-Together-One-Page.pdf`,
`Brave-Together-One-Pagers.pdf`, `Brave-Together-Vol4-Ch2-Be-a-Safe-Place.pdf`.
Re-run the extraction against those once they finish landing.
