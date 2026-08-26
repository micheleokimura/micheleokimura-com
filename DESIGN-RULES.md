# Design rules for micheleokimura.com

Permanent, non-negotiable rules for anyone (or any agent) touching the visual
layer of this site. `CLAUDE.md` covers content and voice; this file covers
design. Read both.

## Palette (locked)

Sampled from Michele's printed Brave Series books. Locked by Brett and Michele,
August 2026. This file is the canonical source for implementation tokens.

This settles the conflict the previous version of this file flagged. Two docs
each claimed a locked palette: this one held teal `#0F766E` with terracotta,
and `DESIGN-GUIDE-MICHELE-AESTHETIC.md` held the set sampled off the actual
printed books. The books won. That guide is now marked "implementation locked"
and points here for tokens. There is one palette.

The site ground stays warm cream rather than the guide's paper white, and the
dark surfaces are navy rather than the guide's true black. Those two are
deliberate: cream is the ground the site was built on and it flatters the
coral, and navy at `#1F2744` carries cream text at 12.46:1.

### The five

| Role | Hex | Token |
| ---- | --- | ----- |
| Primary accent (teal) | `#00B09F` | `--color-teal` |
| Primary CTA (coral) | `#F15C3D` | `--color-coral` |
| Decorative only (gold) | `#E9AE3F` | `--color-gold` |
| Body text, headings, dark surfaces (navy) | `#1F2744` | `--color-navy` |
| Dominant background (warm cream) | `#F2ECDF` | `--color-cream` |

### The five derived values, and why each exists

Three of the five cannot legally carry text. Each gets exactly one measured
stand-in. Do not invent a sixth.

| Role | Hex | Token |
| ---- | --- | ----- |
| Teal AS TEXT on cream | `#0F766E` | `--color-teal-text` |
| Teal accent AS TEXT on navy | `#9FE8DF` | `--color-teal-on-dark` |
| Coral AS TEXT on cream | `#B8431F` | `--color-coral-text` |
| CTA hover fill | `#F47C60` | `--color-coral-hover` |
| Text ON a coral fill | `#1B2239` | `--color-coral-ink` |

### The CTA fill is its own colour now (2026-08-26)

Brett's iPhone review: the orange button's dark text and dark arrow "should be
white so it reads faster", sitewide. White on brand coral `#F15C3D` is 3.31:1
and fails AA, and the buttons run at 14 to 16px so the large-text floor does not
apply. The fill therefore came down one notch to pay for the label.

| Role | Hex | Token |
| ---- | --- | ----- |
| CTA fill | `#C84C33` | `--color-cta` |
| CTA hover fill | `#A93E2B` | `--color-cta-hover` |
| CTA label and arrow | `#FFFFFF` | `--color-cta-ink` |
| Keyboard focus outline | `#1B2239` | `--color-focus-outline` |

`#C84C33` is coral's own hue and saturation (HSV h 10.3, s 0.747) with the value
walked from 0.945 to 0.785. Measured: white on the fill is **4.63:1**, on the
hover **6.16:1**. The hover DARKENS now, which is the inversion of the old
behaviour and preserves the old principle: the label gains contrast on hover.

`--color-coral` `#F15C3D` is UNCHANGED and is still the locked brand hex. This
is a CTA-fill decision, not a palette change; coral still appears at full
strength as decoration, rings and card glows. `--color-coral-ink` `#1B2239` is
no longer a button label but is still the dark ink the focus outline needs,
which is why `--color-focus-outline` points at it.

One useful side effect: the button as a SHAPE went from 3.17:1 on band-1 to
4.43:1, so the "coral-on-light button boundary" caveat elsewhere in this file
no longer applies to CTAs.

Two more tokens exist for controls, because WCAG holds those to 3:1 while
decoration is exempt:

| Role | Hex | Token |
| ---- | --- | ----- |
| Form field borders | `#7F8699` | `--color-field-border` |
| Focus ring on cards and image buttons | `#B8431F` | `--color-focus-ring` |

The tokens live in `src/styles/tailwind.css`. Use the token, never the raw hex.
The one unavoidable exception is `src/components/MarkerSwipe.tsx`: Safari will
not evaluate `var()` inside an SVG presentation attribute, so the swipe carries
a literal `#F15C3D` that has to be kept in step by hand.

