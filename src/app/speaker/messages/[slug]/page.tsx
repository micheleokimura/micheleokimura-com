import type { Metadata } from 'next'
import { Fragment } from 'react'
import Image from 'next/image'
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
  type MessageBlock,
  type MessageInlineImage,
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
 * ALL SEVEN now carry Michele's full description, delivered 2026-08-24. None
 * is running on placeholder copy any more, and the card teasers on /speaker
 * are deliberately shorter than these rather than out of date.
 *
 * What is still missing is material, not words. Four of the seven carry no
 * endorsement at all, and five more endorsers are
 * named for kingdom-culture whose quotes have not been captured; see the TODO
 * in src/lib/speaker-messages.ts. On material: brave-purpose now opens with
 * a licensed stock clip, added 2026-08-24, and the `video` field on
 * SpeakerMessage is there for the other six. Still absent everywhere are a
 * photograph, a run sheet, and a technical rider. Michele has that material;
 * it has not been collected. The layout leaves room for it between the
 * description and the CTA.
 * ##################################################################
 */

/**
 * Renders a message's description blocks. Shared by the description itself and
 * by each sub-topic underneath it, so both lay out identically.
 *
 * Index is a safe React key here: these arrays are static content in
 * src/lib/speaker-messages.ts and are never reordered or filtered.
 */
function BodyBlocks({
  blocks,
  inlineImage,
}: {
  blocks: MessageBlock[]
  inlineImage?: MessageInlineImage
}) {
  // The supporting photograph is spliced BETWEEN blocks, at the break the
  // writer picked, rather than appended after the copy. 3:2 and the width of
  // the measure, so it reads as supporting the sentence above it; the hero is
  // 16:9 and wider, so it reads as the page.
  const plate = (index: number) =>
    inlineImage && inlineImage.afterBlock === index + 1 ? (
      <figure className="relative mt-10 aspect-[3/2] w-full overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-[var(--color-navy-10)] sm:mt-12">
        <Image
          src={inlineImage.src}
          alt={inlineImage.alt}
          fill
          sizes="(min-width: 768px) 48rem, 100vw"
          className="object-cover"
        />
      </figure>
    ) : null

  return (
    <>
      {blocks.map((block, index) => {
        if (block.kind === 'heading') {
          return (
            <Fragment key={index}>
              <h2 className="font-display mt-10 text-xl font-semibold tracking-tight text-neutral-950 first:mt-0 sm:text-2xl">
                {block.text}
              </h2>
              {plate(index)}
            </Fragment>
          )
        }

        if (block.kind === 'list') {
          return (
            // A termed list gets more air between items than a plain one: its
            // items are a bold label plus a sentence and usually wrap to two
            // lines, so at the tighter spacing the rows start running together.
            // A plain list of one-line items does not have that problem and
            // stays as it was.
            <Fragment key={index}>
            <ul
              role="list"
              className={`mt-6 first:mt-0 ${
                block.termed ? 'space-y-5' : 'space-y-3'
              }`}
            >
              {block.items.map((item) => {
                // A termed list is written "Term: what it means". Split on the
                // FIRST colon only, so a colon later in the sentence stays in
                // the sentence. An item with no colon renders whole.
                const at = block.termed ? item.indexOf(': ') : -1
                const term = at > -1 ? item.slice(0, at) : null
                const rest = at > -1 ? item.slice(at + 2) : item

                return (
                  <li
                    key={item}
                    className="relative pl-6 text-lg leading-8 text-neutral-600"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.7em] left-0 h-1.5 w-1.5 rounded-full bg-[var(--color-brand-terracotta)]"
                    />
                    {term && (
                      <span className="font-semibold text-neutral-950">
                        {term}:{' '}
                      </span>
                    )}
                    {rest}
                  </li>
                )
              })}
            </ul>
            {plate(index)}
            </Fragment>
          )
        }

        return (
          <Fragment key={index}>
            <p className="mt-6 text-lg leading-8 text-neutral-600 first:mt-0">
              {block.text}
            </p>
            {plate(index)}
          </Fragment>
        )
      })}
    </>
  )
}

/**
 * Escapes Container's inner max-w-2xl cap so the hero can run the full width
 * of the page gutter. Same constant, same reason, as /speaker.
 */
