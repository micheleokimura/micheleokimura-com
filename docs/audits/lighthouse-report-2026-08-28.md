# Google Lighthouse audit

**Site:** https://micheleokimura.com
**Date:** 2026-08-28
**Scope:** all 78 published routes from `sitemap.xml`
**Status:** analysis only. No site code was changed.

---

## How this audit was run, and what could not be run

The brief asked for `npx lighthouse`, with the PageSpeed Insights API as the fallback. **Neither was available**, so both need stating plainly before any number below is read.

| Requested | Outcome |
| --- | --- |
| `npx lighthouse` | **Impossible on this machine.** There is no Node runtime: `node`, `npm`, `npx`, `pnpm`, `yarn`, `bun`, and `deno` are all absent, and so are Docker and Homebrew. Nothing installable from npm can run here. |
| PageSpeed Insights API, keyless | **Impossible as of this run.** Google now sets the anonymous quota to zero. Every request to `runPagespeed` returns `429 RESOURCE_EXHAUSTED` with `"quota_limit_value": "0"` against `defaultPerDayPerProject`. This is not rate limiting that waiting solves, it is a quota of zero. A Google Cloud API key would lift it. |

The substitute was to run the measurements directly against live production in a real Chromium, using the technique this repo already used for the WCAG audit: inject the tooling into the page and fan out over all 78 routes in same-origin iframes at a 412 x 915 viewport with `devicePixelRatio` 2, which is close to Lighthouse's mobile emulation of 412 x 823 at DPR 2.625.

**What that reproduces faithfully:**

| Lighthouse category | What was actually run |
| --- | --- |
| Accessibility | **axe-core 4.10.2**, which is the same engine Lighthouse embeds, on all 78 routes. Ruleset `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice`. |
| SEO | Every binary Lighthouse SEO audit checked directly: title, meta description, canonical, `robots`, viewport, `lang`, crawlable anchors, legible font size, link text, `h1` structure, and structured data. |
| Best Practices | Console errors, mixed content, doctype, charset, `target="_blank"` safety, third-party origins, and image aspect ratio. |
| Performance, byte weight | Exact per-page transfer weight from Resource Timing `encodedBodySize`, plus an independent `curl` crawl of all 78 pages and all 1,072 subresources measuring real wire bytes with browser-accurate `Accept` headers. |

**What could not be measured, and is therefore absent rather than estimated:**

**LCP, FCP, and Speed Index are not in this report.** The browser pane runs with `document.visibilityState === "hidden"`, and Chrome does not emit `largest-contentful-paint` or `paint` timing for a document that has never been visible. Both were confirmed empty. Rather than model them and present the model as measurement, they are omitted. Total Blocking Time was measurable, because `longtask` entries are recorded regardless of visibility.

**No 0 to 100 category scores are given.** A Lighthouse score is the output of its simulated-throttling engine applied to metrics that could not be captured here. Publishing invented numbers in that shape would be worse than publishing none. What follows is audit-level pass and fail per route, which is what the scores are computed from, plus exact measurements.

One consequence for the numbers: the byte figures are exact, but the timings were taken over a fast connection with no throttling, so they are a floor rather than a field estimate.

**The site changed during the audit.** Three commits landed on `main` and redeployed while the scan was running (`c26ee60`, `d7905eb`, `895ecef`). The sitemap changed with them: `/case-studies/brave-bold-conference-nov-2025` was removed and `/case-studies/first-assembly-of-god` was added. Every figure below was re-measured against the post-deploy site. One finding from the first pass, a sitemap URL that returned a 308 redirect, was fixed by that deploy and is recorded as resolved.

---

## Executive summary

Performance is dominated by four defects, and none of them are the ones a site with over 140 MB of source images on disk would be expected to have. The image pipeline is genuinely excellent: every image goes through `next/image`, all 1,046 image responses are served as AVIF, and **zero images anywhere on the site are oversized for their display box** at DPR 2. There is no "serve next-gen images" work to do.

The weight is somewhere else. **Every page carries a 519 KB shell before a single pixel of content**, and 131 KB of that is one font file downloaded twice.

### The four findings that matter

