import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { ContactBlock } from '@/components/ContactBlock'

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'Michele Okimura speaks at conferences, retreats, churches, and schools on identity, courage, and brave purpose.',
  alternates: { canonical: '/portfolio' },
}

// STUB for Checkpoint 1. Speaking page (topics, past stages, a reel, booking)
// is a later checkpoint.
export default function SpeakingPage() {
  return (
    <>
      <PageIntro eyebrow="Speaking" title="Invite Michele to speak.">
        <p>
          Conferences, retreats, churches, and schools. Michele speaks on
          identity, courage, healing, and the brave purpose that grows out of our
          hardest stories.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20">
        <FadeIn className="max-w-2xl text-lg leading-8 text-neutral-600">
          <p>
            Topics, past stages, and a speaking reel are being added. To talk
            about a date, join the waitlist and Michele will follow up.
          </p>
        </FadeIn>
      </Container>

      <ContactBlock heading="Talk about a date.">
        <p>Tell Michele about your event and she will reach out personally.</p>
      </ContactBlock>
    </>
  )
}
