# Layout analysis: createchurchmedia.com

**Purpose:** Brett built `createchurchmedia.com`. His Fable 5 rebuild of `micheleokimura.com` will inherit that site's architectural DNA. This document maps every borrowable pattern, hierarchy, and layout decision so the Fable 5 build for Michele stays coherent with what Brett already knows works.

**Date:** 2026-07-01
**Source:** Direct WebFetch of the live site on 2026-07-01. Pages inspected: home, `/case-studies`, `/case-studies/calvary-fort-worth`.

---

## Overall site architecture

Nav bar (six items):

- Home
- How it works
- Subscription
- Portfolio
- Case Studies
- Resources

The two-word nav items are notable. Every page loads fast because the nav has a fixed six-slot budget.

**Recommended nav map for micheleokimura.com (matching the pattern):**

- Home
- About
- Works
- Speaking
- Coaching
- Blog
- Contact

Seven items is one over Brett's site. If the mobile nav gets crowded, "Contact" collapses into the footer or into a persistent floating button.

---

## Homepage structure (createchurchmedia.com)

1. **Nav bar** (sticky).
2. **Full-viewport portfolio grid.** The very first thing above the fold is a masonry / grid of the designer's work as thumbnails. No hero copy above it. The work speaks first.
3. **Hero band.** Eyebrow line ("Church design subscription"), H1 ("Unlimited graphic design for churches."), designer headshot + greeting, primary CTA ("Join the wait list"), secondary CTA ("See the work").
4. **Second portfolio band.** Another grid of work. Reinforces the "look at what she has done" pattern.
5. **Client logo grid.** "Churches I've worked with." Each logo is a link to a case study page. Hover state changes logo from white to yellow (brand color). Auto-scrolling row where a large grid would be too much on mobile.
6. **The offer.** Section H2 ("The offer - One designer. One flat fee. Fast turn around times."), three value-prop cards.
7. **See the work.** A featured piece of work + link to full portfolio.
8. **Wait list CTA.** Repeat.
9. **Footer.**

**Recommended homepage structure for micheleokimura.com (translating the pattern):**

