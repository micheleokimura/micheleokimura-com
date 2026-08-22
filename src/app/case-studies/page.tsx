import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { ContactBlock } from '@/components/ContactBlock'
import { getPublishableCaseStudies } from '@/lib/case-studies'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Schools, churches, and organizations Michele Okimura has worked with, told by the work and the outcome.',
  alternates: { canonical: '/case-studies' },
  openGraph: {
    type: 'website',
    title: `Case Studies | ${siteConfig.brand}`,
    description: 'Schools, churches, and organizations Michele Okimura has worked with.',
    url: `${siteConfig.url}/case-studies`,
  },
}

function engagementLabel(type: string) {
  return type
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function CaseStudiesPage() {
  const studies = getPublishableCaseStudies()

  return (
    <>
      <PageIntro eyebrow="Case Studies" title="Stories from the work.">
        <p>
          Schools, churches, and organizations Michele has walked with through her
          speaking, her curriculum, and the Explicit Movement team. Each story is
          told by the work and the outcome. Not every engagement is named here.
          Some of the strongest work has happened inside institutions that prefer to
          stay private, and those are honored without a logo or a name.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-24">
        <FadeInStagger faster>
          <ul role="list" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {studies.map((study) => (
              <FadeIn as="li" key={study.slug} scaleIn>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group flex h-full flex-col rounded-3xl bg-white p-8 ring-1 ring-neutral-900/5 transition hover:shadow-lg hover:ring-neutral-900/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-orange)]"
                >
                  <span className="text-xs font-semibold tracking-widest text-[var(--color-brand-orange-ink)] uppercase">
                    {engagementLabel(study.engagementType)}
                  </span>
                  <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-neutral-950">
                    {study.orgName}
                  </h2>
                  <p className="mt-4 flex-1 text-base leading-7 text-neutral-600">
                    {study.heroHeadline}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-950">
                    Read the story
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </FadeIn>
            ))}

            {/* Pending: Calvary Chapel (location confirming). Slot reserved, non-clickable. */}
            <FadeIn as="li" scaleIn>
              <div className="flex h-full flex-col rounded-3xl border border-dashed border-neutral-300 bg-neutral-50/60 p-8">
                <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                  Coming soon
                </span>
                <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-neutral-500">
                  Calvary Chapel
                </h2>
                <p className="mt-4 flex-1 text-base leading-7 text-neutral-500">
                  Workshop partnership. Story publishes once the location is confirmed.
                </p>
              </div>
            </FadeIn>
          </ul>
        </FadeInStagger>
      </Container>

      <ContactBlock heading="Want to work together?">
        <p>
          Tell Michele about your school, church, or organization and what you are
          hoping to build. She will reach out personally.
        </p>
      </ContactBlock>
    </>
  )
}
