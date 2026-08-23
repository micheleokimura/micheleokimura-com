import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { ContactBlock } from '@/components/ContactBlock'
import { ArticleByline } from '@/components/EmilyAvatar'
import { ArticleJsonLd } from '@/components/JsonLd'
import { pageMetadata } from '@/lib/schema'
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog'

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/resources/${post.slug}`,
    type: 'article',
    publishedTime: post.date || undefined,
  })
}

function formatDate(date: string) {
  if (!date) return ''
  const d = new Date(date)
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        date={post.date}
        tags={post.tags}
      />

      <PageIntro eyebrow="Resources" title={post.title} />

      <Container className="mt-10 sm:mt-12">
        <FadeIn className="mx-auto max-w-2xl">
          <ArticleByline
            trailing={post.date ? <> &middot; {formatDate(post.date)}</> : null}
          />
          <div
            className="prose-blog mt-8"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </FadeIn>
      </Container>

      <ContactBlock heading="Work with Michele.">
        <p>
          Coaching through the Brave Purpose Author Method, or a speaking date.
          Join the waitlist and Michele will reach out personally.
        </p>
      </ContactBlock>
    </>
  )
}
