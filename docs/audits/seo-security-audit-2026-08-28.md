# SEO, structured data, links, and security audit

**Site:** https://micheleokimura.com
**Date:** 2026-08-28
**Scope:** all 78 indexable routes in production
**Method:** production HTML fetched and parsed, full recursive link crawl, response-header inspection, source review of `src/app/**` and `src/app/api/**`
**Commit audited:** `9af9734` ("Add the free analytics stack and Search Console verification")

---

## Executive summary

The site is in good structural health. Crawlability, internal linking, canonical handling, and redirect hygiene are all clean, and the JSON-LD entity graph is better than most personal sites ever get. There are no broken links anywhere on the site.

Four things need attention, in this order:

1. **No security headers beyond HSTS.** There is no `headers()` block in `next.config.ts`, so Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and X-Frame-Options are all absent in production. This is the single largest gap in the audit.
2. **The contact endpoint has no rate limiting.** `/api/contact-message` is an unauthenticated POST that sends an email on every accepted request. Anyone can drive Michele's inbox and the Resend quota. Two further email endpoints (`/api/contact`, `/api/wait-list`) are still live in production with the same weakness, and nothing on the site posts to either of them.
3. **Twelve books and programs are covered by two or three competing URLs each.** 31 of 78 pages describe the same subject as another page, 24 pages share a byte-identical `<title>` with at least one other page, and each carries a self-referencing canonical. Twenty pages hold fewer than 150 words.
4. **Search Console verification is coded but not live.** The tag is absent from production HTML because the env var is unset in Vercel.

Structured data has three specific holes: all 21 case studies emit no page-level schema, all 11 book detail pages under `/author/books/` emit no Book node, and there is no `BreadcrumbList` anywhere on the site.

### Scorecard

| Area | State |
|---|---|
| Broken links | Clean. 0 broken of 187 unique targets |
| Images | Clean. 88 unique images, all resolve, all `<img>` carry alt text |
| Canonicals | Clean. 78 of 78 present and self-referencing correctly |
| Sitemap and robots | Clean. 78 of 78 URLs listed, exact match to crawlable set |
| Internal linking | Clean. 0 orphans, 0 empty anchors, 0 generic anchors |
| Heading structure | Clean. Every page has exactly one H1 |
| Redirects | Clean. All 8 legacy paths resolve in a single hop |
| Twitter cards | Clean. `summary_large_image` on all 78 |
| Open Graph | Complete, but `og:image` points at a per-deploy vercel.app host |
| Titles | 13 over 60 characters, 24 sharing a title with another page |
| Descriptions | 6 of 78 inside the 150-160 window |
| `theme-color` | Absent sitewide (a deliberate past decision, see 1.5) |
| Structured data | Strong graph, three coverage gaps |
| Security headers | Only HSTS. Four expected headers missing |
| Contact form | Honeypot and validation present, no rate limit, no origin check |
| Search Console | Code shipped, tag not rendering |

---

## 1. Meta tags per route

All 78 routes build metadata through `pageMetadata()` in `src/lib/schema.ts:394`, so nothing is half-filled. Every route has a title, a description, a self-referencing canonical, a full Open Graph block, and a Twitter card. The gaps are about length and uniqueness rather than presence.

### 1.1 Titles over 60 characters (13 routes)

Google truncates around 60 characters. These are cut off in results today. Note that `pageMetadata()` appends `· Michele Okimura` to the title, so the per-page string has roughly 43 characters to work with.

| Route | Length | Suggested title (before the brand suffix) |
|---|---|---|
| `/resources/2026-michele-okimura-hawaii-governor-award` | 122 | `Hawai'i Governor's Award` |
| `/case-studies/asu-office-of-sex-trafficking-intervention-research` | 103 | `ASU Trafficking Research Office` |
| `/speaker/messages/identity-healing-and-brave-purpose` | 103 | `Identity, Healing, Brave Purpose` |
| `/author/books/birth-of-explicit-movement` | 90 | `The Birth of Explicit Movement` |
| `/speaker/creativity/rethink-creativity-conference` | 86 | `ReThink Creativity Conference` |
| `/case-studies/brave-bold-conference-nov-2025` | 85 | `Brave & Bold Conference 2025` |
| `/case-studies/hawaii-doe-counselor-plc-maui` | 82 | `Maui DOE Counselor PLC` |
| `/speaker/messages/heart-wide-open` | 76 | `Heart Wide Open` |
| `/case-studies/hawaii-state-doe` | 71 | `Hawai'i State DOE` |
| `/speaker/messages/building-a-kingdom-culture` | 68 | `Building a Kingdom Culture` |
| `/author/books/explicit-movement-21-day-journal` | 66 | `21-Day Interactive Journal` |
| `/case-studies/pacific-rim-christian-university` | 63 | `Pacific Rim Christian University` |
| `/works/explicit-movement-21-day-journal` | 62 | `21-Day Interactive Journal` |

