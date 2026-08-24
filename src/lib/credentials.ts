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

/** Short factual credentials for the About page (no pricing). Cited in the dossier. */
export const credentials: string[] = [
  'Founder and Executive Director, Releasing Generations',
  'Founder and Director, Explicit Movement, Kingdom Families, and ReThink Creativity',
  'Author of Dancing with Father and The Brave Series curriculum',
  'Part-time pastor at Lifespring Church, Honolulu',
  '17 years as an elementary public school teacher in Hawai‘i',
]

/** The single headline award for the compact homepage "recognized by" bar. */
export const featuredAward: Award | undefined = awards[0]
