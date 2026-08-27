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
 *    reasoning is why the TST card below no longer names it either.
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
 * the "heart of it" lead, both pillar cards (TST and UAV), both "Where authors
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
 * with one surface of its own, `.surface-coach-hero`, a coral wash. Brett
 * asked for the hero to stop being the sitewide navy banner. The bands then
 * run 1, 2, 1, 2, 3 down the page and neighbours never share a ground, which
 * still holds now that the quote banner has been cut from between the
 * deliverables panel and the FAQ. No navy panel appears anywhere below the
 * header: dark navy is the footer's, and the footer's only.
 *
 * The one saturated moment left is the TST/UAV pair, and that is deliberate:
 * see the .coach-card block in tailwind.css.
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
 * One colour each, and they are the two loudest in Michele's palette: teal for
 * the talking, coral for the voice. Each carries a different texture so the
 * pair does not read as one repeated tile. Every value below is measured; see
 * the .coach-card block in tailwind.css before changing a stop.
 */
const PILLARS: Pillar[] = [
  {
    abbr: 'TST',
    title: 'Talk Story Sessions',
    body:
      'You and Michele will sit down, and you’ll tell her about your book the way you would tell a friend over coffee. She will ask questions, you talk, and she will record the whole conversation. What you said comes back to you as manuscript pages in your own words, ready to read and react to.',
    icon: MessagesSquare,
    style: {
      // Teal. Rings, because a Talk Story Session is a conversation widening
      // out from one question.
      '--coach-card-a': '#06302c',
      '--coach-card-b': '#0f5f58',
      '--coach-card-glow': 'rgba(0, 176, 159, 0.45)',
      '--coach-card-pattern':
        'repeating-radial-gradient(circle at 82% 6%, rgba(255,255,255,0.075) 0 1px, rgba(255,255,255,0) 1px 14px), radial-gradient(70% 55% at 12% 100%, rgba(0,176,159,0.18) 0%, rgba(0,176,159,0) 64%)',
    } as React.CSSProperties,
  },
  {
    abbr: 'UAV',
    title: 'Unique Author Voice',
    // Colon after "voice", never a dash. Michele asked for the colon by name on
    // 2026-08-27, and the sitewide no-em-dash rule bans the alternative anyway.
    body:
      'Before you draft a single chapter, Michele will build your unique author voice: a 46-dimensional read of how you use grammar, logic, and rhetoric, rooted in the classical trivium. Every page you and she write gets measured against that profile. Your book sounds like you on your best day.',
    icon: FingerprintPattern,
    style: {
      // Coral, with the palette's gold banked into the far corner as pure
      // decoration. Diagonal hatching, so it reads as a hand rather than an
      // echo of the rings next to it.
      '--coach-card-a': '#5e1e0c',
      '--coach-card-b': '#a63a19',
      '--coach-card-glow': 'rgba(241, 92, 61, 0.45)',
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
  'Your book, written. Then I show you how to use your voice for the rest of what you write: social posts, talks, the next book.',
  'A written walkthrough of your publishing options.',
]

const FAQS: { question: string; answer: string }[] = [
  {
    question: 'What kind of books do you work on?',
    answer:
      'Fiction, memoir, nonfiction, poetry, and books that turn out to be a little of each. Michele has written across that whole range herself, so the method shapes itself around the book you are actually writing.',
  },
  {
    question: 'Do I need to have written anything yet?',
    answer:
      'No. Plenty of writers start with nothing on the page. If you can talk about your book, you can start. That is the whole point of a Talk Story Session.',
  },
  {
    question: 'How much time will this take?',
    answer:
      'A conversation with Michele, plus a block of your own time to read the pages that come back and tell her what is right and what is off. Some weeks are heavier than others.',
  },
]

/**
 * The tick in "In six months, you get". A small round well rather than a bare
 * glyph, so the checklist picks up the icon treatment from the TST and UAV
 * cards above it at a quieter scale. The teal disc is 3.77:1 against the panel
 * behind it, which clears the 3:1 a non-text graphic owes under WCAG 1.4.11.
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
    <>
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

          Ground is `.surface-coach-hero`, the coral wash, NOT the sitewide
          navy banner. See tailwind.css for the contrast measurements and for
          why the eyebrow here is navy rather than an accent colour. */}
      <section
        aria-label="The Brave Purpose Author Method"
        className="surface-coach-hero relative isolate w-full overflow-hidden py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <FadeIn className="max-w-2xl">
            <h1>
              <span className="font-display block text-xs font-semibold tracking-[0.22em] text-[var(--color-navy)] uppercase sm:text-sm">
                {siteConfig.offerName}
              </span>
              <span className="sr-only"> - </span>
              <span className="font-display mt-4 block text-[2rem] leading-[1.1] font-medium tracking-tight text-balance text-[var(--color-navy)] sm:mt-5 sm:text-[2.5rem] lg:text-5xl lg:leading-[1.08]">
                Write your book in six months.
              </span>
            </h1>

            {/* Michele's line. Approved verbatim. Do not edit it. */}
            <p className="font-display mt-4 max-w-2xl text-lg leading-7 font-medium text-neutral-700 sm:text-xl sm:leading-8">
              Let&rsquo;s talk. Then we&rsquo;ll turn your conversations into a
              manuscript.
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

          {/* TST and UAV as saturated gradient tiles, built to the
              "Most-Used Services" pattern Brett sent from
              livingin-platform.vercel.app/services: texture over a gradient, a
              round icon well at the top, then label and copy. Colours, tint
              caps and the contrast measurements live in the .coach-card block
              in tailwind.css. Two up at lg, stacked below.

              These are the only loud tiles on the page, and that is the point:
              the 01/02 cards in the next section stay quiet cream so the two
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
                          className="h-8 w-8 text-[var(--color-cream)] sm:h-9 sm:w-9"
                        />
                      </span>
                      <p className="font-display mt-6 text-sm font-semibold tracking-[0.22em] text-[var(--color-cream)]/75 uppercase">
                        {item.abbr}
                      </p>
                      <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-[var(--color-cream)] sm:text-[1.75rem]">
                        {item.title}
                      </h3>
                      <p className="mt-5 max-w-md text-base leading-7 text-[var(--color-cream)]/85">
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
                  <div className="flex w-full flex-col rounded-3xl bg-[var(--color-cream)] p-7 ring-1 ring-[var(--color-navy-10)] sm:p-9">
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
                    <span className="text-lg leading-8 text-neutral-800">
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
                  <dd className="mt-3 text-base leading-7 text-neutral-700">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </Container>
      </section>

      {/* -------------------------------------------------- 6. NOT JUST BOOKS */}
      {/* Kept from the previous coaching pass, wording untouched. The soft
          panel is reused from section 4 so this reads as a warm aside rather
          than a second offer, and interest="other" (not "coaching") keeps these
          inquiries out of the book wait-list.

          band-3 is the last content ground on the page. SiteFooter paints its
          own band-4 run-in below this, so the close of the page descends
          2 -> 3 -> 4 -> navy instead of jumping. */}
      <section
        aria-labelledby="not-just-books-heading"
        className="bg-[var(--color-band-3)] py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <FadeIn>
            <div className="rounded-4xl bg-[var(--color-coach-surface-soft)] p-8 ring-1 ring-[var(--color-navy-10)] sm:p-12">
              <h2
                id="not-just-books-heading"
                className="font-display text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl"
              >
                Not just books.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
                Most of Michele&rsquo;s coaching is with authors, but not all
                of it. One pastor asked her to coach him on hearing
                God&rsquo;s voice, and that has become part of her practice. If
                you&rsquo;re working on something that isn&rsquo;t a book,
                whether it&rsquo;s a season of life, a calling, or a spiritual
                practice, reach out. If it fits, Michele will let you know.
              </p>
              <div className="mt-8">
                <ContactTrigger interest="other">Get in touch</ContactTrigger>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
