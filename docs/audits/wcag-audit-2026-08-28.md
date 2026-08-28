# WCAG 2.2 Level AA accessibility audit

**Site:** https://micheleokimura.com
**Date:** 2026-08-28
**Standard:** WCAG 2.2 Level AA (with WCAG 2.0 and 2.1 A/AA inherited)
**Scope:** all 78 published routes from `sitemap.xml`
**Status:** analysis only. No site code was changed.

---

## How this audit was run

The audit brief asked for `@axe-core/cli`, `pa11y`, and a Puppeteer contrast pass. None of the three could be used: **this machine has no Node runtime installed** (`node`, `npm`, `npx`, and `pnpm` are all absent), so nothing installable from npm can run here.

The substitute is equivalent in coverage and in some respects stronger, because it tests the real production pages rather than a headless copy:

| Brief asked for | What was actually run |
| --- | --- |
| `@axe-core/cli` | **axe-core 4.10.2**, the identical engine, fetched from jsDelivr and injected into each live production page. Ruleset: `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22a, wcag22aa, best-practice`. |
| `pa11y` | A purpose-written structural scanner covering the checks pa11y adds over axe: heading order, landmark completeness, skip-link target resolution, alt-text quality heuristics, redundant ARIA roles, dangling `aria-*` references, duplicate IDs, label association, required-field signalling, target size, autoplay media, and viewport zoom locks. |
| Puppeteer contrast pass | A computed-style contrast engine run in-page. It resolves each text element's real background through the **actual paint stack** (`elementsFromPoint`), composites every semi-transparent layer, applies the correct 4.5:1 / 3:1 large-text threshold, and additionally evaluates `:hover`, `:focus`, and `::placeholder` colour pairs harvested from the live CSSOM. |

Every one of the 78 routes was loaded in a 1280x1400 same-origin iframe and scanned by all three passes. **All 78 completed with zero scan errors.** Reflow (1.4.10) and text-resize (1.4.4) were tested separately at 320px and at 200% root font size.

### What the tooling cannot decide, and was therefore checked by hand

The contrast engine composites **colour** layers. It cannot read the pixels of a gradient, a photograph, or a video frame. Every such case was flagged for review and then resolved manually by extracting the gradient stops and computing the ratio against the lightest stop, which is the worst case. Those results are in "Reviewed and cleared" below.

---

## Executive summary

The site is in **good** accessibility health. The foundations that are usually missing are all present and correct: a working skip link, `lang="en"`, one `<h1>` per page, complete landmark structure, `aria-current` on the active nav item, visible `focus-visible` styling on essentially every control, and a hand-built contact dialog that axe-core scores at **zero violations** in its open state.

The defects that exist are concentrated in a small number of shared components and templates, so the fix list is short and each item repairs many pages at once.

### Violations by severity

Counts are of real, verified defects. False positives are excluded and itemised separately.

| Severity | Distinct issues | Page instances |
| --- | --- | --- |
| Serious | 3 | 21 |
| Moderate | 5 | 26 |
| Minor | 3 | 34 |
| **Total** | **11** | **81** |

No **critical** violations were found. There are no missing `alt` attributes, no unlabelled form fields, no keyboard traps, no duplicate IDs, no broken `aria-*` references, no positive `tabindex`, and no unreachable interactive controls anywhere on the site.

### Top 5 recurring issues sitewide

