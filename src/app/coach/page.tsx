import type { Metadata } from 'next'
import { Check, FingerprintPattern, MessagesSquare } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { ContactTrigger } from '@/components/ContactTrigger'
import { FaqJsonLd, ServiceJsonLd, WebPageJsonLd } from '@/components/JsonLd'
import { siteConfig } from '@/lib/site-config'
import { pageMetadata } from '@/lib/schema'

/*
 * COACH PAGE  (/coach)
 *
 * Rebuilt 2026-08-23 from Brett's walkthrough of the live page. This is a
 * WAITLIST LANDING PAGE: the reader decides in under sixty seconds whether to
 * join. Deliberately absent, and please keep them absent unless Michele says
 * otherwise: all pricing, payment plans, refund terms and tax lines (she
 * handles money 1:1), the 12-chapter / 3-act framework, the 26-week
 * week-by-week roadmap, the "wrong fit if" list, the free first conversation,
 * the Week 13 checkpoint, and second-book coaching.
 *
 * CUT IN THIS PASS, all at Brett's instruction, none to be restored without
 * him:
 *  - the "You speak. I listen. Together with Claude..." lead block. His note:
 *    it reads as AI copy, and naming the tool in the offer is wrong. Claude is
 *    a tool Michele works with, it is not part of what a writer buys. The same
 *    reasoning is why the TSS card below no longer names it either.
 *  - "Fiction, memoir, nonfiction, poetry: the method meets you where your
 *    book lives." The FAQ already says this in Michele's words.
 *  - the "Learn more" jump link in the hero.
 *  - "Why Michele / I have written across the whole range" in full, including
 *    its portrait and the six-cover shelf and the "See the full body of work"
 *    link. /author carries the books.
 *  - "Who is this for".
 *  - the closing "I would love to hear about your book" panel, which was also
 *    the last place on the site that printed an email address.
 *  - the "What happens if I miss a week" FAQ.
 *  - the full-bleed Michele quote banner, portrait and all. It ran here
 *    briefly; Michele moved it to the Speaker page. Its teal wash went with
 *    it, so there is no `.surface-coach-quote` in tailwind.css any more.
 *
 * VOICE, set by Michele 2026-08-27 and sitewide.
 *
 * Copy that describes a SERVICE, meaning something the reader will experience,
 * speaks about Michele in the THIRD PERSON. First person belongs to the
 * personal-narrative pages, /about and the home page, where Michele is telling
 * her own story rather than describing what a reader buys.
 *
 * Converted in two rounds that same day, all of it Michele's own wording:
 * the "heart of it" lead, both pillar cards (TSS and UAV), both "Where authors
 * get stuck" cards, all three FAQ answers with the heading above them, and the
 * "Not just books" aside. The FAQ QUESTIONS are the reader's own and stay in
 * second person; do not touch them.
 *
 * TWO LINES ARE STILL FIRST PERSON, both left that way on purpose.
 *
 * The hero subtitle is marked approved-verbatim by Michele and is exempt until
 * she says otherwise. The second deliverable ("Then I show you how to use your
 * voice") was flagged to her twice on 2026-08-27 and not included in either
 * round of changes she sent back, so it is deliberately untouched rather than
 * missed. It is the one line on the page that still needs a decision; if she
 * says yes, it becomes "Then Michele shows you how to use your voice" and this
 * page is third person throughout.
 *
 * COLOR. The page runs on the site band scale (band-1/2/3, see tailwind.css)
 * with one surface of its own, `.surface-coach-hero`. Brett asked for the hero
 * to stop being the sitewide navy banner. The bands then run 1, 2, 1, 2, 3
 * down the page and neighbours never share a ground, which still holds now
 * that the quote banner has been cut from between the deliverables panel and
 * the FAQ.
 *
 * THE BAND RHYTHM IS SWITCHED OFF, and it is switched off SITEWIDE as of
 * 2026-08-29 rather than here. This page piloted the single warm white
 * #FCFAF6; Michele approved it and asked for it everywhere, so the band tokens
 * in @theme all resolve to that one value now and the `.page-coach` marker
 * and its `:root:has()` override are both deleted. The markup below still
 * asks for band-1, band-2 and band-3 in that order and it should keep asking:
 * those numbers are the record of the intended sequence, and they are what a
 * future re-cut would snap back to.
 *
 * So: do not "fix" the 1, 2, 1, 2, 3 sequence below because the page renders
 * flat, and do not add a fourth band expecting it to read as a new ground.
 * Section boundaries here are carried by whitespace. The cards are carried by
 * --color-panel and the deliverables box by --color-coach-surface-soft, both
 * of which are back on their sitewide values. Taking those two DOWN to
 * #F1EEE7 so they lift off the flat ground is a SEPARATE pilot, scoped to this
 * page, dispatched as its own task on 2026-08-29. It briefly went sitewide and
 * was pulled back the same day. Do not re-roll it from here.
 *
 * RECOLOURED 2026-08-29, and this page ONLY. Michele and Brett want /coach to
 * be the most professional of the three role pages: /speaker and /author stay
 * creative and warm, /coach goes cool and expert. Three elements moved to a
 * teal-and-navy palette and nothing else on the site was touched.
 *
 * SWAPPED later the same day, which is the state below. Michele and Brett are
 * applying a principle across the site: the darker, bolder colour goes on the
 * big hero header and the softer accent goes on the small feature boxes. The
 * first pass had it backwards, so the hero and the TSS card traded values:
 *   hero  #1F5F5B  deep teal, the page's bold anchor (was #B8D4CE)
 *   TSS   #B0CFD0  soft teal, the accent (was #1F5F5B)
 *   UAV   #1F2E4A  deep midnight navy, untouched in the swap
 *
 * #B0CFD0 is the old hero mint shifted toward blue, hue 167 -> 182, at
 * Michele's direction. It sheds the green cast and still lands within 6
 * degrees of the hero's 176, so hero and TSS stay one family. The alternative
 * on the table, #ADCFD5, was passed over: hue 189 drifts toward the UAV navy
 * and the teal pair stops reading as a pair.
 *
 * The ink flipped with each ground. The hero was navy on light and is now
 * white and cream on dark; the TSS card was white and cream on dark and is now
 * navy on light. UAV keeps its white and cream, so the TSS/UAV pair is no
 * longer symmetrical. That is the instruction's own consequence, not a miss.
 *
 * The "Join the waitlist" CTA stays warm on purpose. It is the one warm accent
 * left on the page and it is what makes the CTA carry against the cool ground.
 *
 * THE OLD RULE HERE READ "no navy panel appears anywhere below the header:
 * dark navy is the footer's, and the footer's only." The UAV card is now navy,
 * so that rule no longer holds as written. It is a deliberate exception rather
 * than an oversight, and it survives the reason the rule existed: the UAV card
 * is #1F2E4A against the footer's #1F2744, close relatives, but it sits
 * mid-page inside band-1 with the stalls, the deliverables panel and the whole
 * FAQ between it and the footer, so the two never meet and neither can be read
 * as the other. Do not add a second navy panel lower down without re-checking
 * that separation.
 *
 * The saturated moment on the page is now the hero itself, with the UAV card
 * as the second dark note lower down: see the .coach-card block in
 * tailwind.css.
 *
 * ACRONYMS, set by Michele 2026-08-27 and sitewide.
 *
 * Talk Story Session is TSS and Unique Author Voice is UAV. In BODY COPY, the
 * first appearance on a given page spells the term out with the acronym in
 * parentheses ("a Talk Story Session (TSS)"), and every later appearance on
 * that same page is the bare acronym. The count runs per page, not per site,
 * and it runs over body copy only: headings, box titles and the pillar badges
 * below are outside it, so a card titled "Talk Story Sessions" does not spend
 * the page's one spell-out.
 *
 * The three body-copy sites today are the UAV pillar body and the "Do I need to
 * have written anything yet" FAQ answer on this page, and the "Meet Michele"
 * paragraph on /about. Each is a page's first appearance, so all three are
 * spelled out; nothing on the site has earned a bare acronym yet. If a second
 * mention is ever added to a page, that one is the bare acronym.
 *
 * NOTE: the older briefing at site/content/coaching/coaching-page-copy.md
 * locked the abbreviation as "TST" on 2026-08-04. Michele overrode it to "TSS"
 * on 2026-08-27; that file has been updated to match. TSS is the live one.
 *
 * The five --color-coach-* tokens still drive the accents (numerals,
 * checkmarks, panel fills). Nothing here hardcodes a hex; the two washes are
 * measured and commented in tailwind.css.
 */

