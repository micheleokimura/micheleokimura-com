// Registry for the home-page LogoMarquee. 17-org list confirmed by Michele
// 2026-08-23, plus First Assembly of God (Red Hill) and First Presbyterian
// Church of Honolulu, both added 2026-08-28. 19 orgs.
//
// === SLUG WIRING CONTRACT ===
// `slug` is the join key. It matches the case-study markdown filename under
// src/content/case-studies/ and the /case-studies/<slug> URL, the same
// convention lib/organizations.ts uses. Do not rename a slug without renaming
// the matching markdown file, or the tile links to a 404.
//
// === TILES WITH NO CASE STUDY YET ===
// Where no case study exists, `href` is null. Such a tile used to render as
// plain, non-clickable art, which Michele read as a broken link: no pointer
// cursor, no response to a click. Those tiles now set `contact: true` and open
// the sitewide contact popup instead, so every tile in the band answers a
// click. Swap `contact` for a real `href` the moment the case study lands.
//
// === LOGO ART ===
// Files live under /public/images/client-logos/optimized, capped at 400px on
// the long side. Kamehameha Schools is text-only: no logo mark is used, per
// their trademark. `invert` flags art that ships white or cream on transparent
// (Hale Kipa, Transform Our World, Hanalani, Hawaiʻi Catholic Schools, the
// Foursquare four-icon mark) so it reads as dark on the cream band. `matte`
// flags art with an opaque white background (She Leads America, First
// Presbyterian) so it multiply-blends into the cream instead of sitting in a
// white box.

export type ClientLogo = {
  slug: string
  name: string
  /** Logo file under /public/images/client-logos/optimized, or null for a text tile. */
  logo: string | null
  /** Case study URL, or null when no case study exists yet. */
  href: string | null
  /**
   * No case study yet: the tile opens the sitewide contact popup rather than
   * sitting inert. Only read when `href` is null; an `href` always wins.
   */
  contact?: boolean
  /** Source art is white or cream on transparent; invert it to read on cream. */
  invert?: boolean
  /** Source art carries an opaque white background; blend it into the cream. */
  matte?: boolean
}

const DIR = '/images/client-logos/optimized'

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    slug: 'hawaii-state-doe',
    name: 'State of Hawaiʻi Department of Education',
    logo: `${DIR}/hawaii-state-doe.png`,
    href: '/case-studies/hawaii-state-doe',
  },
  {
    slug: 'missionary-church-hawaii',
    name: 'Missionary Church',
    logo: `${DIR}/missionary-church-hawaii.png`,
    href: '/case-studies/missionary-church-hawaii',
  },
  {
    slug: 'transform-our-world-hawaii',
    name: 'Transform Our World',
    logo: `${DIR}/transform-our-world-hawaii.png`,
    href: '/case-studies/transform-our-world-hawaii',
    invert: true,
  },
  {
    slug: 'island-pacific-academy',
    name: 'Island Pacific Academy',
    logo: `${DIR}/island-pacific-academy.png`,
    href: '/case-studies/island-pacific-academy',
  },
  {
    slug: 'missio-nexus',
    name: 'Missio Nexus',
    logo: `${DIR}/missio-nexus.png`,
    href: '/case-studies/missio-nexus',
  },
  {
    slug: 'kupu-center',
    name: 'Kupu Center',
    logo: `${DIR}/kupu-center.png`,
    href: '/case-studies/kupu-center',
  },
  {
    slug: 'nancy-vuu',
    name: 'Nancy Vuu',
    logo: `${DIR}/nancy-vuu.png`,
    href: '/case-studies/nancy-vuu',
  },
  {
    slug: 'the-foursquare-church',
    name: 'The Foursquare Church',
    logo: `${DIR}/the-foursquare-church.png`,
    href: '/case-studies/the-foursquare-church',
    invert: true,
  },
  {
    slug: 'hawaii-baptist-academy',
    name: 'Hawaiʻi Baptist Academy',
    logo: `${DIR}/hawaii-baptist-academy.png`,
    href: '/case-studies/hawaii-baptist-academy',
  },
  {
    slug: 'hawaii-catholic-schools',
    name: 'Hawaiʻi Catholic Schools',
    logo: `${DIR}/hawaii-catholic-schools.png`,
    href: '/case-studies/hawaii-catholic-schools',
    invert: true,
  },
  {
    slug: 'hanalani-schools',
    name: 'Hanalani Schools',
    logo: `${DIR}/hanalani-schools.png`,
    href: '/case-studies/hanalani-schools',
    invert: true,
  },
  {
    slug: 'hale-kipa',
    name: 'Hale Kipa',
    logo: `${DIR}/hale-kipa.png`,
    href: '/case-studies/hale-kipa',
    invert: true,
  },
  {
    slug: 'christian-academy',
    name: 'Christian Academy',
    logo: `${DIR}/christian-academy.png`,
    href: '/case-studies/christian-academy',
  },
  {
    slug: 'pacific-rim-christian-university',
    name: 'Pacific Rim Christian University',
    logo: `${DIR}/pacific-rim-christian-university.png`,
    href: '/case-studies/pacific-rim-christian-university',
  },
  // Text-only by design. Kamehameha Schools' mark is trademarked and is not
  // reproduced here; the name is set in small caps instead. `logo` stays null
  // permanently. That is a trademark constraint, not a missing-asset gap, so do
  // not "fix" it by sourcing art.
  //
  // The story constraint, though, is lifted. Michele cleared and sent the copy
  // on 2026-08-25, so the tile links to a real page like any other. The page
  // itself carries no logo either; the case-study template renders the org name
  // as text through PageIntro and has no logo prop at all.
  {
    slug: 'kamehameha-schools',
    name: 'Kamehameha Schools',
    logo: null,
    href: '/case-studies/kamehameha-schools',
  },
  {
    slug: 'advance-good',
    name: 'Advance Good',
    logo: `${DIR}/advance-good.png`,
    href: '/case-studies/advance-good',
  },
  {
    slug: 'she-leads-america',
    name: 'She Leads America',
    logo: `${DIR}/she-leads-america.png`,
    href: '/case-studies/she-leads-america',
    matte: true,
  },
  // Orange flame mark on transparent, 400px square, so it needs neither
  // `invert` nor `matte`. Same art as /org-logos/first-assembly-of-god.png,
  // copied into the marquee's own directory so the two registries stay
  // independent.
  {
    slug: 'first-assembly-of-god',
    name: 'First Assembly of God',
    logo: `${DIR}/first-assembly-of-god.png`,
    href: '/case-studies/first-assembly-of-god',
  },
  // NO CASE STUDY YET. This is the first tile to use the `contact` route the
  // header describes; every other org in the list has a page. Do not point
  // `href` at /case-studies/first-presbyterian-church-honolulu to make it
  // clickable: that markdown file does not exist and the tile would 404.
  // Swap `contact` for the real href the moment Michele clears the story.
  //
  // The mark is green stained glass on an opaque white background, so it takes
  // `matte` for the same reason She Leads America does.
  {
    slug: 'first-presbyterian-church-honolulu',
    name: 'First Presbyterian Church of Honolulu',
    logo: `${DIR}/first-presbyterian-church-honolulu.png`,
    href: null,
    contact: true,
    matte: true,
  },
]
