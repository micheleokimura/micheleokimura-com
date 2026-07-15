// Michele's public credentials surface, sourced from the citation-backed dossier
// at clients/Michele Okimura/website/research/public-credentials-2026-06-16.md.
// The homepage CredentialsBar and the About page read from this file.
// HARD RULE: no pricing or fees anywhere.

export type Award = {
  title: string
  grantor: string
  /** Year awarded. */
  year: number | null
  /** Who was recognized (the award went to Michele + her team). */
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
    recipient: 'Michele Okimura and the Explicit Movement team',
    href: '/resources/2026-michele-okimura-hawaii-governor-award',
    sourceUrl: 'https://www.explicitmovement.org/about/leadership-team',
  },
]

/** Short factual credentials for the About page (no pricing). Cited in the dossier. */
export const credentials: string[] = [
  'Founder and Executive Director, Releasing Generations',
  'Founder and Director, Explicit Movement, Kingdom Families, and ReThink Creativity',
  'Author of Dancing with Father and The Brave Series curriculum',
  'Associate Pastor (1997-2020), now Pastor Emeritus, Hope Chapel Lifespring, Honolulu',
  '17 years as an elementary public school teacher in Hawai‘i',
]

/** The single headline award for the compact homepage "recognized by" bar. */
export const featuredAward: Award | undefined = awards[0]