**Fix:** shorten the `title` argument at each `pageMetadata()` call site.

### 1.2 Duplicate titles (24 routes across 9 groups)

Nine titles appear on two or three URLs each. Google picks one and suppresses the rest.

| Title | Routes sharing it |
|---|---|
| `Brave & Beautiful` | `/author/books/`, `/projects/brave-series/`, `/works/` |
| `Brave & Bold` | `/author/books/`, `/projects/brave-series/`, `/works/` |
| `Brave Purpose` | `/author/books/`, `/projects/`, `/works/` |
| `Brave Purpose with God` | `/author/books/`, `/projects/`, `/works/` |
| `Brave Together` | `/author/books/`, `/projects/brave-series/`, `/works/` |
| `Dancing with Father` | `/author/books/`, `/projects/`, `/works/` |
| `Raising Kingdom Kids` | `/author/books/`, `/projects/` |
| `The Birth of Explicit Movement` | `/projects/`, `/works/` |
| `ReThink Creativity` | `/projects/`, `/works/` |

**Fix:** this is a symptom of the URL-family overlap covered in section 4.3. Resolve that first, then differentiate whatever titles remain by intent, for example `Dancing with Father` on the project page and `Dancing with Father: the story behind the book` on the author page.

### 1.3 Descriptions outside the 150-160 window (72 of 78)

Only six routes land in the target window. 48 are under 150 characters and 24 are over 160.

The shortest give a search result almost nothing to show:

| Route | Length |
|---|---|
| `/case-studies/christian-academy` | 37 |
| `/works/birth-of-explicit-movement` | 40 |
| `/author/books/brave-purpose-with-god` | 41 |
| `/case-studies/hawaii-baptist-academy` | 46 |
| `/works/dancing-with-father` | 48 |

The longest are truncated mid-sentence:

| Route | Length |
|---|---|
| `/speaker/messages/how-to-hear-gods-voice` | 286 |
| `/author` | 270 |
| `/projects/brave-series` | 251 |
| `/about` | 249 |
| `/author/books/brave-series` | 248 |

**Root cause for the short ones:** the `/works/*` and `/author/books/*` routes pass `work.subtitle` straight through as the description, and subtitles were written as one-line labels. See `src/lib/site-config.ts` `authoredWorks[].subtitle`.

**Fix:** add a dedicated `metaDescription` field to `authoredWorks` and to the case-study and speaker-message data files, then pass that to `pageMetadata()` instead of reusing `subtitle`. Write each to 150-160 characters. This keeps the visible subtitle short while giving search a full description.

### 1.4 og:image points at a per-deploy host

Every one of the 78 routes serves:

```
og:image = https://micheleokimura-eht60f2sk-michele-1448s-projects.vercel.app/og-image.jpg
```

This comes from `imageOrigin` in `src/lib/site-config.ts:35`, which prefers `process.env.VERCEL_URL`. That variable resolves to the immutable per-deployment hostname, so the value is baked fresh into every build.

The URL does return 200 today, so cards are not broken right now. The problems are structural:

- The hostname changes on every deploy. Any link shared before today points at an older deployment URL, and those are not guaranteed to stay reachable.
- Social scrapers cache by image URL, so every deploy invalidates every cached card and forces a refetch.
- The card image is served from a different host than the canonical domain, which is a weak trust signal.

The code comment justifying this says micheleokimura.com "is still the old WordPress site on WP Engine". That is no longer true. The apex domain now serves this Next.js app from Vercel, and `https://micheleokimura.com/og-image.jpg` returns the identical 130,287-byte JPEG.

**Fix:** collapse `imageOrigin` to `siteConfig.url` in `src/lib/site-config.ts` and delete the `VERCEL_URL` branch. One-line change, and the stale comment goes with it.

