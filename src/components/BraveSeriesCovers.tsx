import Image from 'next/image'

import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import {
  BRAVE_SERIES_TITLES,
  type BraveCover,
  type BraveTitle,
} from '@/lib/brave-series-covers'

/**
 * The Brave Series cover shelf: four volumes per title, one tile each, with
 * the Faith and Classic editions alternating across the row. Twelve tiles when
 * all three titles are passed, four when a single title page passes its own.
 *
 * A volume with no usable art yet renders a typographic placeholder rather
 * than dropping out, so a row is always four wide.
 */
function Tile({ cover }: { cover: BraveCover }) {
  return (
    <figure>
      {cover.src ? (
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-900/5">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15rem"
            className="object-contain"
          />
        </div>
      ) : (
        <div className="flex aspect-[3/4] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-4 text-center">
          <span className="font-display text-2xl leading-none font-semibold tracking-tight text-neutral-400">
            {cover.volume}
          </span>
          <span className="font-display mt-2 text-sm leading-tight font-semibold tracking-tight text-neutral-500">
            Volume {cover.volume}
          </span>
          <span className="mt-2 text-[0.65rem] tracking-widest text-neutral-400 uppercase">
            Cover coming soon
          </span>
        </div>
      )}
      <figcaption className="mt-3 text-center text-sm leading-6 text-neutral-600">
        {cover.caption}
      </figcaption>
    </figure>
  )
}

export function BraveSeriesCovers({
  titles = BRAVE_SERIES_TITLES,
  showTitleLabels = true,
}: {
  titles?: BraveTitle[]
  /** Off for a single-title page, where the page heading already names it. */
  showTitleLabels?: boolean
}) {
  return (
    <div className="space-y-12">
      {titles.map((title) => (
        <div key={title.slug}>
          {showTitleLabels ? (
            <FadeIn>
              <h3 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                {title.title}
                <span className="ml-2 font-normal text-neutral-400 normal-case">
                  {title.audience}
                </span>
              </h3>
            </FadeIn>
          ) : null}
          <FadeInStagger faster className={showTitleLabels ? 'mt-5' : ''}>
            <ul
              role="list"
              className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8"
            >
              {title.covers.map((cover) => (
                <FadeIn as="li" key={`${title.slug}-${cover.volume}`} scaleIn>
                  <Tile cover={cover} />
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>
        </div>
      ))}
    </div>
  )
}
