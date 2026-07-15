import Image from 'next/image'
import { cn } from '@/lib/cn'

// NOTE: these exports keep their original names (EmilyAvatar / EmilyPortrait /
// ArticleByline) so the many importers across the chassis keep working during
// the CCM -> Michele port. They render MICHELE. Rename in a later cleanup pass.
// TODO: replace the placeholder photo with Michele's selected canonical hero
// photo (warm, welcoming, ~5x7) once she sends it.

export const EMILY_ALT = 'Michele Okimura, speaker, author, and coach'

// Michele's photo. Portrait crop (1029x1080-ish), used both for the small
// circular avatar and the larger portrait placements.
const SMALL = '/team/michele-okimura.jpg'

export function EmilyAvatar({
  size = 48,
  priority = false,
  className,
}: {
  size?: number
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src={SMALL}
      alt={EMILY_ALT}
      width={size}
      height={size}
      priority={priority}
      sizes={`${size}px`}
      className={cn(
        'inline-block shrink-0 rounded-full object-cover ring-1 ring-neutral-900/10',
        className,
      )}
      style={{ width: size, height: size }}
    />
  )
}

const FULL = '/team/michele-okimura.jpg'
const FULL_RATIO = 1286 / 1029

export function EmilyPortrait({
  width = 440,
  priority = false,
  className,
}: {
  width?: number
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src={FULL}
      alt={EMILY_ALT}
      width={width}
      height={Math.round(width * FULL_RATIO)}
      priority={priority}
      sizes={`(min-width: 1024px) ${width}px, 100vw`}
      className={cn('h-auto w-full rounded-3xl object-cover', className)}
    />
  )
}

export function ArticleByline({
  trailing,
  className,
}: {
  trailing?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <EmilyAvatar size={40} />
      <p className="text-sm text-neutral-500">
        By <span className="font-medium text-neutral-700">Michele Okimura</span>
        {trailing ? <>{trailing}</> : null}
      </p>
    </div>
  )
}
