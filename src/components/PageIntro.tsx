import { BannerHero } from '@/components/BannerHero'

/**
 * Thin alias over `BannerHero`, kept because seven pages and `CaseStudyLayout`
 * were built against these prop names.
 *
 * It used to render its own hero: a photo mosaic background (`HeroMosaic`)
 * behind near-black text with a white text-shadow to keep the type legible
 * over whatever image landed underneath. That was dropped by direction. Every
 * interior page now shows the SAME teal banner, so the site reads as one
 * identity rather than a different photograph per page. `HeroMosaic` is no
 * longer rendered anywhere.
 *
 * `children` becomes the banner subtitle. On the old hero it was body copy at
 * text-xl in warm grey on cream; on the banner it is cream on teal, so pages
 * passing a long multi-paragraph intro will look cramped. Keep it to a line or
 * two and let the page body carry the rest.
 */
export function PageIntro({
  eyebrow,
  title,
  children,
  centered = false,
}: {
  eyebrow?: string
  title: string
  children?: React.ReactNode
  centered?: boolean
}) {
  return (
    <BannerHero
      eyebrow={eyebrow}
      title={title}
      subtitle={children}
      centered={centered}
    />
  )
}