### 1.5 theme-color absent on all 78 routes

`src/app/layout.tsx` documents this as deliberate: the top of the page is navy on the home hero and band-1 everywhere else, so one sitewide tint would be wrong somewhere.

That reasoning holds for a single static value, but it is solvable. Next supports an array keyed by media query, and per-route `viewport` exports override the root.

**Fix (optional):** export `viewport` from `src/app/page.tsx` with the navy value, and set the band-1 value in the root layout for every other route. If that is more churn than it is worth, leaving this as-is costs only the browser chrome tint on mobile.

### 1.6 robots meta

No route emits a `robots` meta tag, so all 78 default to `index, follow`. That is correct for every current page. No action needed.

---

## 2. Structured data (JSON-LD)

The entity graph in `src/lib/schema.ts` is the strongest part of this site. Three stable `@id` values (`#person`, `#website`, and the org node) let every page reference Michele by ID instead of repeating an inline Person object, which is exactly what allows a search engine to collapse all 78 pages into one entity. The award attribution is correctly placed on the organization rather than on Michele.

Every page carries `Person`, `WebSite`, `NGO`, and `PodcastSeries` from the root layout and footer. What follows is what sits on top of that.

### 2.1 All 21 case studies emit no page-level schema

`src/app/case-studies/[slug]/page.tsx` renders no JSON-LD component. Every one of the 21 case-study pages carries only the sitewide graph.

These are the authority stack. They are the pages that show Michele producing transformational written content for named institutions, and right now a search engine sees them as generic pages about a person.

**Fix:** import `ArticleJsonLd` in `src/app/case-studies/[slug]/page.tsx` and emit an `Article` per case study, the same way `src/app/resources/[slug]/page.tsx:53` already does. `articleSchema()` currently hardcodes the `/resources/` path when building its URL and `@id`, so give it a `basePath` parameter defaulting to `resources` before reusing it. Add `WebPageJsonLd` alongside it.

### 2.2 All 11 book detail pages emit no Book node

Pages under `/author/books/*` carry `WebPage` but no `Book` or `CreativeWorkSeries`. The equivalent pages under `/works/*` do emit them, which means the richer of the two page families is the one missing the book markup.

**Fix:** add `<WorkJsonLd work={work} />` to `src/app/author/books/[slug]/page.tsx`. The component already exists at `src/components/JsonLd.tsx` and dispatches on `work.category`, so this is a one-line addition. If the URL consolidation in section 4.3 removes this family, do that first and skip this.

### 2.3 No BreadcrumbList anywhere

Zero `BreadcrumbList` nodes across all 78 pages. The site has genuinely deep paths that warrant them:

- `/projects/brave-series/brave-and-bold` (three levels)
- `/speaker/creativity/rethink-creativity-conference` (three levels)
- `/author/books/<slug>`, `/case-studies/<slug>`, `/works/<slug>`, `/speaker/messages/<slug>` (two levels)

Breadcrumbs replace the bare URL in Google's result with a readable path, and they are one of the cheaper rich-result wins available here.

**Fix:** add a `breadcrumbSchema(trail)` builder to `src/lib/schema.ts` returning `BreadcrumbList` with `itemListElement` positions, export a `BreadcrumbJsonLd` from `src/components/JsonLd.tsx`, and call it from the six dynamic route templates plus the two three-level static pages.

### 2.4 No Course schema for the Brave Series

The Brave Series is curriculum with defined lessons, taught in schools and churches. It is currently typed `CreativeWorkSeries`, which is defensible for a multi-volume publication.

`Course` is worth considering, because it is eligible for course rich results in a way `CreativeWorkSeries` is not. It requires `name`, `description`, and a `provider`, and Google additionally wants `hasCourseInstance` for the full rich result.

**Fix:** on `/projects/brave-series` and the three volume pages, emit a `Course` node alongside the existing `CreativeWorkSeries` rather than replacing it. Set `provider` to `orgRef` (Releasing Generations). Only claim `hasCourseInstance` if there are real scheduled offerings to describe, since inventing them would be a false claim in the graph.

### 2.5 Index pages carry no WebPage node

`/projects`, `/case-studies`, `/works`, `/resources`, `/contact`, `/how-it-works`, `/projects/brave-series`, and `/projects/rethink-creativity` have no `WebPage` node binding them into the site graph. `/about`, `/coach`, `/speaker`, and `/author` all do.