1. **The Mona Sans variable font is downloaded twice on all 78 routes.** `/_next/static/media/Mona_Sans_var-s.p.2jyexctz61fvc.woff2` and `/_next/static/media/Mona-Sans.var.2jyexctz61fvc.woff2` are byte-identical, same SHA-256 `6bde7bbf...`, 133,748 bytes each. The font is declared twice, once through `next/font/local` in `src/app/layout.tsx:33` and once as a raw `@font-face` in `src/styles/base.css:1`. Turbopack emits it under two names and the browser fetches both. **131 KB of pure waste on every page**, and because both declare `font-display: block`, both block text rendering.

2. **Nothing is cacheable by the browser.** All 1,046 optimized images, both videos, and every file in `/public` are served `Cache-Control: public, max-age=0, must-revalidate`. Only `/_next/static/*` gets `immutable`. Repeat visits do not re-download (a conditional request returns 304, confirmed), but every asset costs a blocking revalidation round trip, measured at roughly 275 ms each. On `/about`, that is 30 round trips before the page settles.

3. **An 8 MB video downloads on page open.** `/speaker/messages/finding-your-brave-purpose` transfers **8,534 KB**, sixteen times the median page. The `<video>` at `src/app/speaker/messages/[slug]/page.tsx:266` sets `preload="metadata"`, but it also sets `autoPlay`, and autoplay overrides preload: Chrome fetches the whole file immediately. The home page hero has the same shape with a 5.1 MB clip.

4. **A preloaded script 404s on all 78 routes.** Every page has `<link rel="preload" href="/_vercel/insights/script.js" as="script">` in its head, and that URL returns **404**. Vercel Web Analytics is wired into the app but not enabled on the project. This is a console error on every route, which is a direct Lighthouse Best Practices failure, plus a wasted preload.

### What is in good shape

- **Accessibility:** only three axe rules fail anywhere, and two of them come from a single template. Zero images without alt text, exactly one `h1` per route, no mixed content, no unsafe `target="_blank"`.
- **Images:** zero oversized, zero unsized (so no layout shift from images), lazy loading working correctly. The home page defers 32 of its 34 images.
- **Main thread:** Total Blocking Time measured at 17 ms on the home page with one long task. JavaScript is 223 KB compressed across 13 chunks. This is not a site with a JavaScript problem.
- **SEO fundamentals:** all 78 routes have a canonical, an `og:image`, JSON-LD, one `h1`, and a viewport. No route is `noindex`. No sitemap URL redirects.


---

## 1. Performance

### 1.1 The 519 KB shell

Every route pays this before content:

| Asset class | Compressed | Detail |
| --- | --- | --- |
| Fonts | **280 KB** | Mona Sans 130.6 KB, **twice**, plus Mrs Saint Delafield 18.4 KB |
| JavaScript | 223 KB | 13 chunks, largest 69.7 KB |
| CSS | 16 KB | one stylesheet, render-blocking, correct |
| **Total** | **519 KB** | before any page content |

Fonts are the largest single class on the site, and half of that is a duplicate.

### 1.2 The duplicate font, in detail

```
src/app/layout.tsx:33     localFont({ src: '../fonts/Mona-Sans.var.woff2', display: 'block', ... })
src/styles/base.css:1     @font-face { font-family: 'Mona Sans'; font-display: block;
                            src: url('../fonts/Mona-Sans.var.woff2') format('woff2'); }
```

The served stylesheet contains **four** `@font-face` blocks and references three distinct woff2 URLs, two of which are the same file:

```
url(../media/Mona-Sans.var.2jyexctz61fvc.woff2)        133,748 B
url(../media/Mona_Sans_var-s.p.2jyexctz61fvc.woff2)    133,748 B   <- identical, sha256 6bde7bbf...
url(/fonts/MrsSaintDelafield-Regular-latin.woff2)       18,792 B
```

Only the first is preloaded. The second is discovered when the CSS parses, so it starts late and still blocks text.

**Fix:** delete the `@font-face` block in `src/styles/base.css:1-8` and let the `--font-mona-sans` variable from `next/font/local` be the only declaration. **Saves 131 KB on all 78 routes** and removes one render-blocking font fetch.

**Second fix, same area:** both declarations use `font-display: block`, which hides text for up to 3 seconds while the font loads. `swap` renders text immediately in the fallback. This is a deliberate-looking choice, so it is flagged rather than assumed wrong, but it is the single biggest lever on perceived first paint that this site has.

`/fonts/MrsSaintDelafield-Regular-latin.woff2` is also served from `/public` with `max-age=0`, so it revalidates on every navigation. It should be fingerprinted and served immutable, or imported through `next/font/local` like Mona Sans.

