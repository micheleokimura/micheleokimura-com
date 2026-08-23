import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import { ContactBlock } from '@/components/ContactBlock'
import { LogoMarquee } from '@/components/LogoMarquee'
import {
  DOORS,
  ENDORSEMENTS,
  ENDORSING_ORGS,
  FEATURED_WORKS,
  PROOF_POINTS,
} from '@/lib/home-variants'

/**
 * Home page: AUTHOR / SPEAKER / COACH clarity.
 *
 * Built for the visitor who arrived with a job to do: an event organizer
 * checking whether Michele fits their stage, or a writer sizing up the
 * coaching. The video hero is deliberately short so the three doors clear the
 * fold on a laptop, and the coaching CTA is repeated at the close.
 *
 * The golden-thread framing that used to run this page is gone. It was
 * reviewed and dropped; do not reintroduce it here.
 *
 * The featured-work row is a plain responsive grid rather than a rotating
 * carousel. Michele's authored works ARE her case studies, so hiding two
 * thirds of them behind a carousel arrow would bury the authority stack this
 * page exists to show.
 */
export const metadata: Metadata = {
  title: 'Speaker, author, and coach',
  description:
    'Michele Okimura is an author, speaker, and coach on Oʻahu, Hawaiʻi. Two published trade books, two more in 2027, keynotes and workshops, and the Brave Purpose Author Method.',
}

/**
 * The doors section escapes Container's inner max-w-2xl cap on purpose.
 * Container narrows its contents to 42rem below `lg`, which would leave three
 * columns about 210px wide at a tablet width. Using the full max-w-7xl gutter
 * instead gives roughly 226px columns at 768px, which the cards can carry.
 */