**Fix:** add `<WebPageJsonLd path=... name=... description=... />` to each. Consider `CollectionPage` for the four index routes, which describes them more precisely.

### 2.6 Validation

All JSON-LD parsed as valid JSON on all 78 pages, with zero parse errors. Types used are all real schema.org types with correct property names. Two notes:

- `personSchema()` sets `jobTitle` to an array of four strings. Valid, and correct here.
- `bookSchema()` deliberately omits `bookFormat` because the prose format strings would fail enum validation. That decision is documented at `src/lib/schema.ts` and is right.

Before shipping any schema change, run the affected URLs through the Rich Results Test at https://search.google.com/test/rich-results and the Schema Markup Validator at https://validator.schema.org.

---

## 3. Sitemap and robots

Both clean.

**`/sitemap.xml`** is generated at request time by `src/app/sitemap.ts` and lists 78 URLs. That is an exact match to the 78 crawlable pages: no orphans, no stale entries, and no redirecting URLs listed. Priority tiers are sensible and only canonical paths appear.

**`/robots.txt`** is generated by `src/app/robots.ts` and serves:

```
User-Agent: *
Allow: /
Disallow: /api/

Host: https://micheleokimura.com
Sitemap: https://micheleokimura.com/sitemap.xml
```

Crawl is open, the API routes are excluded, and the sitemap is declared.

### 3.1 One issue: lastmod is the request timestamp

77 of the 78 entries carry `<lastmod>2026-08-28T18:57:34.504Z</lastmod>`, the moment the sitemap was fetched. Only the single blog post carries a real date.

`src/app/sitemap.ts:32` sets `const lastModified = new Date()` and applies it to every entry except posts. The file's own comment warns against exactly this for posts, then does it for everything else. The effect is that every fetch reports all 77 pages as having changed seconds ago. Once a crawler notices that is never true, it stops trusting the signal for the whole domain.

**Fix:** carry a real `updated` date in each content source (`projects.ts`, `case-studies.ts`, `author-books.ts`, `speaker-messages.ts`) and use it. Where a per-page date is not worth tracking, a fixed build-time constant is still better than a per-request timestamp.

---

## 4. Internal linking

Strong. This section found less to fix than any other.

- **Reachability:** all 78 sitemap URLs were reached by following links from the home page. Zero orphans.
- **Anchor text:** 2,567 anchor elements checked. Zero empty anchors, zero anchors lacking both text and an `aria-label`, and zero instances of generic text ("read more", "click here", "learn more" and similar). Every link on the site describes its destination.
- **Link volume:** 2,885 link and image references across 187 unique targets.
- **Headings:** all 78 pages have exactly one H1. No page has zero, none has more than one.

### 4.1 Breadcrumbs are absent as UI

Section 2.3 covers the missing markup. The visible breadcrumb trail is also absent on the deep pages. A reader landing on `/projects/brave-series/brave-and-bold` from search has no visible path back up to `/projects/brave-series` or `/projects`.

**Fix:** add a breadcrumb component to the six deep route templates, and emit the matching `BreadcrumbList` from the same place so the markup and the UI cannot drift.

### 4.2 Redirects

All eight legacy paths resolve in a single hop with no chains:

| From | To | Status |
|---|---|---|
| `/blog` | `/resources` | 308 |
| `/blog/:slug` | `/resources/:slug` | 308 |
| `/coaching` | `/coach` | 308 |
| `/coaching/:path` | `/coach/:path` | 308 |
| `/speak` | `/speaker` | 308 |
| `/portfolio` | `/speaker` | 308 |
| `/speaking` | `/speaker` | 308 |
| `/subscription` | `/coach` | 308 |

308 is Next's permanent redirect and Google treats it exactly as it treats 301. A bad URL returns a proper 404.

### 4.3 Three URL families compete for the same twelve subjects

This is the largest SEO issue on the site, and it drives the duplicate titles in 1.2.

Twelve books and programs each have two or three URLs. Measured main-content text:

| Subject | `/projects/*` | `/author/books/*` | `/works/*` |
|---|---|---|---|
| Dancing with Father | 1,176 words | 508 words | 87 words |
| Brave Purpose | 1,293 words | 249 words | 104 words |
| Brave & Bold | 591 words | 63 words | 90 words |
| Birth of Explicit Movement | 1,006 words | 568 words | 81 words |

