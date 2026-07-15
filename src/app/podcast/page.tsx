import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import { PageIntro } from '@/components/PageIntro'
import { ContactBlock } from '@/components/ContactBlock'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'In a Moment',
  description:
    'Honest conversations about faith, marriage, and the moments that change everything. Co-hosted by Michele Okimura and Brett K. Moore.',
  alternates: { canonical: '/podcast' },
  openGraph: {
    type: 'website',
    title: `In a Moment | ${siteConfig.brand}`,
    description: siteConfig.podcast.description,
    url: `${siteConfig.url}/podcast`,
  },
}

const SUBSCRIBE_LINKS = [
  {
    name: 'Apple Podcasts',
    href: siteConfig.podcast.apple,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a7 7 0 110 14 7 7 0 010-14zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0 7c-1.38 0-2.5.56-2.5 1.25V17c0 .69 1.12 1.25 2.5 1.25s2.5-.56 2.5-1.25v-1.75c0-.69-1.12-1.25-2.5-1.25z" />
      </svg>
    ),
  },
  {
    name: 'Spotify',
    href: siteConfig.podcast.spotify,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 01-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.224-2.719a.78.78 0 01-1.072.257c-2.687-1.652-6.786-2.131-9.965-1.166a.78.78 0 01-.452-1.493c3.632-1.102 8.147-.568 11.232 1.33a.78.78 0 01.257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.934.934 0 11-.542-1.79c3.533-1.072 9.405-.865 13.115 1.338a.934.934 0 01-.955 1.611z" />
      </svg>
    ),
  },
  {
    name: 'RSS Feed',
    href: siteConfig.podcast.rss,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M6.503 20.752a2.252 2.252 0 110-4.504 2.252 2.252 0 010 4.504zM4.25 11.5a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-1.5 0A6.75 6.75 0 005 12.25a.75.75 0 01-.75-.75zm0-4.5a.75.75 0 01.75-.75c7.042 0 12.75 5.708 12.75 12.75a.75.75 0 01-1.5 0C16.25 12.093 11.907 7.75 5 7.75a.75.75 0 01-.75-.75z" />
      </svg>
    ),
  },
]

/* TODO wire Transistor API: these are placeholder episodes.
   When Transistor API access is available, pull episodes dynamically
   from https://api.transistor.fm/v1/episodes?show_id=<show_id>
   using the API key from HQ credentials. */
const EPISODES: {
  number: number
  title: string
  guest?: string
  date: string
  description: string
  listenUrl: string
}[] = [
  {
    number: 1,
    title: 'Pilot: The Moments That Made Us',
    date: '2025',
    description:
      'Michele and Brett sit down for the first time to talk about the moments that shaped their lives, their faith, and their friendship. A raw, honest conversation about identity, purpose, and the courage to start.',
    listenUrl: siteConfig.podcast.url,
  },
]

export default function PodcastPage() {
  const podcast = siteConfig.podcast

  return (
    <>
      <PageIntro eyebrow="Podcast" title="In a Moment.">
        <p>{podcast.description}</p>
      </PageIntro>

      {/* Transistor player embed */}
      <Container className="mt-16 sm:mt-24">
        <FadeIn>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-neutral-50 ring-1 ring-neutral-900/5">
            <iframe
              src="https://share.transistor.fm/e/in-a-moment"
              width="100%"
              height="180"
              frameBorder="0"
              scrolling="no"
              seamless
              title="In a Moment podcast player"
              className="block w-full"
            />
          </div>
        </FadeIn>
      </Container>

      {/* Subscribe buttons */}
      <Container className="mt-10">
        <FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {SUBSCRIBE_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 ring-1 ring-neutral-200 transition hover:bg-neutral-50 hover:ring-neutral-400"
              >
                {link.icon}
                {link.name}
              </a>
            ))}
          </div>
        </FadeIn>
      </Container>

      {/* About the show */}
      <section aria-label="About the show">
        <Container className="mt-20 sm:mt-28">
          <FadeIn>
            <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
              About the show
            </h2>
          </FadeIn>
          <FadeIn className="mt-8 max-w-3xl">
            <div className="space-y-6 text-lg leading-8 text-neutral-600">
              <p>
                In a Moment is the podcast where Michele Okimura and Brett K.
                Moore have honest conversations about faith, marriage, healing,
                and the small moments that quietly change everything.
              </p>
              <p>
                No performance. No polish. Just two people sitting down to talk
                about what is real, what is hard, and what keeps showing up when
                you pay attention.
              </p>
              <p>
                The name comes from a conviction Michele carries: that the
                biggest shifts in a life happen in a single moment of honesty,
                surrender, or courage. The podcast is about noticing those
                moments and learning to stay in them long enough for them to do
                their work.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Hosts */}
      <section aria-label="Hosts">
        <Container className="mt-20 sm:mt-28">
          <FadeIn>
            <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
              Your hosts
            </h2>
          </FadeIn>
          <FadeInStagger faster className="mt-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-3xl">
              <FadeIn>
                <Border className="pt-8">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-neutral-950">
                    Michele Okimura
                  </h3>
                  <p className="mt-3 text-base leading-7 text-neutral-600">
                    Speaker, author, and coach based on O&rsquo;ahu. Founder
                    and Executive Director of Releasing Generations. Author of
                    fifteen works spanning trade books, curricula, and programs.
                  </p>
                </Border>
              </FadeIn>
              <FadeIn>
                <Border className="pt-8">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-neutral-950">
                    Brett K. Moore
                  </h3>
                  <p className="mt-3 text-base leading-7 text-neutral-600">
                    Author, podcaster, and multi-business operator. Co-founder
                    and CEO of PodcastNetwork.org. Co-host and producer of In a
                    Moment.
                  </p>
                </Border>
              </FadeIn>
            </div>
          </FadeInStagger>
        </Container>
      </section>

      {/* Episodes */}
      <section aria-label="Episodes">
        <Container className="mt-20 sm:mt-28">
          <FadeIn>
            <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
              Episodes
            </h2>
          </FadeIn>
          <FadeInStagger faster className="mt-8">
            <div className="mx-auto max-w-3xl space-y-6">
              {EPISODES.map((ep) => (
                <FadeIn key={ep.number}>
                  <a
                    href={ep.listenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl bg-white p-6 ring-1 ring-neutral-900/5 transition hover:shadow-lg hover:ring-neutral-900/15"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-teal)] text-sm font-bold text-white">
                        {ep.number}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-lg font-semibold tracking-tight text-neutral-950">
                            {ep.title}
                          </h3>
                          <span className="text-xs text-neutral-500">
                            {ep.date}
                          </span>
                        </div>
                        {ep.guest && (
                          <p className="mt-1 text-sm font-medium text-[var(--color-brand-teal)]">
                            with {ep.guest}
                          </p>
                        )}
                        <p className="mt-2 text-base leading-7 text-neutral-600">
                          {ep.description}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-neutral-950">
                          Listen
                          <span aria-hidden="true">&rarr;</span>
                        </span>
                      </div>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </FadeInStagger>
        </Container>
      </section>

      <ContactBlock heading="Never miss an episode." source="podcast-bottom">
        <p>
          Subscribe on your favorite platform and get new episodes the moment
          they drop.
        </p>
      </ContactBlock>
    </>
  )
}
