import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import { PageIntro } from '@/components/PageIntro'
import { ContactBlock } from '@/components/ContactBlock'
import { ServiceJsonLd } from '@/components/JsonLd'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Coaching',
  description: `The ${siteConfig.offerName}: coaching to turn your story into the message and book only you can write.`,
  alternates: { canonical: '/coaching' },
}

const STEPS = [
  {
    title: 'Find the story.',
    body:
      'We start with the parts of your story that matter most, the ones that took courage to live and will take courage to tell. That is where your message is hiding.',
  },
  {
    title: 'Shape the message.',
    body:
      'Together we turn that story into a clear message and a structure: the talk you give, the chapters you write, the through line that holds it together.',
  },
  {
    title: 'Tell it bravely.',
    body:
      'You leave with the words, the framework, and the courage to put the work into the world, on a stage, on a page, or both.',
  },
]

export default function CoachingPage() {
  return (
    <>
      <ServiceJsonLd />
      <PageIntro eyebrow="Coaching" title="The Brave Purpose Author Method.">
        <p>
          Coaching for the person who knows they carry a message and needs the
          courage and the structure to tell it. We shape the story, the message,
          and the book only you can write.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20">
        <FadeInStagger faster>
          <ul role="list" className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {STEPS.map((step) => (
              <FadeIn as="li" key={step.title}>
                <Border className="pt-8">
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-neutral-950">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-neutral-600">{step.body}</p>
                </Border>
              </FadeIn>
            ))}
          </ul>
        </FadeInStagger>

        <FadeIn className="mt-16 max-w-2xl text-lg leading-8 text-neutral-600">
          <p>
            Michele has spent four decades doing this work: as a teacher, a pastor,
            a curriculum author, and the founder of a movement that has reached
            classrooms and churches around the world. The Brave Purpose Author
            Method is how she walks alongside the next person ready to tell their
            story well.
          </p>
        </FadeIn>
      </Container>

      <ContactBlock heading="Join the waitlist.">
        <p>
          A few coaching spots open at a time. Leave your name and email and
          Michele will reach out personally.
        </p>
      </ContactBlock>
    </>
  )
}
