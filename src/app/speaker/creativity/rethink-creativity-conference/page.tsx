import type { Metadata } from 'next'
import Link from 'next/link'

import { BannerHero } from '@/components/BannerHero'
import { Container } from '@/components/Container'
import { ContactTrigger } from '@/components/ContactTrigger'
import { FadeIn } from '@/components/FadeIn'
import { WebPageJsonLd } from '@/components/JsonLd'
import { pageMetadata } from '@/lib/schema'

/**
 * The ReThink Creativity conference, written up in full. New page,
 * 2026-08-25, at Michele's direction.
 *
 * WHY IT LIVES UNDER /speaker RATHER THAN /projects. The conference is the
 * thing "Activating Your Creativity" grows into, so Michele asked for the
 * card at the foot of that keynote page and for the card to land here. The
 * only link into this page is that card, at the bottom of
 * /speaker/messages/activating-your-creativity.
 *
 * /projects/rethink-creativity IS STILL LIVE AND IS A DIFFERENT PAGE. That
 * one is the case study: her origin account in her own quoted words, the
 * Zechariah panel, the stat grid, the speaker roster. This one is the account
 * she wrote for the keynote page, and it opens with the recording. Both are
 * hers, both are current, and neither is a draft of the other. If they are
 * ever to be merged, that is a content decision for Michele, not a tidy-up.
 *
 * COPY IS VERBATIM. Michele supplied the four sections below as written and
 * they are set here word for word, including "dynamic" and "wildly creative".
 * The one edit already made in her source, and kept: the em dash in "priests
 * or warriors, He called forth the craftsmen" is a comma. No em dash anywhere
 * on this site.
 *
 * The banner splits her H1 across BannerHero's title and subtitle slots, the
 * same two-line layout every message page uses. Nothing is lost: the full
 * string "Unleashing Your Creative Identity: The Rethink Creativity
 * Conference" is what the tab, the search result, the og:card and the
 * WebPage schema all carry.
 *
 * "Rethink" is lower-case in the title on purpose. Michele wrote it that way
 * in the title she gave; the conference's own name keeps its capital T
 * everywhere else on the site. Do not "fix" one to match the other.
 */

const FULL_TITLE =
  'Unleashing Your Creative Identity: The Rethink Creativity Conference'

const DESCRIPTION =
  'Four conferences on creative identity, from the 2010 Renaissance Conferences to the global online ReThink Creativity events of 2020 and 2021, with speakers from HGTV, Hollywood, surgery, fashion, business, and government.'

export const metadata: Metadata = pageMetadata({
  title: FULL_TITLE,
  description: DESCRIPTION,
  path: '/speaker/creativity/rethink-creativity-conference',
  type: 'article',
  ogDescription:
    'Every person has a creative identity. Four conferences built to prove it.',
})

/**
 * The workshop strands from the 2020 and 2021 programmes. Written "Label:
 * what happened", and split on the FIRST colon only so a colon later in the
 * sentence stays in the sentence. Same rule the termed lists on the message
 * pages follow.
 */
const STRANDS = [
  'Historic Space Collaboration: In 2021, the conference partnered with Danny Kim from Valley Christian Schools to connect with the International Space Station (ISS). Attendees submitted prayers that were uploaded to the ISS, literally releasing prayer over the earth as the station orbited!',
  'Global Medical & Therapeutic Insight: Surgeons discussed the role of creativity in the medical field, while a team of professional therapists led a workshop on creativity in counseling.',
  'Business & Government Leadership: The event featured a State Representative speaking on creative problem-solving in government, alongside business innovators like Edwin Keh, Vice President and COO of Walmart Global Procurement.',
]

