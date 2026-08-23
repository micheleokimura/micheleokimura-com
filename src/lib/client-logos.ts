// Fallback registry for the home-page LogoMarquee while the logo-hunt task's
// generated version has not landed. `slug` joins to a case study at
// src/content/case-studies/<slug>.md and the /case-studies/<slug> URL, matching
// the join-key convention in lib/organizations.ts.
//
// Slugs here are the canonical case-study slugs. Do not rename one without
// renaming the matching markdown file, or the marquee tile will link to a 404.
//
// The three unnamed "Christian academy seals" from the logo hunt are still not
// identified by name, so no placeholder entries were invented for them.

export type ClientLogo = {
  slug: string
  name: string
  /** Logo file under /public/client-logos, or null when no logo exists yet. */
  logo: string | null
}

export const CLIENT_LOGOS: ClientLogo[] = [
  { slug: 'hawaii-state-doe', name: 'State of Hawaiʻi Department of Education', logo: null },
  { slug: 'missionary-church-hawaii', name: 'Missionary Church Hawaiʻi', logo: null },
  { slug: 'transform-our-world-hawaii', name: 'Transform Our World', logo: null },
  { slug: 'island-pacific-academy', name: 'Island Pacific Academy', logo: null },
  { slug: 'missio-nexus', name: 'Missio Nexus', logo: null },
  { slug: 'kupu-center', name: 'Kupu Center', logo: null },
  { slug: 'nancy-vuu', name: 'Nancy Vuu', logo: '/images/client-logos/optimized/nancy-vuu.png' },
  { slug: 'the-foursquare-church', name: 'The Foursquare Church', logo: null },
  { slug: 'hawaii-catholic-schools', name: 'Hawaiʻi Catholic Schools', logo: null },
  { slug: 'hanalani-schools', name: 'Hanalani Schools', logo: null },
  { slug: 'hale-kipa', name: 'Hale Kipa', logo: null },
  { slug: 'christian-academy', name: 'Christian Academy', logo: '/images/client-logos/optimized/christian-academy.png' },
  {
    slug: 'pacific-rim-christian-university',
    name: 'Pacific Rim Christian University',
    logo: null,
  },
]