### 1.3 Cache policy

Measured across all 1,072 subresources:

| Asset class | Count | `Cache-Control` |
| --- | --- | --- |
| `_next/image` (optimized images) | 1,046 | `public, max-age=0, must-revalidate` |
| `/public` files (videos, fonts, icons) | 9 | `public, max-age=0, must-revalidate` |
| `_next/static` (JS, CSS, fingerprinted fonts) | 16 | `public, max-age=31536000, immutable` |

Only the last line is right. The optimizer inherits `max-age=0` from the `/public` upstream, so every optimized image inherits it too.

To be precise about the cost: a conditional request was tested and returns `304` with zero bytes, so this is **not** re-downloading. It is a forced network round trip per asset per navigation, measured at 275 ms. Lighthouse scores this as `uses-long-cache-ttl`.

**Fix, one file:**

```ts
// next.config.ts
images: {
  minimumCacheTTL: 31536000,   // currently unset, so it defaults to 0 here
  ...
},
async headers() {
  return [
    { source: '/videos/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    { source: '/fonts/:path*',  headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }] },
  ]
}
```

Content-addressed filenames matter here: `/videos/michele-hero.mp4` is not fingerprinted, so `immutable` on it means a re-cut clip needs a new filename.

### 1.4 Video

| File | Bytes | Page | Markup |
| --- | --- | --- | --- |
| `/videos/brave-purpose-keynote.mp4` | **8,003 KB** | `/speaker/messages/finding-your-brave-purpose` | `autoPlay`, `preload="metadata"` |
| `/videos/michele-hero.mp4` | **5,106 KB** | `/` | `autoPlay`, no `preload` |

`preload="metadata"` at `src/app/speaker/messages/[slug]/page.tsx:273` is inert, because `autoPlay` on the same element tells Chrome to fetch enough to play, which for a looping muted hero is the entire file. The measurement confirms it: the initial load of that route is 8,534 KB, and 8,003 KB of it is the video.

**Fixes, in order of how much they cost to do:**

1. Set `Cache-Control: immutable` on `/videos/*` (see 1.3). The clip is then fetched once per visitor rather than revalidated per visit.
2. Drop `autoPlay` on the keynote and start playback from an `IntersectionObserver` when the element scrolls into view, keeping the poster as the paint. The home hero is above the fold so it has a stronger case for autoplay, but the keynote video sits below the fold.
3. Re-encode. Both files are large for their duration. There is no `ffmpeg` on this machine so no re-encode was attempted and no savings figure is claimed, but 8 MB for a web hero loop is roughly four times what an H.264 encode at a sane bitrate needs.

### 1.5 Two images bypass the optimizer

Both are video posters, so they are in the critical path, and both are served as raw JPEG straight from `/public`:

| File | Served now | Through `next/image` at `w=828` | Saving |
| --- | --- | --- | --- |
| `/team/michele-hero-canva.jpg` | **196,457 B** JPEG | **10,154 B** AVIF | **186 KB, 95%** |
| `/videos/brave-purpose-keynote-poster.jpg` | **402,129 B** JPEG | **32,975 B** AVIF | **361 KB, 92%** |

Both are 1920 x 1080. The AVIF figures are not estimates: they were fetched from the live optimizer, which already serves these exact files correctly when asked through `/_next/image`.

The home page poster is the more urgent of the two, because it is the largest single item in the home page's initial load: of 716 KB initial transfer, 192 KB is this one file.

**Fix:** the `poster` attribute takes a URL, so it cannot use `next/image` directly. Either pre-convert both files to AVIF or WebP and point `poster` at those, or reference the optimizer URL directly, for example `poster="/_next/image?url=%2Fteam%2Fmichele-hero-canva.jpg&w=1920&q=75"`.

### 1.6 What is already right

- **Zero oversized images across all 78 routes.** Every `sizes` attribute resolves to a candidate that matches its display box at DPR 2. This was checked per image element, comparing `naturalWidth` against `clientWidth * 2`.
- **Zero unsized images.** Every `<img>` has explicit dimensions or `fill`, so no image causes layout shift.
- **Lazy loading is correct.** The home page loads 2 images initially out of 34. `/about` loads 3 out of 33.
- **AVIF everywhere.** 1,046 of 1,048 image responses negotiate to AVIF.
- **Compression:** HTML is Brotli, median 12.6 KB on the wire.
- **TTFB:** median 523 ms, max 723 ms, all `x-vercel-cache: HIT` prerenders.