1. Nav bar (sticky).
2. **Hero band.** Trust-bar line (2023 Governor's award), H1 ("Brave purpose. On the page and in the room."), subhead, primary CTA ("Work with Michele"), secondary CTA ("See the books and curricula").
3. **Body of work grid (the authority stack).** A masonry / grid of Michele's authored works as thumbnails. Same idea as Emily's portfolio grid, but Michele's "portfolio" is her books, curricula, and journals. Each thumbnail is a link to `/works/<slug>`.
4. **The four hats.** Michele as Author + Speaker + ED + Coach. Four cards.
5. **The featured coaching offering.** The Brave Purpose Author Method. Section H2, prose, price, and dual CTA (read the Method + book Session 0).
6. **Organizations Michele has worked with.** Auto-scrolling logo grid, matching Emily's church logo pattern.
7. **Endorsement.** The Gerald Teramae quote.
8. **Blog preview.** Most recent three Wisdom Flows posts.
9. **Closing invitation.** Four buttons (books, speaking, coaching, blog).
10. **Footer.**

---

## Case Studies index page structure

Brett's `/case-studies` index:

1. **Nav bar.**
2. **Full-viewport portfolio grid** (same as home; used again as a header treatment).
3. **H1: "Case Studies - Churches Emily has designed for."**
4. **Intro paragraph.** Short. Frames the archive.
5. **Second portfolio band** (marketing-conditioning; keep the reader in the "look at the work" mode).
6. **List of case studies.** Each row is:
   - Client logo (small)
   - Client name
   - Location + engagement duration (small caps)
   - One-line description (10-25 words)
   - "Read the case study" arrow link.
7. **Wait list CTA.** Repeat.
8. **Footer.**

**Recommended /works index for micheleokimura.com:**

1. Nav bar.
2. Hero band with H1 ("Michele's authored body of work.") and subhead.
3. Opening paragraph (150 words).
4. **List of works.** Each row:
   - Cover image (small)
   - Work title
   - Publication year + category (small caps)
   - One-line positioning
   - "Read the case study" arrow link.
5. Wait list CTA (or coaching CTA in Michele's case).
6. Footer.

Optional: A "featured" work at the top of the list (for the 2027 releases as they approach launch).

---

## Individual case study page structure

Brett's `/case-studies/calvary-fort-worth` (a template for every case study):

1. **Nav bar.**
2. **Breadcrumb line** (small): `Case Studies / Fort Worth, TX`.
3. **H1: Client name.**
4. **Positioning paragraph** (2 sentences).
5. **Metadata sidebar / row:**
   - Location
   - Engagement (Ongoing partnership, Active partnership, Active since 2021, etc.)
   - Website (Visit site button)
6. **Designer credit + CTA.** Small headshot + "By Emily Farmer in Indianapolis, IN" + Wait list CTA.
7. **Client logo (large).**
8. **Body prose.** Story-first.
9. **H2: How we started.**
10. **H2: The work.**
11. **H2: A specific moment.** A single concrete moment inside the engagement. This is the highest-impact narrative choice; it turns a case study from a portfolio blurb into a story.
12. **H2: In their words.** A blockquote from the client with attribution and date.
13. **H2: Where things stand.**
14. **H2: Selected work.** Portfolio images from the engagement.
15. **Back link** to `/case-studies`.
16. **Wait list CTA.** Repeat.
17. **Footer.**

**Recommended /works/<slug> template for micheleokimura.com** (already the shape used in `content/case-studies/_TEMPLATE.md`):

1. Nav bar.
2. Breadcrumb: `Works / [Category]`.
3. H1: Work title.
4. Positioning paragraph (1-2 sentences).
5. Metadata sidebar / row:
   - Publication date
   - Format
   - Publisher / imprint
   - ISBN
   - Purchase link (button)
6. Author credit line: "By Michele Okimura in Honolulu, HI" + coaching CTA.
7. Cover image (large).
8. Body prose:
   - Positioning (already above)
   - **H2: Origin story.**
   - **H2: Structure and methodology.**
   - **H2: Reach and impact.**
   - **H2: What Michele learned that now feeds the Method.** (This is the pattern equivalent to Brett's "In their words" section, but re-framed for Michele's non-testimonial-driven positioning: the case study makes an explicit connection to the coaching offering.)
   - **H2: Purchase / access.**
9. Back link to `/works`.
10. Coaching CTA (repeat).
11. Footer.

Note: Brett's "A specific moment" section is a narrative move worth keeping. On the Michele version, this becomes "A specific moment" or "One reader's story" (a concrete anecdote from a reader's response, an event moment, or a workshop scene) inserted between the "Reach and impact" and "What Michele learned" sections. Not every case study will have this content available at launch; the ones that do should use it.

---

## Typography and spacing patterns

From Brett's site (observable inferences from the fetched markup):

- **One display serif** for H1 and H2. The rest is a system sans.
- Generous whitespace above every H2. The reader gets breathing room.
- **Line length ~65-75 characters** on desktop body copy. Not too narrow, not too wide.
- Section breaks are large. Every distinct section on a page is separated by 4-6rem of padding.
- No decorative dividers. Whitespace does the section-breaking work.

**Recommended for micheleokimura.com** (already captured in `content/brand/colors-fonts.md`):

- Fraunces (display serif) for H1, H2.
- Inter (system sans) for body and H3-H6.
- Generous whitespace above H2, matching Brett's cadence.

---

## CTA placement hierarchy

Brett's site places the same CTA (Wait list) in three positions:

1. Above the fold, in the hero band.
2. After the "See the work" section.
3. In the footer.

The CTA does not change form. Same button, same words, three times.

**Recommended for micheleokimura.com:**

The primary CTA ("Work with Michele" / "Book Session 0") appears:

1. In the homepage hero.
2. After the coaching-preview section on the homepage.
3. At the bottom of the About page.
4. At the top and bottom of the coaching page.
5. In the footer of every page.

The secondary CTA ("Read the books") appears once on the homepage and at the bottom of the About page.

---

## Content patterns worth borrowing

- **Designer credit line under H1** ("By Emily Farmer in Indianapolis, IN"). Michele's equivalent is her byline: "By Michele Okimura in Honolulu, HI."
- **Hover state on logos.** Brett uses white-to-yellow on logo hover. Michele's logo grid can use a similar accent (Kaimuki Gold as the hover state).
- **"Read the case study →" arrow link.** Simple, in-voice, direct.
- **"Join the wait list →" as the primary CTA everywhere.** Michele's equivalent: "Book Session 0 →" (using the same arrow convention).
- **"By EMILY FARMER" and "MADE IN INDIANAPOLIS, IN" in the footer as designer-branded closing lines.** Michele's version: "By Michele Okimura" and "Made on O'ahu, Hawai'i" in the footer.

---

## Code and stack notes

Brett's site is built on Next.js (visible from the `/_next/image` URL pattern in the fetched HTML). Same stack recommendation for Michele's build lands in `site/GETTING-STARTED.md`.

Portfolio images are served through the Next.js Image component with `w=3840&q=75` quality settings, which suggests a build that optimizes for retina displays without exceeding what Michele's audience needs. Same setup for Michele's book covers and stage photos.

---

## What NOT to copy

- **The auto-scrolling logo grid** may feel too kinetic for Michele's slower register. Test both auto-scroll and static grid. If auto-scroll makes the site feel busy, use a static grid.
- **The multi-band portfolio grid on the homepage** is Emily-native (a portfolio designer wants her work to be the site). Michele's homepage should show fewer books above the fold; the full grid belongs on `/works`.
- **The "wait list" language** is specific to a capacity-constrained service. Michele's coaching is also capacity-constrained, but the language "Book Session 0" reads warmer and matches her mentor-tone voice better than "Join the wait list."
