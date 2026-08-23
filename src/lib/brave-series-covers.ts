// The canonical Brave Series cover set: 12 tiles, one per volume, NOT all 24
// editions. Michele's direction 2026-08-23 is to show each title's four volumes
// once and to alternate Faith and Classic across them, so both editions are
// visually represented without doubling the page length.
//
// Every page that displays Brave Series covers reads from this file: the hub at
// /projects/brave-series, the three title pages under it, and the Brave Series
// section of /author. Add a cover in one place and it lands everywhere.
//
// === ABOUT THE ART ===
// Source shots are the `*-hardcopy.*` product photographs under
// /public/images/brave-series. They arrive at three different framings
// (750x934, 500x500, 2000x2000) with the book floating at wildly different
// scales, so each one was cropped to its book's bounding box plus a 7% margin,
// squared to 3:4, and exported at 600x800 into the optimized/ subfolder. That
// is what makes a row of four read as one set rather than four snapshots.
//
// Do NOT point these at the `*-digital.png` files. Those are screenshots of a
// PDF viewer and carry the reader's dark chrome and zoom slider.

export type BraveEdition = 'Faith' | 'Classic'

export type BraveCover = {
  /** 1 through 4. */
  volume: number
  edition: BraveEdition
  /** Optimized 600x800 cover, or null when no usable art exists yet. */
  src: string | null
  alt: string
  caption: string
}

export type BraveTitle = {
  slug: 'brave-and-beautiful' | 'brave-and-bold' | 'brave-together'
  title: string
  audience: string
  covers: BraveCover[]
}

const DIR = '/images/brave-series/optimized'

function cover(
  titleSlug: string,
  title: string,
  volume: number,
  edition: BraveEdition,
): BraveCover {
  return {
    volume,
    edition,
    src: `${DIR}/${titleSlug}-vol${volume}.jpg`,
    alt: `${title}, Volume ${volume}, ${edition} edition`,
    caption: `Vol. ${volume} · ${edition}`,
  }
}

export const BRAVE_SERIES_TITLES: BraveTitle[] = [
  {
    slug: 'brave-and-beautiful',
    title: 'Brave & Beautiful',
    audience: 'For teen girls',
    covers: [
      cover('brave-and-beautiful', 'Brave & Beautiful', 1, 'Faith'),
      cover('brave-and-beautiful', 'Brave & Beautiful', 2, 'Classic'),
      cover('brave-and-beautiful', 'Brave & Beautiful', 3, 'Faith'),
      cover('brave-and-beautiful', 'Brave & Beautiful', 4, 'Classic'),
    ],
  },
  {
    slug: 'brave-and-bold',
    title: 'Brave & Bold',
    audience: 'For teen boys',
    covers: [
      cover('brave-and-bold', 'Brave & Bold', 1, 'Classic'),
      cover('brave-and-bold', 'Brave & Bold', 2, 'Faith'),
      cover('brave-and-bold', 'Brave & Bold', 3, 'Classic'),
      cover('brave-and-bold', 'Brave & Bold', 4, 'Faith'),
    ],
  },
  {
    slug: 'brave-together',
    title: 'Brave Together',
    audience: 'Co-ed',
    covers: [
      cover('brave-together', 'Brave Together', 1, 'Faith'),
      cover('brave-together', 'Brave Together', 2, 'Classic'),
      cover('brave-together', 'Brave Together', 3, 'Faith'),
      cover('brave-together', 'Brave Together', 4, 'Classic'),
    ],
  },
]
