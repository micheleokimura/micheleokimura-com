# Getting started: Fable 5 build handoff to Brett

**Reader:** Brett Moore (`brettkmore` on GitHub, brett@brettkmore.com).
**Purpose:** Everything you need to spin up the Fable 5 build for `micheleokimura.com` on top of this repo.

---

## The plan in one paragraph

You clone this repo, decide the tech stack (Next.js 14 App Router or Astro), scaffold the app inside the `site/` directory, import content at build time from `../content/`, inject JSON-LD schema from `../schema/`, connect Vercel to Michele's GitHub, point Vercel to the `main` branch, and wire up the custom domain. This document walks all of that.

---

## Step 1: Clone the repo

```bash
git clone https://github.com/micheleokimura/micheleokimura-com.git
cd micheleokimura-com
```

## Step 2: Pick a stack

Two options. Both work. Pick the one you know.

### Option A: Next.js 14 App Router (recommended)

**Why:** Deep Vercel integration. Best-in-class Image component. Familiar App Router. Native support for Markdown/MDX via `next-mdx-remote` or `contentlayer2`. Native support for RSC schema injection.

**Trade-off:** Slightly heavier bundle than Astro. Not a real cost for a content site.

**Scaffold:**

```bash
cd site
npx create-next-app@latest . --typescript --tailwind --app --no-eslint
```

**Content library:** `contentlayer2` for building Markdown into typed content objects.

```bash
npm install contentlayer2 next-contentlayer2
```

### Option B: Astro

**Why:** Lighter bundle. Content collections are first-class. Islands architecture is a good fit for a static-heavy site.

**Trade-off:** Fewer Vercel-native features. Slightly more work to wire up schema injection.

**Scaffold:**

```bash
cd site
npm create astro@latest . -- --template starlight --typescript --tailwind
```

Astro's built-in content collections handle the `../content/` folder without extra libraries.

**Brett's call:** Whichever stack you have shipped in the last 12 months. Do not learn a new stack for this project.

---

## Step 3: Import content from `content/` at build time

The pattern (Next.js example):

`contentlayer.config.ts`:

```typescript
import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `copywriting/**/*.md`,
  contentType: 'markdown',
  fields: {},
}))

export const CaseStudy = defineDocumentType(() => ({
  name: 'CaseStudy',
  filePathPattern: `case-studies/**/*.md`,
  contentType: 'markdown',
  fields: {},
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md$/, ''),
    },
  },
}))

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `blog/**/*.md`,
  contentType: 'markdown',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    date: { type: 'date', required: true },
    author: { type: 'string', required: true },
    category: { type: 'string' },
    keywords: { type: 'list', of: { type: 'string' } },
    excerpt: { type: 'string' },
    featured_image: { type: 'string' },
  },
}))

export default makeSource({
  contentDirPath: '../content',
  documentTypes: [Page, CaseStudy, BlogPost],
})
```

## Step 4: Inject schema from `schema/`

Each JSON-LD template lives in `/schema/`. Import as a JSON module at build time and inject into the `<head>` via a `<script type="application/ld+json">` tag.

Example (Next.js App Router):

```tsx
import personSchema from '../../schema/person.jsonld'

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* Page content */}
    </>
  )
}
```

Every page injects at minimum the WebSite + Organization schema. See the coverage matrix in `research/04-schema-markup-templates.md`.

## Step 5: Wire up Vercel

1. Sign in to Vercel with Michele's account (or your own, with Michele added as an owner).
2. Import the `micheleokimura-com` GitHub repo.
3. Set the root directory to `site/`.
4. Set the framework preset to Next.js (or Astro).
5. Set the build command to `npm run build`.
6. Enable **Vercel Web Analytics** (free tier).
7. Enable **Vercel Speed Insights** (free tier).

## Step 6: Custom domain

Point `micheleokimura.com` to Vercel. Two DNS records:

- `A` record for `@` -> `76.76.21.21`
- `CNAME` record for `www` -> `cname.vercel-dns.com`

DNS is currently with the WordPress host. Michele needs to identify the DNS provider (likely GoDaddy, Google Domains, or Cloudflare) and update the records. See `DEPLOYMENT.md` for the DNS switch procedure.

## Step 7: Forms

Two forms on the site: contact and speaking inquiry.

Two options for form handling:

- **Vercel forms** (Preview / beta): integrated, no external service.
- **Basin / Formspree**: third-party form endpoint, straightforward.
- **Formspark** or **Netlify Forms** (if migrating): reasonable alternatives.