const WIDE = 'mx-auto max-w-7xl px-6 lg:px-8'

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      {/* Video hero. Michele is framed on the RIGHT of michele-hero.mp4 (it was
          mirrored for exactly this reason), so the navy overlay is
          strongest on the left, where her name sits, and eases to transparent
          on the right so her face reads through. Below sm there is no room for
          a left column beside her face, so the overlay flattens to a uniform
          navy wash and the text goes full-width and centered, with the
          video still playing behind it as ambient motion.

          The middle stop is navy/80, and it must stay navy. It used to be
          teal/55, which measured 1.98:1 against the cream H1 over a bright
          video frame. Teal cannot hold this stop at ANY opacity: even at 90%
          it only reaches 3.81:1, because the teal itself is too light. Navy
          at 80% gives the H1 6.56:1 and the eyebrow 5.55:1 on a white frame,
          which is the worst case the video can produce. The text column runs
          to roughly 52% of the width on a wide screen, so it genuinely
          overlaps this stop.

          Height is capped rather than full-viewport so the three doors below
          clear the fold on a laptop. See DESIGN-RULES.md. */}
      <section
        aria-label="Michele Okimura"
        className="relative isolate flex min-h-[360px] w-full items-center overflow-hidden bg-[var(--color-navy)] sm:min-h-[420px] lg:min-h-[440px]"
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

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[var(--color-navy)]/75 sm:bg-gradient-to-r sm:from-[var(--color-navy)]/90 sm:via-[var(--color-navy)]/80 sm:to-transparent"
        />

        <Container className="relative py-14 sm:py-16">
          <FadeIn className="mx-auto max-w-xl text-center sm:mx-0 sm:max-w-lg sm:text-left lg:max-w-2xl">
            <h1 className="font-display text-[2.25rem] leading-[1.05] font-medium tracking-tight text-balance text-[var(--color-cream)] sm:text-[2.75rem] lg:text-6xl">
              Michele Okimura
            </h1>
            <p className="font-display mt-4 text-lg font-semibold tracking-[0.14em] text-[var(--color-teal-on-dark)] uppercase sm:mt-5 sm:text-xl lg:text-2xl">
              Author. Speaker. Coach.
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-cream)]/85 sm:text-lg sm:leading-8">
              She helps people find the shape of the work they were made to do,
              then walks with them until it lives in the world.
            </p>
          </FadeIn>
        </Container>
      </section>

      <LogoMarquee />

      {/* ------------------------------------------------------ three doors */}
      {/* Directly under the video, still above the fold on a laptop. */}
      <section aria-labelledby="three-ways-heading" className={`${WIDE} mt-10 sm:mt-12`}>
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
                  className="group flex w-full flex-col rounded-3xl bg-[var(--color-teal-05)] p-6 ring-1 ring-[var(--color-teal-10)] transition duration-300 hover:bg-[var(--color-cream)] hover:shadow-xl hover:shadow-[var(--color-teal-20)] hover:ring-[var(--color-teal-30)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-teal)] lg:p-8"
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
      </section>

      {/* ------------------------------------------------------ who she is */}
      <section aria-label="About Michele">
        <Container className="mt-20 sm:mt-28 lg:mt-32">
          <FadeIn className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-10 lg:gap-14">
            <Image
              src="/team/michele-okimura.jpg"
              alt="Michele Okimura"
              width={1029}
              height={1286}
              sizes="(min-width: 1024px) 14rem, (min-width: 640px) 11rem, 9rem"
              className="h-36 w-36 shrink-0 rounded-full object-cover object-top shadow-lg shadow-[var(--color-teal-10)] ring-4 ring-[var(--color-cream)] sm:h-44 sm:w-44 lg:h-56 lg:w-56"
            />
            <p className="max-w-2xl text-center text-lg leading-8 text-neutral-700 sm:text-left sm:text-xl sm:leading-9">
              Founder and{' '}
              <span className="font-semibold text-[var(--color-brand-teal)]">
                Executive Director of Releasing Generations
              </span>
              . Part-time pastor at Lifespring Church, Honolulu. Fourteen years
              in a Hawaiʻi public elementary classroom. Based on Oʻahu, Hawaiʻi.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ------------------------------------------------------------ proof */}
      <section aria-label="Recognition and proof">
        <Container className="mt-20 sm:mt-28 lg:mt-32">
          <FadeIn className="max-w-3xl">
            <span className="font-display block text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase sm:text-sm">
              Recognition
            </span>
            <h2 className="font-display mt-6 text-3xl font-medium tracking-tight text-balance text-[var(--color-brand-teal)] sm:text-4xl lg:text-5xl">
              The work has been checked by people who had to be sure.
            </h2>
          </FadeIn>

          <FadeInStagger faster className="mt-10 sm:mt-12">
            <dl className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-8">
              {PROOF_POINTS.map((point) => (
                <FadeIn
                  as="div"
                  key={point.label}
                  className="h-full rounded-2xl bg-[var(--color-teal-05)] p-6 ring-1 ring-[var(--color-teal-10)] sm:flex sm:items-baseline sm:gap-6 lg:block lg:p-8"
                >
                  <dt className="font-display text-2xl font-semibold tracking-tight text-[var(--color-brand-teal)] sm:w-36 sm:shrink-0 lg:w-auto lg:text-3xl">
                    {point.label}
                  </dt>
                  <dd className="mt-3 text-sm leading-6 text-neutral-700 sm:mt-0 lg:mt-3 lg:text-base lg:leading-7">
                    {point.body}
                  </dd>
                </FadeIn>
              ))}
            </dl>
          </FadeInStagger>

          {/* Endorsements. Wording is verbatim; attribution sits on its own
              lines so no quote needs a dash to introduce the speaker. */}
          <FadeInStagger faster className="mt-12 sm:mt-16">
            <ul
              role="list"
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
            >
              {ENDORSEMENTS.map((item) => (
                <FadeIn
                  as="li"
                  key={item.name}
                  className="last:sm:col-span-2 last:lg:col-span-1"
                >
                  <figure className="flex h-full flex-col border-t border-[var(--color-teal-30)] pt-6 last:sm:max-w-md last:lg:max-w-none">
                    <blockquote className="flex-auto text-base leading-7 text-neutral-700 italic">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 text-sm not-italic">
                      <span className="block font-semibold text-neutral-900">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-neutral-500">
                        {item.title}
                      </span>
                      <span className="block text-neutral-500">{item.org}</span>
                    </figcaption>
                  </figure>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>

          <FadeIn className="mt-10">
            <p className="text-sm leading-6 text-neutral-500">
              With endorsements from{' '}
              <span className="font-medium text-neutral-700">
                {ENDORSING_ORGS.join(', ')}
              </span>
              , and more.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ---------------------------------------------------- featured work */}
      <section aria-label="Featured work">
        <Container className="mt-20 sm:mt-28 lg:mt-32">
          <FadeIn className="max-w-3xl">
            <span className="font-display block text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase sm:text-sm">
              A body of work
            </span>
            <h2 className="font-display mt-6 text-3xl font-medium tracking-tight text-balance text-[var(--color-brand-teal)] sm:text-4xl lg:text-5xl">
              Fourteen works, and eight of them have a case study.
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-700 sm:text-xl">
              Michele coaches this work because she has done it herself, start
              to finish, across books, curricula, and journals.
            </p>
          </FadeIn>

          <FadeInStagger faster className="mt-12">
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 xl:grid-cols-6 xl:gap-x-6"
            >
              {FEATURED_WORKS.map((work) => (
                <FadeIn as="li" key={work.href}>
                  <Link href={work.href} className="group block">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[var(--color-cream)] ring-1 ring-[var(--color-teal-10)] transition duration-300 group-hover:ring-[var(--color-teal-30)]">
                      {work.cover ? (
                        <Image
                          src={work.cover}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 45vw"
                          className="object-contain p-3 transition duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-[var(--color-teal-05)] p-4 text-center">
                          <span className="font-display text-base font-medium text-balance text-[var(--color-brand-teal)] italic">
                            {work.title}
                          </span>
                          <span className="font-display mt-3 text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                            Cover to come
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="font-display mt-3 text-xs font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
                      {work.kicker}
                    </p>
                    <h3 className="font-display mt-1 text-sm font-semibold tracking-tight text-balance text-neutral-900">
                      {work.title}
                    </h3>
                  </Link>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>

          <FadeIn className="mt-10">
            <Button href="/author" variant="secondary">
              See every title
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* ------------------------------------------------ coaching close */}
      <section aria-label="The Brave Purpose Author Method">
        <Container className="mt-20 sm:mt-28 lg:mt-32">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="font-display block text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase sm:text-sm">
              The Brave Purpose Author Method
            </span>
            <h2 className="font-display mt-6 text-3xl font-medium tracking-tight text-balance text-[var(--color-brand-teal)] sm:text-4xl lg:text-5xl">
              A book in you. A method that gets it on the page.
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-700 sm:text-xl">
              Twenty-six weeks, one writer, one method. The starting posture
              does not matter: a blank page, half a draft in three folders, or a
              finished manuscript that will not sit still. What comes out the
              other side is a publication-ready book that still sounds like you.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
              <Button href="/coaching">Work with Michele</Button>
              <Button href="/how-it-works" variant="secondary">
                See how it works
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      <ContactBlock heading="Ready when you are." source="home">
        <p>
          Whether you are booking a stage, starting a manuscript, or still
          deciding, leave your name and Michele will reach out personally.
        </p>
      </ContactBlock>
    </>
  )
}
