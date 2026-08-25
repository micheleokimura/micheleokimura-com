import type { Metadata } from 'next'

import { siteConfig, imageOrigin, authoredWorks, type AuthoredWork } from '@/lib/site-config'

/**
 * ONE entity graph for the whole site.
 *
 * The point of this file is `@id`. Every schema block on every page refers to
 * Michele as `{'@id': PERSON_ID}` rather than repeating an inline Person
 * object. That is what lets Google, Bing, and the AI answer engines collapse
 * the Book on /author, the Article on /resources/x, the Service on /coach, and
 * the Person on /about into a SINGLE node for one human being, instead of
 * treating each page as a different Michele Okimura. Duplicated inline Person
 * objects are the most common reason a well-marked-up personal site never earns
 * a Knowledge Panel.
 *
 * The three stable IDs below are permanent. Changing one splits the entity.
 */
export const PERSON_ID = `${siteConfig.url}/#person`
export const WEBSITE_ID = `${siteConfig.url}/#website`
export const ORG_ID = `${siteConfig.nonprofitUrl}/#org`

/** A bare reference to Michele. Use this everywhere she is the author/provider. */
export const personRef = { '@type': 'Person', '@id': PERSON_ID } as const
/** A bare reference to Releasing Generations. */
export const orgRef = { '@type': 'NGO', '@id': ORG_ID } as const

type Json = Record<string, unknown>

/**
 * `sameAs` is the identity-resolution list: it tells a search engine that the
 * Michele Okimura here and the one on LinkedIn are the same person.
 *
 * TODO (social-links task): this reads from `siteConfig.socials`. When the
 * social-links work lands and adds YouTube, X/Twitter, Threads, Amazon author
 * page, Goodreads, etc., add them to `socials` in src/lib/site-config.ts and
 * they flow into every page automatically. Nothing here needs editing.
 *
 * TODO (Wikidata): once Michele registers her entity, set `wikidataId` in
 * site-config.ts to the QID (e.g. 'Q123456789') and the Wikidata URL is
 * prepended here. Wikidata is the single highest-value sameAs entry, because
 * it is what most AI answer engines reconcile people against. The submission
 * draft is at WIKIDATA-ENTITY-DRAFT.md in the repo root.
 */
function sameAs(): string[] {
  const links = [
    ...Object.values(siteConfig.socials),
    'https://www.amazon.com/stores/Michele-Okimura/author/B0086P0V0S',
    siteConfig.nonprofitUrl,
    'https://www.explicitmovement.org',
  ].filter(Boolean) as string[]

  if (siteConfig.wikidataId) {
    links.unshift(`https://www.wikidata.org/wiki/${siteConfig.wikidataId}`)
  }
  return links
}

/* ------------------------------------------------------------------ person */

/**
 * Michele, the root node of the graph. Emitted once per page from the root
 * layout so every URL carries the full claim set.
 */
export function personSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: siteConfig.designer,
    givenName: 'Michele',
    familyName: 'Okimura',
    url: siteConfig.url,
    mainEntityOfPage: `${siteConfig.url}/about`,
    email: siteConfig.email,
    description: siteConfig.description,
    image: `${imageOrigin}${siteConfig.headshot}`,
    gender: 'Female',
    nationality: 'American',
    birthPlace: { '@type': 'Place', name: 'Honolulu, Hawaii, USA' },
    jobTitle: ['Author', 'Speaker', 'Coach', 'Executive Director'],
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
        '@id': `${siteConfig.url}/#mollc`,
        name: 'Michele Okimura LLC',
      },
      orgRef,
    ],
    founder: [
      orgRef,
      /**
       * Explicit Movement is a DBA of Releasing Generations, not a separate
       * organization, so it is listed here by name only. The 2023 award lives
       * on the Releasing Generations NGO node in organizationSchema() below,
       * which is the legal entity that received it. Adding a copy here would
       * claim the same honour twice in one graph, for what a consumer would
       * read as two different founders.
       */
      { '@type': 'Organization', name: 'Explicit Movement', url: 'https://www.explicitmovement.org' },
      { '@type': 'Organization', name: 'Kingdom Families' },
      { '@type': 'Organization', name: 'ReThink Creativity' },
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#mollc`,
        name: 'Michele Okimura LLC',
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
    /**
     * There is deliberately NO `award` on this Person node.
     *
     * It carried the 2023 Outstanding Advocate award until 2026-08-23, which
     * told every consumer of this graph that Michele had won it personally. The
     * award went to Explicit Movement; see the `award` on that organization in
     * `founder` above. Michele asked directly that this site stop attributing
     * it to her, and structured data is the version that ends up in knowledge
     * panels, so it matters more here than in the visible copy.
     *
     * If Michele receives a personal honour later, this is the right place for
     * it. This one is not that.
     */
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: 'US',
    },
    sameAs: sameAs(),
  }
}

