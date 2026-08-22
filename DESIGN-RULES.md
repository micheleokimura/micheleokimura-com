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

## Eyebrows and badges

- NO pill-shaped eyebrows, badges, or tags ANYWHERE on the site. EVER.
- Rationale: pills look clickable and cause user confusion.
- Alternative: small-caps text, letter-spaced (tracked), no background, no
  border, no rounded corners. Rendered in accent color when emphasis is needed.

The house pattern is:

```
font-display text-xs font-semibold tracking-[0.22em] uppercase sm:text-sm
```

in `--color-brand-orange-ink` on ivory, or `--color-brand-orange-on-dark` on
sapphire.

## Hero heights

- Home page: full-height hero (video background when the hero video lands).
- All other pages (Author, Speaker, Coaching, About, case studies, etc.):
  BANNER style, 280 to 320px tall. Compact, calm, doesn't demand attention.

`src/components/BannerHero.tsx` is the implementation. It sits below the site
header rather than under it, because the header is near-black text on ivory and
`main` already carries the padding that clears it. Below the banner, hard cut to
warm ivory and the content starts immediately.

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
