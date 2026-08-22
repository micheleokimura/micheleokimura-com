import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import { Border } from '@/components/Border'
import { ContactBlock } from '@/components/ContactBlock'
import { GOLDEN_THREAD_QUOTE, GOLDEN_THREAD_CULMINATION } from '@/lib/projects'
import { DOORS, FEATURED_WORKS, NONPROFIT_ROOM } from '@/lib/home-variants'

/**
 * Home page design variant 1 of 3: STORY-DRIVEN.
 *
 * Opens on Michele's own arc and lets the work arrive as consequence rather
 * than as a menu. The hero carries a single soft CTA on purpose; this variant
 * is betting that a reader who is moved will scroll, and the conversion ask is
 * held back until the golden thread has landed.
 *
 * The opening scene is sourced verbatim in substance from the published
 * introduction to `Dancing with Father` (2011), captured in
 * content/case-studies/origin-stories.md: the Senior Prom, the white gown her
 * mother sewed, the answer she got, and the healing sixteen years later.
 *
 * Not indexed. These are review routes, promoted to `/` once Michele picks one.
 */
export const metadata: Metadata = {
  title: 'Home variant 1 · Narrative',
  description:
    'Story-driven home page design for review. Opens on Michele Okimura’s own arc and lets the body of work follow from it.',
  robots: { index: false, follow: false },
}

