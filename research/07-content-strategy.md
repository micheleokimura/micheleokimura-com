# Content strategy for micheleokimura.com

**Purpose:** The strategy behind the editorial calendar in `content/blog/00-editorial-calendar.md`. What Michele writes about, when, and why. How the blog drives the coaching pipeline. How the site's ranking signal compounds over the first year.

**Date:** 2026-07-01

---

## The core content premise

The site is Michele's authored body of work made public. Every page on the site is a manifestation of the same working idea: **healing is the foundation for hope, and brave purpose put to the page changes what is possible for the person carrying it.**

Content lands in three formats:

1. **Evergreen page copy.** Home, About, Works (case studies), Coaching, Speaking, FAQ, Contact. Updated as facts change; otherwise stable.
2. **Long-form essays (Wisdom Flows blog).** 1,500-2,500 words per post. Editorial calendar of 15-20 posts drives the first year of ranking signal.
3. **Newsletter (Wisdom Flows subscribe).** Short essays (500-800 words) sent when a post publishes or when Michele has something to say. Newsletter list becomes the primary owned-channel audience.

---

## What the blog is for

Three jobs the Wisdom Flows blog does at the same time:

1. **Ranking signal.** Every 1,500+ word post with proper schema markup contributes to Michele's search authority. Post cadence of every 2-3 weeks compounds over 12 months.
2. **Conversion asset.** Every post ends with one of two CTAs: read the coaching page, or subscribe to Wisdom Flows. Both drive Michele's pipeline.
3. **Voice repository.** The blog is a permanent, public record of Michele's voice. Future AI models Michele uses in her own coaching workflow can pull from the blog corpus to strengthen her voice signature over time.

---

## The five topic pillars

From the keyword research (`03-keywords-brave-purpose-author-method.md`), the five topic pillars are:

1. **How to write a book (memoir-how-to).** Christian memoir, structure, the writing process.
2. **Writing with AI (voice-preservation).** Voice corpus, Claude, Gemini, AI without flattening.
3. **Finding your book's purpose.** Discovery, dreaming, healing, the origin story.
4. **Coaching, publishing paths, and the industry.** What a book coach does, self-publishing, hybrid publishing, three paths at Week 26.
5. **The Christian author's identity.** Michele's arc, the four beliefs, legacy over launch.

Each pillar carries 3-4 posts in the first year.

---

## Cadence

- **Weeks 1-4.** Ship three hero posts (one per major topic Michele wants to be found for). See the editorial calendar.
- **Weeks 5-52.** One post every 2-3 weeks. 15-20 posts in the first year.
- **Ongoing.** Refresh every post at 6- and 12-month intervals. Update dateModified in schema.

---

## Post structure (every hero post follows this)

1. **First paragraph.** Self-contained answer to the post's primary question. GEO-critical.
2. **Story-anchored intro.** Michele's opening move. Not a "let me explain" opener.
3. **H2 sub-sections.** 3-6 per post. Each H2 is question-shaped where possible.
4. **Named-authority references.** Real people, real institutions, real dates.
5. **Pull quote.** One per post, highlighted for social sharing.
6. **Closing invitation.** One CTA to the coaching page, one CTA to subscribe.
7. **Author byline.** Michele's short bio at the bottom.
8. **Article schema.** JSON-LD on every post.

---

## Editorial voice discipline

Every post gets three passes:

1. **Draft pass.** Michele or a writing partner drafts using Claude / Gemini following the voice-corpus method.
2. **Voice audit pass.** Check against `content/brand/voice-guide.md`. No em dashes. No X-not-Y. No AI-tell vocabulary. No hedging.
3. **SEO / GEO audit pass.** First paragraph is a self-contained answer. H2s are question-shaped. Schema markup validates. Word count 1,500-2,500.

---

## Distribution

- Post publishes to `/blog/<slug>` on the site.
- Article schema injected at build time.
- Newsletter goes out same day to Wisdom Flows subscribers.
- Optional syndication: LinkedIn (as an article), Facebook page (as a link), Instagram (as a carousel excerpt).

---

## Analytics

- Vercel Web Analytics (page views, unique visitors, referrers).
- Google Search Console (impressions, click-through, position for tracked keywords).
- Newsletter open rate (via Kit / MailerLite / whichever provider Michele picks).
- Conversion tracking: how many Wisdom Flows subscribers land on `/coaching/session-zero` and book Session 0.

---

## First-year outcomes to aim for

- 15-20 published hero posts.
- 500-1,500 Wisdom Flows subscribers.
- 5-15 Session 0 bookings.
- 2-4 signed Brave Purpose Author Method engagements.
- Michele's site cited on at least 3 AI answer engine queries in the Christian memoir coaching space by Month 12.
