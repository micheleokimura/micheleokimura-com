// Logo/org registry for the hero grid and the below-the-fold carousels.
// Synthesized from the canonical org map + logo REGISTRY + the 2026-06-17
// screen-share decisions. The case-study CONTENT lives in markdown under
// src/content/case-studies/ (see lib/case-studies.ts); this file is only the
// logo + wiring layer.
//
// === SLUG WIRING CONTRACT ===
// `slug` is the single join key. It matches: the logo filename stem in
// /public/org-logos/, the case-study markdown filename, and the /case-studies/<slug>
// URL. A tile links to its case study when `href` is set; null => non-clickable.
//
// === EXCLUSIONS (per screen-share decisions 2026-06-17) ===
// - kamehameha-schools: NDA. Never appears here (no logo, no tile). Surfaces only
//   as unnamed aggregate framing (see lib/case-studies getNdaAggregate / About).
// - sacred-hearts-academy: on hold (ready-to-publish:false). Not in grid/marquee.
// - Metro Christian, Lifespring 808, New Hope Community, Windward Missionary,
//   Calvary Assembly of God: relationship-only. No logo, no tile.

export type LogoOrg = {
  slug: string
  name: string
  /** Logo file under /public/org-logos, or null when no logo exists. */
  logo: string | null
  /** White-on-transparent variant for dark backgrounds, or null. */
  logoDark: string | null
  /** Case study URL, or null when partner/reference-only or pending. */
  href: string | null
  /** Awaiting confirmation (e.g. Calvary Chapel location); renders, non-clickable. */
  pending?: boolean
}

// Featured partner orgs with published case studies (clickable), then breadth
// partners (non-clickable), then the pending Calvary Chapel slot.
export const LOGO_ORGS: LogoOrg[] = [
  {
    slug: 'hawaii-baptist-academy',
    name: 'Hawaiʻi Baptist Academy',
    logo: '/org-logos/hawaii-baptist-academy.png',
    logoDark: '/org-logos/hawaii-baptist-academy-white.png',
    href: '/case-studies/hawaii-baptist-academy',
  },
  {
    slug: 'hawaii-doe-counselor-plc-maui',
    name: 'Hawaiʻi DOE, Maui Complex',
    logo: '/org-logos/hawaii-doe-counselor-plc-maui.png',
    logoDark: '/org-logos/hawaii-doe-counselor-plc-maui-white.png',
    href: '/case-studies/hawaii-doe-counselor-plc-maui',
  },
  {
    slug: 'asu-office-of-sex-trafficking-intervention-research',
    name: 'ASU Office of Sex Trafficking Intervention Research',
    logo: '/org-logos/asu-office-of-sex-trafficking-intervention-research.svg',
    logoDark: '/org-logos/asu-office-of-sex-trafficking-intervention-research-white.svg',
    href: '/case-studies/asu-office-of-sex-trafficking-intervention-research',
  },
  {
    slug: 'brave-bold-conference-nov-2025',
    name: 'Brave & Bold Conference',
    logo: '/org-logos/brave-bold-conference-nov-2025-wordmark.svg',
    logoDark: '/org-logos/brave-bold-conference-nov-2025-white.svg',
    href: '/case-studies/brave-bold-conference-nov-2025',
  },
  {
    slug: 'leeward-community-church',
    name: 'Leeward Community Church',
    logo: '/org-logos/leeward-community-church-wordmark.svg',
    logoDark: '/org-logos/leeward-community-church-white.svg',
    href: '/case-studies/leeward-community-church',
  },
  {
    slug: 'lifespring-hawaii',
    name: 'Lifespring Hawaii',
    logo: '/org-logos/lifespring-hawaii.svg',
    logoDark: '/org-logos/lifespring-hawaii-white.svg',
    href: null,
  },
  {
    slug: 'jesse-lewis-choose-love-movement',
    name: 'Jesse Lewis Choose Love Movement',
    logo: '/org-logos/jesse-lewis-choose-love-movement.png',
    logoDark: '/org-logos/jesse-lewis-choose-love-movement-white.png',
    href: null,
  },
  {
    slug: 'island-pacific-academy',
    name: 'Island Pacific Academy',
    logo: '/org-logos/island-pacific-academy.png',
    logoDark: '/org-logos/island-pacific-academy-white.png',
    href: '/case-studies/island-pacific-academy',
  },
]

/** Michele's own brand family. Rendered on the About "the work" surface, NOT as
 *  third-party endorser logos in the hero/carousel. */
export const OWN_BRANDS: { name: string; logo: string }[] = [
  { name: 'Releasing Generations', logo: '/org-logos/release-and-generations-256.png' },
  { name: 'Explicit Movement', logo: '/org-logos/explicit-movement-256.png' },
  { name: 'The Brave Series', logo: '/org-logos/brave-series.png' },
  { name: 'ReThink Creativity', logo: '/org-logos/rethink-creativity-256.png' },
]

export type CarouselItem = {
  src: string | null
  alt: string
  href: string | null
  orgSlug: string
}

export function carouselItems(): CarouselItem[] {
  return LOGO_ORGS.filter((o) => o.logoDark).map((o) => ({
    src: o.logoDark!,
    alt: o.name,
    href: o.href,
    orgSlug: o.slug,
  }))
}