### Contrast rules (measured, non-negotiable)

All figures are WCAG 2.1 against cream `#F2ECDF` unless stated. AA is 4.5:1 for
text, 3:1 for large text and for UI components.

- **Body text on cream is navy** `#1F2744` at 12.46:1. Passes AAA.
- **Headings on cream** are navy, or `--color-teal-text` `#0F766E` at 4.65:1.
- **Bright teal `#00B09F` never carries text on cream.** It measures 2.31:1,
  which misses AA *and* misses the 3:1 large-text floor, so it is not a heading
  color at any size. This is the single most likely mistake with this palette,
  because the token is named `--color-teal` and looks like the obvious choice.
  Reach for `--color-teal-text`.
- **Coral `#F15C3D` never carries text on cream** either, at 2.81:1. Use
  `--color-coral-text` `#B8431F` at 4.62:1.
- **Text on a CTA button is white on `--color-cta` `#C84C33`,** at 4.63:1. See
  the CTA-fill section above for why the fill moved. Superseded rule, kept
  because the reasoning still binds anything that puts a label on RAW coral:
  cream on `#F15C3D` is 2.81:1 and plain navy is 4.43:1, so raw coral can only
  carry `--color-coral-ink` `#1B2239` at 4.75:1, and it cannot carry white at
  all (3.31:1).
- **Gold is DECORATIVE ONLY and never spells a word.** Gold on cream is
  1.68:1. Divider lines, ornament, tiny bullets, subtle highlights. That is
  the whole list. The rule is absolute even where gold would technically pass
  (it is 7.40:1 on navy), because a color that is unreadable on the dominant
  ground should not be a text color anywhere on the site.
- **On navy surfaces** (footer, banners, dark panels): cream text at 12.46:1,
  `--color-teal-on-dark` for accents that are read as words at 10.53:1, bright
  teal for graphics and glows at 5.38:1, coral for CTA hovers.
- **Subtle borders** are `--color-teal-05 / -10 / -20 / -30`, which are navy at
  low opacity despite the legacy names. Structure does not carry brand hue.

### Two traps this palette sets

Both were live failures caught during the recalibration. They will come back if
someone edits without measuring.

1. **The marker swipe must stay opaque.** It ran at 0.9 alpha, which let the
   background through: coral over cream landed at `#F16A4D` but coral over a
   navy panel muddied to `#DC573E`, dropping the label to 4.10:1. At full
   opacity the swipe is exactly coral on every ground and the label holds
   4.75:1 anywhere. For the same reason, a `tone="dark"` hover swipe goes to
   full opacity rather than the 70% used on cream, where 70% coral over navy
   blends to a dark brick at 3.00:1.
2. **Any label sitting on the swipe is `--color-coral-ink`.** `text-neutral-950`
   is navy and lands at 4.43:1 on coral. The header nav made exactly this
   mistake.

### The neutral ramp

`--color-neutral-950` is navy `#1F2744`, and it is both the body copy color and
every dark UI surface. The ramp runs navy at the dark end to cream at the light
end, so it is an interpolation between the two locked grounds. Measured on
cream: 950 at 12.46:1, 700 at 9.34:1, 600 at 6.53:1, 500 at 4.97:1.
`neutral-400` and lighter are decorative and must never carry body text.

Do NOT retarget this ramp to teal or coral. It was once pointed at sapphire so
~220 utilities would recolor at once, and every name, caption, and modal scrim
turned blue until the site read as a wash of one hue. Navy survives the move
where a saturated color does not, because navy is dark and desaturated enough
to read as a near-black. The accents stay opt-in, applied by name.

## Restraint (read this before adding any color)

Bold colors are used SPARINGLY. Cream dominates the content areas. If a page
feels "loud" or clown-like, it is because too much teal and coral is landing at
once. That is the failure mode this site keeps falling into, so the allowed
jobs for each color are listed exhaustively below. If a use is not on the list,
the answer is cream with navy text.

**Teal** may be used for:

- the wordmark in the header
- the glow at the centre of the interior banner hero
- accents on navy surfaces, as `--color-teal-on-dark` when read as words
- secondary buttons
- major H1 and H2 heading text on cream, as `--color-teal-text` only
- decorative marks and small emphasis

**Coral** may be used for:

- primary CTA buttons and the marker swipe
- tracked small-caps eyebrow labels, as `--color-coral-text` on cream
- link underlines and hover states
- a 2px left rule on a pull quote
- CTA hovers on navy surfaces

**Gold** may be used for:

- divider lines and hairline rules
- small ornament and bullet marks
- subtle highlights on cream

**Never**: gold text of any size, bright teal text of any size on cream, coral
backgrounds, coral-tinted panels, coral card rings, teal body copy, teal small
print, or coral headings on a navy panel (headings on navy are cream or pale
teal). Never a stock Tailwind accent (`amber-100`, `green-100`, and friends);
they are off-palette and read as extra brand colors.

## Eyebrows and badges

- NO pill-shaped eyebrows, badges, or tags ANYWHERE on the site. EVER.
- Rationale: pills look clickable and cause user confusion.
- Pills are banned everywhere. Any element using `rounded-full` must be an icon
  button, an avatar image, or a decorative bullet dot. Never a text label, a
  badge, a tag, a status chip, or a category chip. Grep for `rounded-full`
  after any visual change and check every hit against that list.
- Alternative: small-caps text, letter-spaced (tracked), no background, no
  border, no rounded corners. Rendered in accent color when emphasis is needed.
- **A BUTTON IS NOT AN EXCEPTION.** Tested 2026-08-24: the Speaker keynote
  cards were built from a reference whose card CTA is a pill, and the argument
  for keeping it was that the rule's stated reason ("pills look clickable")
  does not apply to something that genuinely IS the click target. Michele held
  the rule. It is permanent and it outranks any reference. Every button on the
  site is `rounded-md`, card CTAs included.
