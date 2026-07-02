# Audit: existing state of the micheleokimura.com stack

**Date:** 2026-06-26 (crawl date), consolidated 2026-07-01
**Purpose:** Ground the rebuild in what actually exists on Michele's GitHub account, in her Cowork workspace, and on the current live site. Identify every gap the new site needs to close.

---

## 1. GitHub state (as of 2026-07-01)

**Authenticated GitHub account:** `micheleokimura` (id 278777503). Account created 2026-04-23.
**Public repositories:** 0.
**Public gists:** 0.
**Followers:** 0.
**Following:** 0.

Michele's GitHub account is essentially unused. There is no pre-existing `micheleokimura-com` repository, no `Obsidian-Vault` backup repo (despite the workspace CLAUDE.md referencing one; either that repo lives on a different account or has not been created), and no prior collaborators.

**Implication for the rebuild:** Michele owns the account. Brett Moore (`brettkmore`) will be added as an admin collaborator once the repo is created. The MCP integration this session used to attempt repo creation returned a 403 "Resource not accessible by integration" error, which is a GitHub OAuth scope limitation on the integration, not on Michele's account. See `site/GETTING-STARTED.md` for the 60-second manual repo-create flow Michele or Brett runs to move this content onto GitHub.

---

## 2. Cowork workspace state

Michele's Drive-synced Cowork workspace at `~/My Drive/Claude-Workspace/` holds a substantial pre-existing body of work on the website project. Key files consolidated for this rebuild:

- `projects/micheleokimura-com/CLAUDE.md` (project orientation, always-load preamble for future Cowork sessions)
- `projects/micheleokimura-com/activity-log.md` (five dated entries, 2026-05-14 through 2026-05-22; documents the archive-blocking issues that were later resolved)
- `projects/micheleokimura-com/website-copywriting-brief-2026-06-16.md` (Brett's copywriting brief, 316 lines, pre-cleared microcopy in Michele's voice, locked pricing decisions)
- `projects/brave-purpose-author-method/source-of-truth/` (7 files: program overview, audience and postures, deliverables, voice-and-style guide, Michele's bios, etc.)
- `projects/brave-purpose-author-method/marketing-copy/landing-page-v1.md` (an earlier landing-page draft; superseded)
- `projects/brave-purpose-author-method/offerings/brand-and-offer-architecture.md` (CSO-strategy pass on offer architecture)
- `projects/michele-okimura-research/michele-personal-context.md` (canonical deep dossier on Michele: 250+ lines, updated 2026-05-13)
- `projects/voice-corpus/` (voice profile, voice anti-patterns, vocabulary, style examples)
- `Website-Archive-2026-05-16/` (crawl of the live site, 186 files, dated 2026-05-16 folder actually crawled 2026-05-22)

Every file above informed this rebuild. The Website-Archive was copied wholesale into `assets-raw/current-site-archive-2026-06-26/` in this repo.

**Implication:** The rebuild inherits a mature editorial and strategic foundation. Voice rules, pricing decisions, and bio texts are already locked. Nothing had to be invented from scratch.

---

## 3. Live site state (crawled 2026-06-26 for this audit; also crawled 2026-05-22 in the prior archive)

**Domain:** `https://micheleokimura.com`
**Platform:** WordPress + Elementor 3.34.0
**Status:** Serving Michele's real content. The 2026-05-16 activity-log entry incorrectly concluded the domain had lapsed to SEO-spam; the 2026-05-22 re-crawl and the 2026-07-01 re-fetch confirmed the site is live and shows Michele's redesigned "brave purpose / If I can DREAM BIG so can you" homepage.

### 3a. Critical technical issues (priority zero for the rebuild)

1. **`<title>` tag reads the WordPress placeholder:** *"Michele Okimura - Come up with a tagline for your business here"*. This is the tag Google and every AI answer engine reads as the page title. Fixing this alone would recover indexing signal.
2. **Site is set to `noindex, nofollow` via meta-robots.** Google and every AI answer engine are blocked from indexing. This is the single largest SEO liability. Priority zero.
3. **No structured data (schema).** No `Person`, no `Organization`, no `FAQPage`, no `Article`. Zero schema on any page.
4. **No sitemap.xml discoverable.**
5. **No `og:image` or Twitter card metadata.**
6. **Placeholder WordPress default comment still visible** on the "The Great Dance" blog post ("Hi, this is a comment. To get started with moderating...").
7. **Typos on the About page:** the "1955" date on the sisters photo (should be after Michele's 1962 birth year); the doubled "2018: Published 2018: Published" on the EX Books caption.
8. **Domain / DNS ownership** unconfirmed at the workspace level. Owned by Michele; hosting details are with the current WordPress provider. Confirm before DNS switch to Vercel.

### 3b. Pages currently live

- Home (`/`)
- About (`/about/`)
- Books (`/books-2/`)
- Blog (`/blog/`)
- Contact (`/contact/`)
- External "Publishing" link to `dreambigpublish.com`

### 3c. Blog posts (Wisdom Flows)

Three posts, all from April-June 2025:

- "Dreaming Big - Welcome to My First Official Blog" (Apr 11, 2025)
- "The Mantle" (May 2, 2025)
- "The Great Dance" (Jun 18, 2025)

All three archived in `assets-raw/current-site-archive-2026-06-26/pages/posts/`. The new site should migrate these three posts with cleaned formatting, restored images, and proper Article schema markup.

### 3d. Existing content that stays

- Hero tagline: *"brave purpose. If I can DREAM BIG so can you."* (keep "brave purpose" as the master line)
- Three pillars framing on the homepage (Dream Big For Your Organization / Family & Community / Personal Journey)
- Michele's personal narrative arc: *"For years, I forgot how to dream..."*
- The three blog posts
- The Gerald Teramae endorsement
- The Audrey Hepburn and Eleanor Roosevelt quotes
- Logo grid of client organizations

### 3e. Existing content that changes

- The default WordPress `<title>` tag (rewritten).
- The three homepage pillars (softened; the new home page features Michele's authored works as the primary authority stack, with the coaching offering as the featured second section).
- The email-based "Activate Your Creativity" CTAs (replaced with real coaching / speaking CTAs routed via HoneyBook).
- The "Coming Soon!" copy on the new-books section (dated; replaced with proper 2027-release positioning).
- The About page copy (upgraded to the four-hat treatment: Prolific Author + Speaker + Executive Director + Coach).

---

## 4. Gap analysis: what the new site adds

### Content
- A dedicated /works page with Michele's authored body of work as case studies (not present on current site).
- A dedicated /coaching/the-brave-purpose-author-method page (not present on current site; Michele's flagship offering is invisible on the current homepage).
- A dedicated /speaking page (currently the homepage has a small "Book me as a keynote speaker" section; upgraded to a full page).
- A dedicated /faq page (not present on current site; anchors the AEO/GEO strategy).
- Four bio depths (currently one bio on the About page; upgraded to one-line, short, medium, long).

### Technical
- All 7-8 schema.org JSON-LD templates injected on every page.
- Full sitemap.xml.
- Meta robots set to `index, follow`.
- `og:image` and Twitter card metadata.
- Proper favicon.
- Vercel Web Analytics and Speed Insights.

### SEO / GEO / AEO
- Full keyword coverage per `research/03-keywords-brave-purpose-author-method.md`.
- Answer Engine Optimization treatment on FAQ questions per `research/02-search-optimization-landscape.md`.
- Google Knowledge Panel prerequisites per `research/05-google-knowledge-panel-strategy.md`.
- Editorial calendar of 15-20 blog posts per `content/blog/00-editorial-calendar.md`.

---

## 5. Audit addendum: review passes (Phase 5)

This section will be populated as the three review passes complete during Phase 5.

### Pass A: Gap audit

- **Result:** [to be populated]

### Pass B: Voice audit

- **Result:** [to be populated]

### Pass C: SEO / GEO / AEO audit

- **Result:** [to be populated]