/* ----------------------------------------------------------- site and org */

/** WebSite node. Ties the domain itself to Michele as publisher. */
export function webSiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.brand,
    description: siteConfig.description,
    inLanguage: 'en-US',
    publisher: personRef,
    copyrightHolder: personRef,
  }
}

/**
 * Releasing Generations, Michele's nonprofit. NGO is the correct schema.org
 * subtype of Organization for a registered nonprofit, and it is what makes the
 * founder claim legible as charitable work rather than a company directorship.
 */
export function organizationSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': ORG_ID,
    name: siteConfig.nonprofit,
    /**
     * Explicit Movement is a DBA of Releasing Generations, confirmed by Michele
     * 2026-08-23. Stating it as an alternateName (alongside the existing
     * sameAs) is what tells a consumer the two names are one entity, which is
     * also what makes the award below consistent with releasinggenerations.org
     * crediting "Explicit Movement" for it.
     */
    alternateName: 'Explicit Movement',
    url: siteConfig.nonprofitUrl,
    founder: personRef,
    /**
     * THE AWARD LIVES HERE, ON THE ORGANIZATION, because the organization
     * received it. It sat on Michele's Person node until 2026-08-23, which
     * asserted to every search engine and answer engine that she had won it
     * personally. She has said plainly that she did not: she led the
     * organization that did. Do not move this onto the Person node, and do not
     * add a second copy to the Explicit Movement entry in her `founder` list.
     */
    award: [
      'Outstanding Advocate for Children and Youth, State of Hawaii (2023), for work with the young people of Hawaii and the creation of the Brave Series',
    ],
    foundingLocation: { '@type': 'Place', name: 'Honolulu, Hawaii, USA' },
    areaServed: { '@type': 'Place', name: "Hawai'i, United States" },
    sameAs: ['https://www.explicitmovement.org'],
  }
}

/* ------------------------------------------------------------------ works */

/** Only emit datePublished when the year is a clean four digits. */
function cleanYear(year: AuthoredWork['year']): string | undefined {
  const s = String(year ?? '')
  return /^\d{4}$/.test(s) ? s : undefined
}

/**
 * Book node for a single authored work.
 *
 * Forthcoming titles are included on purpose. A Book with a future
 * `datePublished` is valid schema, and it is how an answer engine learns that
 * Brave Purpose exists and is Michele's before it ships in 2027.
 */
export function bookSchema(work: AuthoredWork): Json {
  const authors = [
    personRef,
    ...(work.coAuthors ?? []).map((name) => ({ '@type': 'Person', name })),
  ]

  const data: Json = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${siteConfig.url}/works/${work.slug}#book`,
    name: work.title,
    author: authors,
    inLanguage: work.inLanguage ?? 'en',
    isFamilyFriendly: true,
  }

  const year = cleanYear(work.year)
  if (year) data.datePublished = year
  if (work.subtitle) data.description = work.subtitle
  if (work.isbn) data.isbn = work.isbn
  // NOTE: `work.format` is deliberately NOT mapped to schema.org `bookFormat`.
  // That property takes a BookFormatType enum URL (schema.org/Paperback and
  // friends), and our format strings are prose like "Paperback and audiobook",
  // which a validator rejects. The prose belongs in the visible details table.
  if (work.illustrator) {
    data.contributor = { '@type': 'Person', name: work.illustrator }
  }
  if (work.publisher) {
    data.publisher = { '@type': 'Organization', name: work.publisher }
  }
  if (work.purchaseUrl) data.url = work.purchaseUrl
  if (work.coverImage) data.image = `${siteConfig.url}${work.coverImage}`

  return data
}

/**
 * Multi-volume curricula (the Brave Series, the Dream Big journals) are a
 * CreativeWorkSeries, not a Book. A Book with no ISBN and eight volumes reads
 * as malformed; a series reads as exactly what it is.
 */
export function creativeWorkSeriesSchema(work: AuthoredWork): Json {
  const data: Json = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    '@id': `${siteConfig.url}/works/${work.slug}#series`,
    name: work.title,
    author: personRef,
    creator: personRef,
    inLanguage: work.inLanguage ?? 'en',
    isFamilyFriendly: true,
  }
  const year = cleanYear(work.year)
  if (year) data.datePublished = year
  if (work.subtitle) data.description = work.subtitle
  if (work.publisher) {
    data.publisher = { '@type': 'Organization', name: work.publisher }
  }
  if (work.coverImage) data.image = `${siteConfig.url}${work.coverImage}`
  return data
}

