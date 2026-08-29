import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

/** Every ground this banner is allowed to take. Adding one owes a measured
 *  contrast budget in the matching block in tailwind.css. */
const SURFACE_CLASS = {
  teal: 'surface-teal-banner',
  violet: 'surface-violet-banner',
  plum: 'surface-speaker-plum',
  slate: 'surface-about-slate-banner',
} as const

/** The eyebrow ink each ground takes, because the eyebrow is the smallest
 *  type on the banner and it is the first thing to fail a recolour. Every
 *  entry owes a measured figure in the matching block in tailwind.css. */
const EYEBROW_CLASS = {
  teal: 'text-[var(--color-teal-on-dark)]',
  violet: 'text-[var(--color-speaker-eyebrow)]',
  plum: 'text-[var(--color-speaker-plum-ink)]',
  slate: 'text-[var(--color-about-slate-ink)]',
} as const

/**
 * THE banner hero. Every interior page uses this one component: Author, Speak,
 * Coaching, About, Resources, Works, Projects, and every case study. The site
 * identity is the banner itself, so there is deliberately no per-page hero
 * photograph and no per-page background. `PageIntro` is a thin alias over this
 * for the pages that were built against its prop names.
 *
 * Compact by direction: 280 to 320px, calm, out of the way so the content
 * underneath starts almost immediately. The home page keeps its video hero and
 * does not use this. See DESIGN-RULES.md.
 *
 * Sits BELOW the header rather than under it. The site header is absolutely
 * positioned over the cream band at the top of `main`, which already carries
 * pt-28 / sm:pt-32 to clear it, so the banner begins where that padding ends.
 * That keeps the nav legible without a per-page dark-header variant.
 *
 * Background is `.surface-teal-banner`: a teal glow at the centre over a navy
 * field deepening at the edges. Defined once in tailwind.css so it cannot
 * drift between pages.
 *
 * `surface="violet"` is the one sanctioned exception, added 2026-08-23. It
 * swaps in `.surface-violet-banner`, whose hue is sampled from the stage
 * photograph on /speaker. This is the banner half of the photo-derived-wash
 * convention written up in tailwind.css; read that block before adding a
 * third surface, because each one owes a measured contrast budget. The
 * default stays teal, so a page has to ask for this.
 *
 * `surface="plum"` is /speaker itself, added 2026-08-29. Michele read the
 * sampled violet field as a heavy, almost-black purple that had nothing to do
 * with the seven keynote cards below it, so that page first took the cards'
 * own colour and texture, and then, later the same day, gave up both: the
 * hairline stripes came off the banner and the hue was re-cut warm and earthy
 * at #624973. `.surface-speaker-plum` is the result, and it was briefly named
 * `violet-card` in between. It is scoped to that one page on purpose:
 * /speaker/messages/[slug] and the ReThink conference page still ask for
 * `violet` and are unchanged.
 *
 * `surface="slate"` is /about, added 2026-08-29. Michele read the navy banner
 * as cold, and much darker than the sage panel closing the same page, so the
 * two bands that frame /about had nothing to do with each other. Both are now
 * one flat value, `.surface-about-slate-banner` up top and
 * `.surface-about-slate` at the foot. It is scoped to that one page: every
 * other interior hero still defaults to `teal`.
 *
 * That value was re-cut twice on the same day. It began as a warm earthy
 * slate-blue #4E5872, which Michele read as still mostly grey; it went to
 * #4F5C99, a cornflower periwinkle in the direction of a blue hydrangea,
 * which she read as a touch too vibrant and digital; and it settled at
 * #56608E, the same hue with the saturation pulled back so the band sits
 * earthier. The token kept its `slate` name; see the block in tailwind.css
 * for why, and for the full re-measured contrast table.
 *
 * The two violets take the pale lavender eyebrow and the plum does NOT: on
 * the plum that lavender measures 4.48:1 at the lightest pixel of the
 * gradient and misses AA, so `plum` takes a warm blush at 5.37:1. `slate`
 * takes a pale warm sand at 4.65:1 for the same reason in reverse: the pale
 * teal fails AA outright at 4.36:1 on this ground and pulls the band back
 * cool besides, which is what the recolour was for. See EYEBROW_CLASS above
 * and the measured tables in tailwind.css.
 *
 * The eyebrow is plain tracked small caps. No pill, no badge, no border, no
 * rounded corners, anywhere, ever. Pills read as buttons and people click them.
 *
 * Its color is --color-teal-on-dark (pale teal) rather than the brand teal:
 * #00B09F sits at 3.94:1 against the lit centre of the glow and misses AA,
 * while the pale teal holds 7.71:1 there. See the palette block in
 * tailwind.css.
 */