const WIDE = 'mx-auto max-w-7xl px-6 lg:px-8'

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
        media={
          message.hero ? (
            // 4:3 rather than the 16:9 this photograph used to run at. At
            // 380px wide a widescreen plate is only 214px tall and reads as a
            // strip beside a 48px headline; 4:3 holds its own next to the
            // type. Deep violet underneath covers the moment before it paints.
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--color-speaker-deep)] shadow-lg shadow-black/25 ring-1 ring-white/15">
              <Image
                src={message.hero.src}
                alt={message.hero.alt}
                fill
                priority
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 360px, 320px"
                className="object-cover"
                style={{ objectPosition: message.hero.focal ?? 'center' }}
              />
            </div>
          ) : undefined
        }
      />

      {/* The description sits on the message's OWN ground: a pale tint
          sampled from its hero photograph, so picture and page read as one
          thing. See MessageHero in src/lib/speaker-messages.ts for the
          sampling and the measured contrast. A message with no photograph
          keeps the violet wash, which is /speaker's own colour. */}
      <section
        className={`w-full py-14 sm:py-24 lg:py-28 ${
          message.hero ? '' : 'surface-violet-wash'
        }`}
        style={
          message.hero ? { backgroundColor: message.hero.wash } : undefined
        }
      >
        {/* The photograph used to run here, full width, in its own band. It
            moved up into the banner on 2026-08-24: it was pushing the body
            copy most of a screen down while the banner above it sat half
            empty. The body starts immediately now. */}

        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              {message.video && (
                // Above the copy, deliberately. The clip sets the image the
                // keynote runs on before a word of it is read.
                //
                // The source is silent, so this behaves like the home page
                // hero: autoplay, muted, looping, inline on iOS. No controls,
                // because there is nothing to hear and nothing to seek to.
                // Navy underneath covers the moment before the poster paints.
                <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[var(--color-navy)] sm:mb-12">
                  <video
                    src={message.video.src}
                    poster={message.video.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={message.video.description}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              )}

              <BodyBlocks
                blocks={message.body}
                inlineImage={message.inlineImage}
              />

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

      {/* ------------------------------------------------------ sub-topics */}
      {/* A further offering under the same keynote, on its own ground so a
          reader sees at a glance that it is related but distinct. band-3 is
          the warmest of the three neutrals and the description above resolves
          to band-1, so the shade change carries the separation on its own; the
          short rule above the heading is what says "a new offering starts
          here" rather than "the same one continues".

          The rule is coral-TEXT, not coral. Coral #F15C3D measures 2.87:1 on
          band-3 and misses even the 3:1 a non-text element owes, so it would
          be a marker nobody can see. coral-text holds 4.72:1 here. */}
      {message.subtopics?.map((subtopic) => (
        <section
          key={subtopic.heading}
          aria-label={subtopic.heading}
          className="w-full bg-[var(--color-band-3)] py-14 sm:py-24 lg:py-28"
        >
          <Container>
            <FadeIn>
              <div className="max-w-3xl">
                <span
                  aria-hidden="true"
                  className="block h-1 w-12 rounded-full bg-[var(--color-brand-terracotta-ink)]"
                />
                <h2 className="font-display mt-6 text-3xl leading-[1.18] font-semibold tracking-tight text-balance text-neutral-950 sm:text-4xl">
                  {subtopic.heading}
                </h2>
                {subtopic.tagline && (
                  <p className="mt-4 text-base text-neutral-500">
                    {subtopic.tagline}
                  </p>
                )}

                <div className="mt-8">
                  <BodyBlocks blocks={subtopic.body} />
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>
      ))}

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
                <h2 className="font-display text-3xl leading-[1.18] font-semibold tracking-tight text-neutral-950">
                  What people say about this message
                </h2>

                {message.endorsementsNote && (
                  <p className="mt-4 text-base text-neutral-500 italic">
                    {message.endorsementsNote}
                  </p>
                )}

                <div className="mt-10 space-y-10">
                  {message.endorsements.map((item) => (
                    <figure
                      key={item.name}
                      className="border-l-2 border-[var(--color-cta)] pl-6"
                    >
                      <blockquote className="text-lg leading-[1.6] text-neutral-700 italic">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                      {/* `role` is optional: one endorsement came in from an
                          unnamed workshop attendee with no title attached, and
                          an empty line under the name would read as a missing
                          field rather than as a deliberate omission. */}
                      <figcaption className="mt-4 text-base text-neutral-500">
                        <span className="font-semibold text-neutral-950">
                          {item.name}
                        </span>
                        {item.role && <span className="block">{item.role}</span>}
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
          {/* Recording of the message, when there is one. It sits above the
              CTA on purpose: a reader watches Michele deliver it and then has
              the enquiry button directly underneath. Same treatment as the
              embed on an author book page, and the same reasoning behind it
              (see VideoEmbed in src/app/author/books/[slug]/page.tsx): no
              visible label, `rel=0` to keep the end screen off other people's
              channels, no autoplay, and lazy so it costs nothing until it
              scrolls into view. The iframe keeps its `title` for screen
              readers. */}
          {message.youtube && (
            <FadeIn>
              <div className="mb-14 w-full max-w-[52rem] sm:mb-20">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-[var(--color-navy-10)]">
                  <iframe
                    src={`https://www.youtube.com/embed/${message.youtube.id}?rel=0`}
                    title={message.youtube.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              </div>
            </FadeIn>
          )}

          <FadeIn>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl leading-[1.18] font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                Interested in this message for your event?
              </h2>
              <p className="mt-5 text-lg leading-[1.6] text-neutral-600 sm:text-xl">
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
