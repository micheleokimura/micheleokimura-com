import { cn } from '@/lib/cn'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import { EmilyAvatar } from '@/components/EmilyAvatar'
import { ContactTrigger } from '@/components/ContactTrigger'
import { siteConfig } from '@/lib/site-config'

type Props = {
  heading: string
  children: React.ReactNode
  /**
   * Replaces the default CTA. Pages that want an interest pre-ticked pass their
   * own `<ContactTrigger interest="...">` here.
   */
  cta?: React.ReactNode
  /**
   * The panel's ground. 'teal' is the sitewide navy surface and the default.
   * 'sage' is the About page's warm green, pulled from the plants behind
   * Michele in the portrait that sits on that panel. Sage is far lighter than
   * navy, so the two secondary inks step up one stop to hold AA on it. The
   * measurements live with `.surface-sage` in tailwind.css.
   */
  surface?: 'teal' | 'sage'
}

/**
 * The dark panel that closes most pages, with one CTA in it.
 *
 * The CTA used to be a `JoinWaitListButton`, which opened a second, older
 * contact form asking for a church website domain. That form posted to
 * /api/wait-list and had been failing for every visitor. It is gone: the
 * default is now the same contact popup the header and every other page CTA
 * opens, so the site has one contact form.
 */
export function ContactBlock({
  heading,
  children,
  cta,
  surface = 'teal',
}: Props) {
  const sage = surface === 'sage'

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn
        className={cn(
          '-mx-6 rounded-4xl px-6 py-20 sm:mx-0 sm:py-32 md:px-12',
          sage ? 'surface-sage' : 'bg-neutral-950 surface-teal',
        )}
      >
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl text-balance">
                {heading}
              </h2>
              <div
                className={cn(
                  'mt-6 text-xl',
                  sage ? 'text-white/95' : 'text-neutral-300',
                )}
              >
                {children}
              </div>
              <div className="mt-10">
                {cta ?? <ContactTrigger tone="dark">Contact</ContactTrigger>}
              </div>
            </div>

            {/* Circular portrait of Emily humanizes the conversion moment. Shown
                at lg+ where it balances the empty right side. */}
            <FadeIn scaleIn className="hidden lg:block lg:justify-self-end">
              <EmilyAvatar size={300} className="ring-2 ring-white/15" />
            </FadeIn>
          </div>

          <Border className="mt-16 pt-10" invert>
            <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 text-sm">
              <div>
                <dt
                  className={cn(
                    'font-display font-semibold uppercase tracking-wider',
                    sage ? 'text-white/85' : 'text-white/70',
                  )}
                >
                  Email
                </dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    // -my-2.5/py-2.5: a 44px hit area on a 14px line, with
                    // the growth cancelled so the block does not move.
                    className="-my-2.5 inline-block py-2.5 text-white hover:text-[var(--color-brand-terracotta-on-dark)]"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt
                  className={cn(
                    'font-display font-semibold uppercase tracking-wider',
                    sage ? 'text-white/85' : 'text-white/70',
                  )}
                >
                  Based in
                </dt>
                <dd className="mt-3 text-white">
                  {siteConfig.city}, {siteConfig.state}
                </dd>
              </div>
            </dl>
          </Border>
        </div>
      </FadeIn>
    </Container>
  )
}