- The `rounded-full` that ARE allowed, and the only ones: a circular icon
  holder (the keynote cards' icon), an avatar, a decorative bullet dot, and
  the rounded ends on a hairline rule (the header's 2px nav underline). Each
  is a shape, never a text label.

The house pattern is:

```
font-display text-xs font-semibold tracking-[0.22em] uppercase sm:text-sm
```

in `--color-coral-text` on cream, or `--color-teal-on-dark` on navy.

## Hero heights

- Home page: video hero, 360 to 440px. Deliberately NOT full-viewport. The
  three AUTHOR / SPEAKER / COACH door cards have to clear the fold on a laptop,
  and a full-height hero pushed them under it. Michele is framed on the RIGHT
  of `michele-hero.mp4` (mirrored for this reason), so the navy overlay is
  strongest on the left where the text sits.
- EVERY other page: the SAME banner, 280 to 320px tall. Author, Speak,
  Coaching, About, Resources, Works, Projects, and every case study.

`src/components/BannerHero.tsx` is the single implementation, and
`src/components/PageIntro.tsx` is a thin alias over it for the pages built
against the older prop names. It sits below the site header rather than under
it, because the header is navy text on cream and `main` already
carries the padding that clears it. Below the banner, hard cut to cream and the
content starts immediately.

NO hero photography inside the banner, and the default ground is the same
everywhere: a teal glow at the centre over a navy field deepening at the edges,
defined once as `.surface-teal-banner` in `tailwind.css`. `PageIntro` used to
render a photo mosaic (`HeroMosaic`) behind near-black text with a white
text-shadow; that was dropped by direction and `HeroMosaic` is no longer
rendered anywhere.

**Exception, added 2026-08-23 at Michele's direction: a page whose content
carries a hero PHOTOGRAPH may take a banner ground sampled from that
photograph.** `/speaker` is the first one: `.surface-violet-banner`, whose hue
comes out of the stage shot further down the page. `BannerHero` takes a
`surface` prop for this and nothing else. The geometry, the height, the type
and the contrast budget do not change; only the hue does, so the banner still
reads as the same component. See "Section bands and photo-derived washes"
below before adding a third one. Two exist today (`/speaker` violet and
`/coach` coral); a fourth needs a reason beyond taste, because the point of the
banner is that it is recognisably the same object on every page.

The glow is capped at 20% opacity, and that cap is a contrast budget rather
than a taste call. At 20% the lit centre of the field measures 6.84:1 against
the pale-teal eyebrow and 8.09:1 against the cream title. Bright teal `#00B09F`
as an eyebrow would already be at 3.94:1 there, which is why the eyebrow is
`--color-teal-on-dark`. If you retune the glow, measure at the CENTRE of the
ellipse, not the edge.

Banner content is always: tracked small-caps eyebrow (a LABEL, not a sentence),
big H1, optional one-line subhead, all in cream. Keep the subhead to a line or
two. Two pages had a five-line intro in the hero; the overflow moved into the
page body rather than stretching the banner.

## Section bands and photo-derived washes

Michele, reading a page that ran as one flat colour: "I'm just staring into a
void and I don't know when a thought's completed." Two rules came out of that.

**Every distinct section is full-bleed and sits on its own ground.** The three
grounds are `--color-band-1` `#FAFAF8`, `--color-band-2` `#F5F3EC`, and
`--color-band-3` `#F2ECDF`, lightest first. Alternate them down the page and
never run two of the same in a row, because a repeated band is exactly the seam
that goes missing. The steps are deliberately small: this is meant to be FELT
as a boundary rather than seen as a coloured panel. Navy body copy clears AA on
all three.

A CARD never takes a band. Tiles use `--color-cream` with a
`ring-1 ring-[var(--color-navy-10)]`, which lifts off any of the three
neutrals; a band on a band is a five-point difference nobody can see.

**Section padding** is `py-14 sm:py-24 lg:py-28` (56 / 96 / 112px) as standard,
carried by the section itself rather than by a margin stack on the first child.
More on a deliberate pause like a pull quote. The shade change only registers
if there is enough quiet either side of it.

**Photo-derived washes.** When a section carries a hero photograph, its ground
is sampled FROM that photograph rather than taken from the three neutrals. The
band then belongs to its picture instead of looking like a tile the picture was
pasted onto. This is opt-in, one wash per page, and the rest of the page still
alternates band-1/2/3 around it.

To add one: bin the photo's pixels in HSV, throw away everything below about
12% value or 15% saturation (near-black and near-white carry no hue), and take
the dominant cluster. Derive three values from it, and MEASURE all three:

- `--color-<page>-deep`, the banner field. Dark enough that cream text clears
  7:1, so the banner behaves exactly like the navy one.
- `--color-<page>-glow`, the lit accent. Low opacity, banner centre only. Never
  a ground, never text.
- `--color-<page>-wash`, the light tint for the band under the banner. Within a
  few points of band-1 so navy body copy still clears AA.

The worked example, with its sampled numbers and its measured contrast, is in
the PHOTO-DERIVED SECTION WASHES block in `src/styles/tailwind.css`. Read it
before adding a page's palette rather than eyedropping a colour by hand.

## No dark panels except the footer

Michele, 2026-08-23: no dark blue text-box CTAs anywhere except the footer. The
footer is the one place the brand fills the viewport (see below). A closing CTA
on a content page is a plain band with a heading, a line of copy, and one
button on the contact popup. No rounded navy slab, no `surface-teal` panel, no
container at all.

`ContactBlock`, `StepList`, and `OrgCarousel` still render navy panels and are
used on `/projects`, `/resources`, `/case-studies`, `/works`, `/how-it-works`,
`/about`, and `/author`. They are on the list to come out; `/speaker` and
`/coach` are done.

## No email addresses on client-facing pages

Michele has asked for this more than once. `michele@micheleokimura.com` does
not appear on any page a visitor can reach, because a plain address in the
markup gets scraped. The contact popup is the only route in. `siteConfig.email`
stays, because the API routes need somewhere to deliver to, but it must not be
rendered.

## Header

Locked structure, left to right. Seven things, and no more:

1. the wordmark, linking to `/`
2. **Home** → `/`
3. **Coach** → `/coach`
4. **Author** → `/author`
5. **Speaker** → `/speaker`
6. **About** → `/about`
7. **Contact**, the accent button on the far right. It opens the ContactPopup
   and is NOT a route link.

This order is deliberate and it changed on 2026-08-23. The coaching offer is the
commercial ask, so it now leads; the previous order ran Speaker, Author, Coach.

Every label matches its route. `/coaching` and `/speak` were renamed to `/coach`
and `/speaker` on the same date, so no nav item is a label sitting on a
differently-named path any more. Both old paths, plus the older `/speaking`,
`/portfolio`, and `/subscription` aliases, permanently redirect in
`next.config.ts`. Those aliases point at the FINAL destination rather than
chaining through the retired route, and they should stay that way.

Rules that hold this together:

- Everything else lives in the footer, in `footerColumns` in
  `src/lib/site-config.ts`. Cutting a link from the header means moving it
  there, never dropping it.
- The full nav shows from `md` (768px). Below that it collapses to a button
  reading "Menu", not a bare glyph. A hairline icon alone was read as "there
  are no menu items."
- Exactly ONE Contact button is on screen at any width. Below `sm` it lives
  inside the hamburger panel; from `sm` up it sits right-most in the header bar
  and the panel copy is hidden. The header once shipped two side by side (the
  wait-list button had been relabelled "Contact" without removing it).

**The width budget.** `Container` narrows the header to 672px below `lg`, and
at 768px five labels plus the wordmark and the CTA only fit because the nav
runs at 13px with `px-2` and `gap-0.5` between `md` and `lg`, relaxing to 14px
and `px-4` at `lg`. Roughly: wordmark 200, nav 210, CTA 92, two 24px gaps, so
about 630px inside 672px. The old eight-item nav needed roughly 920px, which is
why it could not appear until 1024px and why half-screen visitors saw nothing
but a hamburger. Adding a sixth item or a longer label spends slack that is not
there. Re-measure first.

## Footer

Full-bleed `--color-navy`, cream text, per the Living in Duvall
reference. This is the one place the brand fills the whole viewport width,
which is what lets the rest of the site stay cream and quiet.

Structure, top to bottom: four columns, then a bottom bar carrying the
copyright and nothing else.

Removed on 2026-08-23, all at Michele's instruction, none to be restored
without her:

- the "Stay in touch" newsletter / wait-list block that used to open the
  footer, and the Contact button inside it,
- the Spotify / Apple / RSS podcast platform row,
- the "In a Moment with Brett K. Moore" co-host line under the podcast title,
- her email address,
- **the 988 Suicide and Crisis Lifeline block.** She asked for this twice. It
  is called out here so that the next person to think "this site talks about
  trauma, it should carry a crisis line" takes that back to Michele rather than
  quietly re-adding it.

Substack and YouTube joined the social row in the same pass. Both are `null` in
`siteConfig.socials` until Michele supplies the handles, and the footer filters
out any social without a URL rather than rendering a dead icon.

The four columns, in order:

1. wordmark, tagline, location, social links
2. **Explore**: Home, Coach, Author, Speaker, About, How it works
3. **Community**: Projects, Case studies, Authored works, Blog and resources,
   Contact
4. **More from Michele**: the In a Moment podcast, and the press kit. Two
   entries and nothing else.

Two of those destinations are not what the label implies, and both are
deliberate. There is no `/blog` route: `src/lib/blog.ts` renders the blog at
`/resources`, so one link covers both and is labelled "Blog and resources".
There is no press-kit page either, only a press-kit section on the speaker
page, so that link is the anchor `/speaker#press-kit-heading`. If either ever
gets a real route, update the link rather than adding a second one.

## Contact

One form for the whole site: `src/components/ContactPopup.tsx`. Page CTAs open
it through `src/components/ContactTrigger.tsx` with an interest pre-ticked.
Do not build a second capture form. Every inquiry goes to one inbox and one
sheet (`content/setup/contact-popup-setup.md`).

## Voice

- No em-dashes anywhere.
- No "X, not Y" constructions.
- No AI-tell vocab (delve, leverage, robust, seamless, navigate as verb,
  tapestry, empower, elevate, unlock, etc.).
- "Michele" with one L, always. Never "Michelle."
- "Hawaiʻi" with the ʻokina where it appears in body copy.
- No decorative emojis in titles, bullets, or body copy.

Full voice guide: `content/brand/voice-guide.md`.
