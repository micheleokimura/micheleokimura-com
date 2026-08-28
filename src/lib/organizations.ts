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
// - kamehameha-schools: no logo mark is ever used, per their trademark. It does
//   not appear in this hero/carousel registry at all. It does appear on the home
//   LogoMarquee as a TEXT-ONLY tile (see lib/client-logos), confirmed by Michele
//   2026-08-23. The engagement now has a named case study at
//   /case-studies/kamehameha-schools, cleared by Michele 2026-08-25, so the
//   detail no longer routes through the aggregate framing. The logo exclusion
//   is unchanged and permanent: the page is text-only too.
// - sacred-hearts-academy: on hold (ready-to-publish:false). Not in grid/marquee.
// - brave-bold-conference-nov-2025: retired 2026-08-28. The November 2025
//   conference is now told inside the Leeward Community Church case study, so
//   the standalone entry and its tile are gone. The old URL 301s to Leeward.
// - Metro Christian, Lifespring 808, New Hope Community, Windward Missionary,
//   Calvary Assembly of God: relationship-only. No logo, no tile.

export type LogoOrg = {
  slug: string
  name: string
  /** Logo file under /public/org-logos, or null when no logo exists. */
  logo: string | null
  /** White-on-transparent variant for dark backgrounds, or null. */
  logoDark: string | null
  /** Case study URL, or null when partner/reference-only. */
  href: string | null
}

// Featured partner orgs with published case studies (clickable), then breadth
// partners (non-clickable).
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
