import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import { ContactBlock } from '@/components/ContactBlock'
import { GOLDEN_THREAD_CULMINATION } from '@/lib/projects'
import {
  DOORS,
  ENDORSEMENTS,
  ENDORSING_ORGS,
  FEATURED_WORKS,
  PROOF_POINTS,
} from '@/lib/home-variants'

/**
 * Home page design variant 2 of 3: AUTHOR / SPEAKER / COACH CLARITY.
 *
 * Built for the visitor who arrived with a job to do: an event organizer
 * checking whether Michele fits their stage, or a writer sizing up the
 * coaching. The hero is deliberately short so the three doors clear the fold on
 * a laptop, and the coaching CTA is repeated at the top of the card stack and
 * again at the close.
 *
 * The featured-work row is a plain responsive grid rather than a rotating
 * carousel. Michele's authored works ARE her case studies, so hiding two
 * thirds of them behind a carousel arrow would bury the authority stack this
 * page exists to show.
 *
 * Not indexed. These are review routes, promoted to `/` once Michele picks one.
 */
export const metadata: Metadata = {
  title: 'Home variant 2 · Clarity',
  description:
    'Author, speaker, and coach home page design for review. Three doors above the fold, then proof, then the work.',
  robots: { index: false, follow: false },
}

export default function HomeClarityVariant() {
  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <section aria-label="Introduction" className="pt-2 sm:pt-6">
        <Container>
          <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-10 lg:gap-14">
            <FadeIn scaleIn className="justify-self-center sm:justify-self-start">
              <Image
                src="/team/michele-okimura.jpg"
                alt="Michele Okimura"
                width={1029}
                height={1286}
                priority
                sizes="(min-width: 1024px) 16rem, (min-width: 640px) 12rem, 9rem"
                className="h-36 w-36 rounded-full object-cover object-top ring-4 ring-white shadow-lg shadow-neutral-900/10 sm:h-48 sm:w-48 lg:h-64 lg:w-64"
              />
            </FadeIn>

            <FadeIn className="text-center sm:text-left">
              <h1 className="font-display text-[2rem] leading-[1.05] font-medium tracking-tight text-balance text-neutral-950 sm:text-[2.5rem] md:text-5xl lg:text-6xl">
                Michele Okimura
              </h1>
              <p className="mt-4 font-display text-lg font-semibold tracking-wide text-[var(--color-brand-orange-ink)] sm:text-xl lg:text-2xl">
                Author. Speaker. Coach.
              </p>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600 sm:mx-0 sm:text-xl">
                She helps people find the shape of the work they were made to
                do, then walks with them until it lives in the world.
              </p>
              <p className="mt-5 text-base leading-7 text-neutral-600">
                Founder and{' '}
                <span className="font-semibold text-neutral-800">
                  Executive Director of Releasing Generations
                </span>
                . Part-time pastor at Lifespring Church, Honolulu. Based on
                Oʻahu, Hawaiʻi.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------ three doors */}
      <section aria-labelledby="three-ways-heading">
        <Container className="mt-12 sm:mt-14 lg:mt-16">
          <h2 id="three-ways-heading" className="sr-only">
            Three ways to work with Michele
          </h2>
          <FadeInStagger faster>
            <ul
              role="list"
              className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-8"
            >
              {DOORS.map((door) => (
                <FadeIn as="li" key={door.key} className="flex">
                  <Link
                    href={door.href}
                    aria-label={`${door.label}: ${door.cta}`}
                    className="group flex w-full flex-col rounded-3xl bg-neutral-50 p-7 ring-1 ring-neutral-900/[0.07] transition duration-300 hover:bg-white hover:shadow-xl hover:shadow-neutral-900/[0.07] hover:ring-[var(--color-brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-orange)] sm:flex-row sm:items-start sm:gap-8 lg:flex-col lg:gap-0 lg:p-9"
                  >
                    <h3 className="font-display text-xs font-semibold tracking-[0.18em] text-[var(--color-brand-orange-ink)] uppercase sm:w-24 sm:shrink-0 sm:pt-1 lg:w-auto lg:pt-0">
                      {door.label}
                    </h3>
                    <div className="mt-4 flex flex-auto flex-col sm:mt-0 lg:mt-4">
                      <p className="flex-auto text-base leading-7 text-neutral-700 lg:text-lg lg:leading-8">
                        {door.hook}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1.5 self-start font-display text-sm font-semibold text-neutral-950 underline decoration-[var(--color-brand-orange)] decoration-1 underline-offset-4 transition group-hover:decoration-2 lg:mt-7">
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
        </Container>
      </section>

      {/* ------------------------------------------------------------ proof */}
      <section aria-label="Recognition and proof">
        <Container className="mt-20 sm:mt-28 lg:mt-32">
          <FadeIn className="max-w-3xl">
            <span className="block font-display text-sm font-semibold tracking-wider text-neutral-500 uppercase">
              Recognition
            </span>
            <h2 className="mt-6 font-display text-3xl font-medium tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
              The work has been checked by people who had to be sure.
            </h2>
          </FadeIn>

          <FadeInStagger faster className="mt-10 sm:mt-12">
            <dl className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-8">
              {PROOF_POINTS.map((point) => (
                <FadeIn
                  as="div"
                  key={point.label}
                  className="h-full rounded-2xl bg-[#ff4500]/[0.06] p-6 ring-1 ring-[#ff4500]/[0.2] sm:flex sm:items-baseline sm:gap-6 lg:block lg:p-8"
                >
                  <dt className="font-display text-2xl font-semibold tracking-tight text-[var(--color-brand-orange-ink)] sm:w-36 sm:shrink-0 lg:w-auto lg:text-3xl">
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
                  <figure className="flex h-full flex-col border-t border-neutral-950 pt-6 last:sm:max-w-md last:lg:max-w-none">
                    <blockquote className="flex-auto text-base leading-7 text-neutral-700 italic">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 text-sm not-italic">
                      <span className="block font-semibold text-neutral-950">
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
            <span className="block font-display text-sm font-semibold tracking-wider text-neutral-500 uppercase">
              A body of work
            </span>
            <h2 className="mt-6 font-display text-3xl font-medium tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
              Fourteen works, and eight of them have a case study.
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-600 sm:text-xl">
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
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-neutral-900/5 transition duration-300 group-hover:ring-[var(--color-brand-orange)]">
                      {work.cover ? (
                        <Image
                          src={work.cover}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 45vw"
                          className="object-contain p-3 transition duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-[#ff4500]/[0.07] p-4 text-center">
                          <span className="font-display text-base font-medium text-balance text-neutral-950 italic">
                            {work.title}
                          </span>
                          <span className="mt-3 font-display text-xs font-semibold tracking-widest text-[var(--color-brand-orange-ink)] uppercase">
                            Cover to come
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="mt-3 font-display text-xs font-semibold tracking-widest text-[var(--color-brand-orange-ink)] uppercase">
                      {work.kicker}
                    </p>
                    <h3 className="mt-1 font-display text-sm font-semibold tracking-tight text-balance text-neutral-950">
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

      {/* ---------------------------------------- golden thread, mid-page */}
      <section aria-label="The golden thread">
        <Container className="mt-20 sm:mt-28 lg:mt-32">
          <FadeIn>
            <div className="-mx-6 bg-neutral-950 surface-sapphire px-6 py-16 sm:mx-0 sm:rounded-4xl sm:px-12 sm:py-20 lg:px-16">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-display text-xs font-semibold tracking-[0.2em] text-white/90 uppercase">
                  The golden thread
                </h2>
                <p className="mt-7 font-display text-2xl leading-[1.45] font-medium text-balance text-white sm:text-3xl lg:text-4xl lg:leading-[1.35]">
                  &ldquo;{GOLDEN_THREAD_CULMINATION}&rdquo;
                </p>
                <p className="mt-7 text-sm font-medium text-white/70">
                  Michele Okimura
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ------------------------------------------------ coaching close */}
      <section aria-label="The Brave Purpose Author Method">
        <Container className="mt-20 sm:mt-28 lg:mt-32">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="block font-display text-sm font-semibold tracking-wider text-neutral-500 uppercase">
              The Brave Purpose Author Method
            </span>
            <h2 className="mt-6 font-display text-3xl font-medium tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
              A book in you. A method that gets it on the page.
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-600 sm:text-xl">
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

      <ContactBlock heading="Ready when you are." source="home-v2-clarity">
        <p>
          Whether you are booking a stage, starting a manuscript, or still
          deciding, leave your name and Michele will reach out personally.
        </p>
      </ContactBlock>
    </>
  )
}