export function BannerHero({
  eyebrow,
  title,
  subtitle,
  centered = false,
  surface = 'teal',
  balanceTitle = true,
  media,
  children,
}: {
  eyebrow?: string
  title: string
  /** Optional single line under the H1. */
  subtitle?: React.ReactNode
  /** Centers the banner text. Off by default. */
  centered?: boolean
  /**
   * Banner ground. `violet` is the photo-derived field the message pages
   * carry; `plum` is the warm, untextured purple /speaker itself runs;
   * `slate` is the muted periwinkle /about runs top and bottom. See
   * above.
   */
  surface?: 'teal' | 'violet' | 'plum' | 'slate'
  /**
   * Whether the H1 may use `text-wrap: balance`.
   *
   * base.css balances every h1 through h4 globally, which is right for a
   * heading sitting in a column of text and wrong for a two-line banner
   * headline: balance evens the two lines out, the ragged right edge that
   * says "this is left-aligned" disappears, and the block reads as centred
   * even though it is not. Michele read the Speaker banner exactly that way
   * on 2026-08-23 and asked for it to be left-justified, though its left edge
   * already measured flush with the wordmark. Pass `false` to fall back to
   * `text-wrap: pretty`, which fills each line and leaves the rag.
   */
  balanceTitle?: boolean
  /**
   * Optional picture, shown to the RIGHT of the copy from lg up and stacked
   * underneath it below that.
   *
   * Added 2026-08-24 for the message pages. They used to run a full-width
   * hero photograph in its own band under the banner, which pushed the body
   * copy most of a screen down and left the banner itself half empty. The
   * photograph moved up into the banner instead: the copy gets the left
   * column, the picture gets a fixed ~380px on the right, and the body starts
   * straight after. Pages without a picture are unchanged, single column.
   */
  media?: React.ReactNode
  /** Optional CTA row. Coaching uses it; Author and Speak do not. */
  children?: React.ReactNode
}) {
  const eyebrowColor = EYEBROW_CLASS[surface]

  return (
    <section
      data-surface="dark"
      className={`${SURFACE_CLASS[surface]} relative isolate flex min-h-[280px] w-full items-center overflow-hidden py-12 sm:min-h-[300px] sm:py-14 lg:min-h-[320px] ${
        media ? 'lg:py-16' : ''
      }`}
    >
      {/* `w-full` is load-bearing and this is the bug Michele was pointing at.
          The section is `display: flex` so that `items-center` can hold the
          copy in the middle of the band vertically. That makes Container a
          FLEX ITEM, and a flex item with `width: auto` shrinks to fit its
          content rather than filling the line. Container's own `mx-auto` then
          centred that shrunk box, so at 1440px the banner copy started at
          336px while the wordmark above it started at 112px. It only looked
          right at narrower widths, where the content happened to fill the
          line and shrink-to-fit came out the same as full width. `w-full`
          makes it fill the line again, `max-w-7xl` still caps it, and the
          banner now shares its left edge with the header on every page. */}
      <Container className="w-full">
        <FadeIn className={centered ? 'text-center' : undefined}>
          <div
            className={
              media
                ? 'flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between md:gap-10 lg:gap-14'
                : undefined
            }
          >
          <div className={media ? 'min-w-0 flex-1' : undefined}>
          <h1>
            {eyebrow ? (
              <>
                <span
                  className={`font-display block text-xs font-semibold tracking-[0.22em] uppercase sm:text-sm ${eyebrowColor}`}
                >
                  {eyebrow}
                </span>
                <span className="sr-only"> - </span>
              </>
            ) : null}
            <span
              className={`font-display mt-4 block max-w-3xl text-[2rem] leading-[1.1] font-medium tracking-tight text-[var(--color-cream)] sm:mt-5 sm:text-[2.5rem] lg:text-5xl lg:leading-[1.08] ${
                balanceTitle ? 'text-balance' : 'text-pretty'
              } ${centered ? 'mx-auto' : 'text-left'}`}
            >
              {title}
            </span>
          </h1>

          {subtitle ? (
            <div
              className={`font-display mt-4 max-w-2xl text-lg leading-7 font-medium text-[var(--color-cream)]/85 sm:text-xl sm:leading-8 ${
                centered ? 'mx-auto' : 'text-left'
              }`}
            >
              {subtitle}
            </div>
          ) : null}

          {children ? <div className="mt-6 sm:mt-7">{children}</div> : null}
          </div>

          {media ? (
            // Fixed width rather than a percentage, so the picture is the
            // same size on every message page whatever the headline does.
            // Two column from md rather than lg. Stacked, this banner runs
            // over 500px tall on a laptop-ish 856px viewport, which is the
            // top-heaviness the layout change was meant to cure; it should not
            // survive between 768 and 1024. The picture is held to 260px in
            // that band so the headline keeps a readable measure beside it,
            // and opens up to 380 at lg. Below md it stacks and aligns LEFT
            // with the copy rather than centring under it.
            <div className="w-full max-w-[280px] shrink-0 self-start md:max-w-[260px] md:self-center lg:max-w-[380px]">
              {media}
            </div>
          ) : null}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
