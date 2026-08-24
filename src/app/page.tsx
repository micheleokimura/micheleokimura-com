import type { Metadata } from 'next'

import { pageMetadata } from '@/lib/schema'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import { ContactTrigger } from '@/components/ContactTrigger'
import { LogoMarquee } from '@/components/LogoMarquee'
import { DOORS, HERO, PULL_QUOTE } from '@/lib/home-variants'

/**
 * Home page. Rebuilt 2026-08-23 against Michele's walkthrough of the live site.
 *
 * She reads this page in FIRST PERSON now. The H1 is "Hi, I'm Michele Okimura",
 * the three cards say "Book me to speak" / "See my body of work" / "See my
 * method", and the old third-person hero line ("She helps people find the shape
 * of the work they were made to do...") is deleted at her instruction. Do not
 * reintroduce third-person copy on this page.
 *
 * SECTION BANDS. Michele, on the page running as one flat colour: "I'm just
 * staring into a void and I don't know when a thought's completed and it's
 * ready. I'm ready to move on somewhere else." Every section below is
 * full-bleed, sits on one of --color-band-1/2/3, and carries its own vertical
 * padding instead of the old margin stack.
 *
 * The order down the page, which is a rhythm rather than a strict A/B:
 *
 *   hero          navy video
 *   marquee       band-2   (set on the section in LogoMarquee.tsx)
 *   three doors   band-1
 *   pull quote    band-3   deepest, most padding, the pause
 *   the Method    band-2
 *   postures      band-1
 *   footer run-in band-4   (painted by SiteFooter, not by this file)
 *
 * Two rules hold it together. Neighbours never share a band, because a repeated
 * ground is exactly the seam that goes missing. And a CARD never takes a band:
 * tiles use --color-cream, which is warm and lifts off any of these neutrals,
 * whereas a band on a band would be a 5-point difference nobody can see.
 *
 * The removed "friends say" section was band-1 and sat between the quote and
 * the Method. Taking it out left band-3 next to band-2, which is still a change
 * of ground, so the rhythm closed over the gap and nothing needed renumbering.
 * If it ever comes back it has to be band-1 again, or one of its new neighbours
 * has to move.
 *
 * Padding is py-20/24/28 (80/96/112px) as standard, and more on the quote. The
 * shade change only registers if there is enough quiet either side of it.
 *
 * Sections deleted in this pass, all at Michele's instruction, none to be
 * restored without her:
 *  - "Recognition" ("the work has been checked by people who had to be sure",
 *    plus the 2023 / 2026 / 14-works tiles),
 *  - the founder-and-executive-director blurb under the hero, replaced by the
 *    pull quote,
 *  - "Ready when you are", the ContactBlock that used to close the page. The
 *    page now runs straight from the Method into the footer,
 *  - "A body of work" in full: the heading, the six-cover grid, and the "See
 *    every title" link. /author carries the books, and the Author card in the
 *    three doors is now the only route to them from here.
 *
 * NOT deleted but NOT BUILT, which is a different thing: "Things my friends say
 * about me". Michele held it back on 2026-08-23 pending a decision with Brett
 * about whether the home page carries testimonials at all. Do not add it back
 * on your own initiative, and do not stub it.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Coach, author, and speaker',
  description:
    'Michele Okimura is an author, speaker, and coach in Honolulu, Hawaiʻi. Two published trade books, two more in 2027, keynotes and workshops, and the Brave Purpose Author Method.',
  path: '/',
  ogDescription:
    'Author, speaker, and coach in Honolulu. Founder and Executive Director of Releasing Generations.',
})

/**
 * The doors section escapes Container's inner max-w-2xl cap on purpose.
 * Container narrows its contents to 42rem below `lg`, which would leave three
 * columns about 210px wide at a tablet width. Using the full max-w-7xl gutter
 * instead gives roughly 226px columns at 768px, which the cards can carry.
 */
const WIDE = 'mx-auto max-w-7xl px-6 lg:px-8'

