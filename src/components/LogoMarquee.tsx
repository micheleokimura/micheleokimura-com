import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { CLIENT_LOGOS, type ClientLogo } from '@/lib/client-logos'

/**
 * LogoMarquee — single-row, right-to-left auto-scroll below the home hero.
 * Reuses the .marquee-track / .marquee-band CSS from tailwind.css (defined
 * for OrgCarousel) but overrides the animation duration inline: that shared
 * class runs a slow 135s two-row cycle, while this single row of 13 logos
 * wants a snappier ~35s pass.
 */
function LogoTile({ item }: { item: ClientLogo }) {
  return (
    <Link
      href={`/case-studies/${item.slug}`}
      aria-label={`Read the ${item.name} story`}
      className="group flex w-36 shrink-0 flex-col items-center gap-2 px-4 sm:w-40"
    >
      <span className="relative flex h-12 w-full items-center justify-center">
        {item.logo ? (
          <Image
            src={item.logo}
            alt={item.name}
            fill
            sizes="160px"
            className="object-contain opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          />
        ) : (
          <span className="font-display px-2 text-center text-sm font-semibold tracking-tight text-neutral-400 opacity-60 transition duration-300 group-hover:text-[var(--color-brand-teal)] group-hover:opacity-100">
            {item.name}
          </span>
        )}
      </span>
      <span className="text-center text-xs text-neutral-500 transition group-hover:text-neutral-800">
        {item.name}
      </span>
    </Link>
  )
}

export function LogoMarquee() {
  if (CLIENT_LOGOS.length === 0) return null

  const items = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <section
      aria-label="Organizations Michele has worked with"
      className="bg-[var(--color-cream)] py-16 lg:py-24"
    >
      <Container>
        <FadeIn>
          <h2 className="text-center font-display text-3xl font-medium tracking-tight text-[var(--color-brand-teal)] sm:text-4xl">
            Organizations I&rsquo;ve worked with.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-neutral-600">
            Hover to pause, click any logo for the story.
          </p>
        </FadeIn>
      </Container>

      <FadeIn>
        <div className="marquee-band mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div
            className="marquee-track marquee-rtl"
            style={{ animationDuration: '36s' }}
          >
            {items.map((item, i) => (
              <LogoTile key={`${item.slug}-${i}`} item={item} />
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