export const metadata: Metadata = pageMetadata({
  title: 'Coach',
  description:
    'Michele Okimura turns your conversations into a manuscript. Write your book in six months through the Brave Purpose Author Method. Join the waitlist.',
  path: '/coach',
  ogDescription:
    'You speak your book into existence. Michele Okimura turns your conversations into a manuscript in your own voice.',
})

type Pillar = {
  abbr: string
  title: string
  body: string
  icon: LucideIcon
  /** Inline custom properties consumed by `.coach-card` in tailwind.css. */
  style: React.CSSProperties
}

/*
 * The two named parts of the method, as the saturated gradient tiles Brett
 * pulled from the "Most-Used Services" row on livingin-platform.vercel.app.
 *
 * One colour each: soft teal for the talking, deep navy for the voice. Both
 * are cool as of 2026-08-29, where the pair used to be teal and coral, and
 * they stopped being a matched PAIR later that day when the deep teal went up
 * to the hero and left this card light. Each carries a different texture so
 * the two do not read as one repeated tile. Every value below is measured; see
 * the .coach-card block in tailwind.css before changing a stop.
 */
const PILLARS: Pillar[] = [
  {
    abbr: 'TSS',
    title: 'Talk Story Sessions',
    body:
      'You and Michele will sit down, and you’ll tell her about your book the way you would tell a friend over coffee. She will ask questions, you talk, and she will record the whole conversation. What you said comes back to you as manuscript pages in your own words, ready to read and react to.',
    icon: MessagesSquare,
    style: {
      // Soft teal, and the one LIGHT tile on the page. Rings, because a Talk
      // Story Session is a conversation widening out from one question.
      //
      // This card was #1F5F5B until the swap later on 2026-08-29, when that
      // deep teal moved up to the hero and this box took the soft teal in
      // trade: bold on the big header, soft on the small feature box. #B0CFD0
      // is the old hero mint shifted toward blue, hue 167 -> 182, which drops
      // the green cast and still sits within 6 degrees of the hero's 176.
      //
      // b is the DARKEST flat point here, which is the reverse of the navy
      // card, because this one carries navy ink. a is a lighter tint of the
      // same teal, so the gradient only brightens away from the measured
      // floor. Everything below inverted with the ground: white rings would
      // not show on this, and bright teal #00B09F in the corner became a
      // saturated patch, so the rings are navy and the corner glow is the
      // hero's own #1F5F5B. See the .coach-card block in tailwind.css.
      '--coach-card-a': '#c9dedf',
      '--coach-card-b': '#b0cfd0',
      '--coach-card-glow': 'rgba(31, 95, 91, 0.28)',
      '--coach-card-pattern':
        'repeating-radial-gradient(circle at 82% 6%, rgba(31,39,68,0.055) 0 1px, rgba(31,39,68,0) 1px 14px), radial-gradient(70% 55% at 12% 100%, rgba(31,95,91,0.16) 0%, rgba(31,95,91,0) 64%)',
      '--coach-card-ink': 'var(--color-navy)',
      '--coach-card-ink-soft': 'var(--color-navy)',
      '--coach-card-body': 'rgba(31, 39, 68, 0.85)',
      '--coach-card-ring-bg': 'rgba(31, 39, 68, 0.08)',
      '--coach-card-ring-line': 'rgba(31, 39, 68, 0.22)',
    } as React.CSSProperties,
  },
  {
    abbr: 'UAV',
    title: 'Unique Author Voice',
    // Colon after "voice", never a dash. Michele asked for the colon by name on
    // 2026-08-27, and the sitewide no-em-dash rule bans the alternative anyway.
    // The colon now follows the "(UAV)" gloss; it still separates the term from
    // what the term IS, which is the whole reason she asked for it.
    //
    // This is the FIRST body-copy appearance of the term on /coach, so it is
    // spelled out with the acronym in parentheses. See the ACRONYMS note at the
    // top of this file.
    body:
      'Before you draft a single chapter, Michele will build your Unique Author Voice (UAV): a 46-dimensional read of how you use grammar, logic, and rhetoric, rooted in the classical trivium. Every page you and she write gets measured against that profile. Your book sounds like you on your best day.',
    icon: FingerprintPattern,
    style: {
      // Deep midnight navy, with the palette's gold banked into the far corner
      // as pure decoration. Diagonal hatching, so it reads as a hand rather
      // than an echo of the rings next to it.
      //
      // Recoloured from coral to #1F2E4A on 2026-08-29. Navy is the "senior
      // strategist" half of the pairing Michele and Brett asked /coach to
      // have, and gold on navy is what makes it read as considered rather
      // than cold. The glow moved to a mid blue with it; a coral drop shadow
      // under a navy tile read as a stray warm halo.
      //
      // LEFT ALONE in the swap later that day. Michele asked for the hero and
      // TSS to trade colours and said nothing about this card, so it keeps
      // every value it had, including its white and cream ink, which is what
      // the .coach-card defaults now carry. The result is that the pair is no
      // longer symmetrical: TSS is light and this is dark. That is a real
      // consequence of the instruction rather than an oversight, and it is
      // hers to call.
      '--coach-card-a': '#0e1728',
      '--coach-card-b': '#1f2e4a',
      '--coach-card-glow': 'rgba(58, 90, 140, 0.45)',
      '--coach-card-pattern':
        'repeating-linear-gradient(115deg, rgba(255,255,255,0.06) 0 2px, rgba(255,255,255,0) 2px 16px), radial-gradient(58% 52% at 86% 94%, rgba(233,174,63,0.16) 0%, rgba(233,174,63,0) 64%)',
    } as React.CSSProperties,
  },
]

