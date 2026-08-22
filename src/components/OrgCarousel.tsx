import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { carouselItems, type CarouselItem } from '@/lib/organizations'

/**
 * OrgCarousel — dark-band two-row marquee of org logos.
 * Design: near-black section block (neutral-950), logos rendered white via
 * brightness-0+invert, teal border-glow on hover. Mirrors the CCM pattern.
 *
 * Rules (2026-06-16 spec):
 *  1. Clickable tiles link to /case-studies/<slug>.
 *  2. Non-case-study orgs render as non-clickable tiles (same visuals).
 *  3. Hover: logo brightens to full opacity, tile picks up teal ring.
 *  4. NDA orgs (Kamehameha Schools) are never included in the data source.
 */
function TileInner({ item }: { item: CarouselItem }) {
  return (
    <span className="relative block h-12 w-full">
      <Image
        src={item.src!}
        alt={item.alt}
        fill
        sizes="176px"
        className="object-contain opacity-50 transition duration-300 group-hover:opacity-100"
      />
    </span>
  )
}

const TILE_CLASS =
  'group flex w-40 shrink-0 flex-col items-center gap-2 rounded-2xl px-4 py-3 ring-1 ring-inset ring-white/10 transition hover:bg-white/[0.07] hover:ring-[var(--color-brand-orange)] hover:shadow-sm hover:shadow-[var(--color-brand-orange)]/30 sm:w-44'

function Tile({ item }: { item: CarouselItem }) {
  if (item.href) {
    return (
      <Link
        href={item.href}
        aria-label={`Read the ${item.alt} case study`}
        className={`${TILE_CLASS} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-orange)]`}
      >
        <TileInner item={item} />
      </Link>
    )
  }
  return (
    <div className={`${TILE_CLASS} cursor-default`} aria-label={item.alt}>
      <TileInner item={item} />
    </div>
  )
}

function MarqueeRow({ row, direction }: { row: CarouselItem[]; direction: 'ltr' | 'rtl' }) {
  const items = [...row, ...row] // doubled for a seamless -50% loop
  return (
    <div className={`marquee-track ${direction === 'ltr' ? 'marquee-ltr' : 'marquee-rtl'}`}>
      {items.map((item, i) => (
        <Tile key={`${item.orgSlug}-${i}`} item={item} />
      ))}
    </div>
  )
}

export function OrgCarousel() {
  const items = carouselItems()
  if (items.length === 0) return null
  const mid = Math.ceil(items.length / 2)
  const top = items.slice(0, mid)
  const bottom = items.slice(mid)

  return (
    <section
      aria-label="Organizations Michele has worked with"
      data-surface="dark"
      className="rounded-4xl bg-neutral-950 surface-sapphire py-20 sm:py-24"
    >
      <Container>
        <FadeIn>
          <h2 className="text-center font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Organizations I&rsquo;ve worked with.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-white/60">
            Churches, schools, and nonprofits across Hawaii and the mainland. Hover
            to pause, click any logo for the story.
          </p>
        </FadeIn>
      </Container>

      <FadeIn>
        <div className="marquee-band mt-12 flex flex-col gap-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <MarqueeRow row={top} direction="ltr" />
          <MarqueeRow row={bottom.length ? bottom : top} direction="rtl" />
        </div>
      </FadeIn>
    </section>
  )
}