The pattern holds across all twelve. `/projects/*` pages carry the real content. `/works/*` pages average under 100 words. Each page declares itself canonical, so all three compete.

**Twenty pages hold fewer than 150 words:** all 14 `/works/*` detail pages, three `/author/books/*` pages, plus `/resources` (93), `/how-it-works` (119), and `/speaker/messages/heart-wide-open` (148).

**Fix, in order of preference:**

1. **Consolidate.** Make `/projects/<slug>` the single page per subject. Point `/works/<slug>` and `/author/books/<slug>` at it with 308s in `next.config.ts`, and drop them from the sitemap. Keep `/works` and `/author` as index pages that link into `/projects/*`. This is the cleanest outcome and removes 25 thin pages.
2. **If all three families must stay,** set `alternates.canonical` on the `/works/*` and `/author/books/*` pages to the corresponding `/projects/*` URL. This concentrates ranking on one page per subject without changing the site structure. It is a smaller change than option 1 and captures most of the benefit.

Either way, `/resources` at 93 words and `/how-it-works` at 119 need more copy on their own merits.

---

## 5. Broken link sweep

`linkinator` could not be used: this machine has no Node runtime installed, so `npx` is unavailable. An equivalent recursive crawler was written in Python and run against production. It follows every internal `<a href>`, and checks every `<a href>`, `<img src>`, `<source src>`, `<video poster>`, and stylesheet `<link href>` it encounters, internal and external.

**Results: 78 pages crawled, 2,885 link references, 187 unique targets, zero broken.**

| Target | Status | Verdict |
|---|---|---|
| `https://www.linkedin.com/in/michele-okimura-36861951` | 999 | **False positive.** HTTP 999 is LinkedIn's standard anti-scraping response to non-browser clients. Verified reachable. |
| `https://www.modernday.org/podcast/sexuality-in-missions-with-michele-okimura/` | 403 | **False positive.** Blocks the crawler user-agent. Returns 200 with a browser user-agent. Verified reachable. |

Both were re-checked with a Chrome user-agent and both resolve. **There are no broken links on the site.**

### 5.1 Images

88 unique image sources across 373 references. All resolve. All `<img>` elements carry alt text.

Two files initially flagged as lacking alt text are `poster` attributes on `<video>` elements, which take no `alt` attribute in HTML:

- `/team/michele-hero-canva.jpg` at `src/app/page.tsx:289`
- `/videos/brave-purpose-keynote-poster.jpg` at `src/lib/speaker-messages.ts:299`

Both are correct as written. No action needed.

---

## 6. Security headers

Production response headers on `/`, `/about`, and `/coach` are identical. This is the weakest area in the audit.

### What is set

| Header | Value | Assessment |
|---|---|---|
| `strict-transport-security` | `max-age=63072000` | Two years, which is good. Missing `includeSubDomains` and `preload`. This is Vercel's platform default rather than anything the app sets. |

### What is missing

| Header | Risk |
|---|---|
| `Content-Security-Policy` | No restriction on script, style, frame, or connect sources. This is the primary defense against XSS and against injected third-party scripts. |
| `X-Content-Type-Options` | Browsers may MIME-sniff responses and execute something typed as data. |
| `Referrer-Policy` | Full URLs leak to every external site linked from the site, including the Amazon, Square, LinkedIn, and podcast links. |
| `Permissions-Policy` | Camera, microphone, geolocation, and payment APIs are not disabled for the page or its frames. |
| `X-Frame-Options` | Not set, and no CSP `frame-ancestors` to replace it. The site can be framed by any origin. |

Also worth noting: `access-control-allow-origin: *` is returned on HTML responses. This is a Vercel static-serving default and carries little risk for public marketing pages, but it is broader than this site needs.

### Fix

There is no `headers()` block in `next.config.ts` at all. Add one. This is the highest-value change in the audit and touches a single file.

```ts
// next.config.ts, alongside the existing redirects()
async headers() {
  return [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), payment=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            // 'unsafe-inline' is required by Next's inline bootstrap script and
            // by the JSON-LD blocks. Tighten to a nonce only if the analytics
            // stack is reworked to support one.
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob: https:",
            "font-src 'self' data:",
            "media-src 'self'",
            "connect-src 'self' https://www.google-analytics.com https://www.clarity.ms https://vitals.vercel-insights.com",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "object-src 'none'",
            "upgrade-insecure-requests",
          ].join("; "),
        },
      ],
    },
  ]
}
```