---

## 2. Accessibility

axe-core 4.10.2 on all 78 routes, zero scan errors. **Three rules fail. Two of them are one line of one template.**

| Rule | Impact | Routes | Nodes | Cause |
| --- | --- | --- | --- | --- |
| `heading-order` | moderate | 16 | 16 | Heading levels skip |
| `definition-list` | serious | 14 | 14 | `<h3>` is a direct child of `<dl>` |
| `image-redundant-alt` | minor | 1 | 32 | Logo `alt` repeats adjacent visible text |

### 2.1 `definition-list` and `heading-order`, one shared cause

`src/app/works/[slug]/page.tsx:146`:

```tsx
<dl className="rounded-2xl border border-neutral-200 bg-white p-6">
  <h3 className="mb-4 font-display text-sm ...">Details</h3>     {/* <- both violations */}
  <MetadataRow label="Category" ... />
```

A `<dl>` may only directly contain `<dt>`, `<dd>`, `<div>`, `<script>`, or `<template>`. The `<h3>` breaks that, which is the `definition-list` failure on all 14 `/works/*` routes. The same `<h3>` is also the first heading after the `<h1>`, skipping `<h2>`, which is the `heading-order` failure on those same 14 routes.

**Fix, one edit repairs 14 routes and both rules:** move the heading out of the `<dl>` and promote it to `<h2>`.

```tsx
<h2 className="mb-4 font-display text-sm ...">Details</h2>
<dl className="rounded-2xl border border-neutral-200 bg-white p-6">
  <MetadataRow label="Category" ... />
```

### 2.2 The two remaining `heading-order` routes

| Route | Outline | Fix |
| --- | --- | --- |
| `/how-it-works` | `h1` then `h3, h3, h3` then `h2` | Promote the three step headings to `h2` |
| `/projects/brave-series` | `h1` then `h3, h3, h3` then `h2` | Promote the three title cards to `h2` |

### 2.3 `image-redundant-alt` on the home page

32 client logos in the logo wall carry `alt` text identical to the visible caption beside them, so a screen reader announces each organisation twice. The fix is `alt=""` on the logo image wherever the name is already rendered as text next to it.

Note this audit ran with `loading="lazy"` forced to `eager` so that every image would load and be measurable. That affects nothing axe checks.

### 2.4 Cross-reference

`docs/audits/wcag-audit-2026-08-28.md` covers WCAG 2.2 AA in far more depth than Lighthouse's accessibility category, including contrast, focus, and reflow, which axe cannot decide on its own. This section is the Lighthouse-shaped subset and does not supersede it.

---

## 3. Best Practices

| Audit | Result |
| --- | --- |
| `errors-in-console` | **FAIL on all 78 routes.** `/_vercel/insights/script.js` returns 404 |
| `is-on-https` | Pass |
| `no-mixed-content` | Pass, zero `http:` subresources on any route |
| `doctype` | Pass on all 78 |
| `charset` | Pass on all 78, UTF-8 |
| `image-aspect-ratio` | Pass, zero distorted images |
| `external-anchors-use-rel-noopener` | Pass, zero unsafe `target="_blank"` |
| `third-party-cookies` | Pass, no third-party origins on 76 of 78 routes |
| `csp-xss` | **FAIL**, no Content-Security-Policy header |
| `has-hsts` | Pass, `max-age=63072000`, missing `includeSubDomains` and `preload` |

### 3.1 The 404 on every page

```html
<link rel="preload" href="/_vercel/insights/script.js" as="script"/>   <-- 404
<link rel="preload" href="/_vercel/speed-insights/script.js" as="script"/>  <-- 200, 4,572 B
```

`@vercel/analytics` is mounted in the app but Web Analytics is not enabled on the Vercel project, so the endpoint does not exist. Speed Insights loads, but its `POST /_vercel/speed-insights/vitals` beacon is aborted as well, so no vitals are reaching Vercel either.

**Fix:** enable Web Analytics and Speed Insights in the Vercel project settings, or remove the `<Analytics />` component. Leaving it as is means a console error and a wasted preload on every page view, and no data collected in exchange. This is the same dark-analytics problem recorded in section 8 of `docs/audits/seo-security-audit-2026-08-28.md`, with the concrete network cause attached.

### 3.2 Security headers

