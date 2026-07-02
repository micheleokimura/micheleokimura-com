# micheleokimura.com

Content and research foundation for Michele Okimura's personal website. This repo is the primary source of truth for every page, every case study, every research document, every schema template, and every asset the site needs. The site itself is built in Fable 5 pulling content from this repo. Deployment runs through Vercel from the `main` branch.

## Who this is for

- **Michele Okimura** (`micheleokimura` on GitHub). Owner. The site is her personal brand at `micheleokimura.com`.
- **Brett Moore** (`brettkmore` on GitHub, brett@brettkmore.com). Chief operator. Builds the site in Fable 5. Admin collaborator on this repo.
- **Future Claude sessions** working in this repo. See `CLAUDE.md`.

## What lives here

```
micheleokimura-com/
|
+-- content/            All source content Brett pulls from at build time.
|   +-- copywriting/    Page copy for every page on the site.
|   +-- bios/           Michele's bio at four lengths (one-line, short, medium, long).
|   +-- brand/          Voice guide, style guide, colors, logo rules, authored-works catalog.
|   +-- case-studies/   One Markdown file per authored work. Michele's authored works ARE the case studies.
|   +-- testimonials/   Reader / audience testimonials. Nancy Webb (first coaching client) when available.
|   +-- blog/           Editorial calendar plus drafted hero posts.
|
+-- research/           Every research document that informed the content decisions.
|                       Read these to understand WHY the site is shaped the way it is.
|
+-- schema/             Ready-to-paste JSON-LD schema templates for Brett to inject at build.
|
+-- assets-raw/         Source photos, current-site archive, logo files. Raw material.
|
+-- site/               Where Brett's Fable 5 build lives. Starts as GETTING-STARTED + DEPLOYMENT docs.
```

## How to work in this repo

1. **Read `CLAUDE.md` first.** It orients any new Claude session and names the voice rules.
2. **Content is source-of-truth.** Do not edit page copy in Fable 5. Edit it here, commit, redeploy.
3. **No em dashes anywhere.** This is Michele's most-held rule. See `content/brand/voice-guide.md`.
4. **Spell Michele with one L.** Always. Never Michelle.
5. **Schema goes on every page.** See `schema/` for the templates and `research/04-schema-markup-templates.md` for the strategy.

## Deploy pipeline

```
edit content -> commit to main -> Vercel auto-deploy -> micheleokimura.com
```

Custom domain configuration and DNS records live outside this repo. See `site/DEPLOYMENT.md`.

## For Brett: start here

Read `site/GETTING-STARTED.md` for the Fable 5 build handoff.

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