Two cautions before shipping this:

1. **`frame-ancestors 'none'` replaces `X-Frame-Options`.** Both are listed above deliberately; if any page is ever meant to be embedded, loosen this one.
2. **Ship the CSP in report-only mode first.** Change the key to `Content-Security-Policy-Report-Only`, deploy, walk every route with the browser console open, and confirm nothing is blocked. The home page video, the Mona Sans local font, the Vercel insights beacons, and the analytics tags are the four things most likely to trip it. Promote to enforcing once the console is clean. Note that GA and Clarity are not currently rendering (see section 8), so their sources cannot be verified live until those env vars are set.

Verify after deploy:

```sh
curl -sS -D- -o /dev/null https://micheleokimura.com/ | tr -d '\r'
```

---

## 7. Contact form hardening

Reviewed `src/app/api/contact-message/route.ts`. This is the endpoint the sitewide `ContactPopup` posts to, and it is the only form on the site.

### What is already right

| Control | State |
|---|---|
| Honeypot | Present. A filled `company` field returns `{ok: true}` and sends nothing, so bots see success. Verified live. |
| Length caps | Present. Every field is truncated by `clean()`: names 80, email 200, message 4000. |
| Email format validation | Present. `EMAIL_RE` rejects whitespace, which also prevents CRLF injection through the `reply_to` header. Verified: an invalid address returns 422 and sends nothing. |
| HTML injection into the email | Not possible. The message is sent as `text:` rather than `html:`. |
| Secret handling | Correct. `RESEND_API_KEY` is read server-side only and never reaches the client. |
| Runtime | Correct. `runtime = 'nodejs'` and `dynamic = 'force-dynamic'`. |

### Findings

**7.1 No rate limiting. Severity: high.**

There is no rate limiting anywhere in the codebase. A search for rate-limit, Upstash, and `x-forwarded-for` returns nothing. `/api/contact-message` accepts unauthenticated POSTs and sends an email through Resend on every accepted request. A script that omits the honeypot field and supplies a syntactically valid address can send unlimited email to Michele's inbox and exhaust the Resend quota.

The honeypot stops naive bots. It does not stop anyone who reads the client bundle, and `ContactPopup.tsx` names the field.

*Fix:* add a per-IP limit of roughly 5 requests per 10 minutes, keyed on `req.headers.get('x-forwarded-for')`. Vercel sets that header and it is trustworthy behind their proxy. `@upstash/ratelimit` with Vercel KV is the least-effort option that survives serverless cold starts. An in-memory map will not work reliably, because each serverless instance keeps its own copy. Return 429 when the limit trips.

**7.2 No CSRF or origin check. Severity: medium.**

There is no origin validation. The route parses the body regardless of `Content-Type`, which was confirmed live: requests sent with `Content-Type: text/plain` and with no content-type header at all were both accepted.

That matters because `text/plain` is a CORS simple request. A cross-origin `<form enctype="text/plain">` on any site can submit a valid JSON payload to this endpoint with no preflight and no CORS block. There is no authenticated state to abuse, so the impact is forced email sends rather than account compromise, which makes this an amplifier of 7.1 rather than a separate class of problem.

*Fix:* reject requests whose `Origin` header is present and is not `https://micheleokimura.com`. Six lines at the top of the handler, and it composes with the rate limit.

**7.3 Newlines survive into the email subject. Severity: low.**

`clean()` at line 42 is `value.trim().slice(0, max)`. `trim()` strips leading and trailing whitespace but leaves interior control characters. The `name` field flows into the subject template at line 103, so a name containing a newline puts a newline in the subject.

Resend receives the subject as a JSON field and is expected to encode it, so this is unlikely to be exploitable as classic header injection. It is worth closing as defense in depth rather than relying on a third party's encoding.

*Fix:* strip control characters in `clean()` by replacing the `\x00-\x1F` range with a space before trimming:

```ts
function clean(value: unknown, max = 2000): string {
  return typeof value === 'string'
    ? value.replace(/[\x00-\x1F\x7F]/g, ' ').trim().slice(0, max)
    : ''
}
```

Apply the same change in `/api/contact` and `/api/wait-list`, which carry identical copies.

