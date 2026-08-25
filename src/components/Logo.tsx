import Image from 'next/image'
import { cn } from '@/lib/cn'

/**
 * Michele's handwritten script wordmark: "Michele" in her own hand with
 * OKIMURA set underneath. Two files, same artwork, one inked black and one
 * white; `invert` picks the white one for dark surfaces (the navy footer).
 *
 * This replaced a typeset stand-in on 2026-08-24, when Michele supplied the
 * real files. The old version spelled the name in the display face with a
 * terracotta accent dot. There is no dot in the real mark, so it is gone.
 *
 * SIZE. The artwork is a STACKED lockup at 724:421 (about 1.72:1), not a wide
 * horizontal one, so width and header height are the same decision: every
 * extra 10px of width costs about 6px of bar. Michele cut the header on
 * 2026-08-23 for being "too tall, too much negative space above and below the
 * nav", so the mark is sized to the bar rather than the other way round.
 * 52px tall puts the bar at about 92px against main's current pt-6/sm:pt-10
 * header, and about 84px against the tightened py-3/sm:py-4 one waiting on the
 * in-flight branches. `main` in layout.tsx pads down past both. Re-measure that
 * padding before growing this.
 *
 * The height is set here and the width is left to `w-auto`, so the browser
 * derives it from the intrinsic ratio and the mark can never be stretched.
 */
export function Logo({
  className,
  invert = false,
}: {
  className?: string
  invert?: boolean
}) {
  return (
    <Image
      src={
        invert
          ? '/images/logo/logo-wordmark-light.png'
          : '/images/logo/logo-wordmark-dark.png'
      }
      alt="Michele Okimura"
      // 724x421 is the intrinsic 2896x1684 reduced to its lowest terms. It is
      // here to fix the aspect ratio and reserve the box against layout shift,
      // NOT as a render size; `sizes` is what keeps the served file small.
      width={724}
      height={421}
      sizes="90px"
      // The black mark is the header's and is above the fold on every route,
      // so it is fetched eagerly. The white one is the footer's, which is by
      // definition below the fold: preloading it would only compete with the
      // real LCP image and earn a Next warning for its trouble.
      priority={!invert}
      className={cn('block h-[42px] w-auto sm:h-[52px]', className)}
    />
  )
}
