# Design rules for micheleokimura.com

Permanent, non-negotiable rules for anyone (or any agent) touching the visual
layer of this site. `CLAUDE.md` covers content and voice; this file covers
design. Read both.

## Palette (locked)

| Role | Hex | Token |
| ---- | --- | ----- |
| Primary dark (sapphire) | `#0F52BA` | `--color-brand-sapphire` |
| Primary accent (orange splash) | `#FF4500` | `--color-brand-orange` |
| Hover / soft accent (coral) | `#FF7F50` | `--color-brand-coral` |
| Depth / gradient shadow (deep royal sapphire) | `#1E3A8A` | `--color-brand-sapphire-deep` |
| Background (warm ivory) | `#FDFBF7` | `--color-ivory` |

The tokens live in `src/styles/tailwind.css`. Use the token, never the raw hex.

Two contrast carve-outs already baked into the tokens, and they exist for a
reason. Keep using them:

- `#FF4500` as text on ivory is only 3.33:1 and fails WCAG AA. When the orange
  has to be read AS TEXT on a light surface, use `--color-brand-orange-ink`
  (`#CC3700`, 4.94:1).
- Neither `#FF4500` (2.08:1) nor coral (2.86:1) is legible on sapphire. When the
  accent has to sit ON a dark panel, use `--color-brand-orange-on-dark`
  (`#FFC2A3`, 4.60:1).
- Text ON an orange or coral fill is near-black `--color-ink`, never ivory.

## Restraint (read this before adding any color)

Bold colors are used SPARINGLY. Ivory dominates the content areas. If a page
feels "loud" or clown-like, it is because too much sapphire and orange is
landing at once. That is the failure mode this site keeps falling into, so the
allowed jobs for each color are listed exhaustively below. If a use is not on
the list, the answer is ivory with near-black text.

**Sapphire `#0F52BA`** may be used for:

- the wordmark in the header
- the footer ground and the full-bleed dark panels (`.surface-sapphire`)
- banner heroes and the home video-hero overlay
- major H1 and H2 heading text on ivory
- low-opacity structure: card rings, hairline dividers, soft shadows, via
  `--color-sapphire-05 / -10 / -20 / -30`

**Orange `#FF4500`** may be used for:

- primary CTA buttons (Contact, Work with Michele, and the like)
- tracked small-caps eyebrow labels, as `--color-brand-orange-ink` on ivory or
  `--color-brand-orange-on-dark` on sapphire
- link underlines and hover states
- a 2px left rule on a pull quote

**Never**: orange backgrounds, orange-tinted panels, orange card rings, orange
decorative shapes or bullet dots, sapphire body copy, sapphire small print, or
orange headings on a sapphire panel (headings on sapphire are ivory).

`--color-neutral-950` is near-black `#1a1a1a` and must stay that way. It was
once retargeted to sapphire so that ~220 utilities would recolor at once; the
result was that every name, caption, and modal scrim turned blue and the site
read as a wash of sapphire. Sapphire is opt-in, applied by name.

Body copy on ivory is `text-neutral-700`. Small print, captions, dates, and
secondary metadata are `text-neutral-500`.

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

in `--color-brand-orange-ink` on ivory, or `--color-brand-orange-on-dark` on
sapphire.

## Hero heights

- Home page: video hero, 360 to 440px. Deliberately NOT full-viewport. The
  three AUTHOR / SPEAKER / COACH door cards have to clear the fold on a laptop,
  and a full-height hero pushed them under it. Michele is framed on the RIGHT
  of `michele-hero.mp4` (mirrored for this reason), so the sapphire overlay is
  strongest on the left where the text sits.
- All other pages (Author, Speaker, Coaching, About, case studies, etc.):
  BANNER style, 280 to 320px tall. Compact, calm, doesn't demand attention.

`src/components/BannerHero.tsx` is the implementation. It sits below the site
header rather than under it, because the header is near-black text on ivory and
`main` already carries the padding that clears it. Below the banner, hard cut to
warm ivory and the content starts immediately.

## Header

- Exactly ONE Contact button is on screen at any width. Below `sm` it lives
  inside the hamburger panel; from `sm` up it sits right-most in the header bar
  and the panel copy is hidden. The header once shipped two side by side (the
  wait-list button had been relabelled "Contact" without removing it).
- The full nav shows from `lg` (1024px). It cannot go lower: eight labels plus
  the wordmark and the CTA need roughly 920px, and `Container` caps its
  contents at 42rem below `lg` anyway.
- Below `lg` the collapsed nav is a button reading "Menu", not a bare glyph.
  A hairline icon alone was read as "there are no menu items."

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
