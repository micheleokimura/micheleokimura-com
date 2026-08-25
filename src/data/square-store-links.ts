/**
 * Square storefront links, one entry per title on the Author shelf.
 *
 * WHERE THESE CAME FROM. Crawled 2026-08-25 from the two Square sitemaps, then
 * every URL below was checked for a 200 before it was written down:
 *
 *   https://micheleokimura.square.site/sitemap.xml   18 products
 *   https://braveseries.square.site/sitemap.xml      the Brave Series catalog
 *
 * Nothing here is guessed. A title with no live Square product is `null`, and
 * the UI omits the button entirely rather than pointing at a URL that does not
 * resolve. If you add an entry, curl it first.
 *
 * `null` deliberately gets no "Coming soon" stand-in either. It means three
 * different things here (not released, sold on another storefront, not stocked)
 * and only the first of those is "coming soon". The forthcoming titles already
 * print "Forthcoming Spring 2027" of their own accord.
 *
 * === THE KEYS ARE AUTHOR-BOOK SLUGS ===
 * Every key matches a `slug` in src/lib/author-books.ts, because that is what
 * the tiles and the /author/books/<slug> pages already key on. Do not rekey
 * this by product name: the shelf renders one tile per TITLE, and Square's
 * catalog does not decompose the same way (see the two notes below).
 *
 * === WHY SOME TITLES POINT AT A COLLECTION, NOT A PRODUCT ===
 * Three titles are sold on Square as several products rather than one, and the
 * honest destination for a tile is the collection that holds all of them:
 *
 *   Dream Big Journals   journal + teacher guide, each in Faith and Classic
 *   Raising Kingdom Kids hard copy, digital file, and the workshop workbook
 *   Dancing with Father  paperback and audiobook
 *
 * Linking a tile to one arbitrary format would hide the others.
 *
 * === THE DREAM BIG AGE BRACKETS DO NOT HAVE THEIR OWN URLS ===
 * The shelf shows four age brackets (Preschool, Younger Elementary, Older
 * Elementary, Youth & Adults) for journals and again for teacher guides. On
 * Square those brackets are a required "Age Group" DROPDOWN inside a single
 * product, not eight separate products. So all four bracket tiles resolve to
 * the same collection URL, and that is correct rather than lazy. Verified on
 * /product/dream-big-journal-classic-version-/18, which lists Youth & Adults,
 * Older Elementary, Younger Elementary, and Pre-School & Kindergarten as
 * variants of one $20 item.
 *
 * === WHY THE BRAVE SERIES IS NULL ===
 * Not because it is missing from Square. braveseries.square.site carries the
 * full per-volume catalog. Michele's call on 2026-08-25 was that the Brave
 * Series keeps thebraveseries.com as its single front door, which is the
 * `buy` panel those records already carry in src/lib/author-books.ts. Adding a
 * Square button beside it would put two competing purchase destinations on one
 * page. Leave these null unless she changes that.
 */

/** The storefront root. The Author page's "Shop all books" link. */
export const SQUARE_STORE_URL = 'https://micheleokimura.square.site/'

/**
 * Title slug -> Square URL, or null when there is nothing live to point at.
 * `null` is a real answer here and the UI is built to handle it.
 */
export const squareLinks: Record<string, string | null> = {
  // Forthcoming, 2027. No Square listing exists yet.
  'brave-purpose-with-god': null,
  'brave-purpose': null,

  // Collections, because each of these is several products on Square.
  'dream-big-journal-curriculum':
    'https://micheleokimura.square.site/shop/dream-big-journals/H6TBHCP3MCA7N6OILXANY2JV',
  'raising-kingdom-kids':
    'https://micheleokimura.square.site/shop/kingdom-kids-lesson-book/XQTZFZXBD3CC23IAC2TWLION',
  'dancing-with-father':
    'https://micheleokimura.square.site/shop/dancing-with-father/TGS3VPJOD6BSMKHDAWDVRORA',

  // Sold on the Brave Series storefront. See the note above before changing.
  'brave-series': null,
  'brave-and-beautiful': null,
  'brave-and-bold': null,
  'brave-together': null,

  // The trade book is not stocked on either Square store. The companion
  // journal is, over on the Brave Series storefront.
  'birth-of-explicit-movement': null,
  'explicit-movement-21-day-journal':
    'https://braveseries.square.site/product/explicit-21-day-interactive-journal/1',
}

/** Convenience reader, so callers do not index a possibly-missing key. */
export function getSquareLink(slug: string): string | null {
  return squareLinks[slug] ?? null
}