type Stall = { number: string; title: string; body: string }

const STALLS: Stall[] = [
  {
    number: '01',
    title: 'The missing roadmap.',
    body:
      'Most writers have no clear path from the idea in their head to a finished manuscript. Every week turns into a decision about what to write, and the decision usually wins. Michele brings the roadmap, so your time goes into the writing.',
  },
  {
    number: '02',
    title: 'The borrowed voice.',
    body:
      'It is easy to write the way the books on your shelf sound. Your own voice is already there and it is the best thing you have. Michele helps you find it and write the whole book out of it.',
  },
]

const DELIVERABLES: string[] = [
  'A finished manuscript in your own voice.',
  'A written walkthrough of your publishing options.',
]

const FAQS: { question: string; answer: string }[] = [
  {
    question: 'What kind of books do you work on?',
    answer:
      'Nonfiction, memoir, spiritual formation, poetry, and curriculum. Michele has written across that range herself and works well with authors writing creative nonfiction rooted in their lived story.',
  },
  {
    question: 'Do I need to have written anything yet?',
    answer:
      'No. Plenty of writers start with nothing on the page. If you can talk about your book, you can start. That is the whole point of a Talk Story Session (TSS).',
  },
  {
    question: 'How much time will this take?',
    answer:
      'A conversation with Michele, plus a block of your own time to read the pages that come back and tell her what is right and what is off. Some weeks are heavier than others.',
  },
]