/**
 * Every authored work as a schema node, correctly typed. Trade books become
 * Book, curricula become CreativeWorkSeries, and the blog and the programs are
 * skipped (they are covered by Article and Organization nodes elsewhere).
 */
export function allWorksSchema(): Json[] {
  return authoredWorks
    .filter((w) => w.category === 'trade-book' || w.category === 'curriculum')
    .map((w) => (w.category === 'trade-book' ? bookSchema(w) : creativeWorkSeriesSchema(w)))
}

/* ---------------------------------------------------------------- article */

export function articleSchema({
  title,
  description,
  slug,
  date,
  image,
  tags,
}: {
  title: string
  description: string
  slug: string
  date: string
  image?: string
  tags?: string[]
}): Json {
  const url = `${siteConfig.url}/resources/${slug}`
  const data: Json = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: personRef,
    publisher: personRef,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'en-US',
    image: `${imageOrigin}${image ?? siteConfig.ogImage}`,
  }
  if (tags?.length) data.keywords = tags.join(', ')
  return data
}

/* ---------------------------------------------------------------- service */

/** The Brave Purpose Author Method, as an offered service. */
export function serviceSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteConfig.url}/coach#service`,
    name: siteConfig.offerName,
    provider: personRef,
    serviceType: 'Author coaching',
    description:
      'A 26-week one-to-one coaching engagement that turns your recorded conversations into a publication-ready manuscript in your own voice.',
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    url: `${siteConfig.url}/coach`,
    audience: { '@type': 'Audience', audienceType: 'Aspiring and first-time authors' },
  }
}

/* --------------------------------------------------------------- webpage */

/** A WebPage node binding one URL into the site graph. */
export function webPageSchema({
  path,
  name,
  description,
}: {
  path: string
  name: string
  description: string
}): Json {
  const url = `${siteConfig.url}${path === '/' ? '' : path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: personRef,
    inLanguage: 'en-US',
  }
}

/* --------------------------------------------------------- page metadata */

/**
 * One helper so every page's title, description, canonical, Open Graph, and
 * Twitter card stay consistent and nothing gets half-filled.
 *
 * `canonical` is always the micheleokimura.com URL, never the vercel.app
 * preview host. That is deliberate and it matters before DNS cutover: whatever
 * a crawler reaches the preview on, the canonical tells it the real address, so
 * the preview never competes with the live site in the index.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  ogDescription,
}: {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  /**
   * Punchier copy for the social card, where a 155-character search
   * description reads as a wall. Falls back to `description`.
   */
  ogDescription?: string
}): Metadata {
  const url = `${siteConfig.url}${path === '/' ? '' : path}`
  const ogImage = `${imageOrigin}${image ?? siteConfig.ogImage}`
  const fullTitle = `${title} · ${siteConfig.brand}`
  const social = ogDescription ?? description

  /**
   * Only the sitewide card is known to be 1200x630. Callers that pass their own
   * `image` pass a book cover, which is portrait, and stating landscape
   * dimensions for it makes Facebook and LinkedIn lay out a landscape box and
   * then crop the cover to fit. Leaving them off lets the scraper read the real
   * ones off the file.
   */
  const ogImageEntry: { url: string; alt: string; width?: number; height?: number } =
    image === undefined
      ? { url: ogImage, alt: siteConfig.brand, width: 1200, height: 630 }
      : { url: ogImage, alt: title }

  const ogBase = {
    title: fullTitle,
    description: social,
    url,
    siteName: siteConfig.brand,
    locale: 'en_US',
    images: [ogImageEntry],
  }

  // Next's OpenGraph type is a discriminated union on `type`, so the object has
  // to be built inside a branch where `type` is a literal. Spreading a variable
  // typed `'website' | 'article' | 'profile'` matches no single member and fails
  // to compile.
  const openGraph: Metadata['openGraph'] =
    type === 'article'
      ? {
          ...ogBase,
          type: 'article',
          authors: [siteConfig.designer],
          ...(publishedTime ? { publishedTime } : {}),
        }
      : type === 'profile'
        ? { ...ogBase, type: 'profile', firstName: 'Michele', lastName: 'Okimura' }
        : { ...ogBase, type: 'website' }

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: social,
      images: [ogImage],
    },
  }
}
