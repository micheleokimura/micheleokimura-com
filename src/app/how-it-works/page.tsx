import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import { PageIntro } from '@/components/PageIntro'
import { ContactBlock } from '@/components/ContactBlock'

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'How working with Michele Okimura works, from the first conversation through the Brave Purpose Author Method.',
  alternates: { canonical: '/how-it-works' },
}

const STEPS = [
  {
    title: 'Start with your story.',
    body:
      'We begin with a conversation. Where you have been, what you carry, and the message trying to get out.',
  },
  {
    title: 'Find the brave purpose.',
    body:
      'Together we name the courage and the purpose on the other side of your hardest seasons, and shape it into a message.',
  },
  {
    title: 'Tell it.',
    body:
      'The Brave Purpose Author Method gives you the structure to write the book and carry the message into the world.',
  },
]

// STUB for Checkpoint 1. Full process detail is a later checkpoint.
export default function HowItWorksPage() {
  return (
    <>
      <PageIntro eyebrow="How it works" title="From your story to your purpose.">
        <p>
          A warm, personal process. Here is the shape of it, with the full detail
          coming together now.
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
                  <p className="mt-4 text-base leading-7 text-neutral-600">
                    {step.body}
                  </p>
                </Border>
              </FadeIn>
            ))}
          </ul>
        </FadeInStagger>
      </Container>

      <ContactBlock heading="Ready to start?">
        <p>Join the waitlist and Michele will reach out personally.</p>
      </ContactBlock>
    </>
  )
}
