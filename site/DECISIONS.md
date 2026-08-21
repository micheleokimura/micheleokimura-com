# Build decisions for micheleokimura.com

**Purpose:** Every architectural decision in the `/site` build, with the reasoning, so Michele, Brett, or a future session can understand why the site is shaped the way it is.

**Date started:** July 2, 2026.

---

## 1. Stack: Next.js 14 App Router over Astro

The site is built with Next.js 14 (App Router, TypeScript, Tailwind CSS), deployed on Vercel.

**Why Next.js won:**

- **Schema injection is first-class.** Every page needs JSON-LD in its head (Person, Organization, WebSite, plus a page-type schema). React Server Components render `<script type="application/ld+json">` inline with zero client cost, and the schema can be computed from the same content files the page renders. Astro can do this too, but the Next.js pattern matches the examples already written in `site/GETTING-STARTED.md`.
- **Vercel deploy simplicity.** The repo deploys to Vercel from `main` with root directory `site/`. Next.js is Vercel-native: zero-config builds, automatic image optimization, Speed Insights and Web Analytics as one-line drop-ins.
- **`next/font` for zero-CLS fonts.** Fraunces and Inter load self-hosted with size-adjusted fallbacks. This directly serves the Core Web Vitals goal in the SEO research.
- **`next/image`** handles the book covers and stage photos with responsive sizing and WebP output, matching the pattern Brett already runs on createchurchmedia.com (confirmed Next.js in `research/09-createchurchmedia-layout-analysis.md`).
- **Brett has shipped this stack.** The layout reference site is Next.js. `GETTING-STARTED.md` says pick the stack you have shipped in the last 12 months.

**The trade-off accepted:** Astro ships a lighter JS bundle for a content site and has first-class content collections. The bundle difference is real but small here: this build has almost no client-side JavaScript (the nav toggle and the contact form are the only client components), so the Next.js runtime cost is a few tens of KB. In exchange we get the Vercel integration, the font/image toolchain, and stack continuity with the site we are copying layout DNA from. For a content site this size, either stack would work; Next.js wins on operational fit.

**Content layer: plain `fs` + gray-matter + marked, not Contentlayer.** `GETTING-STARTED.md` suggests contentlayer2. We read `../content/` directly with Node `fs` at build time instead. Reasons: the content set is small (about 40 Markdown files), everything is statically generated, contentlayer2 adds a build dependency with a history of Next-version coupling, and the direct read keeps the mental model simple (file in, page out). If the content grows past a few hundred files, revisit.

## 2. Route reconciliation: /books vs /works, /brave-purpose-author-method vs /coaching/...

The copywriting files in `content/copywriting/` link to `/works`, `/works/<slug>`, `/coaching/the-brave-purpose-author-method`, and `/coaching/session-zero`. The build brief specifies `/books`, `/books/[slug]`, and `/brave-purpose-author-method`.

**Decision: the brief's sitemap is canonical.** Routes are `/books`, `/books/[slug]`, `/brave-purpose-author-method`. Permanent redirects in `next.config.mjs` cover the legacy paths so every link written in the content files still resolves:

- `/works` -> `/books`
- `/works/brave-series` -> `/books/brave-together` (no combined brave-series case study exists; Brave Together is the fullest volume and its page links its siblings)
- `/works/:slug` -> `/books/:slug`
- `/coaching/the-brave-purpose-author-method` and `/coaching` -> `/brave-purpose-author-method`
- `/coaching/session-zero` -> `/contact` (see decision 5)

Nav label for `/books` is "Books" and for `/brave-purpose-author-method` is "Coaching" (per `ctas-buttons-microcopy.md`: the buyer searches for coaching).

## 3. Nancy Webb stays anonymous until consent is signed

`content/case-studies/NANCY-WEBB-TODO.md` and `content/case-studies/00-index.md` require signed consent before the in-process case study publishes. That consent is not in the repo. So:

- The coaching page keeps the in-process case study section but describes "one writer" without a name, posture, or topic.
- The FAQ answer about testimonials says the Method is new and the first client is mid-engagement, without naming her.
- When consent lands, both spots take her name and the live week counter.

## 4. Reconciliation flags applied conservatively

Per `research/RECONCILIATION.md`: as of 2026-08-21 Michele confirmed she is a part-time pastor at Lifespring Church (the church she and Rob planted in 1997, originally as Hope Chapel LifeSpring); the site now prints that current-tense pastoral role. The site continues to use "Michele Okimura" with no mention of "Lea", makes no ordination claim, and never says Brave Together is DOE-approved. Each of the remaining flags loosens only when Michele confirms.

## 5. Forms without a backend (v1)

No form endpoint or HoneyBook routing URL is available in the repo. V1 ships the contact and speaking-inquiry forms as client components that compose a prefilled email to `michele@micheleokimura.com` (mailto with subject and body built from the fields). This works with zero services and zero spam surface. The Session 0 CTA routes to `/contact` until the HoneyBook Waitlist URL is provided, then it becomes a direct link. Swap-in path for later: Formspree/Basin endpoint in the form `action`, one-line change in `components/InquiryForm.tsx`.

The newsletter subscribe block at `/blog#subscribe` is the same story: no provider is connected yet (Kit is the recommendation in `GETTING-STARTED.md`), so v1 offers a one-click prefilled email. When Michele picks a provider, the block takes the embed.

## 6. Schema strategy

- Every page injects WebSite + Organization + Person (site-wide graph, rendered once in the root layout).
- Page-type schema on top: Service + FAQPage (short) on the coaching page, FAQPage on /faq (built from the same data that renders the page, so the JSON-LD answers match the visible text verbatim), Book on each published book's case-study page, Article + BreadcrumbList on blog posts, BreadcrumbList on case-study pages, ContactPage on /contact.
- The JSON-LD templates in `/schema/` are the source. `lib/schema.ts` loads them at build time and rewrites any `/coaching/...` URLs to the canonical routes.
- NAP consistency: locality-level address only (Honolulu, HI), email public, phone as given in the templates. No street address anywhere, per Michele's privacy rule.

## 7. Covers that do not exist yet

Real cover art exists for Dancing with Father, The Birth of Explicit Movement, the Dream Big Journals (three mockups), Raising Kingdom Kids, and Brave & Beautiful. Everything else renders a typographic cover card (title on brand-palette background) rather than fabricated art, per the rule in `content/brand/michele-authored-works.md`. Dropping a file into `site/public/images/covers/<slug>.webp` and adding one line to the cover map in `lib/covers.ts` upgrades any card to real art.

## 8. Assets

Only curated WebP assets are copied into `site/public/images/` (headshot, award photo, book covers, about-timeline photos, organization logos, brand logo). The 336 MB `assets-raw/` tree stays out of the deploy. Organization logos are served as-is from the archive's PNG/JPEG files; they are small.

## 9. Voice rules enforced mechanically

A build-time check (`npm run voice-audit`) greps the site source and rendered copy for em dashes, the AI-tell vocabulary list, "Michelle" with two Ls, and decorative emoji, and fails loudly. The check skips `node_modules` and code identifiers; it exists to catch copy regressions, not to lint code.