Only HSTS is set. CSP, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` are all absent. This was already the headline finding of `docs/audits/seo-security-audit-2026-08-28.md` section 6, which carries a ready-to-paste `headers()` block. Not duplicated here.

---

## 4. SEO

All 78 routes pass every structural Lighthouse SEO audit: indexable, canonical present and self-referential, viewport set, `lang="en"`, one `h1`, `og:image`, JSON-LD, all anchors crawlable with `href`, zero internal `nofollow`, legible font sizes, and descriptive link text with no "click here" anywhere.

Two content-level issues remain, both already documented in `docs/audits/seo-security-audit-2026-08-28.md` and re-measured here against the current deploy:

- **9 duplicate title groups covering 24 routes.** Three URL families (`/works/*`, `/projects/*`, `/author/books/*`) publish the same twelve subjects with identical `<title>` values and self-canonicals, so they compete with each other. Section 4.3 of the SEO audit has the analysis.
- **Descriptions outside the 70 to 160 character window on 49 of 78 routes**, 25 too short and 24 too long.

**One item newly measured here:** the `/works/*` family is the thinnest content on the site, 141 to 172 words per page, and each of those routes has exactly one inbound internal link. Combined with the duplicate titles, that family is the weakest SEO surface on the site and the best candidate for consolidation.

**Resolved during this audit:** `/case-studies/brave-bold-conference-nov-2025` was listed in `sitemap.xml` while returning a 308 to `/case-studies/leeward-community-church`, and had zero inbound internal links. The deploy that landed mid-audit removed it from the sitemap. The redirect still works. No action needed.


---

## 5. Per-route results

`Initial` is what transfers on load. `Full` additionally includes every lazy image, forced to load. Both are compressed transfer bytes measured from Resource Timing. `A11y` lists failing axe rules.

| Route | Initial KB | Full KB | Img KB | Imgs | Title | Desc | A11y | Notes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `/speaker/messages/finding-your-brave-purpose` | 8534 | 8534 | 0 | 2 | 44 | 174 | clean | **8003 KB video**; desc 174c |
| `/about` | 557 | 1573 | 1032 | 33 | 31 | 249 | clean | desc 249c |
| `/` | 716 | 813 | 289 | 34 | 52 | 175 | redundant-alt | desc 175c |
| `/author` | 636 | 671 | 135 | 19 | 24 | 270 | clean | desc 270c |
| `/author/books/brave-series` | 540 | 572 | 37 | 15 | 41 | 248 | clean | desc 248c |
| `/projects/brave-series` | 539 | 567 | 28 | 15 | 34 | 251 | head-order | desc 251c |
| `/author/books/brave-and-beautiful` | 559 | 559 | 28 | 3 | 35 | 98 | clean | 142w thin |
| `/projects/brave-series/brave-and-beautiful` | 535 | 555 | 21 | 7 | 35 | 160 | clean |  |
| `/author/books/dream-big-journal-curriculum` | 551 | 551 | 17 | 11 | 47 | 50 | clean | desc 50c |
| `/projects/raising-kingdom-kids` | 535 | 547 | 12 | 4 | 38 | 199 | clean | desc 199c |
| `/author/books/brave-together` | 542 | 542 | 12 | 3 | 32 | 72 | clean | 166w thin |
| `/projects/dream-big-journals` | 541 | 541 | 0 | 11 | 40 | 167 | clean | desc 167c |
| `/author/books/brave-and-bold` | 540 | 540 | 9 | 3 | 30 | 89 | clean | 141w thin |
| `/works` | 534 | 540 | 7 | 7 | 23 | 142 | clean |  |
| `/projects/brave-series/brave-together` | 535 | 539 | 4 | 7 | 32 | 236 | clean | desc 236c |
| `/author/books/explicit-movement-21-day-journal` | 538 | 538 | 7 | 3 | 66 | 160 | clean | title 66c |
| `/case-studies` | 538 | 538 | 0 | 3 | 30 | 103 | clean |  |
| `/projects/brave-purpose` | 537 | 537 | 0 | 3 | 31 | 140 | clean |  |
| `/projects/brave-purpose-with-god` | 537 | 537 | 0 | 3 | 40 | 160 | clean |  |
| `/projects/dancing-with-father` | 537 | 537 | 0 | 4 | 37 | 158 | clean |  |
| `/speaker` | 537 | 537 | 0 | 4 | 25 | 196 | clean | desc 196c |
| `/case-studies/pacific-rim-christian-university` | 536 | 536 | 0 | 3 | 63 | 50 | clean | title 63c; desc 50c |
| `/projects/birth-of-explicit-movement` | 536 | 536 | 0 | 4 | 48 | 154 | clean |  |
| `/resources/2026-michele-okimura-hawaii-governor-award` | 536 | 536 | 2 | 4 | 122 | 182 | clean | title 122c; desc 182c |
| `/coach` | 535 | 535 | 0 | 2 | 23 | 149 | clean |  |
| `/projects/brave-series/brave-and-bold` | 535 | 535 | 0 | 7 | 30 | 162 | clean | desc 162c |
| `/projects/kingdom-kids` | 535 | 535 | 0 | 3 | 43 | 167 | clean | desc 167c |
| `/projects/rethink-creativity` | 535 | 535 | 0 | 3 | 36 | 177 | clean | desc 177c |
| `/author/books/birth-of-explicit-movement` | 533 | 533 | 0 | 3 | 90 | 221 | clean | title 90c; desc 221c |
| `/author/books/dancing-with-father` | 533 | 533 | 0 | 3 | 37 | 194 | clean | desc 194c |
| `/case-studies/hawaii-baptist-academy` | 533 | 533 | 0 | 3 | 54 | 46 | clean | desc 46c |
| `/case-studies/kamehameha-schools` | 533 | 533 | 0 | 3 | 49 | 52 | clean | desc 52c |
| `/projects` | 533 | 533 | 0 | 3 | 26 | 158 | clean |  |
| `/speaker/messages/activating-your-creativity` | 533 | 533 | 0 | 3 | 44 | 199 | clean | desc 199c |
| `/speaker/messages/building-a-kingdom-culture` | 533 | 533 | 0 | 3 | 68 | 215 | clean | title 68c; desc 215c |
| `/author/books/raising-kingdom-kids` | 532 | 532 | 0 | 3 | 38 | 205 | clean | desc 205c |
| `/case-studies/christian-academy` | 532 | 532 | 0 | 3 | 48 | 37 | clean | desc 37c |
| `/case-studies/missionary-church-hawaii` | 532 | 532 | 0 | 3 | 56 | 58 | clean | desc 58c |
| `/case-studies/nancy-vuu` | 532 | 532 | 0 | 3 | 40 | 58 | clean | desc 58c |
| `/case-studies/the-foursquare-church` | 532 | 532 | 0 | 3 | 52 | 49 | clean | desc 49c |
| `/case-studies/transform-our-world-hawaii` | 532 | 532 | 0 | 3 | 50 | 53 | clean | desc 53c |
| `/speaker/creativity/rethink-creativity-conference` | 532 | 532 | 0 | 2 | 86 | 221 | clean | title 86c; desc 221c |
| `/speaker/messages/how-to-hear-gods-voice` | 532 | 532 | 0 | 3 | 41 | 286 | clean | desc 286c |
| `/author/books/brave-purpose` | 531 | 531 | 0 | 2 | 31 | 76 | clean |  |
| `/author/books/brave-purpose-with-god` | 531 | 531 | 0 | 2 | 40 | 41 | clean | desc 41c |
| `/case-studies/advance-good` | 531 | 531 | 0 | 3 | 43 | 72 | clean |  |
| `/case-studies/asu-office-of-sex-trafficking-intervention-research` | 531 | 531 | 0 | 3 | 103 | 53 | clean | title 103c; desc 53c |
| `/case-studies/first-assembly-of-god` | 531 | 531 | 0 | 3 | 52 | 48 | clean | desc 48c |
| `/case-studies/hale-kipa` | 531 | 531 | 0 | 3 | 40 | 50 | clean | desc 50c |
| `/case-studies/hanalani-schools` | 531 | 531 | 0 | 3 | 47 | 49 | clean | desc 49c |
| `/case-studies/hawaii-catholic-schools` | 531 | 531 | 0 | 3 | 55 | 55 | clean | desc 55c |
| `/case-studies/hawaii-doe-counselor-plc-maui` | 531 | 531 | 0 | 3 | 98 | 63 | clean | title 98c; desc 63c |
| `/case-studies/hawaii-state-doe` | 531 | 531 | 0 | 3 | 71 | 54 | clean | title 71c; desc 54c |
| `/case-studies/island-pacific-academy` | 531 | 531 | 0 | 3 | 53 | 50 | clean | desc 50c |
| `/case-studies/kupu-center` | 531 | 531 | 0 | 3 | 42 | 63 | clean | desc 63c |
| `/case-studies/leeward-community-church` | 531 | 531 | 0 | 3 | 55 | 55 | clean | desc 55c |
| `/case-studies/missio-nexus` | 531 | 531 | 0 | 3 | 43 | 68 | clean | desc 68c |
| `/case-studies/she-leads-america` | 531 | 531 | 0 | 3 | 48 | 80 | clean |  |
| `/how-it-works` | 531 | 531 | 0 | 3 | 30 | 108 | head-order |  |
| `/resources` | 531 | 531 | 0 | 3 | 27 | 92 | clean | 169w thin |
| `/speaker/messages/dreaming-big-with-god` | 531 | 531 | 0 | 3 | 39 | 161 | clean | desc 161c |
| `/speaker/messages/heart-wide-open` | 531 | 531 | 0 | 3 | 76 | 205 | clean | title 76c; desc 205c |
| `/speaker/messages/identity-healing-and-brave-purpose` | 531 | 531 | 0 | 3 | 103 | 214 | clean | title 103c; desc 214c |
| `/works/birth-of-explicit-movement` | 531 | 531 | 0 | 4 | 48 | 40 | head-order, def-list | desc 40c; 161w thin |
| `/works/brave-and-beautiful` | 531 | 531 | 0 | 3 | 35 | 98 | head-order, def-list | 172w thin |
| `/works/brave-and-bold` | 531 | 531 | 0 | 3 | 30 | 89 | head-order, def-list | 168w thin |
| `/works/brave-purpose` | 531 | 531 | 0 | 3 | 31 | 66 | head-order, def-list | desc 66c |
| `/works/brave-purpose-with-god` | 531 | 531 | 0 | 3 | 40 | 78 | head-order, def-list |  |
| `/works/brave-together` | 531 | 531 | 0 | 3 | 32 | 71 | head-order, def-list | 163w thin |
| `/works/dancing-with-father` | 531 | 531 | 0 | 4 | 37 | 48 | head-order, def-list | desc 48c; 165w thin |
| `/works/dream-big-journal-curriculum` | 531 | 531 | 0 | 4 | 46 | 114 | head-order, def-list |  |
| `/works/explicit-movement` | 531 | 531 | 0 | 3 | 35 | 145 | head-order, def-list | 159w thin |
| `/works/explicit-movement-21-day-journal` | 531 | 531 | 0 | 3 | 62 | 64 | head-order, def-list | title 62c; desc 64c; 141w thin |
| `/works/kingdom-families` | 531 | 531 | 0 | 3 | 34 | 78 | head-order, def-list | 141w thin |
| `/works/raising-kingdom-kids` | 531 | 531 | 0 | 4 | 50 | 102 | head-order, def-list | 172w thin |
| `/works/rethink-creativity` | 531 | 531 | 0 | 3 | 36 | 106 | head-order, def-list | 158w thin |
| `/works/wisdom-flows` | 531 | 531 | 0 | 3 | 30 | 91 | head-order, def-list | 153w thin |
| `/contact` | 530 | 530 | 0 | 3 | 35 | 142 | clean |  |

Median full page 532 KB. Mean 656 KB, pulled up by the single 8.5 MB video route. Sixty of the 78 routes sit within 3 KB of the 519 KB shell, which is the clearest evidence that the shell, and the duplicated font inside it, is where the work is.

---

## 6. Action list, ordered by impact divided by effort

### Do first: four edits, four files, roughly an hour

| # | Action | File | Impact | Effort |
| --- | --- | --- | --- | --- |
| 1 | Delete the duplicate `@font-face`. Let `next/font/local` be the only Mona Sans declaration. | `src/styles/base.css:1-8` | **131 KB off all 78 routes**, one fewer blocking font fetch | One deletion |
| 2 | Add `minimumCacheTTL` and a `headers()` block for `/videos`, `/fonts`, `/images`. | `next.config.ts` | Removes a ~275 ms revalidation round trip per asset per navigation, up to 30 per page | One block |
| 3 | Convert the two video posters to AVIF or route them through the optimizer. | `src/app/page.tsx:289`, `src/lib/speaker-messages.ts:299` | **186 KB** off `/`, **361 KB** off the keynote route | Two attribute changes plus a conversion |
| 4 | Enable Vercel Web Analytics, or remove `<Analytics />`. | Vercel dashboard or `src/app/layout.tsx` | Clears a console error and a dead preload on all 78 routes. Fixes Best Practices | One toggle |

Items 1 and 3 together take the home page's initial transfer from **716 KB to roughly 399 KB, a 44% reduction**, without touching the design.

### Do next

| # | Action | File | Impact | Effort |
| --- | --- | --- | --- | --- |
| 5 | Move `<h3>Details</h3>` out of the `<dl>` and promote it to `<h2>`. | `src/app/works/[slug]/page.tsx:146-149` | Clears **both** failing axe rules on 14 routes | One line |
| 6 | Stop the keynote video autoplaying. Start it on `IntersectionObserver`. | `src/app/speaker/messages/[slug]/page.tsx:266-274` | **8 MB** off that route's initial load | Small component change |
| 7 | Promote the step headings to `h2`. | `/how-it-works`, `/projects/brave-series` | Clears the last 2 `heading-order` routes | Two edits |
| 8 | `alt=""` on the 32 home page client logos whose names are already visible text. | home page logo wall | Clears `image-redundant-alt` | One prop |

### Then

| # | Action | Impact | Effort |
| --- | --- | --- | --- |
| 9 | Reconsider `font-display: block` in favour of `swap`. | Largest available win on perceived first paint. Text currently stays invisible for up to 3s | One property, but it is a design decision |
| 10 | Consolidate the `/works`, `/projects`, `/author/books` families. | Clears 9 duplicate title groups across 24 routes and the thinnest content on the site | Content and routing work. See SEO audit 4.3 |
| 11 | Re-encode both MP4s. | 13 MB of video across two routes | Needs `ffmpeg`, which is not on this machine |
| 12 | Add the `headers()` security block. | Already specified in SEO audit section 6 | One block, same file as item 2 |

---

## Appendix: reproducing this audit

Nothing here needs Node.

**1. Route list**

```sh
curl -s https://micheleokimura.com/sitemap.xml \
  | grep -o '<loc>[^<]*</loc>' | sed -e 's|<loc>||' -e 's|</loc>||' | sort
```

**2. Asset weight and headers.** A Python crawler fetched all 78 pages, extracted every `img`, `srcset`, `script`, `link`, and `video` reference, and fetched all 1,072 subresources with `Accept: image/avif,image/webp,...` so the optimizer negotiated the same format a browser gets. Two passes were needed: request `Accept-Encoding: gzip` for a parseable body, since Python cannot decompress the Brotli that Vercel serves by default, and remember to `html.unescape` the `&amp;` in `srcset` URLs or every `_next/image` probe fails.

**3. Verifying a saving before recommending it.** The optimizer is a public endpoint, so claimed AVIF savings can be measured rather than estimated:

```sh
curl -s -o /dev/null -w '%{size_download}\n' \
  -H 'Accept: image/avif,image/webp,*/*' \
  'https://micheleokimura.com/_next/image?url=%2Fteam%2Fmichele-hero-canva.jpg&w=828&q=75'
