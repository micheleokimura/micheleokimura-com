import type { Metadata } from 'next'
import Image from 'next/image'

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
 *
 * COLOR. The page runs on the site band scale (band-1/2/3, see tailwind.css)
 * with two surfaces of its own: `.surface-coach-hero`, a coral wash, and
 * `.surface-coach-quote`, a soft teal wash behind the portrait banner. Brett
 * asked for the hero to stop being the sitewide navy banner, and for the quote
 * banner to take a palette colour that appears nowhere else on the page.
 * Neighbouring sections never share a ground. No navy panel appears anywhere
 * below the header: dark navy is the footer's, and the footer's only.
 *
 * The five --color-coach-* tokens still drive the accents (numerals,
 * checkmarks, panel fills). Nothing here hardcodes a hex; the two washes are
 * measured and commented in tailwind.css.
 */

/** Michele at home with her coffee mug. Moved out of the hero in this pass and
 *  circle-cropped inside the quote banner, per Brett. */
const MICHELE_PORTRAIT = '/images/michele/coach-hero.jpg'

export const metadata: Metadata = pageMetadata({
  title: 'Coach',
  description:
    'Michele Okimura turns your conversations into a manuscript. Write your book in six months through the Brave Purpose Author Method. Join the waitlist.',
  path: '/coach',
  ogDescription:
    'You speak your book into existence. Michele Okimura turns your conversations into a manuscript in your own voice.',
})

type Pillar = { abbr: string; title: string; body: string }

/** The two named parts of the method, as cards rather than prose. */
const PILLARS: Pillar[] = [
  {
    abbr: 'TST',
    title: 'Talk Story Sessions',
    body:
      'We sit down and you tell me about your book the way you would tell a friend over coffee. I ask questions, you talk, and I record the whole conversation. What you said comes back to you as manuscript pages in your own words, ready to read and react to.',
  },
  {
    abbr: 'UAV',
    title: 'Unique Author Voice',
    body:
      'Before we draft a single chapter I build your Unique Author Voice: a 46-dimension read of how you use grammar, logic and rhetoric, rooted in the classical Trivium. Every page we write gets measured against that profile. Your book sounds like you on your best day.',
  },
]

type Stall = { number: string; title: string; body: string }

const STALLS: Stall[] = [
  {
    number: '01',
    title: 'The missing roadmap.',
    body:
      'Most writers have no clear path from the idea in their head to a finished manuscript. Every week turns into a decision about what to write, and the decision usually wins. I bring the roadmap, so your time goes into the writing.',
  },
  {
    number: '02',
    title: 'The borrowed voice.',
    body:
      'It is easy to write the way the books on your shelf sound. Your own voice is already there and it is the best thing you have. I help you find it and write the whole book out of it.',
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
      'Fiction, memoir, nonfiction, poetry, and books that turn out to be a little of each. I have written across that whole range myself, so the method shapes itself around the book you are actually writing.',
  },
  {
    question: 'Do I need to have written anything yet?',
    answer:
      'No. Plenty of writers start with nothing on the page. If you can talk about your book, you can start. That is the whole point of a Talk Story Session.',
  },
  {
    question: 'How much time will this take?',
    answer:
      'A conversation with me, plus a block of your own time to read the pages that come back and tell me what is right and what is off. Some weeks are heavier than others.',
  },
]

function CheckMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-1 h-5 w-5 flex-none fill-[var(--color-coach-accent)]"
    >
      <path d="M7.6 15.2 2.4 10l1.7-1.7 3.5 3.5 8-8L17.3 5.5z" />
    </svg>
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
              Together, we do a series of interviews that we record and then
              turn into a book over the course of six months.
            </p>
          </FadeIn>

          {/* TST and UAV as tiles. Cards take --color-cream, which is warm and
              lifts off the neutral band underneath; a band on a band is a
              5-point difference nobody can see. Two up at lg, stacked below. */}
          <FadeInStagger faster className="mt-12 sm:mt-14">
            <ul role="list" className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
              {PILLARS.map((item) => (
                <FadeIn as="li" key={item.abbr} className="flex">
                  <div className="flex w-full flex-col rounded-3xl bg-[var(--color-cream)] p-7 ring-1 ring-[var(--color-navy-10)] sm:p-9">
                    <p
                      aria-hidden="true"
                      className="font-display text-3xl font-semibold tracking-tight text-[var(--color-coach-accent-text)]"
                    >
                      {item.abbr}
                    </p>
                    <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-neutral-700">
                      {item.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
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
                  <li key={item} className="flex gap-x-4">
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

      {/* ----------------------------------------- 5. MICHELE QUOTE BANNER */}
      {/* Full-bleed, edge to edge, on the soft teal wash. This is the slot the
          deleted "Why Michele" section used to hold, and the portrait is the
          one that used to sit in the hero, circle-cropped.

          QUOTE PROVENANCE. Brett's first choice was "You were created with
          brave purpose. My work is helping you live in the fullness of it.",
          with the instruction to pick something else if it was already the home
          hero pull quote. It is: see PULL_QUOTE in src/lib/home-variants.ts.
          This is his named alternative. Note for Brett: the same line currently
          also stands on its own mid-page on /about (src/app/about/page.tsx), so
          one of the two pages should probably give it up. Nothing here is
          invented; both candidates were Michele's approved lines. */}
      <section
        aria-label="In Michele's words"
        className="surface-coach-quote w-full py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <FadeIn>
            <figure className="flex flex-col items-center gap-10 text-center lg:flex-row lg:gap-16 lg:text-left">
              {/* Fixed pixel box rather than a percentage, so the circle stays
                  a circle at every width instead of squashing into an oval in
                  the flex row. */}
              <div className="relative h-[250px] w-[250px] flex-none overflow-hidden rounded-full bg-neutral-100 ring-1 ring-[var(--color-navy-10)] sm:h-[300px] sm:w-[300px]">
                <Image
                  src={MICHELE_PORTRAIT}
                  alt="Michele Okimura at home in Honolulu"
                  fill
                  sizes="300px"
                  className="object-cover object-[center_20%]"
                />
              </div>

              <div>
                {/* No quotation marks. At this size a pair of curly quotes just
                    hangs two heavy marks in the corners, and the display
                    setting already reads as a quote. Same call as the home
                    page pull quote. Navy, not teal-text: teal-text lands at
                    4.45:1 on this wash and would be leaning on the large-text
                    floor. */}
                <blockquote className="font-display text-[1.75rem] leading-[1.18] font-medium tracking-tight text-balance text-[var(--color-navy)] sm:text-4xl sm:leading-[1.15] lg:text-[2.75rem]">
                  I believe dreams give purpose a voice.
                </blockquote>
                {/* No dash before the name. The home-page pull quote still
                    carries a decorative &mdash; in this slot; Brett's rule for
                    this page is no em dash anywhere, so the attribution here is
                    the name alone. Worth settling one way for both pages. */}
                <figcaption className="font-display mt-6 text-xs font-semibold tracking-[0.18em] text-neutral-600 uppercase sm:mt-8 sm:text-sm">
                  Michele Okimura
                </figcaption>
              </div>
            </figure>
          </FadeIn>
        </Container>
      </section>

      {/* ------------------------------------------------------------ 6. FAQ */}
      {/* band-2, so the FAQ separates from the teal banner above it and the
          band-3 aside below it. Three questions, answers verbatim. */}
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
                What writers ask me first.
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

      {/* -------------------------------------------------- 7. NOT JUST BOOKS */}
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
                Most of my coaching is with authors, but not all of it. One
                pastor asked me to coach him on hearing God&rsquo;s voice, and
                that&rsquo;s become part of what I do. If you&rsquo;re working
                on something that isn&rsquo;t a book, whether a season of life,
                a calling, or a spiritual practice, reach out. If it&rsquo;s a
                fit, we&rsquo;ll talk.
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
