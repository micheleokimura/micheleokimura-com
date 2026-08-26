import Image from 'next/image'

import {
  storeButtonAriaLabel,
  storeButtonLabel,
} from '@/data/square-store-links'
import type { AvailableLink, Endorsement } from '@/lib/author-books'

/**
 * The pieces the Author shelf (/author) and a book detail page
 * (/author/books/<slug>) both render. They lived inline in the Author page
 * until the tile rebuild of 2026-08-23 split that page in two; keeping them
 * here is what stops a cover on the shelf and a cover on the detail page from
 * drifting into two different treatments.
 */

/**
 * Cover art.
 *
 * TWO VARIANTS, and the difference is deliberate.
 *
 * `flush` is the shelf tile: a full-bleed band across the top of the card, no
 * radius and no ring of its own, clipped by the card's own `overflow-hidden`.
 * That is the Living in Duvall listing pattern Brett sent as the reference
 * (livingin-platform.vercel.app/listings), where the photo runs edge to edge
 * into the rounded corners and grows slightly on card hover.
 *
 * The one thing NOT borrowed from the reference is `object-cover`. Duvall
 * lists businesses and crops 4:3 photographs, which is the right call for a
 * photo and the wrong one for a book: cropping a cover cuts the title off it.
 * So the band keeps the reference's 4:3 box and contains the art inside it.
 * Portrait covers end up filling the band's full height, which lands them at
 * almost exactly the reference's image height anyway.
 *
 * The `p-4` inside the band is what makes the hover zoom safe. `object-contain`
 * fits the art to the CONTENT box, so the padding leaves the art 16px of room
 * to grow into; without it, scale-105 would clip the top and bottom of every
 * cover against the band edge.
 *
 * The default variant is the standalone box used on a book's detail page,
 * where the cover is the subject rather than a thumbnail.
 *
 * Ratios across the supplied art run from 2:3 to about 3:4, so nothing is ever
 * cropped or distorted, and a missing cover falls back to a book-shaped
 * placeholder rather than a broken tile.
 */
