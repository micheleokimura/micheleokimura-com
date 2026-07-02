# Colors and fonts

**Scope:** Recommended visual system for `micheleokimura.com`. The current live site uses WordPress + Elementor defaults; the rebuild in Fable 5 should adopt a defined system.

---

## Color palette (recommended)

The current live site draws warmth from photography rather than from a system palette. The rebuild should keep photography as the visual foreground and use a restrained, warm neutral palette behind it.

### Primary

- **Warm Ivory** `#FAF7F2` (background)
- **Deep Charcoal** `#1F2024` (primary text)
- **Kaimuki Gold** `#B8863A` (primary accent, brand tone)

### Secondary

- **Ocean Slate** `#2F3E4A` (secondary text, headings on light backgrounds)
- **Soft Coral** `#E8A17E` (highlight, hover states)
- **Sage** `#7F8F7E` (tertiary accent, quiet callouts)

### Utility

- **Border Grey** `#D9D5CE` (dividers, form-field borders)
- **Muted Grey** `#6C6C6C` (secondary text, captions, timestamps)

## Notes on the palette

- The **Kaimuki Gold** name references Michele's Kaimuki childhood neighborhood. It also connects to the "gold in your journey" line from the Wisdom Flows tagline.
- **Ocean Slate** connects to Michele's O'ahu location without being a literal "beach blue."
- Michele's photography is warm and mid-tone. The palette runs cool enough on the neutrals that photos pop.

Brett is the final call on the exact palette. This is a starting point.

---

## Typography (recommended)

### Display / headings

**Fraunces** (Google Fonts). A modern serif with warmth. Used for H1 and H2. Reads well at large sizes; keeps its character at 32px+.

Fallback: `"Fraunces", "Georgia", serif`.

### Body

**Inter** (Google Fonts). Contemporary sans-serif optimized for screens. Used for body copy, H3 through H6, and UI microcopy.

Fallback: `"Inter", -apple-system, "Segoe UI", sans-serif`.

### Mono (for code, form-field placeholders where distinct)

**JetBrains Mono** (Google Fonts). Only used in JSON-LD schema examples in developer-facing docs, if at all in the public site.

Fallback: `"JetBrains Mono", "Courier New", monospace`.

## Type scale (recommended, in rem)

- H1: 3.5rem, line-height 1.1
- H2: 2.5rem, line-height 1.2
- H3: 1.75rem, line-height 1.3
- H4: 1.25rem, line-height 1.4
- Body: 1rem, line-height 1.6
- Small: 0.875rem, line-height 1.5

## Notes for Brett

- These are recommendations, not locked decisions. If your Fable 5 build has stronger opinions, follow them and update this file.
- Do not use more than three typefaces on the site. Two is better.
- Do not use display fonts in body copy. Fraunces at 1rem is unreadable.
- Do not use fonts that require paid licenses without checking with Michele first. Google Fonts is safe.