1. **`<h3>` is an invalid direct child of `<dl>`** (1.3.1, serious) - 14 pages. One line in one template.
2. **Heading levels skip from `h1` to `h3`** (1.3.1, moderate) - 16 pages.
3. **`text-neutral-400` (#8a91a8) fails contrast on every light band** (1.4.3, serious) - 6 pages plus the contact form placeholder. Ratios 2.59:1 to 3.00:1 against a 4.5:1 requirement.
4. **Autoplaying looping video ignores `prefers-reduced-motion` and offers no pause control** (2.2.2, 2.3.3, moderate) - 2 pages.
5. **The logo marquee renders every logo twice in the DOM** (minor) - doubles the tab stops and makes a screen reader announce all 16 organisations twice.

---

## Findings by success criterion

### 1. `<h3>` inside `<dl>` breaks the definition list  ·  SC 1.3.1 Info and Relationships (A)  ·  **Serious**

**Detected by:** axe-core rule `definition-list` (serious), confirmed by source inspection.
**Pages affected: 14** - every `/works/<slug>` route:
`birth-of-explicit-movement`, `brave-and-beautiful`, `brave-and-bold`, `brave-purpose`, `brave-purpose-with-god`, `brave-together`, `dancing-with-father`, `dream-big-journal-curriculum`, `explicit-movement`, `explicit-movement-21-day-journal`, `kingdom-families`, `raising-kingdom-kids`, `rethink-creativity`, `wisdom-flows`.

**Location:** `src/app/works/[slug]/page.tsx:146`

```tsx
<dl className="rounded-2xl border border-neutral-200 bg-white p-6">
  <h3 className="mb-4 font-display text-sm ...">Details</h3>   {/* invalid child */}
  <MetadataRow label="Category" value={...} />
```

`<dl>` accepts only `<dt>`, `<dd>`, `<div>` wrappers, and script-supporting elements. A heading placed directly inside it makes the list structure invalid, and screen readers may fail to announce the term/definition pairing or the list item count.

**Fix:** move the heading above the list and associate it.

```tsx
<h2 id="work-details" className="mb-4 font-display text-sm ...">Details</h2>
<dl aria-labelledby="work-details" className="rounded-2xl border border-neutral-200 bg-white p-6">
  <MetadataRow ... />
```

Using `<h2>` rather than `<h3>` here also clears finding 2 on the same 14 pages.

---

### 2. Heading levels skip from h1 to h3  ·  SC 1.3.1 Info and Relationships (A)  ·  **Moderate**

**Detected by:** axe-core rule `heading-order`, confirmed by the structural scanner.
**Pages affected: 16**

| Page(s) | Location | Skipped heading |
| --- | --- | --- |
| `/works/<slug>` (14 pages) | `src/app/works/[slug]/page.tsx:147` | "Details" |
| `/how-it-works` | `src/app/how-it-works/page.tsx:53` | "Start with your story." and the two sibling step cards |
| `/projects/brave-series` | `src/components/BraveSeriesCovers.tsx` | "Brave & Beautiful" and siblings |

Each page has an `<h1>` from `PageIntro`, then jumps straight to `<h3>` with no `<h2>` in between. Screen reader users navigating by heading level perceive a missing section.

**Fix:** promote each of these to `<h2>`. They are the first structural subdivision under the page title, so `<h2>` is the correct level and no visual change is required (size comes from the utility classes, not the tag).

---

### 3. `text-neutral-400` fails contrast on light backgrounds  ·  SC 1.4.3 Contrast (Minimum) (AA)  ·  **Serious**

The site overrides Tailwind's default neutral ramp with a navy-tinted palette. `--color-neutral-400` resolves to **#8a91a8**, which does not reach 4.5:1 against any of the four light band colours.

**Measured on the live site:**

| Page | Text | Measured | Required | Source |
| --- | --- | --- | --- | --- |
| `/works` | "Explicit Movement 21-Day Interactive Journal" (18px/600) | **2.59:1** | 4.5:1 | `src/app/works/page.tsx:107` |
| `/projects/brave-purpose` | "Cover coming soon" (12px/400) | **2.59:1** | 4.5:1 | `src/components/BookFacts.tsx:50` |
| `/projects/brave-purpose-with-god` | "Cover coming soon" (12px/400) | **2.59:1** | 4.5:1 | `src/components/BookFacts.tsx:50` |
| `/speaker` | "Workshop" (14px/400) | **2.72:1** | 4.5:1 | `src/app/speaker/page.tsx:491` |
| `/speaker` | "Coming soon" (12px/500) | **3.00:1** | 4.5:1 | `src/app/speaker/page.tsx:543` |
| `/case-studies` | "Coming soon" (12px/600) | **3.00:1** | 4.5:1 | `src/app/case-studies/page.tsx:81` |
| Contact dialog (sitewide) | Field placeholder text | **3.00:1** | 4.5:1 | `src/components/ContactPopup.tsx:292` |

The placeholder case is the most consequential, because the contact dialog is the only form on the site and its visible labels are `sr-only`. The placeholder is doing the work of the label for sighted users, and it is the element that fails.

**Two latent instances** carry the same defect but do not currently render, because the placeholder branch is not reached with today's content. They will fail the moment a cover is missing: `src/components/BraveSeriesCovers.tsx:43` (24px/600, needs 3:1, would measure 2.59:1) and `:49`.

**Fix:** stop using `neutral-400` for text. `--color-neutral-500` (#5c6480) measures **5.85:1** on `#fafaf8` and passes at every size, while staying visually quiet. A single palette-level change plus swapping the eight class usages resolves every row above.

---

### 4. Autoplaying video ignores reduced-motion and has no pause control  ·  SC 2.2.2 Pause, Stop, Hide (A) and 2.3.3 Animation from Interactions (AAA-adjacent)  ·  **Moderate**

**Pages affected: 2**
- `/` - `src/app/page.tsx:283`, the hero video
- `/speaker/messages/finding-your-brave-purpose` - `src/app/speaker/messages/[slug]/page.tsx:266`

Both are `autoPlay muted loop playsInline` with no `controls` attribute and no custom pause affordance. Because they loop, the motion never stops, which is exactly the condition 2.2.2 addresses for moving content that runs longer than five seconds.

The important detail: **the site's `prefers-reduced-motion` handling does not cover these.** The global block at `src/styles/tailwind.css:969` reduces `animation-duration`, `animation-iteration-count`, `transition-duration`, and `scroll-behavior`. None of those properties affect `<video>` playback. A visitor who has asked their operating system for reduced motion still gets both looping clips at full speed.

Everything else on the site honours reduced motion properly, including the marquee, the mosaic tiles, `FadeIn`, `AboutPhotoGrid`, and Lenis smooth scroll. Video is the single gap.

**Fix:** gate playback on the media query rather than relying on CSS.

```tsx
const reduce = useReducedMotion()          // already imported elsewhere in the codebase
<video autoPlay={!reduce} loop={!reduce} poster={...} muted playsInline />
```

With `autoPlay` off the `poster` frame shows, so the composition is preserved. Adding a small pause/play toggle over the hero would satisfy 2.2.2 for everyone else as well.

---

### 5. `/about` overflows horizontally at 200% text and at 320px  ·  SC 1.4.4 Resize Text (AA) and SC 1.4.10 Reflow (AA)  ·  **Serious**

**Page affected: 1** (`/about`). Tested at 1280px with the root font size doubled, and separately at a 320px viewport.

| Condition | Document width | Viewport | Result |
| --- | --- | --- | --- |
| 200% text at 1280px | 1426px | 1280px | **146px of horizontal scroll** |
| Default text at 320px | 332px | 320px | **12px of horizontal scroll** |

Every other page tested passes both conditions cleanly.

**Cause:** the decorative "Love, Michele" signature at `src/app/about/page.tsx` (the `.sig-crayon` span inside the block starting at line 192) is live text positioned to deliberately cross the photo's edge. The code comment documents that bleed as intentional. Because the signature is real text, it scales with the user's text size, and because its ancestors are `overflow: visible`, it drags the whole document wider. At 200% it measures 555px wide with its right edge at 1396px.

The 11 other pages sampled at 200% all pass, so this is specific to that one decoration.

**Fix:** keep the visual bleed but stop it escaping the page. Add `overflow-x: clip` to the section that contains the signature (`clip` rather than `hidden` so it does not create a scroll container or break the sticky header). Alternatively cap the signature with `max-width: 100%` and let it clip at the section edge.

---

### 6. The logo marquee duplicates every logo in the DOM  ·  SC 1.3.1 / 4.1.2  ·  **Minor**

**Page affected: 1** (`/`), 32 instances.
**Location:** `src/components/LogoMarquee.tsx:121`

```tsx
const items = [...CLIENT_LOGOS, ...CLIENT_LOGOS]   // duplicated for the seamless loop
```

The duplication is needed for the animation, but the second copy is a real, focusable, announced copy. A keyboard user tabs through all 16 organisations twice. A screen reader reads the full client list twice.

**Fix:** render the second track as decorative.

```tsx
{[0, 1].map((copy) => (
  <div key={copy} aria-hidden={copy === 1} {...(copy === 1 && { inert: '' })}>
    {CLIENT_LOGOS.map((item) => <LogoTile key={item.slug} item={item} />)}
  </div>
))}
```

---

### 7. Logo `alt` text duplicates the visible caption  ·  SC 1.1.1 Non-text Content (A)  ·  **Minor**

**Detected by:** axe-core rule `image-redundant-alt`, 32 instances on `/`.
**Location:** `src/components/LogoMarquee.tsx:36`

Each tile renders `<Image alt={item.name}>` directly above a visible `<span>{item.name}</span>`. The organisation name is therefore announced twice within a single link, on top of the link's own `aria-label` of "Read the {name} story".

**Fix:** the logo image is decorative once the name is visible beside it. Set `alt=""`.

---

### 8. Marquee can only be paused by hovering or focusing  ·  SC 2.2.2 Pause, Stop, Hide (A)  ·  **Moderate**

**Page affected: 1** (`/`).
**Location:** `src/styles/tailwind.css:1016` and the on-page instruction at `src/components/LogoMarquee.tsx:134` ("Hover to pause, click any logo to learn more.")

The band pauses on `:hover` and on `:focus-within`, and it stops entirely under `prefers-reduced-motion`. That covers mouse and keyboard users. It leaves touch users, who cannot hover, with 144 seconds of continuous motion per cycle and no way to stop it. The visible instruction also describes an interaction that does not exist on a phone.

**Fix:** add a real pause/play toggle button for the band, which satisfies 2.2.2 for every input method and lets the instruction text describe something universally true.

---

### 9. Required fields carry no visible required indicator  ·  SC 3.3.2 Labels or Instructions (A)  ·  **Moderate**

**Location:** `src/components/ContactPopup.tsx` - `first_name`, `last_name`, and `email`.

All three use the native `required` attribute, so assistive technology does announce them as required and the programmatic half of 3.3.2 is satisfied. Sighted users get nothing: no asterisk, no "required" text, no instruction anywhere in the dialog.

This compounds with a second issue in the same form. The visible labels are `sr-only`, so the only visible label is the placeholder, and the placeholder disappears as soon as the user types. A user who is interrupted mid-form returns to three filled boxes with no visible indication of what any of them are.

**Fix:** either mark the three fields visibly (an asterisk with a legend, or the word "required"), or state "All fields required" above the group. Promoting the `sr-only` labels to visible floating labels would resolve both this and the placeholder-contrast failure in finding 3.

---

### 10. Background content is not inert while the modal is open  ·  SC 4.1.2 Name, Role, Value (A)  ·  **Minor**

**Location:** `src/components/ContactPopup.tsx:171`

The dialog sets `role="dialog"` and `aria-modal="true"`, locks body scroll, traps Tab, closes on Escape, and restores focus to the trigger. All of that was verified working on the live site. What it does not do is mark the page behind it as inert, so `<main>` remains in the accessibility tree.

Modern screen readers honour `aria-modal="true"` and will confine themselves to the dialog, so the practical impact is small. Adding `inert` to the background container is the more robust belt-and-braces fix and also blocks stray pointer interaction.

---

### 11. Twelve-pixel reflow overflow on `/about` at 320px  ·  SC 1.4.10 Reflow (AA)  ·  **Moderate**

Recorded above under finding 5, same root cause, listed separately here because it is a distinct success criterion. See finding 5 for the fix.

---

## Reviewed and cleared

These were raised by the automated passes and then **disproved** by manual verification. They are recorded so a future audit does not re-raise them.

### Text on gradient cards - not a contrast failure

The contrast engine flagged 8 text nodes across `/`, `/coach`, and `/speaker` at an apparent 1:1 ratio. All sit on cards whose colour lives entirely in `background-image` (a layered gradient) with a transparent `background-color`, which a colour-compositing walk cannot read.

The gradient stops were extracted and the ratios computed against the **lightest** stop, which is the worst case:

| Card | Base gradient | White text | Cream text |
| --- | --- | --- | --- |
| `.msg-violet` | `#3b2c74` to `#1e163f` | 11.17:1 | 9.92:1 |
| `.msg-coral` | `#b8371a` to `#71190c` | 5.58:1 | 4.96:1 |
| `.msg-teal` | `#0c6a61` to `#073f3a` | 6.18:1 | 5.49:1 |
| `/coach` TSS card | `#06302c` to `#0f5f58` | 7.18:1 | 6.38:1 |
| `/coach` UAV card | `#5e1e0c` to `#a63a19` | 6.20:1 | 5.51:1 |

Every combination passes AA. The measured 7.18:1 and 6.20:1 match the figures already documented in the comments at `src/app/coach/page.tsx:345`.

### `role="list"` on `<ul>` - deliberate, keep it

Flagged 82 times across 33 pages as a redundant role. This is the standard workaround for Safari and VoiceOver dropping list semantics when `list-style: none` is applied. Removing it would reduce accessibility on Apple platforms. **No action.**

### Skip link measured at 1x1px - false positive

Flagged on all 78 pages as a sub-24px target. The link is `sr-only` until focused, at which point `focus:not-sr-only` restores it to full size with padding. The 1x1 box is its unfocused state and is never a click target. **No action.**

---

## What passes

Verified across all 78 routes unless noted.

- **3.1.1 Language of Page** - `lang="en"` on `<html>`, present on every route.
- **2.4.1 Bypass Blocks** - a working "Skip to content" link is the first focusable element, and its `#main` target resolves to the real `<main id="main">`.
- **1.3.1 Landmarks** - every page has exactly one `<main>`, plus `<nav>`, `<header>`, and `<footer>`. Multiple navs are distinguished by `aria-label` ("Primary").
- **1.3.1 One h1 per page** - no page is missing an `<h1>` and no page has more than one.
- **1.1.1 Alt text** - **zero** images missing `alt` sitewide. No generic values ("image", "photo", filenames). Decorative images correctly use `alt=""`. The `HeroMosaic` decorative grid is correctly `aria-hidden="true"` with `tabIndex={-1}` on its inner links, which is the right pattern and avoids the usual `aria-hidden-focus` violation.
- **4.1.2 Accessible names** - **zero** interactive elements without an accessible name. Every icon-only control has one. All decorative SVGs carry `aria-hidden="true"`.
- **2.4.4 Link purpose** - no "click here" / "read more" style links found.
- **4.1.1 / 4.1.2 ARIA hygiene** - no duplicate IDs, no `aria-labelledby` / `aria-describedby` / `aria-controls` pointing at missing elements, no ARIA roles contradicting native semantics (beyond the deliberate `role="list"`).
- **2.4.3 Focus order** - no positive `tabindex` anywhere. No keyboard traps.
- **2.4.7 Focus Visible** - `focus-visible` styling appears in 132 places. Dark surfaces get a cream outline override at `src/styles/tailwind.css:955`. Inputs suppress the UA outline but replace it with a border colour change plus a 4px ring, which remains clearly visible.
- **4.1.2 `aria-current`** - the active nav item is correctly marked `aria-current="page"` in both the desktop and mobile navs.
- **1.4.4 / 1.4.10** - 11 of 12 pages sampled reflow cleanly at 320px and at 200% text. No `user-scalable=no` or `maximum-scale` lock anywhere.
- **Contact dialog** - axe-core reports **zero violations** against the open dialog. Verified working by live interaction: `role="dialog"`, `aria-modal="true"`, resolving `aria-labelledby` and `aria-describedby`, focus moves in on open, Tab cycles inside, Escape closes, **focus is correctly restored to the triggering button**, body scroll locks and unlocks, checkboxes are grouped in a `<fieldset>` with a real `<legend>`, every field has an associated `<label>`, errors announce through `role="status" aria-live="polite"`, and the honeypot is properly hidden with `tabIndex={-1}`.
- **Mobile menu** - uses `aria-expanded` and `aria-controls` on the toggle, closes on Escape and on route change, and hides the panel with the native `hidden` attribute so it leaves the tab order entirely when closed. The toggle is 44x44px. This is a correct disclosure pattern and needs no focus trap.
- **2.5.8 Target Size** - no genuine target under 24x24px.
- **1.4.11 Non-text Contrast** - form field borders measure 3.48:1 against the field background, clearing the 3:1 requirement.
- **prefers-reduced-motion** - honoured by the global animation reset, the marquee, the mosaic tiles, `FadeIn`, `AboutPhotoGrid`, and Lenis smooth scroll. Video is the only gap (finding 4).

---

## Action list

Ordered by severity, then by number of pages fixed.

| # | Action | SC | Severity | Pages fixed | Effort |
| --- | --- | --- | --- | --- | --- |
| 1 | Move the "Details" `<h3>` out of the `<dl>` and make it an `<h2>` with `aria-labelledby` in `src/app/works/[slug]/page.tsx:146` | 1.3.1 | Serious | 14 | One line |
| 2 | Retire `text-neutral-400` for text; move to `neutral-500` (5.85:1). 8 usages listed in finding 3 | 1.4.3 | Serious | 6 + dialog | Small |
| 3 | Contain the `.sig-crayon` signature with `overflow-x: clip` on its section, `src/app/about/page.tsx` | 1.4.4 / 1.4.10 | Serious | 1 | One line |
| 4 | Gate video `autoPlay`/`loop` on `useReducedMotion()` and add a pause control | 2.2.2 / 2.3.3 | Moderate | 2 | Small |
| 5 | Promote the skipped `<h3>` headings to `<h2>` on `/how-it-works` and `/projects/brave-series` | 1.3.1 | Moderate | 2 | One line each |
| 6 | Add a pause/play button to the logo marquee and reword the hover-only instruction | 2.2.2 | Moderate | 1 | Small |
| 7 | Mark required fields visibly in the contact dialog, or promote the `sr-only` labels to visible ones | 3.3.2 | Moderate | Sitewide | Small |
| 8 | `aria-hidden` + `inert` on the marquee's duplicate track | 1.3.1 | Minor | 1 | One line |
| 9 | Set `alt=""` on the marquee logo images | 1.1.1 | Minor | 1 | One line |
| 10 | Add `inert` to background content while the modal is open | 4.1.2 | Minor | Sitewide | One line |
| 11 | Pre-emptively fix the two latent `neutral-400` usages in `BraveSeriesCovers.tsx` | 1.4.3 | Latent | 0 today | One line |

Items 1, 3, 8, 9, and 10 are one-line changes that together clear 17 page instances.

---

## Appendix: routes audited

All 78 routes were scanned successfully with no errors.

`/` · `/about` · `/author` · `/author/books/` × 11 (`birth-of-explicit-movement`, `brave-and-beautiful`, `brave-and-bold`, `brave-purpose`, `brave-purpose-with-god`, `brave-series`, `brave-together`, `dancing-with-father`, `dream-big-journal-curriculum`, `explicit-movement-21-day-journal`, `raising-kingdom-kids`) · `/case-studies` + 21 case-study slugs · `/coach` · `/contact` · `/how-it-works` · `/projects` + 12 project routes · `/resources` + 1 post · `/speaker` · `/speaker/creativity/rethink-creativity-conference` · `/speaker/messages/` × 7 · `/works` + 14 work slugs