**7.4 Validation accepts near-empty submissions. Severity: low.**

A valid email address is the only requirement. A POST containing nothing else sends an email reading "Name: (not provided)" and "Message: (none provided)". This is a spam vector even under a rate limit.

*Fix:* require a non-empty `message` (or `story`) of at least, say, 10 characters, and return 422 otherwise. Confirm this matches what `ContactPopup.tsx` enforces client-side so a real submission is never rejected.

**7.5 Error responses disclose internals. Severity: low.**

Line 131 returns Resend's raw error text to the client (`detail: detail.slice(0, 500)`), and the 503 branch at line 88 states plainly that `RESEND_API_KEY` is not set on the deployment. Both are useful in development and both tell an attacker about the mail infrastructure.

*Fix:* log the detail server-side and return a generic message to the client.

**7.6 Two unused email endpoints are live. Severity: medium.**

`/api/contact` and `/api/wait-list` are both deployed and responding in production, confirmed live. Neither is referenced by any component. `ContactPopup.tsx` posts only to `/api/contact-message`, and the two references to the older routes in `ContactBlock.tsx` and `ContactPopup.tsx` are comments describing their removal.

Both send email through Resend. `/api/contact` additionally creates a contact in GoHighLevel via `GHL_API_KEY`. Both have the same absent rate limiting as 7.1, and `/api/contact` can also be used to write junk into the CRM pipeline.

*Fix:* delete `src/app/api/contact/route.ts` and `src/app/api/wait-list/route.ts`. Dead code that sends email and writes to a CRM is attack surface with no offsetting benefit. If either is being kept for a planned form, apply 7.1 through 7.5 to it and note why it stays.

---

## 8. Google Search Console readiness

**Env var name: `NEXT_PUBLIC_GSC_VERIFICATION`**

The code is correct and shipped. `src/app/layout.tsx:24` reads the variable, and line 111 renders it:

```ts
verification: gscVerification ? { google: gscVerification } : undefined,
```

Next emits `<meta name="google-site-verification" content="...">` when the value is present and omits the key entirely when it is not.

**The tag is not in production HTML.** A fetch of the home page returns zero occurrences of `google-site-verification`, so the property is not verified.

The cause is that `NEXT_PUBLIC_*` values are inlined at build time. Setting the variable in Vercel does nothing until the next deploy. Either it is not set yet, or it was set after the last build. The verification code shipped in commit `9af9734` earlier today, so the second is plausible.

**Fix:**

1. In Search Console, add `https://micheleokimura.com` as a URL-prefix property and choose the HTML tag method.
2. Copy the token by itself. Leave off the surrounding tag.
3. Set `NEXT_PUBLIC_GSC_VERIFICATION` in Vercel under Project, Settings, Environment Variables, for Production.
4. **Redeploy.** The variable does nothing without a fresh build.
5. Confirm the tag is live before clicking Verify:
   ```sh
   curl -sS https://micheleokimura.com/ | grep google-site-verification
   ```
6. Verify, then submit `https://micheleokimura.com/sitemap.xml` under Sitemaps.
7. Leave the variable in place permanently. Google re-checks it, and removing it un-verifies the property.

### 8.1 The rest of the analytics stack is also dark

The same build-time constraint applies to the other two variables, and neither is rendering in production:

| Variable | Status in production |
|---|---|
| `NEXT_PUBLIC_GSC_VERIFICATION` | Not rendering |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Not rendering. No `googletagmanager` script on the page. |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Not rendering. No `clarity.ms` script on the page. |

Only the two Vercel insights beacons are live. Set all three variables together and redeploy once. Walkthrough is at `docs/analytics-setup.md`.

Consider also verifying at Bing Webmaster Tools, which can import the Search Console property directly and feeds ChatGPT search results.

---

## Action list, ordered by impact

### Do first

| # | Action | File | Why |
|---|---|---|---|
| 1 | Add a `headers()` block with CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and a stronger HSTS. Ship the CSP report-only first. | `next.config.ts` | Only HSTS is set today. Largest gap in the audit, one file. |
| 2 | Add per-IP rate limiting to the contact endpoint | `src/app/api/contact-message/route.ts` | Unauthenticated endpoint that sends email on every request. |
| 3 | Delete the two unused email endpoints | `src/app/api/contact/route.ts`, `src/app/api/wait-list/route.ts` | Live, unreferenced, unrate-limited, and one writes to the CRM. |
| 4 | Set the three `NEXT_PUBLIC_*` vars in Vercel and redeploy | Vercel dashboard | Search Console, GA, and Clarity are all dark. Build-time inlining means no deploy, no tags. |

