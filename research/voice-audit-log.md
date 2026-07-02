# Voice audit log

**Date:** 2026-07-01
**Auditor:** Publishing pass, Claude.
**Scope:** Every markdown and JSON-LD file in the repo outside `assets-raw/` (which is the frozen archive of the current WordPress site and is not touched).

## Rules audited

Per `content/brand/voice-guide.md` and `CLAUDE.md`:

1. No em dashes (`—`, `--`).
2. No "X, not Y" rhetorical constructions.
3. No AI-tell vocabulary: delve, leverage, seamless, seamlessly, robust, comprehensive, holistic, harness, navigate (as a verb), tapestry, multifaceted, essentially, empower, elevate, unlock, supercharge.
4. No hedging: perhaps, might be, could potentially, may be worth, in today's fast-paced world.
5. No decorative emojis.
6. Spell Michele with one L, always.
7. Michele's canonical wording preserved verbatim (documented exceptions below).

## Findings

### Em dashes

Zero em-dash violations in prose. The only `--` in the repo is `npm create astro@latest . -- --template ...` inside `site/GETTING-STARTED.md`. That is a Bash convention for passing arguments to npm's inner command, not prose. Not a violation.

### "X, not Y" constructions

Grep surfaced 22 hits. Categorized and handled as follows.

**Fixed (customer-facing prose):**

- `content/copywriting/books.md:3` — "reads as an ordered author portfolio, not a store shelf." Rewrote to a positive follow-on sentence.
- `content/copywriting/brave-purpose-author-method.md:175` — "her work in progress, not a polished after-the-fact testimonial." Rewrote to affirmative-first phrasing.
- `content/case-studies/NANCY-WEBB-TODO.md:24` — mirror of the prior fix inside the framing-language block. Same rewrite.
- `content/case-studies/birth-of-explicit-movement.md:34` — "close a book with a sending, not a summary." Rewrote to affirmative-only phrasing.
- `content/blog/03-four-beliefs.md:63` — "you use them as thinking partners, not as ghostwriters." Rewrote into two sentences: what they do (pressure-test), what they do not do (write your sentences).

**Preserved as rule-explanation (documenting the rule itself):**

- `CLAUDE.md:14` — voice rule statement. Cannot be removed without erasing the rule.
- `README.md:39` — voice rule statement. Same.
- `content/brand/voice-guide.md:44` — canonical rule text and example.
- `content/copywriting/faq.md:147` — "One L. Michele Okimura. Never Michelle." That is a corrective spelling instruction, functionally required.

**Preserved as internal working docs (voice rules apply to Michele's public prose; these are Brett-and-Claude-facing implementation notes with no public register):**

- `content/brand/style-guide.md:41` — "Descriptive, not decorative." Alt-text rule of thumb for Brett.
- `content/brand/colors-fonts.md:69` — Brett-facing note that the current colors are recommendations.
- `research/00-audit-existing-state.md`, `research/01-icp-*.md`, `research/02-search-*.md`, `research/05-google-*.md`, `research/06-competitor-*.md`, `research/09-createchurchmedia-*.md` — internal research documents. Voice rules were audited but not enforced on internal notes.
- `content/case-studies/_inbox-mining/*` — research notes on Gmail findings, internal only, no public register.

**Preserved as archived source material:**

- `assets-raw/**` — everything under `assets-raw/` is a frozen archive of the current WordPress site. Voice rules do not apply to archived source. Not touched.

### AI-tell vocabulary

Grep for the full ban list. Findings and handling:

**Fixed:**

- `content/case-studies/dream-big-journals.md:16` — "The journals unlock the reader's own dream and provide a step-by-step framework." Replaced with: "The journals walk the reader from a first flicker of a dream to a step-by-step plan for making that dream real."
- `content/brand/michele-authored-works.md:3` — "The comprehensive list of every book." Changed to "The full list of every book."

**Preserved (canonical Michele wording):**

- `content/case-studies/brave-and-beautiful.md:25` — "1. Unlock purpose. 2. Prevent exploitation. 3. Establish identity and self-worth. 4. Build resiliency, confidence, and skills to live a meaningful life." These are the four canonical working ideas at the heart of the Brave Series. Every published curriculum ships with this exact wording. This is a branded four-point list. Preserved verbatim.

**Preserved (rule-explanation):**

- `CLAUDE.md:15` and `content/brand/voice-guide.md:36` — the ban list itself.
- `content/blog/02-writing-with-claude-without-losing-your-voice.md:21, 60` — this post literally teaches the writer to spot these words. Removing the words would remove the teaching.

**Preserved (Michele's own published mission wording):**

- The word "empower" appears in Michele's mission statement ("to empower people of all ages to thrive in their God-given purpose"). Per `content/brand/voice-guide.md:40`, that single mission-statement usage is fine. The ban targets AI-cadence repetition. Grep did not surface any other unintentional uses in customer prose.

**Preserved (technical reference, not prose):**

- `research/02-search-optimization-landscape.md:84` — "highest-leverage AEO surface." Internal SEO-tactic phrasing. Not customer prose.
- `research/00-audit-existing-state.md:16` — "essentially unused." Internal audit note.

### Hedging

Grep for "perhaps," "might be," "could potentially," "may be worth," "in today's fast-paced world," "fast-paced." One hit inside `assets-raw/current-site-archive-2026-06-26/canva-inventory.md` (archive) discussing the limits of what was searchable; not customer prose. No hits in `content/` or `research/` prose.

### Decorative emojis

Zero. Python regex scanned every `.md` and `.jsonld` outside `assets-raw/`. Nothing surfaced.

### Michele vs. Michelle

Every "Michelle" occurrence is one of:

1. A rule statement telling the writer never to spell it that way (`CLAUDE.md`, `README.md`, `content/copywriting/faq.md`, `content/brand/voice-guide.md`, `research/05-google-knowledge-panel-strategy.md`).
2. A verbatim quote from a real correspondent who misspelled Michele's name. In `content/case-studies/_inbox-mining/09-standout-quotes.md`, `04-brave-together-international.md`, and `02-brave-purpose-endorsements.md`, Tricia Steeper's emails address Michele as "Michelle." The quotes are preserved verbatim because they are factual research artifacts. When any of that content moves to the public site, the quoted spelling should be silently corrected or flagged with `[sic]`. Preserved for the research file itself.

## Files touched

- `content/copywriting/books.md`
- `content/copywriting/brave-purpose-author-method.md`
- `content/case-studies/NANCY-WEBB-TODO.md`
- `content/case-studies/birth-of-explicit-movement.md`
- `content/case-studies/dream-big-journals.md`
- `content/blog/03-four-beliefs.md`
- `content/brand/michele-authored-works.md`

Seven files, seven fixes. No other prose in the repo required a voice change.

## Notes for future sessions

- The four Brave Series pillars ("Unlock purpose / Prevent exploitation / Establish identity and self-worth / Build resiliency") are a preserved exception to the AI-tell ban. They are Michele's branded language and appear on every Brave Series product.
- The Tricia Steeper "Michelle" misspelling is preserved in the inbox-mining research files as a factual record. If any of that content gets promoted to public copy, silently correct the spelling.
- Michele's own mission statement uses "empower" once. That single usage is permitted per the voice guide; ban applies to repetition, not that one line.
- Rule-explanation files (`CLAUDE.md`, `README.md`, `content/brand/voice-guide.md`, `content/brand/style-guide.md`, `content/copywriting/faq.md`'s spelling note) are exempt from rules they document.
