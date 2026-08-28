// Michele's public credentials surface, sourced from the citation-backed dossier
// at clients/Michele Okimura/website/research/public-credentials-2026-06-16.md.
// The homepage CredentialsBar and the About page read from this file.
// HARD RULE: no pricing or fees anywhere.

export type Award = {
  title: string
  grantor: string
  /** Year awarded. */
  year: number | null
  /**
   * Who was recognized. For the 2023 award this is the ORGANIZATION. Corrected
   * 2026-08-23: this field used to read "Michele Okimura and the Explicit
   * Movement team", and Michele asked that the award stop being attributed to
   * her individually. See the entry below.
   */
  recipient?: string
  /** Link to the dedicated story (the featured launch blog post). */
  href?: string
  /** Primary-source citation URL. */
  sourceUrl?: string
}

export const awards: Award[] = [
  {
    title: 'Outstanding Advocate for Children and Youth of Hawai‘i',
    grantor:
      'Hawai‘i Children and Youth Day, presented by Governor Josh Green and Mayor Rick Blangiardi',
    year: 2023,
    // The recipient is the ORGANIZATION. Explicit Movement is a DBA of
    // Releasing Generations, so the two names are one legal entity and either
    // is accurate; Michele's final framing (2026-08-23) names Releasing
    // Generations. What is not accurate is her name alone, which is what this
    // field used to hold. Do not put it back.
    recipient: 'Releasing Generations, led by Michele Okimura',
    href: '/resources/2026-michele-okimura-hawaii-governor-award',
    sourceUrl: 'https://www.releasinggenerations.org/',
  },
]

export type Credential = {
  /** The bullet itself. */
  label: string
  /**
   * Sub-bullets, rendered one indent step in at the same reading size as the
   * parent. Used where one role opens onto a list: the three facets under
   * Releasing Generations, and the authored titles.
   */
  items?: string[]
}

/**
 * Short factual credentials for the About page (no pricing). Cited in the
 * dossier. Rewritten 2026-08-28 to Michele's structure: the three Releasing
 * Generations facets and the authored titles each nest under their parent
 * rather than being flattened into a single line.
 *
 * Book and curriculum titles here are the exact strings the Author page shows,
 * read off src/lib/author-books.ts, so a title never reads two ways on the
 * site. The two Brave Purpose books are the exception in wording only: they
 * carry "(forthcoming)" here where /author says "Forthcoming Spring 2027".
 */
export const credentials: Credential[] = [
  {
    label:
      'Founder and Executive Director of Releasing Generations, which includes three facets:',
    items: ['Explicit Movement', 'Kingdom Families', 'ReThink Creativity'],
  },
  {
    label: 'Author of:',
    items: [
      'Dancing with Father',
      'The Birth of Explicit Movement: Discover Keys to Fulfilling Your Purpose',
      'The Raising Kingdom Kids curriculum',
      'The Dream Big Journals Curriculum',
      'Brave Purpose (forthcoming)',
      'Brave Purpose with God (forthcoming)',
    ],
  },
  {
    label:
      'Chief Editor and Chief Creative Director of the Brave Series Curriculum and The Explicit Movement 21-Day Interactive Journal',
  },
  { label: 'Part-time pastor at Lifespring Church, Honolulu' },
  {
    label:
      '14 years as an elementary public school teacher in Hawaiʻi and California',
  },
]

/** The single headline award for the compact homepage "recognized by" bar. */
export const featuredAward: Award | undefined = awards[0]
