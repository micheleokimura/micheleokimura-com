import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import { PageIntro } from '@/components/PageIntro'
import { JoinWaitListButton } from '@/components/wait-list/JoinWaitListButton'
import { EmilyPortrait as MichelePortrait } from '@/components/EmilyAvatar'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Join the waitlist',
  description:
    'Michele takes on a small number of coaching clients and speaking dates. Join the waitlist and she will reach out personally when a spot opens.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Waitlist" title="Join the waitlist.">
        <p>
          Michele takes on a small number of coaching clients and speaking dates.
          Leave your name and email here, and she will reach out personally when a
          spot opens.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20 lg:mt-24">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <FadeIn>
            <div className="rounded-3xl bg-neutral-50 p-8 ring-1 ring-inset ring-neutral-900/5">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950">
                Save your spot
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                Tell Michele who you are and where to reach you. It takes about
                thirty seconds, and she follows up personally by email.
              </p>
              <div className="mt-8">
                <JoinWaitListButton source="contact-page" />
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mb-10 max-w-md">
              <MichelePortrait width={440} />
              <div className="mt-5 rounded-2xl bg-neutral-50 p-5 ring-1 ring-inset ring-neutral-900/5">
                <p className="text-base text-neutral-700">
                  This is who reads every signup. Michele reaches out personally by
                  email when a spot opens.
                </p>
              </div>
            </div>

            <h2 className="font-display text-base font-semibold text-neutral-950">
              How it works
            </h2>
            <p className="mt-6 text-base text-neutral-600">
              Spots open as Michele&rsquo;s schedule allows. When one does, she
              emails you personally to talk through your story, your goals, and
              whether the Brave Purpose Author Method or a speaking date is the
              right next step.
            </p>

            <Border className="mt-10 pt-10">
              <h2 className="font-display text-base font-semibold text-neutral-950">
                Prefer email?
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                You can also reach Michele directly at{' '}
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-neutral-950 underline decoration-[var(--color-cta)] underline-offset-4 hover:decoration-2"
                >
                  {siteConfig.email}
                </Link>
                .
              </p>
            </Border>

            <Border className="mt-10 pt-10">
              <h2 className="font-display text-base font-semibold text-neutral-950">
                What you&rsquo;re joining
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                The {siteConfig.offerName}: coaching to turn your story into the
                message and the book only you can write. Plus speaking for
                conferences, retreats, churches, and schools.
              </p>
            </Border>
          </FadeIn>
        </div>
      </Container>
    </>
  )
}