export function Cover({
  src,
  alt,
  sizes,
  priority,
  flush = false,
}: {
  src?: string
  alt: string
  sizes: string
  priority?: boolean
  /** Full-bleed band for a shelf tile. Off for the standalone detail page. */
  flush?: boolean
}) {
  if (flush) {
    return (
      // Exactly the reference's band: a fixed-width strip that stretches to the
      // card height on a phone, and only from sm does it become the 4:3 band
      // across the top. The aspect ratio must NOT apply in the strip case, or
      // the band collapses to 72px inside a much taller card.
      <div className="relative w-24 shrink-0 self-stretch overflow-hidden bg-[var(--color-band-1)] sm:aspect-[4/3] sm:w-full sm:self-auto">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-contain p-2 transition duration-300 group-hover:scale-105 sm:p-4"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4">
            <div className="flex aspect-[3/4] h-full flex-col items-center justify-center rounded-md border border-dashed border-[var(--color-navy)]/25 p-3 text-center">
              <span className="font-display text-sm leading-tight font-semibold tracking-tight text-neutral-600">
                {alt}
              </span>
              <span className="mt-2 text-[10px] tracking-widest text-neutral-500 uppercase">
                Cover soon
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (!src) {
    return (
      <div className="flex aspect-[3/4] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[var(--color-navy)]/20 bg-[var(--color-band-1)] p-5 text-center">
        <span className="font-display text-base leading-tight font-semibold tracking-tight text-neutral-600">
          {alt}
        </span>
        <span className="mt-3 text-xs tracking-widest text-neutral-500 uppercase">
          Cover coming soon
        </span>
      </div>
    )
  }

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[var(--color-band-1)] ring-1 ring-[var(--color-navy-10)]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain"
      />
    </div>
  )
}

/**
 * Flat, tracked small-caps label for a title that has not shipped. Deliberately
 * not a pill: DESIGN-RULES bans badges outright because they read as clickable.
 * On a tile it sits directly under the title, which is where Brett asked for
 * it. The Living in Duvall reference puts a coloured status pill in the same
 * role; that part is not borrowed.
 */
export function Forthcoming({ label = 'Forthcoming' }: { label?: string }) {
  return (
    <span className="font-display block text-[11px] font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase">
      {label}
    </span>
  )
}

/** Verbatim endorser quotes. Never edit one to make it fit. */
export function Endorsements({
  items,
  label = 'What readers say',
}: {
  items: Endorsement[]
  label?: string
}) {
  return (
    <div className="mt-10">
      <h2 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
        {label}
      </h2>
      <div className="mt-5 space-y-6">
        {items.map((item, i) => (
          <figure
            key={`${item.source}-${i}`}
            className="border-l-2 border-[var(--color-brand-terracotta)] pl-5"
          >
            <blockquote className="text-base leading-7 text-neutral-700 italic">
              {item.quote}
            </blockquote>
            <figcaption className="mt-2 text-sm font-medium text-neutral-500 not-italic">
              {item.source}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

/**
 * "Available at" row. External storefronts open in a new tab. The
 * micheleokimura.com/store destination is printed as text until the store
 * route ships; swap in a Link then.
 */
export function AvailableAt({
  label = 'Available at',
  links,
}: {
  label?: string
  links: AvailableLink[]
}) {
  return (
    <p className="mt-8 text-sm leading-7 text-neutral-600">
      <span className="font-display font-semibold tracking-widest text-neutral-500 uppercase">
        {label}
      </span>{' '}
      {links.map((link, i) => (
        <span key={link.text}>
          {i > 0 ? <span className="text-neutral-300"> &middot; </span> : null}
          {link.href ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-4 transition hover:decoration-2"
            >
              {link.text}
            </a>
          ) : (
            <span className="font-medium text-neutral-950">{link.text}</span>
          )}
        </span>
      ))}
    </p>
  )
}

/**
 * The storefront call to action carried by a book tile and, one size up, by
 * the top of a book's own page.
 *
 * LABEL. Read off the href rather than passed in, so a title that moves
 * storefronts renames its own button everywhere it appears. Square titles say
 * "Buy on Square"; the two Explicit Movement titles moved to Michele's own
 * shop on 2026-08-26 and say "Shop at explicitmovement.org". The rule lives in
 * `storeButtonLabel` in src/data/square-store-links.ts, next to the URLs it
 * reads. The component keeps its name, which is now a misnomer; see the header
 * of that file.
 *
 * COLOUR. --color-cta fill, `rounded-md`, `--color-cta-ink` label, which is
 * white on a darkened coral as of 2026-08-26. This is the same
 * FILL_BASE that src/components/Button.tsx renders, deliberately, so the shop
 * button reads as the same control as every other CTA on the site. The brief
 * for this feature asked for a black rectangular button copied from the
 * WordPress site; Michele chose the house coral on 2026-08-25 instead, because
 * DESIGN-RULES bans dark CTAs outside the footer and a navy button here would
 * have been the only primary CTA on the site in a different hue.
 *
 * NOT A PILL. `rounded-md`, and it has to stay that way. DESIGN-RULES settled
 * on 2026-08-24 that being the genuine click target does not earn an element a
 * `rounded-full`, and that ruling outranks any reference.
 *
 * ACCESSIBLE NAME. The Author page renders this button many times over with
 * identical visible text, so pass `forTitle` and the link announces "Buy
 * Dancing with Father on Square", or "Shop for The Birth of Explicit Movement
 * at explicitmovement.org", rather than the fifth identical label in a row.
 * The visible label stays short.
 */
export function SquareButton({
  href,
  forTitle,
  size = 'tile',
  label,
  className = '',
}: {
  href: string
  /** Book title, folded into the accessible name only. */
  forTitle?: string
  /** `tile` sits in a card footer; `page` matches Button's primary sizing. */
  size?: 'tile' | 'page'
  /**
   * Overrides the host-derived label.
   *
   * Added 2026-08-26 on Michele's direction that the shelf read one word on
   * every tile. `storeButtonLabel` names the shop it points at, which is right
   * on a detail page carrying one title and wrong on a grid where eight tiles
   * in a row then read "Buy on Square", "Buy on Square", "Shop at
   * explicitmovement.org". The Author shelf passes "Purchase"; the curriculum
   * landing pages pass "Shop the <thing>". Left unset, the button still names
   * its own host, which is what /author/books/<slug> still does.
   *
   * The accessible name follows the override and still carries the title, so a
   * screen reader hears "Purchase Dancing with Father" rather than the fifth
   * bare "Purchase" of the row.
   */
  label?: string
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        forTitle
          ? label
            ? `${label} ${forTitle}`
            : storeButtonAriaLabel(href, forTitle)
          : undefined
      }
      className={`group/buy inline-flex items-center justify-center gap-1.5 rounded-md bg-[var(--color-cta)] font-semibold text-[var(--color-cta-ink)] shadow-sm transition hover:bg-[var(--color-cta-hover)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none ${
        size === 'page'
          ? 'px-6 py-3.5 text-base'
          : // `tile` was a 12px label in a 32px-tall control below sm, which is
            // both under the 16px reading floor and well under the 44pt tap
            // target. 14px at every width, and min-h-11 forces the 44 on the
            // phone. `sm:min-h-0` hands the height back to the padding from sm
            // up, so the desktop card footer is the 40px control it always was.
            'min-h-11 px-3 py-2 text-sm sm:min-h-0'
      } ${className}`}
    >
      {label ?? storeButtonLabel(href)}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover/buy:translate-x-0.5"
      >
        &rarr;
      </span>
    </a>
  )
}
