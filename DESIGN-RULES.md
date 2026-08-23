# Design rules for micheleokimura.com

Permanent, non-negotiable rules for anyone (or any agent) touching the visual
layer of this site. `CLAUDE.md` covers content and voice; this file covers
design. Read both.

## Palette (locked)

Teal primary, terracotta warm accent, warm cream ground. This replaced the
sapphire + orange scheme, which read as "blue and orange" all at once. The
site's pre-sapphire palette was already teal (`#0097B2` with `#DB6437`), so
this is a return to that family rather than a new direction.

> **Unresolved: two files currently claim a locked palette.**
> `DESIGN-GUIDE-MICHELE-AESTHETIC.md` locks a different set, sampled from
> Michele's printed Brave Series books: teal `#00B09F`, coral `#F15C3D`, gold
> `#E9AE3F`, on true black and pure white. The hue families agree with this
> file (teal plus a warm coral) but the values do not, and that guide has a
> real claim to authority because it came off her actual books.
>
> The values below are what is IMPLEMENTED, because they were the direction
> given for this pass. Two cautions before anyone switches: `#00B09F` is
> lighter than `#0097B2`, so it fails WCAG AA as text on any light ground even
> harder, and that guide's black-and-white grounds are a different decision
> from the warm cream here. Adopting it is a deliberate call for Michele and
> Brett to make, not a drive-by correction. Until then, do not "fix" one file
> to match the other.

| Role | Hex | Token |
| ---- | --- | ----- |
| Primary (teal) | `#0F766E` | `--color-brand-teal` |
| Deep teal: footer, banners, depth | `#134E4A` | `--color-brand-teal-deep` |
| Warm accent (terracotta) | `#D4735A` | `--color-brand-terracotta` |
| Terracotta AS TEXT on cream | `#9E5442` | `--color-brand-terracotta-ink` |
| Terracotta ON a teal panel | `#FDE8D9` | `--color-brand-terracotta-on-dark` |
| CTA hover fill | `#E08E76` | `--color-brand-terracotta-soft` |
| Background (warm cream) | `#F5F1E8` | `--color-cream` |
| Body copy (warm charcoal) | `#3D3730` | `--color-neutral-950` |
| Text ON a terracotta fill | `#1F1B16` | `--color-ink` |

The tokens live in `src/styles/tailwind.css`. Use the token, never the raw hex.
The one unavoidable exception is `src/components/MarkerSwipe.tsx`: Safari will
not evaluate `var()` inside an SVG presentation attribute, so the swipe carries
a literal `#D4735A` that has to be kept in step by hand.

Three contrast carve-outs are baked into the tokens. Keep using them:

- `#D4735A` as text on cream is 2.91:1 and fails WCAG AA. When the terracotta
  has to be read AS TEXT on cream, use `--color-brand-terracotta-ink`
  (`#9E5442`, 4.90:1).
- Terracotta is invisible on teal (1.67:1). When the accent sits ON a teal
  panel, use `--color-brand-terracotta-on-dark` (`#FDE8D9`): 4.62:1 on
  `#0F766E` and 8.00:1 on `#134E4A`, so it holds anywhere on the banner.
- Text ON a terracotta or terracotta-soft fill is `--color-ink`, never cream.
  Cream on `#D4735A` is 2.91:1; ink is 5.22:1.

Do NOT reintroduce `#0097B2`. It is Michele's original Elementor accent and it
is the right hue, but at 3.07:1 it fails AA both as a heading on cream and as a
bar carrying cream text. `#0F766E` is the same family and passes at 4.86:1.

The neutral ramp is warmed to match the cream (`neutral-700` `#4A4239` through
`neutral-100` `#EBE5D9`). Stock Tailwind neutrals are cool greys and go
visibly blue against cream. `neutral-400` and lighter are decorative only and
must never carry body text.

## Restraint (read this before adding any color)

Bold colors are used SPARINGLY. Cream dominates the content areas. If a page
feels "loud" or clown-like, it is because too much teal and terracotta is
landing at once. That is the failure mode this site keeps falling into, so the
allowed jobs for each color are listed exhaustively below. If a use is not on
the list, the answer is cream with warm-charcoal text.

**Teal** may be used for:

- the wordmark in the header
- the footer ground (`--color-brand-teal-deep`, full-bleed)
- the interior banner hero (`.surface-teal-banner`) and the home video-hero
  overlay
- the full-bleed dark panels (`.surface-teal`)
- major H1 and H2 heading text on cream
- low-opacity structure: card rings, hairline dividers, soft shadows, via
  `--color-teal-05 / -10 / -20 / -30`

**Terracotta** may be used for:

