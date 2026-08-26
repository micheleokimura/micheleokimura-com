/**
 * Storefront links, one entry per title on the Author shelf.
 *
 * === "SQUARE" IS NOW A MISNOMER IN THESE NAMES ===
 * This file, `squareLinks`, `getSquareLink` and `SquareButton` were all written
 * when every destination here was a Square store. On 2026-08-26 Michele moved
 * the two Explicit Movement titles onto her own shop at explicitmovement.org,
 * so the map now holds a storefront URL of any host and the button labels
 * itself from that host (see `storeButtonLabel` below and the button in
 * src/components/AuthorBookParts.tsx). The names were left alone to keep that
 * change small. Read every "Square" in here as "storefront".
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
 *
 * The Brave Series curriculum page does now carry a button under its wordmark,
 * on Michele's direction of 2026-08-26, and it names thebraveseries.com rather
 * than Square. It REPLACED the BuyLink panel that page used to carry, so the
 * page is still down to one shop link. That button is hard-coded in
 * src/app/author/books/[slug]/page.tsx off the slug, precisely so these rows
 * can stay null and no OTHER title starts pointing at a Square listing that
 * does not sell the thing on the page.
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

  // Both Explicit Movement titles sell through the Explicit Movement shop, on
  // Michele's direction of 2026-08-26. The trade book was never stocked on
  // either Square store, and the journal used to point at its Brave Series
  // Square listing; she wants one front door for both.
  'birth-of-explicit-movement': 'https://www.explicitmovement.org/shop',
  'explicit-movement-21-day-journal': 'https://www.explicitmovement.org/shop',
}

/**
 * The visible label for a storefront button, taken from the URL it points at.
 *
 * Derived rather than stored per title so that every surface carrying the
 * button (the Author shelf tiles, /author/books/<slug>, the Dream Big project
 * page) names the right shop without each call site having to remember to pass
 * a label. Square keeps its brand name, because naming that host instead would
 * print a bare subdomain where a shop name belongs. Every other host is named
 * outright, which is how the Explicit Movement titles read "Shop at
 * explicitmovement.org".
 */
export function storeButtonLabel(href: string): string {
  const host = hostOf(href)
  if (!host) return 'Visit the shop'
  if (host.endsWith('square.site')) return 'Buy on Square'
  return `Shop at ${host}`
}

/** The accessible name, which also carries the title. See SquareButton. */
export function storeButtonAriaLabel(href: string, title: string): string {
  const host = hostOf(href)
  if (!host) return `Shop for ${title}`
  if (host.endsWith('square.site')) return `Buy ${title} on Square`
  return `Shop for ${title} at ${host}`
}

/** Hostname without the `www.`, or '' if the URL will not parse. */
function hostOf(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

/** Convenience reader, so callers do not index a possibly-missing key. */
export function getSquareLink(slug: string): string | null {
  return squareLinks[slug] ?? null
}

/* ------------------------------------------------------- purchase buttons */

/** The Brave Series front door. Michele's specified form, with the `www.`. */
export const BRAVE_SERIES_STORE_URL = 'https://www.thebraveseries.com'

/** The Explicit Movement shop, carrying both Explicit Movement titles. */
export const EXPLICIT_MOVEMENT_STORE_URL = 'https://www.explicitmovement.org/shop'

/**
 * Destinations the Author shelf's "Purchase" button uses, layered OVER
 * `squareLinks`.
 *
 * WHY THIS IS A SECOND MAP RATHER THAN FOUR MORE ROWS IN `squareLinks`.
 * Michele asked on 2026-08-26 for the Brave Series to carry a Purchase button
 * on /author. `squareLinks` is read by /author/books/<slug> as well, and all
 * four Brave records already carry a `buy` panel pointing at thebraveseries.com
 * (see AUTHOR_BOOKS in src/lib/author-books.ts). Putting the series into
 * `squareLinks` would hand that same destination to the three child detail
 * pages on top of the panel they still render. So the shelf reads THIS map,
 * and the detail pages keep reading `squareLinks` unchanged.
 *
 * Anything not listed here falls through to `squareLinks`, so a title that
 * moves storefronts still only needs editing in one place.
 *
 * The three child titles are still listed even though nothing reads them
 * today. Michele's follow-up later on 2026-08-26 took the Purchase button off
 * the three Brave Series tiles on /author (all three named the same storefront
 * as the button in the section heading, so the section printed one destination
 * four times), and the tiles now pass showPurchase={false}. The rows stay
 * because they are the correct answer if a per-title button ever comes back,
 * and because a wrong answer left here would be silent.
 */
const purchaseOverrides: Record<string, string> = {
  'brave-series': BRAVE_SERIES_STORE_URL,
  'brave-and-beautiful': BRAVE_SERIES_STORE_URL,
  'brave-and-bold': BRAVE_SERIES_STORE_URL,
  'brave-together': BRAVE_SERIES_STORE_URL,
}

/**
 * The storefront a Purchase button points at, or null when nothing live exists
 * to point at. `null` still means the button is omitted rather than disabled.
 */
export function getPurchaseLink(slug: string): string | null {
  return purchaseOverrides[slug] ?? squareLinks[slug] ?? null
}