### Do next

| # | Action | File | Why |
|---|---|---|---|
| 5 | Resolve the three-way URL overlap: consolidate to `/projects/*`, or cross-canonical `/works/*` and `/author/books/*` to it | `next.config.ts`, route templates | 31 of 78 pages compete with each other. Fixes 24 duplicate titles and 20 thin pages at once. |
| 6 | Point `imageOrigin` at `siteConfig.url` | `src/lib/site-config.ts:35` | og:image sits on a per-deploy vercel.app host. The premise for the workaround is no longer true. |
| 7 | Add `Article` and `WebPage` schema to case studies | `src/app/case-studies/[slug]/page.tsx` | All 21 authority-stack pages carry no page-level schema. |
| 8 | Add an origin check to the contact endpoint | `src/app/api/contact-message/route.ts` | Endpoint accepts `text/plain`, so cross-origin form CSRF is possible. |
| 9 | Give `sitemap.ts` real per-page dates | `src/app/sitemap.ts` | 77 of 78 URLs report the fetch timestamp as lastmod. |

### Then

| # | Action | File | Why |
|---|---|---|---|
| 10 | Shorten 13 titles to fit 60 characters | Route `pageMetadata()` calls | Truncated in results today. |
| 11 | Add a `metaDescription` field and write 150-160 character descriptions | `site-config.ts`, case-study and speaker-message data | Only 6 of 78 are in the window. |
| 12 | Add `BreadcrumbList` markup and a visible breadcrumb trail | `schema.ts`, `JsonLd.tsx`, 8 route templates | Absent sitewide. Cheap rich-result win. |
| 13 | Add `Book` schema to the book detail pages | `src/app/author/books/[slug]/page.tsx` | One line. Skip if action 5 removes the family. |
| 14 | Strip control characters in `clean()` | All three API routes | Newlines reach the email subject. |
| 15 | Require a non-empty message; stop returning Resend's raw errors | `src/app/api/contact-message/route.ts` | Spam vector and infrastructure disclosure. |
| 16 | Add `WebPage` or `CollectionPage` to the 8 index routes | Index route files | Not bound into the site graph. |
| 17 | Expand `/resources` (93 words) and `/how-it-works` (119 words) | Page copy | Thin on their own merits. |
| 18 | Consider `Course` schema for the Brave Series | `schema.ts`, Brave Series pages | Rich-result eligible. Only claim `hasCourseInstance` for real offerings. |
| 19 | Consider per-route `theme-color` | `layout.tsx`, `page.tsx` | Deliberately absent today. Solvable per-route if wanted. |

---

## Appendix: reproducing this audit

`linkinator` was not available: this machine has no Node runtime, so `npx` cannot run. The crawler used instead is Python 3 with no third-party dependencies, and it covers the same ground: recursive internal crawl, plus status checks on every internal and external `href`, `src`, and `poster`.

Scripts used, in the session scratchpad:

| Script | Purpose |
|---|---|
| `crawl.py` | Recursive crawl from `/`, collects pages, links, images, and head blocks |
| `meta.py` | Per-route title, description, canonical, Open Graph, Twitter, theme-color extraction |
| `ld.py` | JSON-LD extraction and validation from full page bodies |
| `anchors.py` | Anchor text quality across every `<a>` on the site |
| `thin.py` | Main-content word count and H1 structure per route |
| `dup.py` | Content-overlap measurement between competing URL families |

One methodology note worth recording for anyone repeating this: JSON-LD on this site renders in the document body rather than in `<head>`, because the App Router emits it from React components. A head-only parser reports zero structured data on all 78 pages, which is wrong. Parse the full response body.

Header check:

```sh
curl -sS -D- -o /dev/null https://micheleokimura.com/ | tr -d '\r'
```

Endpoint probes that send no email (the honeypot branch returns before the send):

```sh
curl -sS -X POST https://micheleokimura.com/api/contact-message \
  -H 'Content-Type: application/json' \
  -d '{"company":"honeypot","email":"audit@example.com"}'
```
