# micheleokimura.com

Content, research, and site code for Michele Okimura's personal website. This repo is the primary source of truth for every page, every case study, every research document, every schema template, and every asset the site needs. The Next.js site code lives at root alongside Michele's content. Deployment runs through Vercel from the `main` branch.

## Who this is for

- **Michele Okimura** (`micheleokimura` on GitHub). Owner. The site is her personal brand at `micheleokimura.com`.
- **Brett Moore** (`brettkmore` on GitHub, brett@brettkmore.com). Chief operator. Admin collaborator on this repo.
- **Future Claude sessions** working in this repo. See `CLAUDE.md`.

## What lives here

```
micheleokimura-com/
|
+-- content/            Michele's source content (copywriting, bios, brand, case studies, blog, testimonials).
+-- research/           Research documents that informed content and design decisions.
+-- schema/             JSON-LD schema templates for structured data.
+-- assets-raw/         Source photos, current-site archive, logo files. Raw material.
|
+-- src/                Next.js site source code.
|   +-- app/            Route files (pages).
|   +-- components/     React components.
|   +-- content/        MDX content consumed by the build (blog posts, case study markdown).
|   +-- lib/            Shared utilities, data loaders, site config.
|   +-- styles/         Tailwind CSS and base styles.
|   +-- fonts/          Self-hosted web fonts.
+-- public/             Static assets served by Next.js (images, logos, mosaic tiles).
+-- scripts/            Build and utility scripts.
```

## How to work in this repo

1. **Read `CLAUDE.md` first.** It orients any new Claude session and names the voice rules.
2. **Content is source-of-truth.** Edit content in `content/`, commit, redeploy.
3. **No em dashes anywhere.** This is Michele's most-held rule. See `content/brand/voice-guide.md`.
4. **Spell Michele with one L.** Always. Never Michelle.
5. **Schema goes on every page.** See `schema/` for the templates and `research/04-schema-markup-templates.md` for the strategy.

## Development

```sh
pnpm install
pnpm dev
# http://localhost:3037
```

### Stack

- Next.js 16.2.6 (App Router, Turbopack), TypeScript, React 19
- Tailwind CSS v4 (`@theme` tokens in `src/styles/tailwind.css`)
- Self-hosted Mona Sans via `next/font/local`
- Server Components by default
- Markdown blog rendered with `gray-matter` and `remark`
- Lenis smooth scroll
- JSON-LD structured data on every page

### Build

```sh
pnpm build    # production build
pnpm start    # serve the production build locally
```

## Deploy pipeline

```
edit content or code -> commit to main -> Vercel auto-deploy -> micheleokimura.com
```

## For Michele: what changed vs. the current site

The current WordPress site is an editorial and technical liability. Highlights:

- The `<title>` tag still reads the default WordPress placeholder ("Come up with a tagline for your business here").
- The site is set to `noindex, nofollow`. Google and every AI answer engine are blocked from indexing it. Fixing this is priority zero of the new build.
- No structured data. No FAQPage schema. No Person schema. No Book schema.
- Faith and secular audiences are treated as one undifferentiated block on the current site.
- The homepage does not name the Brave Purpose Author Method as an offering.
- No case studies section.

The new site addresses all of the above. See `research/00-audit-existing-state.md` for the full gap analysis.

## Licensing

Content in this repo is copyright Michele Okimura LLC unless otherwise noted. Source code (config, scripts, JSON-LD templates) is released under the MIT License. See `LICENSE`.

## Contact

- Michele Okimura: `michele@micheleokimura.com`
- Brett Moore: `brett@brettkmore.com`
