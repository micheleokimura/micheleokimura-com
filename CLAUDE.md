# CLAUDE.md - micheleokimura.com repo

**Read this first every session.** This file is the always-load context for any Claude session (Cowork, Claude Code, Codex, or otherwise) working in this repo.

## What this repo is

The complete content and research foundation for `micheleokimura.com`, Michele Okimura's personal website. Every page copy, every research document, every schema template, every raw asset lives here. Brett Moore builds the actual site in Fable 5 by pulling from `content/` and injecting schema from `schema/`. Vercel auto-deploys from `main`.

## Voice rules (non-negotiable)

These are Michele's hardest-held voice rules. Violating any of them means the copy is not in her voice, no matter how good the content is.

- **No em dashes anywhere.** Use a hyphen, a comma, a colon, or a full sentence break. The em dash is the workhorse of LLM prose and does not appear in Michele's voice.
- **No "X, not Y" constructions.** Rewrite to affirmative-only phrasing.
- **No AI-tell vocabulary.** Avoid: delve, leverage, robust, seamless, navigate (as a verb), tapestry, multifaceted, essentially, empower, elevate, unlock, supercharge.
- **No decorative emojis** in titles, bullets, or body copy.
- **Spell Michele with one L.** Always. Never Michelle. Domain: `micheleokimura.com`.
- **No marketing-bro register.** No "10x," no "next level," no "scaling," no "let's unpack this," no "here's the framework."
- **No hard sell, prosperity-gospel framing, or altar-call cadence.**
- **No clinical credentials.** Michele is not a licensed therapist, counselor, or medical professional.

The full voice guide lives at `content/brand/voice-guide.md`. Read it before writing anything in Michele's voice.

## Who Michele is (short version)

Michele Okimura is a Honolulu-based author, speaker, workshop leader, and coach. She founded Michele Okimura LLC (her commercial vehicle) and Releasing Generations (her Christian nonprofit umbrella). She spent roughly fourteen years as a Hawai'i public elementary school teacher and more than twenty years as Associate Pastor at Hope Chapel LifeSpring alongside her husband Rob. In 2023 the State of Hawai'i named her Outstanding Advocate for Children and Youth.

She has authored two published trade books (*Dancing with Father*, 2011; *The Birth of Explicit Movement*, 2018), the Dream Big Journal Curriculum (preschool through adult), the Raising Kingdom Kids Lesson Book, and the Brave Series curriculum (Brave & Beautiful, Brave & Bold, Brave Together). Two more trade books release in 2027 under the shared title *Brave Purpose* (secular) and *Brave Purpose with God* (faith).

Her flagship coaching offering is **The Brave Purpose Author Method**, a 26-week engagement priced at $4,997 that walks a writer from any starting posture (blank page, partial draft, finished manuscript) to a publication-ready manuscript in the writer's own voice.

Deep dossier: `content/bios/long.md` for the long bio, and the master personal-context file lives at `../michele-okimura-research/michele-personal-context.md` in the Cowork workspace.

## The four hats

Michele is treated across this site as a four-role figure. Do not flatten her to any one role.

1. **Prolific Author.** Two published trade books, two in production, plus multiple curricula and workbooks she has authored or overseen.
2. **Speaker.** Keynotes and workshops on dreaming, purpose, healing, creativity, courage, generations.
3. **Executive Director.** Founder and Executive Director of Releasing Generations (Christian nonprofit) with three initiatives: Explicit Movement, Kingdom Families, ReThink Creativity, plus the Brave Series curriculum.
4. **Coach.** Runs The Brave Purpose Author Method out of the LLC.

The About page and every bio treats all four hats. See `content/copywriting/about.md`.

## Case studies

**Michele's authored works ARE the case studies.** She has not yet worked with many Brave Purpose Author Method coaching clients (Nancy Webb is client #1). We do not lean on coaching testimonials at this stage. Instead, every book, curriculum, and produced project she has authored serves as a case study of her ability to produce transformational written content. This is the authority stack.

Each case study lives at `content/case-studies/<slug>.md` and follows a fixed structure: cover, positioning statement, origin story, methodology, reach, what she learned that feeds the Brave Purpose Author Method, purchase link. See `content/case-studies/00-index.md`.

## Layout reference

Brett built `createchurchmedia.com`. That site's case-study pattern, navigation, typography, and CTA hierarchy are the layout basis for `micheleokimura.com`. See `research/09-createchurchmedia-layout-analysis.md`.

## Deploy pipeline

```
edit content -> commit to main -> Vercel auto-deploy -> micheleokimura.com
```

Details in `site/DEPLOYMENT.md`.

## Where to start by task

- **Edit page copy** -> `content/copywriting/<page>.md`
- **Edit a case study** -> `content/case-studies/<slug>.md`
- **Edit the editorial calendar or a blog post** -> `content/blog/`
- **Change a schema template** -> `schema/<type>.jsonld` and check `research/04-schema-markup-templates.md`
- **Understand a decision** -> `research/`
- **Add a photo or logo** -> `assets-raw/photos/` or `assets-raw/logo/`
- **Fable 5 build questions** -> `site/GETTING-STARTED.md`
- **Vercel deployment questions** -> `site/DEPLOYMENT.md`
