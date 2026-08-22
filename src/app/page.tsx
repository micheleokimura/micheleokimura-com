// TODO: Hero video wiring — swap the hero image/text-only hero for the Michele
// hero video (michele-hero.mp4 + .webm) as a background loop with the
// golden-thread H1 overlaid. Waiting on video render.

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import { ContactBlock } from '@/components/ContactBlock'
import { GOLDEN_THREAD_QUOTE } from '@/lib/projects'
import { DOORS, ENDORSEMENTS, ENDORSING_ORGS, PROOF_POINTS } from '@/lib/home-variants'

/**
 * Home page, positioning-forward.
 *
 * The golden thread is the whole thesis, so it runs the hero instead of
 * arriving as a mid-page pull quote. Every section below is a restatement of
 * the same movement: restoration, healing, encouragement, brave purpose.
 *
 * The hero line is an adaptation written for display, and Michele's verbatim
 * wording follows immediately underneath, attributed. The two are kept
 * separate on purpose so the display line can be shaped for the page while the
 * quote itself stays exactly as she said it.
 *
 * The three paths are labeled by OUTCOME rather than by job title, because a
 * page led by positioning should ask the reader where they are going rather
 * than which of Michele's hats they need.
 */
export const metadata: Metadata = {
  title: 'Speaker, author, and coach',
  description:
    'Restoration. Healing. Encouragement. One thread runs through every book, every journal, and every classroom. Michele Okimura is an author, speaker, and coach on Oʻahu, Hawaiʻi.',
}