```

**4. Confirming the cache cost is revalidation and not re-download**

```sh
LM=$(curl -s -D - -o /dev/null "$IMG" | grep -i '^last-modified:' | sed 's/^[^:]*: //' | tr -d '\r')
curl -s -o /dev/null -w '%{http_code} %{size_download}\n' -H "If-Modified-Since: $LM" "$IMG"   # 304 0
```

**5. In-browser passes.** Three fan-outs over all 78 routes in same-origin iframes at 412 x 915. See `audit-production-via-browser-pane` in the session memory for the technique and its traps. Two additional traps were found this time:

- **Scrolling to trigger lazy images does not work here.** Scroll-driven animation on `/about` saturates the main thread and the pass stalls. Setting `img.loading = 'eager'` alone does not refetch either. What works is `im.loading='eager'; const s=im.getAttribute('src'); im.setAttribute('src',''); im.setAttribute('src', s)`.
- **`transferSize` is 0 for anything already cached, but `encodedBodySize` is populated.** Use the latter for byte weight, or every measurement reads as zero.

**6. Why no LCP.** The browser pane reports `document.visibilityState === "hidden"`, and Chrome suppresses `largest-contentful-paint` and `paint` entries for documents that were never visible. `buffered: true` observers return empty. Fronting the tab does not help, because the pane itself is hidden. Anyone re-running this with a visible browser, or with an API key for PageSpeed Insights, will get the metrics this report leaves out.