export default function ReThinkCreativityConferencePage() {
  return (
    <>
      <WebPageJsonLd
        path="/speaker/creativity/rethink-creativity-conference"
        name={FULL_TITLE}
        description={DESCRIPTION}
      />

      {/* Violet, so this reads as part of the speaking section rather than as
          a loose page. Balance is off for the same reason it is off on the
          message pages: a balanced two-line banner headline loses its ragged
          right edge and starts reading as centred. */}
      <BannerHero
        eyebrow="Conference · 2010 to present"
        title="Unleashing Your Creative Identity"
        subtitle="The Rethink Creativity Conference"
        surface="violet"
        balanceTitle={false}
      />

      <section className="w-full bg-[var(--color-band-1)] py-14 sm:py-24 lg:py-28">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              {/* The recording opens the page, above a word of the body copy.
                  Michele asked for it there: the conference is easier to
                  believe once you have seen it.

                  Same treatment as the embed at the foot of a message page
                  and the one on an author book page. 16:9 whatever the source
                  is, `rel=0` so the end screen stays off other people's
                  channels, no autoplay, and lazy so it costs nothing until it
                  scrolls into view. Neutral-950 underneath covers the moment
                  before the poster paints. Embedded rather than re-hosted:
                  pulling the file down to serve ourselves would breach
                  YouTube's terms. */}
              <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-[var(--color-navy-10)] sm:mb-12">
                <iframe
                  src="https://www.youtube.com/embed/z7XSFwSDPj4?rel=0"
                  title="ReThink Creativity Conference - Michele Okimura"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>

              <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                The Origin
              </h2>
              <p className="mt-6 text-lg leading-8 text-neutral-600">
                Michele&rsquo;s journey with this message began with the 2010
                and 2011 Renaissance Conferences, which celebrated and equipped
                people to grow their creativity. A decade later, this vision
                experienced a powerful rebirth, rebranding as the ReThink
                Creativity conferences in 2020 and 2021. The 2020 event, boldly
                themed &ldquo;What If?&rdquo;, was designed by Michele to
                ignite imagination and inspire attendees to discover what
                happens when we partner with God&rsquo;s unlimited creativity.
                The core mission of this movement is to solidify every
                person&rsquo;s creative identity in Christ, recognizing that we
                are made in the image of a wildly creative God.
              </p>

              <h2 className="font-display mt-10 text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                The Vision
              </h2>
              <p className="mt-6 text-lg leading-8 text-neutral-600">
                Michele founded the conference to combat the widespread false
                belief that many people simply are not creative. She champions
                the truth that creativity includes discovering the vital
                solutions our world desperately needs. Therefore, it belongs in
                medicine, emergency response, trades, business, and government
                just as much as it belongs in painting and photography. Drawing
                profound inspiration from Zechariah 1:18-21, Michele notes that
                when God needed to dismantle the works of the enemy, He did not
                call forth priests or warriors, He called forth the craftsmen.
                She firmly believes everyone has a unique craft that God can use
                in mighty ways.
              </p>

              <h2 className="font-display mt-10 text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                The Engagement
              </h2>
              <p className="mt-6 text-lg leading-8 text-neutral-600">
                Unexpectedly, the COVID outbreak led Michele to transition the
                2020 and 2021 conferences online, which rapidly expanded their
                reach to a global audience. Each dynamic event featured
                powerful plenary speakers alongside 20 distinct workshops:
              </p>

              {/* Termed list: a bold label and a sentence, so it gets the
                  wider spacing the message pages give the same shape. Two of
                  the five strands carry italics inside the sentence, so those
                  two are written out below the mapped ones rather than being
                  forced through the split. */}
              <ul role="list" className="mt-6 space-y-5">
                {STRANDS.map((item) => {
                  const at = item.indexOf(': ')
                  const term = item.slice(0, at)
                  const rest = item.slice(at + 2)

                  return (
                    <li
                      key={term}
                      className="relative pl-6 text-lg leading-8 text-neutral-600"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute top-[0.7em] left-0 h-1.5 w-1.5 rounded-full bg-[var(--color-brand-terracotta)]"
                      />
                      <span className="font-semibold text-neutral-950">
                        {term}:{' '}
                      </span>
                      {rest}
                    </li>
                  )
                })}

                <li className="relative pl-6 text-lg leading-8 text-neutral-600">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.7em] left-0 h-1.5 w-1.5 rounded-full bg-[var(--color-brand-terracotta)]"
                  />
                  <span className="font-semibold text-neutral-950">
                    Media &amp; Design:{' '}
                  </span>
                  Attendees learned from HGTV leaders like Jenny Marrs (
                  <em>Fixer to Fabulous</em>), Hollywood directors teaching
                  filmmaking, and a world-renowned fashion designer calling out
                  creativity in a plenary session.
                </li>

                <li className="relative pl-6 text-lg leading-8 text-neutral-600">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.7em] left-0 h-1.5 w-1.5 rounded-full bg-[var(--color-brand-terracotta)]"
                  />
                  <span className="font-semibold text-neutral-950">
                    The Arts:{' '}
                  </span>
                  Experts taught highly engaging sessions on photography, dance,
                  painting, poetry, flower arranging, and songwriting.
                </li>
              </ul>

              <h2 className="font-display mt-10 text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                The Outcome
              </h2>
              <p className="mt-6 text-lg leading-8 text-neutral-600">
                Michele carries a deep conviction that creativity brings
                healing, beauty, wholeness, and joy to life, enabling
                God&rsquo;s people to fulfill their callings with excellence.
                She hopes to collaborate with others to host more ReThink
                conferences in the future. Ultimately, her work is a powerful
                reminder that when we tap into God&rsquo;s unlimited
                creativity, miracles happen.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      {/* Plain band, one button, no address. Michele: no dark blue text boxes
          anywhere except the footer, and no email address on any
          client-facing page. The back link goes to the keynote this page
          hangs off, which is the only page that links here. */}
      <section className="w-full bg-[var(--color-band-2)] py-14 sm:py-24 lg:py-28">
        <Container>
          <FadeIn>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl leading-[1.18] font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                Want a ReThink Creativity conference for your people?
              </h2>
              <p className="mt-5 text-lg leading-[1.6] text-neutral-600 sm:text-xl">
                Michele teaches this as a keynote, a workshop, and a full
                conference program. Tell her who you are gathering.
              </p>
              <div className="mt-8">
                <ContactTrigger interest="speaking">Contact</ContactTrigger>
              </div>
              <p className="mt-8 text-sm">
                <Link
                  href="/speaker/messages/activating-your-creativity"
                  className="font-semibold text-neutral-700 underline decoration-[var(--color-navy-20)] underline-offset-4 transition hover:text-neutral-950 hover:decoration-[var(--color-navy)]"
                >
                  Back to Activating Your Creativity
                </Link>
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
