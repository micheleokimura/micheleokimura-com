# Google Knowledge Panel strategy for Michele Okimura

**Purpose:** The prerequisites checklist for a Google Knowledge Panel on Michele's name, what she currently has, what is missing, and the actionable next steps to build toward eligibility.

**Date:** 2026-07-01

**Reality check:** Knowledge Panels are Google's decision, not applied for. They take months to appear even when every box is checked. This document is a systematic build toward eligibility, not a guarantee.

---

## What a Knowledge Panel is

The Knowledge Panel is the right-side (desktop) or top (mobile) card that appears when someone searches "Michele Okimura." It surfaces name, photo, jobTitle, org affiliations, works, awards, and social profiles as a single trusted entity card. When it exists, it is the single strongest branded-search signal a public figure can have.

Google generates it from:

- Structured data on the entity's own site (Person schema).
- Corroborating structured data on other sites (Wikipedia, Wikidata, Amazon Author, publisher pages, LinkedIn).
- Consistent name / bio / photo across the web (Name-Address-Phone consistency, NAP).
- Notable-works signals (published books indexed in Google Books, award recognition indexed by trusted sources).

---

## The prerequisites checklist

### 1. Person schema on own site

- [x] Ship `schema/person.jsonld` on the About page and via `sameAs` from every page footer. **Delivered by this repo.**

### 2. Consistent NAP across the web

Name: Michele Okimura (one L). Address: Honolulu, HI, USA. Phone: (808) 721-5811.

- [ ] Update LinkedIn profile: name = "Michele Okimura," location = "Honolulu, HI," headline reflects the four hats.
- [ ] Update Facebook page (as public figure) with consistent NAP.
- [ ] Update Instagram bio: name field = "Michele Okimura," location = "Honolulu, HI".
- [ ] Update Amazon Author Central: name = "Michele Okimura," author photo, bio, book list.
- [ ] Update Explicit Movement leadership page bio: consistent NAP.
- [ ] Update Releasing Generations bio: consistent NAP.
- [ ] Correct any lingering "Michelle" (two-L) references on older third-party sites (Hope Chapel / Lifespring Hawaii archived pages, older podcast metadata). Reach out and request corrections.
- [ ] Update Kingdom Families site bio: consistent NAP.

### 3. Wikipedia article

- [ ] Draft a Wikipedia article on Michele that meets Wikipedia's notability standard: significant coverage in reliable, independent sources. Prerequisites:
  - Multiple mainstream news mentions of the 2023 Hawaii Governor's award (already exists via State of Hawaii coverage; verify at web archive).
  - Book reviews of *Dancing with Father* or *The Birth of Explicit Movement* in independent publications.
  - Coverage of Explicit Movement in Hawaii press.
- **Realistic timeline:** 6-18 months. Wikipedia editors are strict; the article should be commissioned to a professional Wikipedia contributor familiar with notability standards, not written by Michele or Brett directly (self-published biographies get flagged).

### 4. Wikidata entry

Wikidata is Google's structured-data infrastructure and is often the source of Knowledge Panel data.

- [ ] Create a Wikidata entry for Michele Okimura once the Wikipedia article publishes (or, if Wikipedia is not viable in the short term, create a Wikidata entry directly with cited sources).
- [ ] Wikidata fields to populate: instance of (human), sex/gender (female), country of citizenship (US), place of birth (Honolulu), occupation (author, speaker), employer (Michele Okimura LLC, Releasing Generations), award (Outstanding Advocate for Children and Youth), notable works (both published books), IMDB / social profile IDs where available.

### 5. Notable works indexed by Google Books

- [ ] Ensure *Dancing with Father* is indexed with full metadata. It appears on Amazon; the Google Books preview may or may not be current.
- [ ] Ensure *The Birth of Explicit Movement* is indexed.
- [ ] When *Brave Purpose* and *Brave Purpose with God* release in 2027, submit to Google Books.

### 6. Amazon Author Central profile

- [ ] Complete the Amazon Author Central profile: photo, bio, all books linked. This is a strong entity signal.

### 7. High-authority backlinks

Backlinks from high-authority sites are the fastest single mover of Knowledge Panel eligibility.

- [ ] Guest posts on established Christian writer platforms (Christianity Today, Guideposts, Charisma Magazine, Faithgateway).
- [ ] Podcast appearances on established shows (Focus on the Family, K-LOVE, In-Depth, Christian Working Woman).
- [ ] Interviews with Hawaii press (Honolulu Star-Advertiser, Hawaii Business Magazine, KHON2 News, Hawaii News Now).
- [ ] Speaker directory listings (National Speakers Bureau, Christian Speakers 360, Premiere Speakers Bureau).

### 8. Consistent official social profiles

All should be linked from Person schema `sameAs`.

- [x] LinkedIn: https://www.linkedin.com/in/michele-okimura-36861951
- [x] Facebook: https://www.facebook.com/michele.okimura
- [x] Instagram: https://www.instagram.com/michele_okimura/
- [ ] YouTube channel (create if not existing) linking Michele's speaking clips
- [ ] Verify each of the above is publicly accessible and has a real profile photo

### 9. Verified Google Business Profile

- [ ] Create a Google Business Profile for Michele Okimura LLC. Category: Author / Speaker / Educational Consultant. Location: Honolulu, HI. Verified via mail.

---

## Timeline expectations

Even with every box checked, a Knowledge Panel can take 6-18 months to appear. Google's decision is opaque. What actually happens in the first year is more incremental:

- **Month 1-3.** Site is indexed. Person schema is validated. NAP is consistent. Google recognizes Michele as an entity.
- **Month 4-8.** Wikipedia + Wikidata + Amazon Author + Google Business Profile signals compound. Knowledge Panel appears for the branded query "Michele Okimura" but is often incomplete (missing photo, missing occupation).
- **Month 9-18.** Full Knowledge Panel with photo, occupation, works, and social profiles. Rich result treatment on all branded queries.

## Priority order

If Michele has to sequence work:

1. Ship the site with Person schema.
2. Update all social profiles for NAP consistency.
3. Complete Amazon Author Central.
4. Verify Google Business Profile.
5. Pursue Wikipedia notability. (This is a long-lead item and should start now.)
6. Guest posts and podcast appearances (backlinks).
7. Wikidata entry.

## Monitoring

- **Google Search Console.** Confirm site is indexed. Watch impressions on branded queries.
- **Search for "Michele Okimura" in an incognito window** monthly. Note whether a Knowledge Panel has appeared and what fields are present.
- **Wikidata Reasonator** (https://reasonator.toolforge.org/) to see how Wikidata renders Michele's entry once created.