Both forms post to the chosen endpoint. Successful submissions render a thank-you message. See `content/copywriting/ctas-buttons-microcopy.md` for the confirmation strings.

For the coaching path, the primary CTA "Book Session 0" routes to the HoneyBook Waitlist form. See the HoneyBook integration in the Brave Purpose Author Method source-of-truth folder for the routing URL.

## Step 8: SEO fundamentals (priority zero)

Every page must have:

- `<title>` (unique, 50-60 chars).
- `<meta name="description">` (unique, 140-160 chars).
- `<link rel="canonical">`.
- `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">`.
- `<meta name="twitter:card" content="summary_large_image">`.
- JSON-LD schema.
- `<meta name="robots" content="index, follow">`.

The `<meta name="robots">` in particular MUST be `index, follow`. The current WordPress site is `noindex, nofollow`. This is the single most important SEO fix in the migration.

Auto-generate `sitemap.xml` and submit to Google Search Console and Bing Webmaster Tools.

## Step 9: Fonts

Use Fraunces (display serif) and Inter (system sans). Both from Google Fonts.

Next.js 14: use `next/font/google` for zero-CLS font loading.

```tsx
import { Fraunces, Inter } from 'next/font/google'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
```

## Step 10: Images

Book covers and stage photos live in `assets-raw/current-site-archive-2026-06-26/images/`. Copy the WebP versions into `site/public/images/` at build time (or serve via CDN if bandwidth becomes a concern).

Use Next.js `<Image>` or Astro's `<Image>` component for automatic responsive sizing.

## Step 11: Blog + newsletter

Blog posts are Markdown files in `content/blog/`. Publish new posts by adding a Markdown file, committing to `main`, and Vercel auto-deploys.

Newsletter: connect Kit (formerly ConvertKit), MailerLite, or Substack. Provide the subscribe form on `/blog#subscribe`. Michele can pick the provider; Kit is the most common in the Christian writer space.

## Step 12: The layout reference

Brett, you built `createchurchmedia.com`. That site is the layout reference for Michele's build. See `research/09-createchurchmedia-layout-analysis.md` for the pattern map (nav, portfolio grid, case study page structure, typography, CTA hierarchy). Michele's site inherits the same DNA: a portfolio-first homepage, story-driven case study pages, and a repeat-CTA pattern.

The main structural difference: Michele's "portfolio grid" is her authored body of work (books, curricula, journals) rather than a graphic-design portfolio.

## Step 13: Launch checklist

- [ ] All pages ship with content pulled from `content/copywriting/`.
- [ ] All /works pages ship with content pulled from `content/case-studies/`.
- [ ] All blog posts ship with content pulled from `content/blog/`.
- [ ] Bios pulled from `content/bios/` (four depths available).
- [ ] Voice guide honored (no em dashes, no AI-tell vocabulary; see `content/brand/voice-guide.md`).
- [ ] Schema JSON-LD injected on every page (see coverage matrix in `research/04-schema-markup-templates.md`).
- [ ] `<meta name="robots" content="index, follow">` on every page.
- [ ] Unique `<title>` and meta description on every page.
- [ ] `og:image` set for every page.
- [ ] `sitemap.xml` generated and submitted to Google Search Console.
- [ ] Custom domain `micheleokimura.com` resolves to Vercel.
- [ ] SSL certificate valid (Vercel handles this).
- [ ] Contact form works.
- [ ] Speaking inquiry form works.
- [ ] Session 0 CTA routes to the HoneyBook Waitlist.
- [ ] Newsletter subscribe form works.
- [ ] Analytics enabled (Vercel Web Analytics, Vercel Speed Insights).
- [ ] Search Console verified.
- [ ] Bing Webmaster Tools verified.

---

## Post-launch handoff

Once the site is live, this repo remains the source of truth for content. Michele or a Cowork session edits Markdown files, commits to `main`, and Vercel auto-deploys within 60 seconds.

For content updates, follow the pattern in the file's frontmatter. For schema updates, follow `research/04-schema-markup-templates.md`. For voice audits before publishing, follow `content/brand/voice-guide.md`.

For questions on any of this, email Michele at `michele@micheleokimura.com` or leave an issue on the GitHub repo.

---

*Brett, you have built this pattern before. This is the same site you shipped for Emily, retuned for Michele's four-hat brand and her authored body of work. Ship it fast.*
