import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { ContactBlock } from '@/components/ContactBlock'
import { ContactTrigger } from '@/components/ContactTrigger'
import { getCaseStudyBySlug, getPublishableSlugs } from '@/lib/case-studies'
import { pageMetadata } from '@/lib/schema'

export function generateStaticParams() {
  return getPublishableSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)
  if (!study) return {}
  return pageMetadata({
    title: `${study.orgName} · Case Study`,
    description: study.heroHeadline,
    path: `/case-studies/${study.slug}`,
    type: 'article',
  })
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)
  // Guard: never render an unpublished or NDA page even if requested directly.
  if (!study || !study.readyToPublish || study.ndaFlagged) notFound()

  return (
    <>
      <PageIntro eyebrow={study.orgName} title={study.heroHeadline} />

      <Container className="mt-10 sm:mt-12">
        <FadeIn className="mx-auto max-w-2xl">
          <div className="prose-blog" dangerouslySetInnerHTML={{ __html: study.contentHtml }} />
        </FadeIn>
      </Container>

      <ContactBlock
        heading="Work with Michele."
        cta={
          <ContactTrigger tone="dark" interest="speaking">
            Contact Michele
          </ContactTrigger>
        }
      >
        <p>
          If you lead a school, church, or organization and want to bring this kind
          of work to your community, please reach out. Michele will follow up with
          you personally.
        </p>
      </ContactBlock>
    </>
  )
}