/** The four movements of the thread, used as a repeating spine down the page. */
const MOVEMENTS = ['Restoration', 'Healing', 'Encouragement', 'Brave purpose'] as const

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <section aria-label="The golden thread" className="pt-4 sm:pt-10 lg:pt-14">
        <Container>
          <FadeIn className="mx-auto max-w-4xl text-center">
            <span className="block font-display text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-orange-ink)] uppercase sm:text-sm">
              The golden thread
            </span>

            <h1 className="mt-8 font-display text-[1.75rem] leading-[1.35] font-medium text-balance text-neutral-950 italic sm:text-[2.25rem] sm:leading-[1.35] lg:text-[3rem] lg:leading-[1.3]">
              Restoration. Healing. Encouragement. One thread runs through every
              book, every journal, and every classroom. It arrives in one place:
              your brave purpose, lived out.
            </h1>

            {/* The movements rendered as a literal thread. The connecting rules
                are decorative and appear only at lg, the first width where all
                four pills fit on one row. Below that the row wraps, and a
                leading connector would dangle in the whitespace. */}
            <ul
              role="list"
              className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:mt-12 sm:gap-x-4"
            >
              {MOVEMENTS.map((movement, i) => (
                <li key={movement} className="flex items-center gap-3 sm:gap-4">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-px w-6 bg-[var(--color-brand-orange)]/40 lg:block lg:w-10"
                    />
                  )}
                  <span className="rounded-full bg-[#ff4500]/[0.08] px-4 py-1.5 font-display text-xs font-semibold tracking-widest text-[var(--color-brand-orange-ink)] uppercase sm:text-sm">
                    {movement}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <Button href="/projects" variant="secondary">
                Follow the thread through the work
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* --------------------------------------------- who Michele is */}
      <section aria-label="About Michele">
        <Container className="mt-20 sm:mt-28 lg:mt-32">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <FadeIn scaleIn>
              <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-3xl shadow-xl shadow-neutral-900/10 ring-1 ring-neutral-900/5 sm:max-w-sm lg:max-w-none">
                <Image
                  src="/team/michele-okimura-2.jpg"
                  alt="Michele Okimura"
                  width={1029}
                  height={1286}
                  priority
                  sizes="(min-width: 1280px) 30rem, (min-width: 1024px) 38vw, (min-width: 640px) 24rem, 20rem"
                  className="h-auto w-full object-cover"
                />
              </div>
            </FadeIn>

            <FadeIn>
              <h2 className="font-display text-3xl font-medium tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
                Michele Okimura
              </h2>
              <p className="mt-6 text-lg leading-8 text-neutral-700 sm:text-xl sm:leading-9">
                She is an author, speaker, and coach on Oʻahu, Hawaiʻi, the
                founder and Executive Director of Releasing Generations, and a
                part-time pastor at the Honolulu church she and her husband Rob
                planted in 1997. Roughly fourteen years in Hawaiʻi public
                elementary classrooms, two published books with two more
                releasing in 2027, and a curriculum now in secondary public
                schools taught her the one thing she
                keeps coming back to: people cannot chase a dream they do not
                believe they are worth.
              </p>

              {/* Michele's own wording, verbatim, single-sourced from
                  src/lib/projects.ts. The hero paraphrases; this does not. */}
              <figure className="mt-9 border-l-2 border-[var(--color-brand-orange)] pl-6 sm:pl-8">
                <blockquote className="text-base leading-7 text-neutral-700 italic sm:text-lg sm:leading-8">
                  &ldquo;{GOLDEN_THREAD_QUOTE}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm font-medium text-neutral-500 not-italic">
                  Michele Okimura
                </figcaption>
              </figure>

              <div className="mt-8">
                <Button href="/about" variant="secondary">
                  Read her story
                </Button>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------ three paths in */}
      <section aria-label="Ways in">
        <Container className="mt-20 sm:mt-28 lg:mt-32">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="block font-display text-sm font-semibold tracking-wider text-neutral-500 uppercase">
              Where the thread picks you up
            </span>
            <h2 className="mt-6 font-display text-3xl font-medium tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
              Three ways in. Same destination.
            </h2>
          </FadeIn>

          <FadeInStagger faster className="mt-12 sm:mt-16">
            <ol
              role="list"
              className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-8"
            >
              {DOORS.map((door, i) => (
                <FadeIn as="li" key={door.key} className="flex">
                  <Link
                    href={door.href}
                    aria-label={`${door.outcomeLabel}: ${door.cta}`}
                    className="group flex w-full flex-col rounded-3xl border border-neutral-200 p-7 transition duration-300 hover:border-[var(--color-brand-orange)] hover:shadow-xl hover:shadow-neutral-900/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-orange)] sm:flex-row sm:items-start sm:gap-8 lg:flex-col lg:gap-0 lg:p-9"
                  >
                    {/* Number and outcome label ride together in a left column
                        between sm and lg, so the hook keeps a readable measure
                        on an iPad instead of collapsing to a narrow strip. */}
                    <div className="sm:w-56 sm:shrink-0 lg:w-auto">
                      <span
                        aria-hidden="true"
                        className="font-display text-sm font-semibold text-[var(--color-brand-orange-ink)]"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-balance text-neutral-950 lg:mt-4 lg:text-2xl">
                        {door.outcomeLabel}
                      </h3>
                    </div>
                    <div className="mt-4 flex flex-auto flex-col sm:mt-0 lg:mt-4">
                      <p className="flex-auto text-base leading-7 text-neutral-600">
                        {door.hook}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-neutral-950 underline decoration-[var(--color-brand-orange)] decoration-1 underline-offset-4 transition group-hover:decoration-2 lg:mt-7">
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
            </ol>
          </FadeInStagger>
        </Container>
      </section>

      {/* ------------------------------------------------------------ proof */}
      <section aria-label="Recognition and proof">
        <Container className="mt-20 sm:mt-28 lg:mt-32">
          <FadeIn>
            <div className="-mx-6 bg-neutral-950 surface-sapphire px-6 py-16 sm:mx-0 sm:rounded-4xl sm:px-12 sm:py-20 lg:px-16">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center font-display text-xs font-semibold tracking-[0.2em] text-white/90 uppercase">
                  Why the thread holds
                </h2>

                <dl className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10">
                  {PROOF_POINTS.map((point) => (
                    <div
                      key={point.label}
                      className="border-t border-white/15 pt-5 sm:flex sm:items-baseline sm:gap-6 lg:block"
                    >
                      <dt className="font-display text-xl font-semibold tracking-tight text-white sm:w-32 sm:shrink-0 lg:w-auto lg:text-2xl">
                        {point.label}
                      </dt>
                      <dd className="mt-3 text-sm leading-6 text-white/80 sm:mt-0 lg:mt-3 lg:text-base lg:leading-7">
                        {point.body}
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul
                  role="list"
                  className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10"
                >
                  {ENDORSEMENTS.slice(0, 2).map((item) => (
                    <li key={item.name}>
                      <figure className="flex h-full flex-col">
                        <blockquote className="flex-auto text-base leading-7 text-white/90 italic lg:text-lg lg:leading-8">
                          &ldquo;{item.quote}&rdquo;
                        </blockquote>
                        <figcaption className="mt-5 text-sm not-italic">
                          <span className="block font-semibold text-white">
                            {item.name}
                          </span>
                          <span className="mt-0.5 block text-white/70">
                            {item.title}
                          </span>
                          <span className="block text-white/70">{item.org}</span>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>

                <p className="mt-12 border-t border-white/15 pt-8 text-center text-sm leading-6 text-white/70">
                  With endorsements from{' '}
                  <span className="font-medium text-white">
                    {ENDORSING_ORGS.join(', ')}
                  </span>
                  , and more.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ---------------------------------------------------------- closing */}
      <section aria-label="See the work">
        <Container className="mt-20 sm:mt-28 lg:mt-32">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
              Follow the thread through everything she has built.
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-600 sm:text-xl">
              Eight case studies. Each one starts with where the idea came from
              and ends with who it reached.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
              <Button href="/projects">See the case studies</Button>
              <Button href="/coaching" variant="secondary">
                Work with Michele
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      <ContactBlock heading="Start where you are." source="home">
        <p>
          Michele takes on a small number of coaching clients and speaking dates
          each year. Leave your name and she will reach out personally.
        </p>
      </ContactBlock>
    </>
  )
}
