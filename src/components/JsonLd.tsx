import { siteConfig } from '@/lib/site-config'
import {
  allWorksSchema,
  articleSchema,
  bookSchema,
  creativeWorkSeriesSchema,
  organizationSchema,
  personRef,
  personSchema,
  serviceSchema,
  webPageSchema,
  webSiteSchema,
} from '@/lib/schema'

/**
 * Every JSON-LD block on the site renders through this one component, and every
 * shape it renders is built in src/lib/schema.ts. Keeping the markup here and
 * the facts there means a claim about Michele is written once and cannot drift
 * between pages.
 */
function Script({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

function Scripts({ blocks }: { blocks: Record<string, unknown>[] }) {
  return (
    <>
      {blocks.map((data, i) => (
        <Script key={i} data={data} />
      ))}
    </>
  )
}

/**
 * The sitewide graph, emitted from the root layout on every URL: Michele, the
 * website itself, and Releasing Generations. Named for the root three nodes
 * every other block on the site points back at by `@id`.
 */
export function SiteGraphJsonLd() {
  return (
    <Scripts blocks={[personSchema(), webSiteSchema(), organizationSchema()]} />
  )
}

/**
 * Every authored work, typed correctly (Book for trade books,
 * CreativeWorkSeries for the multi-volume curricula). Belongs on the Author
 * page and the authored-works index, not in the layout: repeating fifteen work
 * nodes on all thirty URLs is bloat, and Google only needs them where the page
 * is actually about the works.
 */
export function AllWorksJsonLd() {
  return <Scripts blocks={allWorksSchema()} />
}

/**
 * One authored work, by its entry in `authoredWorks`.
 *
 * Only trade books and curricula get a node here. The `program` entries
 * (Explicit Movement, Kingdom Families, ReThink Creativity) are organizations,
 * not creative works, and they are already declared under Michele's `founder`
 * list in the Person node; typing one as a Book would put a false claim in the
 * graph. The `blog` entry is covered by Article nodes on each post.
 */
export function WorkJsonLd({
  work,
}: {
  work: Parameters<typeof bookSchema>[0]
}) {
  if (work.category === 'trade-book') return <Script data={bookSchema(work)} />
  if (work.category === 'curriculum') {
    return <Script data={creativeWorkSeriesSchema(work)} />
  }
  return null
}

/** The Brave Purpose Author Method offering. Coach page only. */
export function ServiceJsonLd() {
  return <Script data={serviceSchema()} />
}

/** A blog post. */
export function ArticleJsonLd(props: Parameters<typeof articleSchema>[0]) {
  return <Script data={articleSchema(props)} />
}

/** Binds one URL into the site graph as a WebPage about Michele. */
export function WebPageJsonLd(props: Parameters<typeof webPageSchema>[0]) {
  return <Script data={webPageSchema(props)} />
}

/**
 * Ad-hoc Book block for the project case-study pages, which describe a title
 * that may not have an `authoredWorks` entry of its own.
 */
export function BookJsonLd({
  title,
  subtitle,
  publisher,
  coAuthors = [],
  inLanguage = 'en',
  isbn,
  datePublished,
  image,
  url,
}: {
  title: string
  subtitle?: string
  publisher?: string
  coAuthors?: readonly string[]
  inLanguage?: string
  isbn?: string
  datePublished?: string
  image?: string
  url?: string
}) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: title,
    author: [
      personRef,
      ...coAuthors.map((name) => ({ '@type': 'Person', name })),
    ],
    inLanguage,
    isFamilyFriendly: true,
  }

  if (subtitle) data.description = subtitle
  if (isbn) data.isbn = isbn
  if (datePublished) data.datePublished = datePublished
  if (publisher) data.publisher = { '@type': 'Organization', name: publisher }
  if (image) data.image = `${siteConfig.url}${image}`
  if (url) data.url = url

  return <Script data={data} />
}

export function PodcastSeriesJsonLd({
  name,
  url,
  publisher,
  description,
  inLanguage = 'en',
}: {
  name: string
  url: string
  publisher?: string
  description?: string
  inLanguage?: string
}) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name,
    url,
    webFeed: siteConfig.podcast.rss,
    inLanguage,
    author: [personRef, { '@type': 'Person', name: siteConfig.podcast.coHost }],
  }

  if (description) data.description = description
  if (publisher) data.publisher = { '@type': 'Organization', name: publisher }

  return <Script data={data} />
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[]
}) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }}
    />
  )
}
