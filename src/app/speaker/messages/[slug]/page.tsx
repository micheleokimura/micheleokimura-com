import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { BannerHero } from '@/components/BannerHero'
import { ContactTrigger } from '@/components/ContactTrigger'
import { WebPageJsonLd } from '@/components/JsonLd'
import { pageMetadata } from '@/lib/schema'
import {
  SPEAKER_MESSAGES,
  getSpeakerMessage,
  speakerMessageFullTitle,
} from '@/lib/speaker-messages'

/**
 * One page per speaking message. Created 2026-08-23, when Michele asked for
 * /speaker to become a scannable grid of tiles instead of a single long
 * stack: the full description and the endorsements for each message live
 * here now, and the tile carries only a title and a teaser.
 *
 * Everything on this page except the closing CTA comes from
 * src/lib/speaker-messages.ts, which is generated from Michele's locked copy
 * of record. There is no per-message hand-written copy in this file, so a
 * wording change is one edit in that module and never a hunt through seven
 * routes.
 *
 * ####################### PLACEHOLDER ##############################
 * These pages are deliberately thin. Four of the seven messages carry no
 * endorsement yet (see the comment where the endorsements would render) and
 * none of them carries a photograph, a video clip, a run sheet, or a
 * technical rider. Michele has that material; it has not been collected.
 * The layout leaves room for all of it between the description and the CTA.
 * ##################################################################
 */

export function generateStaticParams() {
  return SPEAKER_MESSAGES.map((message) => ({ slug: message.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const message = getSpeakerMessage(slug)

  if (!message) return {}

  // The FULL name here, "<subtitle>: <title>", not the card's layered form.
  // A tab, a search result and an og:card all want one string, and they want
  // the programme name in it.
  return pageMetadata({
    title: speakerMessageFullTitle(message),
    description: message.teaser,
    path: `/speaker/messages/${message.slug}`,
  })
}

export default async function SpeakerMessagePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const message = getSpeakerMessage(slug)

  if (!message) notFound()

  return (
    <>
      <WebPageJsonLd
        path={`/speaker/messages/${message.slug}`}
        name={speakerMessageFullTitle(message)}
        description={message.teaser}
      />

      {/* Violet banner, same as /speaker, so a message page reads as part of
          the speaking section rather than as a loose page.

          A message with a secondary line lays it out the same way its card
          does: promise on the H1, programme name underneath. BannerHero's
          `subtitle` slot is already the smaller, lighter cream line, so the
          two layouts match without a special case here. */}
      <BannerHero
        eyebrow="A message I speak on"
        title={message.title}
        subtitle={message.subtitle}
        surface="violet"
        balanceTitle={false}
      />

      <section className="surface-violet-wash w-full py-14 sm:py-24 lg:py-28">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              {message.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-6 text-lg leading-8 text-neutral-600 first:mt-0"
                >
                  {paragraph}
                </p>
              ))}

              {message.nonFaith && (
                // This note came off the /speaker index on Michele's
                // instruction and lives only here now. It is real booking
                // information for a school or a workplace, so it was moved
                // rather than deleted.
                <p className="mt-8 border-l-2 border-[var(--color-teal-30)] pl-4 text-sm text-neutral-600">
                  Also available in a non-faith framing for schools,
                  workplaces, and public events.
                </p>
              )}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ---------------------------------------------------- endorsements */}
      {/* Renders only for the three messages that have one. The other four
          get nothing at all rather than an empty heading; when Michele
          supplies more, add them to the message in
          src/lib/speaker-messages.ts and this section appears on its own. */}
      {message.endorsements && message.endorsements.length > 0 && (
        <section
          aria-label="What people say about this message"
          className="w-full bg-[var(--color-band-2)] py-14 sm:py-24 lg:py-28"
        >
          <Container>
            <FadeIn>
              <div className="max-w-3xl">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950">
                  What people say about this message
                </h2>

                {message.endorsementsNote && (
                  <p className="mt-4 text-sm text-neutral-500 italic">
                    {message.endorsementsNote}
                  </p>
                )}

                <div className="mt-10 space-y-10">
                  {message.endorsements.map((item) => (
                    <figure
                      key={item.name}
                      className="border-l-2 border-[var(--color-cta)] pl-6"
                    >
                      <blockquote className="text-base leading-7 text-neutral-700 italic">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-3 text-sm text-neutral-500">
                        <span className="font-semibold text-neutral-950">
                          {item.name}
                        </span>
                        <span className="block">{item.role}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* ------------------------------------------------------------ CTA */}
      {/* Plain band, no panel. Michele: no dark blue text boxes anywhere
          except the footer. The button opens the sitewide contact popup with
          "speaking" already ticked; there is no email address on this page
          and none is to be added. */}
      <section className="w-full bg-[var(--color-band-1)] py-14 sm:py-24 lg:py-28">
        <Container>
          <FadeIn>
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                Interested in this message for your event?
              </h2>
              <p className="mt-4 text-lg leading-8 text-neutral-600">
                Tell me about your group and the date you have in mind.
              </p>
              <div className="mt-8">
                <ContactTrigger interest="speaking">Contact</ContactTrigger>
              </div>
              <p className="mt-8 text-sm">
                <Link
                  href="/speaker"
                  className="font-semibold text-neutral-700 underline decoration-[var(--color-navy-20)] underline-offset-4 transition hover:text-neutral-950 hover:decoration-[var(--color-navy)]"
                >
                  All of my messages
                </Link>
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
