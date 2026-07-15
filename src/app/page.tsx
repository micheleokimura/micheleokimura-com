import type { Metadata } from 'next'
import Link from 'next/link'

import Image from 'next/image'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import { SectionIntro } from '@/components/SectionIntro'
import { Border } from '@/components/Border'
import { HeroMosaicBackground } from '@/components/HeroMosaic'
import { JoinWaitListButton } from '@/components/wait-list/JoinWaitListButton'
import { CredentialsBar } from '@/components/CredentialsBar'
import { EmilyPortrait as MichelePortrait } from '@/components/EmilyAvatar'
import { OrgCarousel } from '@/components/OrgCarousel'
import { ContactBlock } from '@/components/ContactBlock'
import { PodcastSeriesJsonLd } from '@/components/JsonLd'
import { siteConfig, authoredWorks } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Speaker, author, and coach',
  description: siteConfig.description,
}

const WHAT_I_DO = [
  {
    title: 'Speaking.',
    body:
      'Conferences, retreats, churches, and schools. I speak on identity, courage, and the brave purpose that grows out of our hardest stories.',
  },
  {
    title: 'The Brave Purpose Author Method.',
    body:
      'My coaching method. Together we shape the message and the book only you can write, and the courage to put it into the world.',
  },
  {
    title: 'Author.',
    body:
      'I write about healing, identity, and the trust that gets refined through trial. The kind of honesty that turns a broken story into a launchpad.',
  },
]

export default function HomePage() {
  const podcast = siteConfig.podcast

  return (
    <>
      <PodcastSeriesJsonLd
        name={podcast.name}
        url={podcast.url}
        publisher={podcast.publisher}
        description={podcast.description}
        inLanguage={podcast.inLanguage}
      />

      {/* Sticky parallax: hero pins while the org band scrolls over it */}
      <div className="relative">
        <div className="relative isolate overflow-hidden md:sticky md:top-0 md:z-0">
          <HeroMosaicBackground />
          <section aria-label="Introduction" className="relative z-10 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36">
            <Container>
              <div className="flex items-start justify-between gap-12">
                <div className="max-w-2xl">
                  <FadeIn>
                    <span className="mb-5 block font-display text-sm font-semibold tracking-wider text-[var(--color-brand-teal)] uppercase">
                      Brave Purpose
                    </span>
                    <h1 className="font-display text-[2.75rem] leading-[1.05] font-medium tracking-tight text-balance text-neutral-950 sm:text-6xl lg:text-[3.75rem] lg:leading-[1.08]">
                      Turn your story into your purpose.
                    </h1>
                    <p className="mt-6 max-w-xl text-xl leading-8 text-neutral-600">
                      Welcome. I&rsquo;m Michele Okimura, a speaker, author, and coach. For four
                      decades I&rsquo;ve helped people find courage, healing, and the purpose
                      that was waiting on the other side of their hardest seasons.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center gap-6">
                      <JoinWaitListButton source="home-hero" />
                      <Button href="/case-studies" variant="ghost">
                        See the work
                      </Button>
                    </div>
                    <p className="mt-6 text-sm font-medium text-neutral-500">
                      The <span className="text-neutral-700">Brave Purpose Author Method</span>. Coaching for the story only you can tell.
                    </p>
                  </FadeIn>
                </div>

                <FadeIn className="hidden lg:block shrink-0">
                  <div className="relative w-72 xl:w-80 rotate-2 rounded-2xl shadow-2xl shadow-neutral-900/20 overflow-hidden ring-1 ring-white/60">
                    <Image
                      src="/team/michele-hero-canva.jpg"
                      alt="Michele Okimura"
                      width={320}
                      height={400}
                      className="block w-full object-cover"
                      style={{ aspectRatio: '4/5' }}
                      priority
                    />
                  </div>
                </FadeIn>
              </div>
            </Container>
          </section>
        </div>

        <div className="relative z-10 bg-white pt-8 sm:pt-10">
          <CredentialsBar />
          <div className="mt-10 sm:mt-14 px-6 lg:px-8">
            <OrgCarousel />
          </div>
        </div>
      </div>

      {/* The method — primary offer, portrait of Michele on the right */}
      <section aria-label="The Brave Purpose Author Method">
        <SectionIntro
          eyebrow="The method"
          title="The Brave Purpose Author Method."
          className="mt-24 sm:mt-32 lg:mt-40"
          aside={
            <FadeIn scaleIn className="mx-auto w-full max-w-[420px] lg:mx-0 lg:ml-auto">
              <MichelePortrait width={420} />
            </FadeIn>
          }
        >
          <p>
            My own story began with a healing journey: turning feelings of
            worthlessness into a deep sense of value. That is the work I do with
            others now. The Brave Purpose Author Method is coaching for the
            person who knows they carry a message and needs the courage and the
            structure to tell it.
          </p>
        </SectionIntro>

        <Container className="mt-16">
          <FadeInStagger faster>
            <ul role="list" className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {WHAT_I_DO.map((item) => (
                <FadeIn as="li" key={item.title}>
                  <Border className="pt-8">
                    <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-neutral-950">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-neutral-600">
                      {item.body}
                    </p>
                  </Border>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>
        </Container>
      </section>

      {/* Case studies teaser */}
      <section aria-label="Case studies">
        <SectionIntro
          eyebrow="The work"
          title="Stories from the work."
          className="mt-24 sm:mt-32 lg:mt-40"
        >
          <p>
            Schools, churches, and nonprofits Michele has walked with. Each story
            is told from the inside, by the work and the outcome.
          </p>
        </SectionIntro>
        <Container className="mt-10">
          <FadeIn>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-base font-semibold text-neutral-950 underline decoration-[var(--color-cta)] underline-offset-4 hover:decoration-2"
            >
              Read the case studies
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </FadeIn>
        </Container>
      </section>

      <ContactBlock heading="Join the waitlist.">
        <p>
          Michele takes on a small number of coaching clients and speaking dates.
          Leave your name and email and she will reach out personally when a spot
          opens.
        </p>
      </ContactBlock>
    </>
  )
}