export default function HomeNarrativeVariant() {
  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <section aria-label="Introduction" className="pt-4 sm:pt-8 lg:pt-12">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* Portrait leads on mobile so the page opens on a face, then
                moves to the right column once there is room for two. */}
            <FadeIn scaleIn className="order-first lg:order-last">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[17rem] overflow-hidden rounded-3xl shadow-xl shadow-neutral-900/10 ring-1 ring-neutral-900/5 sm:max-w-xs lg:aspect-[5/6] lg:max-w-[26rem]">
                <Image
                  src="/team/michele-okimura.jpg"
                  alt="Michele Okimura"
                  fill
                  priority
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 20rem, 17rem"
                  className="object-cover object-top"
                />
              </div>
            </FadeIn>

            <FadeIn className="order-last lg:order-first">
              <span className="block font-display text-sm font-semibold tracking-wider text-[var(--color-brand-orange-ink)] uppercase">
                Michele Okimura
              </span>
              <h1 className="mt-5 font-display text-[2rem] leading-[1.12] font-medium tracking-tight text-balance text-neutral-950 sm:text-[2.5rem] sm:leading-[1.1] lg:text-[2.875rem] lg:leading-[1.1]">
                I spent years believing I was not worth much. Everything I have
                written since is an argument against that.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600 sm:text-xl">
                I was a teenager, standing in our living room in a white gown
                my mother sewed for my Senior Prom. I asked how I looked. The
                answer took my breath away. It took another sixteen years for
                that moment to be healed, and out of the healing came a book.
                Then another. Then a curriculum, a nonprofit, and a room full of
                people learning to dream again.
              </p>
              <div className="mt-9">
                <Button href="#the-story" variant="secondary">
                  Read the rest of the story
                </Button>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- the story */}
      <section id="the-story" aria-label="Michele’s story" className="scroll-mt-28 sm:scroll-mt-32">
        <Container className="mt-20 sm:mt-28 lg:mt-32">
          <FadeIn className="mx-auto max-w-3xl">
            <span className="block font-display text-sm font-semibold tracking-wider text-neutral-500 uppercase">
              The rest of it
            </span>
            <div className="mt-8 space-y-6 text-lg leading-8 text-neutral-700 sm:text-xl sm:leading-9">
              <p className="font-display text-2xl leading-9 text-neutral-950 sm:text-[1.75rem] sm:leading-10">
                Sixteen years later, on the last day of a conference, my small
                group took turns praying for each other. Three women, one after
                another, said they saw me in a white dress. One of them said
                Father God wanted to dance with me.
              </p>
              <p>
                I wept. That was the new defining moment, and it is the reason{' '}
                <Link
                  href="/projects/dancing-with-father"
                  className="font-medium text-neutral-950 underline decoration-[var(--color-brand-orange)] decoration-1 underline-offset-4 transition hover:decoration-2"
                >
                  Dancing with Father
                </Link>{' '}
                exists. Turning that feeling of worthlessness into a deep sense
                of value lit a fire in me, and the fire has never really gone
                out.
              </p>
              <p>
                I taught in Hawaiʻi public elementary classrooms for years. In
                1997 my husband Rob and I planted the church in Honolulu where I
                still pastor part time. In between I kept writing, and the
                writing kept turning into things people could hold: journals,
                lesson books, a teen curriculum, conferences. In 2023 the State
                of Hawaiʻi named me Outstanding Advocate for Children and Youth.
              </p>
              <p>
                My firm belief is that every person&rsquo;s story, even the
                broken ones, can become a launchpad into a future full of
                freedom, wonder, and possibility.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* --------------------------------------------------- what she built */}
      <section aria-label="Body of work">
        <Container className="mt-20 sm:mt-28 lg:mt-36">
          <FadeIn className="max-w-3xl">
            <span className="block font-display text-sm font-semibold tracking-wider text-neutral-500 uppercase">
              Here is what I have built
            </span>
            <h2 className="mt-6 font-display text-3xl font-medium tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
              Every one of these started as something that happened to me first.
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-600 sm:text-xl">
              Two published books, two more releasing in 2027, a 24-volume teen
              curriculum whose non-faith edition is now approved by the Hawaiʻi
              State Department of Education for secondary public schools, and
              journals for readers from age four to adult. Each one has its own
              story.
            </p>
          </FadeIn>

          <FadeInStagger faster className="mt-12 sm:mt-16">
            <ul
              role="list"
              className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            >
              {FEATURED_WORKS.map((work) => (
                <FadeIn as="li" key={work.href}>
                  <Link href={work.href} className="group block">
                    {/* Fixed 4:5 card with object-contain: these covers range
                        from tall portrait to 4:3 landscape, so cropping them to
                        a shared ratio would cut the titles off. */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-900/5 transition duration-300 group-hover:ring-[var(--color-brand-orange)]">
                      {work.cover ? (
                        <Image
                          src={work.cover}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                          className="object-contain p-5 transition duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-[#ff4500]/[0.07] p-6 text-center">
                          <span className="font-display text-2xl font-medium text-balance text-neutral-950 italic">
                            {work.title}
                          </span>
                          <span className="mt-4 font-display text-xs font-semibold tracking-widest text-[var(--color-brand-orange-ink)] uppercase">
                            Cover reveal to come
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="mt-5 font-display text-xs font-semibold tracking-widest text-[var(--color-brand-orange-ink)] uppercase">
                      {work.kicker}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-neutral-950">
                      {work.title}
                    </h3>
                  </Link>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>

          <FadeIn className="mt-12">
            <Button href="/projects" variant="secondary">
              See all of the work
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* ------------------------------------------------- what she does now */}
      <section aria-label="What Michele does now">
        <Container className="mt-20 sm:mt-28 lg:mt-36">
          <FadeIn className="max-w-3xl">
            <span className="block font-display text-sm font-semibold tracking-wider text-neutral-500 uppercase">
              Where the work lives today
            </span>
            <h2 className="mt-6 font-display text-3xl font-medium tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
              Four rooms, one calling.
            </h2>
          </FadeIn>

          <FadeInStagger faster className="mt-12 sm:mt-16">
            <ul
              role="list"
              className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
            >
              {DOORS.map((door) => (
                <FadeIn as="li" key={door.key}>
                  <Border className="pt-8">
                    <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-neutral-950">
                      {door.label}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-neutral-600">
                      {door.hook}
                    </p>
                    <Link
                      href={door.href}
                      className="mt-6 inline-flex items-center gap-1.5 py-2.5 -my-0.5 text-sm font-semibold text-neutral-950 underline decoration-[var(--color-brand-orange)] decoration-1 underline-offset-4 transition hover:decoration-2"
                    >
                      {door.cta}
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </Border>
                </FadeIn>
              ))}

              {/* The nonprofit room. Links off-site, so it is rendered here
                  rather than folded into the DOORS list. */}
              <FadeIn as="li">
                <Border className="pt-8">
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-neutral-950">
                    {NONPROFIT_ROOM.label}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-neutral-600">
                    {NONPROFIT_ROOM.hook}
                  </p>
                  <a
                    href={NONPROFIT_ROOM.href}
                    className="mt-6 inline-flex items-center gap-1.5 py-2.5 -my-0.5 text-sm font-semibold text-neutral-950 underline decoration-[var(--color-brand-orange)] decoration-1 underline-offset-4 transition hover:decoration-2"
                  >
                    {NONPROFIT_ROOM.cta}
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </Border>
              </FadeIn>
            </ul>
          </FadeInStagger>
        </Container>
      </section>

      {/* ------------------------------------------------- the golden thread */}
      <section aria-label="The golden thread">
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <figure className="mx-auto max-w-4xl text-center">
              <h2 className="font-display text-xs font-semibold tracking-widest text-[var(--color-brand-orange-ink)] uppercase">
                The golden thread
              </h2>
              <blockquote className="mt-8 font-display text-[1.5rem] leading-[1.5] font-medium text-balance text-neutral-950 italic sm:text-[2rem] sm:leading-[1.45] lg:text-[2.5rem] lg:leading-[1.4]">
                &ldquo;{GOLDEN_THREAD_QUOTE}&rdquo;
              </blockquote>
              <figcaption className="mt-8 text-sm font-medium text-neutral-500 not-italic">
                Michele Okimura
              </figcaption>
              <p className="mx-auto mt-10 max-w-2xl border-t border-neutral-200 pt-10 text-lg leading-8 text-neutral-700 italic">
                &ldquo;{GOLDEN_THREAD_CULMINATION}&rdquo;
              </p>
              <div className="mt-10">
                <Button href="/coaching" variant="secondary">
                  Walk it out with Michele
                </Button>
              </div>
            </figure>
          </FadeIn>
        </Container>
      </section>

      <ContactBlock heading="Tell Michele about your story." source="home-v1-narrative">
        <p>
          Michele takes on a small number of coaching clients and speaking dates
          each year. Leave your name and she will reach out personally.
        </p>
      </ContactBlock>
    </>
  )
}
