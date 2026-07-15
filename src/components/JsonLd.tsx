import { siteConfig, authoredWorks } from '@/lib/site-config'

/**
 * Person JSON-LD for Michele. Primary entity graph fuel for Google Knowledge
 * Panel, AI answer engines, and sameAs resolution.
 *
 * Includes: worksFor (LLC + nonprofit + church), founded organizations
 * (RG, EM, KF, RTC, LLC), alumniOf, award, knowsAbout, sameAs.
 */
export function OrganizationJsonLd() {
  const sameAs: string[] = [
    siteConfig.socials.linkedin,
    siteConfig.socials.facebook,
    siteConfig.socials.instagram,
    'https://www.amazon.com/stores/Michele-Okimura/author/B0086P0V0S',
    'https://www.releasinggenerations.org',
    'https://www.explicitmovement.org',
  ].filter(Boolean)

  if (siteConfig.wikidataId) {
    sameAs.unshift(`https://www.wikidata.org/wiki/${siteConfig.wikidataId}`)
  }

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}#person`,
    name: siteConfig.designer,
    givenName: 'Michele',
    familyName: 'Okimura',
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    image: `${siteConfig.url}/og-image.jpg`,
    gender: 'Female',
    birthPlace: {
      '@type': 'Place',
      name: 'Honolulu, Hawaii, USA',
    },
    nationality: 'American',
    jobTitle: ['Author', 'Speaker', 'Executive Director', 'Coach'],
    knowsAbout: [
      'Memoir writing',
      'Book coaching',
      'Christian author coaching',
      'Identity in Christ',
      'Christian marriage',
      'Healing and trauma recovery',
      'Youth advocacy',
      'Sexual integrity education',
      'Teen leadership development',
      'Public speaking',
      ...siteConfig.movements,
    ],
    worksFor: [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}#mollc`,
        name: 'Michele Okimura LLC',
      },
      {
        '@type': 'NGO',
        '@id': `${siteConfig.url}#releasing-generations`,
        name: siteConfig.nonprofit,
        url: siteConfig.nonprofitUrl,
      },
    ],
    founder: [
      {
        '@type': 'NGO',
        '@id': `${siteConfig.url}#releasing-generations`,
        name: 'Releasing Generations',
        url: 'https://releasinggenerations.org',
      },
      {
        '@type': 'Organization',
        name: 'Explicit Movement',
        url: 'https://www.explicitmovement.org',
      },
      {
        '@type': 'Organization',
        name: 'Kingdom Families',
      },
      {
        '@type': 'Organization',
        name: 'ReThink Creativity',
      },
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}#mollc`,
        name: 'Michele Okimura Consulting LLC',
      },
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'University of Hawaii at Manoa',
        url: 'https://www.hawaii.edu/',
        sameAs: 'https://en.wikipedia.org/wiki/University_of_Hawaii_at_Manoa',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Kalani High School',
        sameAs: 'https://en.wikipedia.org/wiki/Kalani_High_School',
      },
    ],
    award: [
      'State of Hawaii Outstanding Advocate for Children and Youth (2023, conferred by Governor Josh Green and Mayor Rick Blangiardi)',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: 'US',
    },
    sameAs,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * All published Book JSON-LD blocks emitted in the root layout.
 * Four published trade books get schema; in-production titles do not
 * (no ISBN, no purchase link yet).
 */
export function AllBooksJsonLd() {
  const published = authoredWorks.filter(
    (w) => w.category === 'trade-book' && w.status === 'published',
  )

  const blocks = published.map((book) => {
    const authors = [
      { '@type': 'Person', name: siteConfig.designer, url: siteConfig.url },
      ...(book.coAuthors ?? []).map((name) => ({ '@type': 'Person', name })),
    ]

    const data: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: book.title,
      author: authors,
      inLanguage: book.inLanguage ?? 'en',
      isFamilyFriendly: true,
    }

    if (book.subtitle) data.description = book.subtitle
    if (book.isbn) data.isbn = book.isbn
    if (book.publisher) {
      data.publisher = { '@type': 'Organization', name: book.publisher }
    }
    if (book.purchaseUrl) data.url = book.purchaseUrl

    return data
  })

  return (
    <>
      {blocks.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  )
}

export function ServiceJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: siteConfig.offerName,
    provider: {
      '@type': 'Person',
      name: siteConfig.designer,
      url: siteConfig.url,
    },
    serviceType: 'Coaching',
    areaServed: [{ '@type': 'Country', name: 'United States' }],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

type BookJsonLdProps = {
  title: string
  subtitle?: string
  publisher?: string
  coAuthors?: readonly string[]
  inLanguage?: string
  isbn?: string
}

export function BookJsonLd({
  title,
  subtitle,
  publisher,
  coAuthors = [],
  inLanguage = 'en',
  isbn,
}: BookJsonLdProps) {
  const authors = [
    { '@type': 'Person', name: siteConfig.designer, url: siteConfig.url },
    ...coAuthors.map((name) => ({ '@type': 'Person', name })),
  ]

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: title,
    author: authors,
    inLanguage,
    isFamilyFriendly: true,
  }

  if (subtitle) data.description = subtitle
  if (isbn) data.isbn = isbn
  if (publisher) {
    data.publisher = { '@type': 'Organization', name: publisher }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

type PodcastSeriesJsonLdProps = {
  name: string
  url: string
  publisher?: string
  description?: string
  inLanguage?: string
}

export function PodcastSeriesJsonLd({
  name,
  url,
  publisher,
  description,
  inLanguage = 'en',
}: PodcastSeriesJsonLdProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name,
    url,
    webFeed: siteConfig.podcast.rss,
    inLanguage,
    author: [
      { '@type': 'Person', name: siteConfig.designer, url: siteConfig.url },
      { '@type': 'Person', name: siteConfig.podcast.coHost },
    ],
  }

  if (description) data.description = description
  if (publisher) {
    data.publisher = { '@type': 'Organization', name: publisher }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

type ArticleJsonLdProps = {
  title: string
  description: string
  slug: string
  date: string
  image?: string
}

export function ArticleJsonLd({ title, description, slug, date, image }: ArticleJsonLdProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: siteConfig.designer,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brand,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/og-image.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/resources/${slug}`,
    },
  }
  if (image) data.image = `${siteConfig.url}${image}`

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