- primary CTA buttons and the marker swipe
- tracked small-caps eyebrow labels, as `--color-brand-terracotta-ink` on cream
  or `--color-brand-terracotta-on-dark` on teal
- link underlines and hover states
- a 2px left rule on a pull quote

**Never**: terracotta backgrounds, terracotta-tinted panels, terracotta card
rings, terracotta decorative shapes or bullet dots, teal body copy, teal small
print, or terracotta headings on a teal panel (headings on teal are cream).
Never a stock Tailwind accent (`amber-100`, `green-100`, and friends); they are
off-palette and read as a third and fourth brand color.

`--color-neutral-950` is warm charcoal and must stay that way. It was once
retargeted to sapphire so that ~220 utilities would recolor at once; the result
was that every name, caption, and modal scrim turned blue and the site read as
a wash of one hue. The brand color is opt-in, applied by name.

## Eyebrows and badges

- NO pill-shaped eyebrows, badges, or tags ANYWHERE on the site. EVER.
- Rationale: pills look clickable and cause user confusion.
- Pills are banned everywhere. Any element using `rounded-full` must be an icon
  button, an avatar image, or a decorative bullet dot. Never a text label, a
  badge, a tag, a status chip, or a category chip. Grep for `rounded-full`
  after any visual change and check every hit against that list.
- Alternative: small-caps text, letter-spaced (tracked), no background, no
  border, no rounded corners. Rendered in accent color when emphasis is needed.

The house pattern is:

```
font-display text-xs font-semibold tracking-[0.22em] uppercase sm:text-sm
```

in `--color-brand-terracotta-ink` on cream, or
`--color-brand-terracotta-on-dark` on teal.

## Hero heights

- Home page: video hero, 360 to 440px. Deliberately NOT full-viewport. The
  three AUTHOR / SPEAKER / COACH door cards have to clear the fold on a laptop,
  and a full-height hero pushed them under it. Michele is framed on the RIGHT
  of `michele-hero.mp4` (mirrored for this reason), so the teal overlay is
  strongest on the left where the text sits.
- EVERY other page: the SAME banner, 280 to 320px tall. Author, Speak,
  Coaching, About, Resources, Works, Projects, and every case study.

`src/components/BannerHero.tsx` is the single implementation, and
`src/components/PageIntro.tsx` is a thin alias over it for the pages built
against the older prop names. It sits below the site header rather than under
it, because the header is warm-charcoal text on cream and `main` already
carries the padding that clears it. Below the banner, hard cut to cream and the
content starts immediately.

NO hero photography, and no per-page hero background. The identity is the
banner, so it must be identical everywhere: a warm terracotta glow at the
centre over a teal field deepening at the edges, defined once as
`.surface-teal-banner` in `tailwind.css`. `PageIntro` used to render a photo
mosaic (`HeroMosaic`) behind near-black text with a white text-shadow; that was
dropped by direction and `HeroMosaic` is no longer rendered anywhere.

The glow is capped at 18% opacity on purpose. Lighten the teal field past
`#0F766E` and the peach eyebrow drops below WCAG AA.

Banner content is always: tracked small-caps eyebrow (a LABEL, not a sentence),
big H1, optional one-line subhead, all in cream. Keep the subhead to a line or
two. Two pages had a five-line intro in the hero; the overflow moved into the
page body rather than stretching the banner.

## Header

Locked structure, left to right. Six things, and no more:

1. the wordmark, linking to `/`
2. **Home** → `/`
3. **Speaker** → `/speak` (the label is "Speaker"; the route stays `/speak`)
4. **Author** → `/author`
5. **Coach** → `/coaching`
6. **About** → `/about`
7. **Contact**, the accent button on the far right. It opens the ContactPopup
   and is NOT a route link.

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

Full-bleed `--color-brand-teal-deep`, cream text, per the Living in Duvall
reference. This is the one place the brand fills the whole viewport width,
which is what lets the rest of the site stay cream and quiet.

Structure, top to bottom: a newsletter/wait-list block, then four columns, then
the bottom bar with the copyright and the 988 crisis line. The 988 line ships on
every page and does not get removed.

The four columns, in order:

1. wordmark, tagline, location, social links
2. **Explore**: Home, Speaker, Author, Coach, About, How it works
3. **Community**: Projects, Case studies, Authored works, Blog and resources,
   Contact
4. **More from Michele**: the In a Moment podcast (plus Spotify / Apple / RSS),
   the press kit, and her email

Two of those destinations are not what the label implies, and both are
deliberate. There is no `/blog` route: `src/lib/blog.ts` renders the blog at
`/resources`, so one link covers both and is labelled "Blog and resources".
There is no press-kit page either, only a press-kit section on the speaker
page, so that link is the anchor `/speak#press-kit-heading`. If either ever
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