/* TestimonialCard and TestimonialRow lived here and are removed with the
   section they served (see the note further down, in place of the section).
   They are not kept as dead code: nothing else renders a testimonial, and a
   pair of unused components is exactly the thing that quietly drifts out of
   step with the design. Both are recoverable from git at eb58550.

   One thing worth carrying forward if they come back: the horizontal space
   between the cards has to be `mx` on the card, NOT `gap` on the track. The
   marquee keyframes wrap by translating exactly -50% of the track, and a flex
   `gap` adds a gap BETWEEN the two copies as well as inside them, so -50%
   lands half a gap short and the loop hitches once per cycle. LogoMarquee uses
   px-6 on its tiles for the same reason. */

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      {/* TRUE 16:9, from sm up. The source file is 1920x1080, but the section
          used to be a fixed 360-440px band, which cropped it to roughly 3.3:1
          and cut the audience out of frame. `aspect-[16/9]` lets the whole
          frame through, which is what Michele asked for and what keeps her AND
          the room visible.

          Below sm the ratio is dropped for a min-height instead: 16:9 on a
          375px phone is 211px tall, which cannot hold the H1, the subhead, the
          award line and a button. There the video is ambient background behind
          stacked copy.

          The max-height is VIEWPORT-RELATIVE, and the distinction matters. An
          earlier cut used a fixed 900px, which engaged on any viewport wider
          than 1600px: Michele's own display is 1710 CSS px, so the one person
          who asked for 16:9 would have been served 1.90:1 on her own screen.
          That cap was removed.

          `calc(100svh-4.75rem)` is a different thing. 4.75rem is the header, so
          this caps the hero at exactly the space left on screen, and it can
          only ever engage when honest 16:9 would push the hero PAST the fold,
          which is the one case where the ratio and Michele's "the award has to
          be visible above the fold" cannot both be satisfied. On her 1710x1073
          display 16:9 is 962px against 997px available, so nothing clamps and
          she sees true 16:9. On a shorter laptop the hero gives up a little
          height rather than dropping the award and the CTA off the screen.

          If she would rather have pure 16:9 everywhere and accept the CTA
          falling below the fold on small laptops, delete the max-h and nothing
          else changes.

          OVERLAY. Two layers, and they do different jobs. See the notes on each
          one below; the short version is a 25% flat wash over the whole frame
          plus a scrim that only exists behind the copy.

          The scrim is what was actually wrong before. The wash was already 35%,
          but the scrim under it ran to 95% navy across the bottom THREE
          QUARTERS of the frame, so the majority of the hero composited to
          roughly 97% navy and the picture only survived in a thin band up top.
          Michele reported the hero as reading solid navy, and she was right.
          Both numbers came down, and the scrim is now bound to the text rather
          than to a fraction of the hero.

          WHAT IS IN THE VIDEO, because it changes what any of this can achieve.
          The clip is 16s and cuts between stage shots of Michele and shots of
          the audience. The stage footage is heavily out of focus: she reads as
          a soft figure at any overlay value, and no amount of lightening will
          sharpen her. The audience footage is sharp and much brighter, and it
          is the reason the scrim cannot go lower than it does. If a sharper
          stage clip ever replaces this file, re-run the measurement in the
          commit for this change; a brighter clip needs more scrim, a sharper
          one needs none of this reasoning revisited. */}
      <section
        aria-label="Michele Okimura"
        className="relative isolate min-h-[32rem] w-full overflow-hidden bg-[var(--color-navy)] sm:min-h-0 sm:aspect-[16/9] sm:max-h-[calc(100svh-4.75rem)]"
      >
        <video
          src="/videos/michele-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/team/michele-hero-canva.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />

        {/* The flat wash over the WHOLE frame: 25%, the light end of the range
            Michele asked for. This is the only thing covering the top of the
            picture, which is where she is: in every stage frame she stands in
            the upper-middle, so her head and shoulders sit at roughly 10-25% of
            the frame height and are darkened by this and nothing else.

            25% rather than 40% because the footage is already dark. Measured
            over 65 frames, the mean relative luminance behind the copy is
            0.089, so this clip has very little brightness to give away. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[var(--color-navy)]/25"
        />

        {/* The legibility scrim, and it is attached to the COPY rather than to
            a fraction of the hero. That distinction is load-bearing: the hero
            is 16:9 but clamps to the viewport on a short screen, so a
            percentage-height scrim slides out from under the text exactly when
            the hero gets shorter. This element wraps the copy, so its height is
            always the text plus the `pt` fade zone, at every breakpoint.

            The stops are derived, not eyeballed. Sampling every 0.25s across
            the clip and compositing cream #F2ECDF over navy at each candidate
            alpha, the copy needs an effective alpha of 0.54 under the H1 (large
            text, 3:1) and 0.62 under the subhead (body text, 4.5:1) for ZERO
            failing pixels in the worst frame. The clip is mostly dark, but two
            audience shots run to a near-white luminance of 0.95 right where the
            text sits, and those are what set the floor.

            Measured result of the shipped stack, worst case across the clip,
            zero failing pixels in every band:

              H1        effective 0.630   4.13:1  (floor 3.0)
              roles     effective 0.692   5.04:1  (floor 4.5)
              subhead   effective 0.722   5.16:1  (floor 4.5)
              award     effective 0.792   5.15:1  (floor 4.5)
              top of frame, where Michele is:  0.25, the wash alone

            Re-run the measurement if the video is ever replaced; a brighter
            clip needs more scrim. The script is in the commit for this change. */}
        <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(31,39,68,0.78)_0%,rgba(31,39,68,0.70)_40%,rgba(31,39,68,0.52)_70%,rgba(31,39,68,0)_100%)] pt-40 sm:pt-48 lg:pt-56">
        <Container className="pb-9 sm:pb-10 lg:pb-14">
          <FadeIn className="max-w-2xl">
            <h1 className="font-display text-[2rem] leading-[1.05] font-medium tracking-tight text-balance text-[var(--color-cream)] sm:text-[2.5rem] lg:text-6xl">
              {HERO.h1}
            </h1>

            {/* Middle dots, not periods. Michele was specific.

                CREAM, not the pale teal --color-teal-on-dark that every other
                eyebrow on a dark surface uses. That token is specified against
                FLAT navy, where it holds 7.71:1. Over video it does not: at the
                overlay this hero now runs, the measurement put it at 4.26:1
                with ~100 failing pixels in the bright audience frames, and the
                only ways to rescue it were to darken the hero further (which is
                the opposite of what this change is for) or to brighten the ink.
                Cream is the brighter ink and lands at 5.04:1. If the teal
                eyebrow is wanted back here, the video has to get darker. */}
            <p className="font-display mt-3 text-sm font-semibold tracking-[0.16em] text-[var(--color-cream)] uppercase sm:mt-4 sm:text-base lg:text-lg">
              {HERO.roles.join(' · ')}
            </p>

            {/* Solid cream, not cream/90. The 10% transparency blended the
                glyphs toward the video behind them and cost about half a point
                of contrast: 4.05:1 measured, which fails AA, against 5.16:1
                solid. Do not reintroduce an opacity here. */}
            <p className="mt-4 max-w-xl text-[0.9375rem] leading-7 text-[var(--color-cream)] sm:mt-5 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              {HERO.subhead}
            </p>

            {/* Award. A line with a hairline rule, NOT a pill: Michele banned
                pill-shaped badges sitewide in this same review.

                THE ORGANIZATION IS THE SUBJECT OF THE SENTENCE, AND THAT IS THE
                WHOLE POINT OF THIS BLOCK. The award went to Releasing
                Generations (Explicit Movement is its DBA), not to Michele. An
                earlier version led with the honour, which sitting under her name
                in her own hero read as a personal award.

                So: do not rewrite this to start with Michele, and do not trim it
                down to just the honour to save a line. If it is ever too long
                for the layout, take it out of the hero altogether rather than
                shortening it back into a personal claim. See HERO.award. */}
            <p className="mt-4 flex items-start gap-3 text-xs leading-5 text-[var(--color-cream)]/75 sm:mt-5 sm:text-[0.8125rem]">
              <span
                aria-hidden="true"
                className="mt-2 h-px w-6 shrink-0 bg-[var(--color-teal-on-dark)] sm:w-8"
              />
              <span className="max-w-lg">
                {HERO.award.lead}
                <span className="font-semibold text-[var(--color-cream)]">
                  {HERO.award.honor}
                </span>
                {HERO.award.tail}
              </span>
            </p>

            <div className="mt-6 sm:mt-7">
              <ContactTrigger className="px-5 py-3 text-sm sm:px-6 sm:py-3.5 sm:text-base">
                {HERO.cta}
              </ContactTrigger>
            </div>
          </FadeIn>
        </Container>
        </div>
      </section>

      {/* band 3 */}
      <LogoMarquee />

      {/* ------------------------------------------------------ three doors */}
      {/* Speaker, Author, Coach, left to right. Order is locked in DOORS. */}
      <section
        aria-labelledby="three-ways-heading"
        className="bg-[var(--color-band-1)] py-20 sm:py-24 lg:py-28"
      >
        <div className={WIDE}>
          <h2 id="three-ways-heading" className="sr-only">
            Three ways to work with Michele
          </h2>
          <FadeInStagger faster>
            <ul
              role="list"
              className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:gap-8"
            >
              {DOORS.map((door) => (
                <FadeIn as="li" key={door.key} className="flex">
                  <Link
                    href={door.href}
                    aria-label={`${door.label}: ${door.cta}`}
                    className="group flex w-full flex-col rounded-3xl bg-[var(--color-cream)] p-6 ring-1 ring-[var(--color-navy-10)] transition duration-300 hover:shadow-xl hover:shadow-[var(--color-teal-20)] hover:ring-[var(--color-teal-30)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-teal)] lg:p-8"
                  >
                    <h3 className="font-display text-xs font-semibold tracking-[0.18em] text-[var(--color-brand-terracotta-ink)] uppercase">
                      {door.label}
                    </h3>
                    <div className="mt-3 flex flex-auto flex-col lg:mt-4">
                      <p className="flex-auto text-sm leading-6 text-neutral-700 lg:text-base lg:leading-7">
                        {door.hook}
                      </p>
                      <span className="font-display mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[var(--color-brand-teal)] underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-4 transition group-hover:decoration-2 lg:mt-6">
                        {door.cta}
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        >
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>
        </div>
      </section>

      {/* ------------------------------------------------------- pull quote */}
      {/* This is the slot the founder / executive-director blurb used to hold.
          Display type, centred, generous padding, teal from the book palette.
          The teal here is --color-brand-teal (#0F766E), not the bright brand
          teal: #00B09F is 2.31:1 on this ground and fails even the large-text
          floor, so it can never spell a word. See tailwind.css. */}
      {/* Band-3, the deepest of the content grounds, and the most padding on
          the page. This is the one place the scroll is meant to slow down. */}
      <section
        aria-label="In Michele's words"
        className="bg-[var(--color-band-3)] py-24 sm:py-28 lg:py-36"
      >
        <Container>
          <FadeIn>
            <figure className="mx-auto max-w-4xl text-center">
              {/* No quotation marks. At this size a pair of curly quotes just
                  hangs two heavy marks in the corners; the display setting
                  already reads as a quote. Michele asked for it this way. */}
              <blockquote className="font-display text-[1.75rem] leading-[1.18] font-medium tracking-tight text-balance text-[var(--color-brand-teal)] sm:text-4xl sm:leading-[1.15] lg:text-5xl">
                {PULL_QUOTE.text}
              </blockquote>
              <figcaption className="font-display mt-8 text-xs font-semibold tracking-[0.18em] text-neutral-600 uppercase sm:mt-10 sm:text-sm">
                <span aria-hidden="true">&mdash; </span>
                {PULL_QUOTE.attribution}
              </figcaption>
            </figure>
          </FadeIn>
        </Container>
      </section>

      {/* "Things my friends say about me", the two counter-scrolling rows of
          endorsements, stood here and is NOT built. Michele pulled it on
          2026-08-23 while she and Brett decide whether the home page should
          carry testimonials at all, since the same quotes already run on the
          individual book, coach, and speaker pages. She is leaning toward no.

          It is omitted rather than stubbed, deliberately: no placeholder box,
          no reserved space, and the band rhythm closes over the gap (the quote
          on band-3 now runs straight into the Method on band-2, which is still
          a change of ground, so no seam is lost). Nothing on this page is
          designed around its return.

          The copy is not lost. FRIENDS_SAY_TOP and FRIENDS_SAY_BOTTOM are still
          in home-variants.ts, marked unused, and the card and row components
          are in this file's git history at eb58550. Wiring it back is a
          follow-up, not a rebuild. */}

      {/* The "A body of work" section stood here and is gone entirely, at
          Michele's instruction on 2026-08-23: the heading, the six-cover grid,
          and the "See every title" link. Her reasoning was that /author already
          carries the books, so the home page does not need a shelf of its own.
          The first pass only cut the "fourteen works, eight case studies"
          framing from the heading; this cut is the whole block. The Author
          card in the three doors above is now the only route to the books from
          this page, and that is deliberate. */}

      {/* ------------------------------------------------ the Method */}
      {/* Two bands, not one. Michele's note was that consecutive ideas ran
          together into one scroll, so the pitch and the three starting
          postures sit on different grounds with their own padding. Each band is
          sized to land inside a laptop screen on its own. */}
      <section
        aria-labelledby="method-heading"
        className="bg-[var(--color-band-2)] py-20 sm:py-24 lg:py-28"
      >
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="font-display block text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase sm:text-sm">
              The Brave Purpose Author Method
            </span>
            <h2
              id="method-heading"
              className="font-display mt-6 text-3xl font-medium tracking-tight text-balance text-[var(--color-brand-teal)] sm:text-4xl lg:text-5xl"
            >
              A book in you. A method that gets it on the page.
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-700 sm:text-xl">
              Twenty-six weeks, one writer, one method. What comes out the other
              side is a publication-ready book that still sounds like you.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* The last section on the page. It no longer has to be band-1: the
          footer used to sit below an UNPAINTED margin, so any band here left a
          strip of page ground above the navy. SiteFooter now paints its own
          run-in with band-4, so this is free to take whatever the rhythm wants
          and the descent into the footer is 1 -> 4 -> navy. */}
      <section
        aria-label="Where writers start"
        className="bg-[var(--color-band-1)] py-20 sm:py-24 lg:py-28"
      >
        <div className={WIDE}>
          <FadeIn>
            <h3 className="font-display text-center text-xl font-medium tracking-tight text-balance text-neutral-900 sm:text-2xl">
              The starting posture does not matter.
            </h3>
          </FadeIn>

          <FadeInStagger faster className="mt-10 sm:mt-12">
            <ul
              role="list"
              className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:gap-8"
            >
              {[
                'A blank page.',
                'Half a draft in three folders.',
                'A finished manuscript that will not sit still.',
              ].map((posture) => (
                <FadeIn as="li" key={posture} className="flex">
                  <p className="font-display flex w-full items-center justify-center rounded-2xl bg-[var(--color-cream)] p-8 text-center text-lg leading-7 font-medium text-balance text-neutral-800 ring-1 ring-[var(--color-navy-10)]">
                    {posture}
                  </p>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>

          <FadeIn className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:mt-14">
            <Button href="/coach">Work with Michele</Button>
            <Button href="/how-it-works" variant="secondary">
              See how it works
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* No closing CTA block. Michele cut "Ready when you are" entirely and
          asked to run straight from the Method into the footer. The footer
          carries the contact routes. */}
    </>
  )
}