/**
 * The tick in "In six months, you get". A small round well rather than a bare
 * glyph, so the checklist picks up the icon treatment from the TSS and UAV
 * cards above it at a quieter scale. The tick itself is what has to be seen:
 * teal-text on the disc is 3.98:1 over the #EDEAE2 box, which clears the 3:1
 * a non-text graphic owes under WCAG 1.4.11. The disc under it is decoration
 * and is deliberately quiet, 1.14:1 against the box. If the /coach card pilot
 * takes that box to #F1EEE7, the glyph goes to 4.12:1 and still clears.
 */
function CheckMark() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[var(--color-teal)]/15 ring-1 ring-[var(--color-teal)]/25"
    >
      <Check
        className="h-5 w-5 text-[var(--color-teal-text)]"
        strokeWidth={2.5}
      />
    </span>
  )
}

export default function CoachingPage() {
  return (
    /* Plain wrapper. This used to carry `page-coach`, the marker for the
       one-white pilot's `:root:has()` override in tailwind.css. The pilot
       went sitewide on 2026-08-29 and both the marker and the override are
       gone; the tokens in @theme carry it now. */
    <div>
      <WebPageJsonLd
        path="/coach"
        name="Author coaching with Michele Okimura"
        description="The Brave Purpose Author Method: a 26-week engagement that turns your conversations into a manuscript in your own voice."
      />
      <ServiceJsonLd />
      <FaqJsonLd faqs={FAQS} />

      {/* ---------------------------------------------------------- 1. HERO */}
      {/* Left-aligned, and aligned to the WORDMARK rather than to the page.
          Both this and SiteHeader render inside `Container`, so the eyebrow,
          the H1, the subtitle and the button all start on the same vertical
          line as the Michele Okimura logo above them, at every width. Do not
          swap this for a centred layout or a bare max-w div; either one breaks
          that alignment.

          Ground is `.surface-coach-hero`, the DEEP teal field as of the
          second pass on 2026-08-29, NOT the sitewide navy banner. It was a
          soft teal for a few hours in between; Michele and Brett swapped it
          with the TSS card so the bold colour sits on the big header and the
          soft one on the small box.

          The ink flipped with the ground and there is no navy left in here:
          the eyebrow and the H1 are --color-white and the subtitle is
          --color-cream, which keeps the H1 above it without dropping under
          AA. See tailwind.css for every measurement, including the one weak
          number on the page, the terracotta CTA's 1.59:1 as a shape. */}
      <section
        aria-label="The Brave Purpose Author Method"
        className="surface-coach-hero relative isolate w-full overflow-hidden py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <FadeIn className="max-w-2xl">
            <h1>
              <span className="font-display block text-xs font-semibold tracking-[0.22em] text-[var(--color-white)] uppercase sm:text-sm">
                {siteConfig.offerName}
              </span>
              <span className="sr-only"> - </span>
              <span className="font-display mt-4 block text-[2rem] leading-[1.1] font-medium tracking-tight text-balance text-[var(--color-white)] sm:mt-5 sm:text-[2.5rem] lg:text-5xl lg:leading-[1.08]">
                Write your book in six months.
              </span>
            </h1>

            {/* Michele's line, reworded by her 2026-08-27 into third person to
                match the rest of the page. Approved verbatim, including the
                singular "conversation" here against the plural used in the
                metadata and the TSS card. Do not edit it. */}
            <p className="font-display mt-4 max-w-2xl text-lg leading-7 font-medium text-[var(--color-cream)] sm:text-xl sm:leading-8">
              Talk with Michele. Together, you&rsquo;ll turn your conversation
              into a manuscript.
            </p>

            <div className="mt-7 sm:mt-8">
              <ContactTrigger interest="coaching">
                Join the waitlist
              </ContactTrigger>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ------------------------------------------------- 2. THE HEART OF IT */}
      {/* band-1. The page now leads with this: no lead paragraph, no portrait,
          no jump link between the hero and the method. */}
      <section
        aria-labelledby="heart-heading"
        className="bg-[var(--color-band-1)] py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <FadeIn className="max-w-3xl">
            <h2 id="heart-heading">
              <span className="font-display mb-6 block text-sm font-semibold tracking-wider text-neutral-500 uppercase">
                The heart of it
              </span>
              <span className="sr-only"> - </span>
              <span className="font-display block text-3xl font-medium tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
                You speak your book into existence.
              </span>
            </h2>
            {/* Brett's line, plainspoken on purpose. The copy this replaced
                ("Two things carry the whole method...") was cut for reading as
                marketing gloss rather than as Michele. */}
            <p className="mt-6 text-xl leading-9 text-neutral-600">
              Together with Michele, you&rsquo;ll engage in a series of recorded
              interviews that become your book over the course of six months.
            </p>
          </FadeIn>

          {/* TSS and UAV as saturated gradient tiles, built to the
              "Most-Used Services" pattern Brett sent from
              livingin-platform.vercel.app/services: texture over a gradient, a
              round icon well at the top, then label and copy. Colours, tint
              caps and the contrast measurements live in the .coach-card block
              in tailwind.css. Two up at lg, stacked below.

              These are the only loud tiles on the page, and that is the point:
              the 01/02 cards in the next section stay quiet white so the two
              sections do not compete. */}
          <FadeInStagger faster className="mt-12 sm:mt-14">
            <ul role="list" className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
              {PILLARS.map((item) => {
                const Icon = item.icon
                return (
                  <FadeIn as="li" key={item.abbr} className="flex">
                    <div
                      className="coach-card flex w-full flex-col items-center rounded-3xl px-7 py-10 text-center sm:px-10 sm:py-12"
                      style={item.style}
                    >
                      <span className="coach-card-ring flex h-16 w-16 items-center justify-center rounded-full sm:h-[4.5rem] sm:w-[4.5rem]">
                        <Icon
                          aria-hidden="true"
                          strokeWidth={1.6}
                          className="coach-card-icon h-8 w-8 sm:h-9 sm:w-9"
                        />
                      </span>
                      {/* The acronym, at display scale in white. It used to be
                          a 14px cream eyebrow at 75% opacity; Michele asked on
                          2026-08-27 for TSS and UAV to read as the NAME of each
                          part of the method, so it now outsizes the spelled-out
                          title below it. The colour is --coach-card-ink, set
                          by .coach-card-abbr, which is navy on the light TSS
                          tile and --color-white on the dark UAV one, at full
                          opacity in both: 7.24:1 and 7.71:1 at each card's
                          worst point, both clear of
                          the 4.5:1 AA floor for normal text, let alone the 3:1
                          this size and weight actually owe. Do not put it back
                          on an opacity modifier; the old /75 was what made it
                          recede. */}
                      <p
                        aria-hidden="true"
                        className="coach-card-abbr font-display mt-6 text-4xl leading-none font-extrabold tracking-[0.06em] uppercase sm:text-5xl"
                      >
                        {item.abbr}
                      </p>
                      {/* The h3 carries both for assistive tech, since the
                          acronym above is decorative once it is spoken here:
                          "TSS. Talk Story Sessions." Sighted readers see only
                          the title, because the abbreviation is already the
                          line above it. */}
                      <h3 className="coach-card-title font-display mt-3 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                        <span className="sr-only">{item.abbr}. </span>
                        {item.title}
                      </h3>
                      <p className="coach-card-body mt-5 max-w-md text-xl leading-9">
                        {item.body}
                      </p>
                    </div>
                  </FadeIn>
                )
              })}
            </ul>
          </FadeInStagger>
        </Container>
      </section>

      {/* ------------------------------------------ 3. WHERE AUTHORS GET STUCK */}
      {/* band-2. Reframed away from "first books": this is as often someone's
          tenth book as their first, so no copy in this section counts them. */}
      <section
        aria-labelledby="stuck-heading"
        className="bg-[var(--color-band-2)] py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <FadeIn className="max-w-3xl">
            <h2 id="stuck-heading">
              <span className="font-display mb-6 block text-sm font-semibold tracking-wider text-neutral-500 uppercase">
                Where authors get stuck
              </span>
              <span className="sr-only"> - </span>
              <span className="font-display block text-3xl font-medium tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
                If you&rsquo;re trying to write something like this, here&rsquo;s
                where most authors get stuck.
              </span>
            </h2>
          </FadeIn>

          <FadeInStagger faster className="mt-12 sm:mt-14">
            <ul role="list" className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
              {STALLS.map((stall) => (
                <FadeIn as="li" key={stall.number} className="flex">
                  <div className="flex w-full flex-col rounded-3xl bg-[var(--color-panel)] p-7 ring-1 ring-[var(--color-navy-10)] sm:p-9">
                    <p
                      aria-hidden="true"
                      className="font-display text-3xl font-semibold tracking-tight text-[var(--color-coach-accent-text)]"
                    >
                      {stall.number}
                    </p>
                    <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
                      {stall.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-neutral-700">
                      {stall.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>
        </Container>
      </section>

      {/* ------------------------------------------- 4. IN SIX MONTHS YOU GET */}
      {/* band-1. The three lines used to sit in a three-column grid, which read
          as one clump of ticks; they are one per row now with real air between
          them, which is what Brett asked for. Keep them stacked. */}
      <section
        aria-labelledby="six-months-heading"
        className="bg-[var(--color-band-1)] py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <FadeIn>
            <div className="rounded-4xl bg-[var(--color-coach-surface-soft)] p-8 ring-1 ring-[var(--color-navy-10)] sm:p-12">
              <h2
                id="six-months-heading"
                className="font-display text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl"
              >
                In six months, you get:
              </h2>
              <ul role="list" className="mt-8 max-w-3xl space-y-7 sm:mt-10 sm:space-y-8">
                {DELIVERABLES.map((item) => (
                  <li key={item} className="flex items-start gap-x-4 sm:gap-x-5">
                    <CheckMark />
                    <span className="text-xl leading-9 text-neutral-800">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ------------------------------------------------------------ 5. FAQ */}
      {/* band-2, so the FAQ separates from the teal banner above it and the
          band-3 aside below it. Three questions, answers verbatim.

          THE ANSWERS ARE THIRD PERSON, 2026-08-27. The questions are the
          reader's and stay exactly as they are; the answers describe a service
          and so speak about Michele by name. The heading over them moved with
          them, from "What writers ask me first" to "...ask Michele first",
          because a first-person heading sitting on top of third-person answers
          reads as a mistake. See the VOICE note at the top of this file. */}
      <section
        aria-labelledby="faq-heading"
        className="bg-[var(--color-band-2)] py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <FadeIn className="max-w-3xl">
            <h2 id="faq-heading">
              <span className="font-display mb-6 block text-sm font-semibold tracking-wider text-neutral-500 uppercase">
                FAQ
              </span>
              <span className="sr-only"> - </span>
              <span className="font-display block text-3xl font-medium tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
                What writers ask Michele.
              </span>
            </h2>
          </FadeIn>

          <FadeIn className="mt-10 sm:mt-12">
            <dl className="max-w-3xl divide-y divide-[var(--color-navy-10)] border-t border-[var(--color-navy-10)]">
              {FAQS.map((faq) => (
                <div key={faq.question} className="py-8">
                  <dt className="font-display text-lg font-semibold text-neutral-950">
                    {faq.question}
                  </dt>
                  <dd className="mt-3 text-xl leading-9 text-neutral-700">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </Container>
      </section>

      {/* -------------------------------------------------- 6. NOT JUST BOOKS */}
      {/* Kept from the previous coaching pass, wording untouched. The panel
          carries `.surface-coach-soft`. Michele asked on 2026-08-27 for this
          box to MATCH the hero rather than the tinted cream it used to share
          with section 4, and it shared the hero's own class until the hero
          went dark on 2026-08-29. interest="other" keeps these inquiries out
          of the book wait-list, and "coaching" would put them in it.

          It cannot match a dark hero. This is a small box carrying navy ink,
          which is exactly the case the new principle says stays soft, so it
          kept the soft teal and moved with it to #B0CFD0. The page now runs on
          one soft teal instead of two near-identical ones, which is the
          closest reading of what she asked for. If she wants this box dark to
          match the hero literally, it is a one-line change back to
          `.surface-coach-hero`, but the ink in here has to flip with it.

          On this ground the panel carries its heading at 8.86:1 and its body
          copy at 6.64:1, both comfortably AA, and the CTA at 2.79:1 as a
          shape. See the .surface-coach-soft block in tailwind.css. It sits on
          band-3 (#f2efe8, cool grey) inside a navy-10 hairline ring, and the
          teal reads 1.44:1 against that ground, so the panel still separates.

          band-3 is the last content ground on the page. SiteFooter paints its
          own band-4 run-in below this, so the close of the page descends
          2 -> 3 -> 4 -> navy instead of jumping. */}
      <section
        aria-labelledby="not-just-books-heading"
        className="bg-[var(--color-band-3)] py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <FadeIn>
            <div className="surface-coach-soft rounded-4xl p-8 ring-1 ring-[var(--color-navy-10)] sm:p-12">
              <h2
                id="not-just-books-heading"
                className="font-display text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl"
              >
                Not just books.
              </h2>
              <p className="mt-6 max-w-2xl text-xl leading-9 text-neutral-700">
                Most of Michele&rsquo;s coaching is with authors, but not all
                of it. One pastor asked her to coach him on hearing
                God&rsquo;s voice, and that has become part of her practice. If
                you&rsquo;re working on something that isn&rsquo;t a book,
                whether it&rsquo;s a season of life, a calling, or a spiritual
                practice, reach out. If it fits, Michele will let you know.
              </p>
              {/* The fit clarifier, added 2026-08-27 at Michele's direction, as
                  a second paragraph in this aside rather than a section of its
                  own: it is answering the same "is this for me" question the
                  paragraph above it answers, so a header between the two would
                  split one thought in half. Same type, same measure.

                  This used to contradict the first FAQ answer, which opened
                  "Fiction, memoir, nonfiction, poetry" and told a novelist the
                  method would shape itself around whatever they were writing.
                  Michele resolved it 2026-08-27 in favor of this paragraph:
                  the FAQ answer now lists nonfiction, memoir, spiritual
                  formation, poetry, and curriculum, and drops fiction. Poetry
                  stays in both because she has written a poetry book. Keep the
                  two lists agreeing if either one is edited. */}
              <p className="mt-6 max-w-2xl text-xl leading-9 text-neutral-700">
                Michele works best with authors of nonfiction, especially books
                rooted in your lived story: memoir, testimony, spiritual
                formation, and curriculum. Novels and fiction aren&rsquo;t her
                specialty. If that&rsquo;s what you&rsquo;re writing,
                she&rsquo;ll gladly point you toward someone who is. But if your
                book is true, she&rsquo;s in her element.
              </p>
              <div className="mt-8">
                <ContactTrigger interest="other">Get in touch</ContactTrigger>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  )
}
