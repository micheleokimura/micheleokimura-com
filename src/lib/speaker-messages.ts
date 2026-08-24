/**
 * Michele's speaking messages, and the single source for both the tiles on
 * /speaker and the message pages at /speaker/messages/[slug].
 *
 * COPY OF RECORD: site/content/speaker/speaker-page-copy.md, locked with
 * Michele 2026-08-22. `body` is her wording from that file, unedited.
 * `teaser` is the only derived field: it is one or two sentences lifted from
 * `body`, trimmed of a subordinate clause where one made the sentence too
 * long for a tile. Nothing in a teaser says anything `body` does not.
 *
 * ENDORSEMENTS ARE VERBATIM and are never edited, including any phrasing the
 * house voice guide would otherwise avoid. They moved off the index page on
 * 2026-08-23 (Michele: the page was too long to scan) and now appear only on
 * the message each one is about.
 *
 * `cardTitle` is an optional short label for the 3-up grid, used where the
 * real title runs too long to scan at tile width. The full `title` is what
 * the message page and every heading show.
 *
 * ####################### NEEDS MICHELE ############################
 * Two cardTitles below are my shortenings of her own titles, not hers:
 * "Building a Kingdom Culture" and "Identity, Healing, and Brave Purpose".
 * They need her sign-off or her own shorter wording. Delete the field and
 * the tile falls back to the full title.
 *
 * "Heart Wide Open" came off this list on 2026-08-24. It is no longer a
 * shortening of anything: Michele rewrote that message's name herself, and
 * it is now the `subtitle` under a main line she wrote.
 * ##################################################################
 */

export type Endorsement = {
  quote: string
  name: string
  role: string
}

/**
 * Card colour on the /speaker grid. Each one is a Michele palette hue taken
 * down until white clears AA on it; the raw hexes cannot carry white text.
 * Violet is the Speaker hero's own colour. Defined as `.msg-<accent>` in
 * tailwind.css, where the measured contrast lives.
 *
 * Assign so that no two cards touching in the 3-up grid share an accent.
 */
export type MessageAccent = 'teal' | 'coral' | 'gold' | 'navy' | 'violet'

/** Hairline pattern behind the colour. Neighbours never share one either. */
export type MessageTexture = 'lines' | 'rings' | 'grid' | 'dots'

/**
 * Which lucide-react icon the card shows. Kept as a string rather than a
 * component so this file stays a plain .ts module; the map from name to
 * component is ICONS in src/app/speaker/page.tsx. Every name below is
 * verified against the installed lucide-react (note it exports `House`, not
 * `Home`, and has no `Waves`).
 */
export type MessageIcon =
  | 'compass'
  | 'sparkles'
  | 'palette'
  | 'house'
  | 'heart'
  | 'sunrise'
  | 'waveform'

export type SpeakerMessage = {
  slug: string
  number: string
  title: string
  /**
   * Secondary line under the title, on the card AND on the message page.
   *
   * This is for a message that has both a NAME and a promise, where the
   * promise is what a reader is actually scanning for. "Heart Wide Open" was
   * the whole title until 2026-08-24; Michele flipped it so the card leads
   * with "Build a Strong Connection with Your Child" and the programme name
   * sits underneath in smaller, lighter type. Metadata and schema still get
   * both, joined as "<subtitle>: <title>", so the name stays searchable.
   */
  subtitle?: string
  /** Short label for the tile grid. Falls back to `title` when absent. */
  cardTitle?: string
  /** One or two sentences, trimmed from `body`. Shown on the tile only. */
  teaser: string
  accent: MessageAccent
  texture: MessageTexture
  icon: MessageIcon
  body: string[]
  /** Shown when the message also travels without the faith framing. */
  nonFaith?: boolean
  /** Context the reader needs before the endorsements underneath. */
  endorsementsNote?: string
  endorsements?: Endorsement[]
}

export const SPEAKER_MESSAGES: SpeakerMessage[] = [
  {
    slug: 'finding-your-brave-purpose',
    number: '01',
    title: 'Finding Your Brave Purpose',
    teaser:
      'The leap from a God-given dream to a courageous "yes" can feel impossible. Audiences leave with a teachable, practical framework to finally step into their own brave purpose.',
    accent: 'teal',
    texture: 'lines',
    icon: 'compass',
    body: [
      'The leap from a God-given dream to a courageous "yes" can feel impossible. In her signature keynote, Michele shares the raw, true story of founding Releasing Generations: the initial fears, the false starts, and the exact moment she stopped talking about her calling and started walking in it. Audiences leave with a teachable, practical framework to finally step into their own brave purpose. Delivered at churches, conferences, and leadership events for over a decade.',
    ],
  },
  {
    slug: 'dreaming-big-with-god',
    number: '02',
    title: 'Dreaming Big With God',
    teaser:
      "God's vision for your life is beautifully larger than the one you are comfortable praying for. This message expands your faith to embrace what is truly possible.",
    accent: 'coral',
    texture: 'rings',
    icon: 'sparkles',
    body: [
      'God’s vision for your life is beautifully larger than the one you are comfortable praying for. Perfect for audiences standing at the threshold of a new season, Michele explores how to surrender your fears, your history, and your "what-ifs" to God. Whether you are carrying a quiet dream or feeling a persistent nudge, this message expands your faith to embrace what is truly possible.',
    ],
    nonFaith: true,
    endorsements: [
      {
        quote:
          'Michele was able to rekindle and inspire the need and desire to reignite and inspire our Leadership Team that it is never too late to become a ‘dreamer’ and make a positive impact and difference in the world.',
        name: 'Gerald Teramae',
        role: 'Head of School, Island Pacific Academy',
      },
    ],
  },
  {
    slug: 'activating-your-creativity',
    number: '03',
    title: 'Activating Your Creativity',
    teaser:
      'You are purposely created by the creator to create. Michele expands the definition of creativity, connecting to every sphere of influence in a person’s life. Everyone is a creative genius. Learn why.',
    accent: 'navy',
    texture: 'grid',
    icon: 'palette',
    body: [
      // Michele's approved rewrite, 2026-08-24, verbatim. It replaced a
      // longer paragraph. The Rethink Creativity count below is the one fact
      // that paragraph carried which hers does not, so it is kept as its own
      // line rather than dropped silently.
      'You are purposely created by the creator to create. Michele expands the definition of creativity, connecting to every sphere of influence in a person’s life. Everyone is a creative genius. Learn why.',
      'She has led four Rethink Creativity conferences on this theme.',
    ],
    nonFaith: true,
  },
  {
    slug: 'building-a-kingdom-culture',
    number: '04',
    title: 'Building a Kingdom Culture at Home and in Ministry',
    cardTitle: 'Building a Kingdom Culture',
    teaser:
      'How do we shape a culture that fosters a resilient, deep-rooted, fully alive faith in our children and youth? Michele offers a highly interactive experience for parents and leaders, imparting keys to transformation.',
    accent: 'gold',
    texture: 'dots',
    icon: 'house',
    body: [
      // Michele's approved rewrite, 2026-08-24, verbatim. The delivery
      // formats below are what the replaced paragraph carried that hers does
      // not, and an event organiser needs them, so they stay.
      'How do we shape a culture that fosters a resilient, deep-rooted, fully alive faith in our children and youth? Michele offers a highly interactive experience for parents and leaders, imparting keys to transformation.',
      'Taught at conferences, in an eight-hour workshop format, and inside an e-course.',
    ],
    endorsementsNote:
      'The endorsements below are from Michele’s Kingdom Kids Workshops, the flagship workshop within this topic. Same content, previously offered under that title.',
    endorsements: [
      {
        quote:
          'The Kingdom Kids Workshop has been the single most powerful equipping workshop for the parents and children’s ministry workers in our church. It gave them practical tools, and it imparted a living and powerful love and excitement for God.',
        name: 'Cal Chinen',
        role: 'Senior Pastor, Moanalua Gardens Missionary Church, Honolulu',
      },
      {
        quote:
          'Our experience with Kingdom Kids was amazing. Michele’s ministry sparked and stirred the faith of our entire church. Her creative, innovative, inspired approach enabled our children and youth to experience biblical truths and the Lord Himself in a very powerful way.',
        name: 'Barry Deguchi',
        role: 'Lead Pastor, Catalyst Christian Community, Long Beach, CA',
      },
      {
        quote:
          'Her creative and visually-exciting presentations have challenged us and our students to directly download from the Father Heart of God. We are now seeing children as young as five praying bold and encouraging words over other children and even their teachers. Our entire campus culture has changed. Our school will never be the same.',
        name: 'Rebecca Furuhashi',
        role: 'Principal, Christian Academy',
      },
    ],
  },
  {
    slug: 'heart-wide-open',
    number: '05',
    // Flipped 2026-08-24 at Michele's instruction. It was
    // "Heart Wide Open: Building a Strong Connection with Your Child", one
    // long line led by the programme name. The promise leads now and the name
    // is the secondary line. `cardTitle` came off with it: the new main line
    // is already short enough for a card, so there is nothing to shorten.
    // The slug does NOT change, so every existing link still resolves.
    title: 'Build a Strong Connection with Your Child',
    subtitle: 'Heart Wide Open',
    teaser:
      'Gain practical keys to build strong emotional connections within your family. Your child’s heart has a door, and you hold the key. Michele equips parents to become the safe haven their children run toward.',
    accent: 'violet',
    texture: 'lines',
    icon: 'heart',
    body: [
      'Gain practical keys to build strong emotional connections within your family. Your child’s heart has a door, and you hold the key. In this transformative workshop, Michele equips parents to become the safe haven their children run toward. Through real-life storytelling, you will gain practical keys to validate feelings, speak unique love languages, turn everyday interactions into lasting deposits of trust, and more.',
    ],
  },
  {
    slug: 'identity-healing-and-brave-purpose',
    number: '06',
    title:
      'Identity, Healing, and Walking in the Fullness of Who God Made You with Brave Purpose',
    cardTitle: 'Identity, Healing, and Brave Purpose',
    teaser:
      'A message Michele is often invited to bring in women’s ministry settings and churches. She walks women through the truth of their identity in Christ, the healing God offers, and the joy-filled freedom Christ gives.',
    accent: 'teal',
    texture: 'rings',
    icon: 'sunrise',
    body: [
      // Michele's approved sentence, 2026-08-24, closes this. She asked for
      // it to be ADDED at the end, but it is a rewrite of the sentence that
      // already sat there, so appending it would have opened two consecutive
      // sentences with "She walks women through the truth of their identity
      // in Christ". The superseded sentence came out instead, which also
      // drops "for the trauma, wounds, and hindrances that quietly hold them
      // back from walking in confidence and joy". Flagged to her; restore it
      // as its own sentence if she wants it back.
      'A message Michele is often invited to bring in women’s ministry settings and churches, rooted in her own journey and years of ministering to women in faith communities. She walks women through the truth of their identity in Christ, the healing God offers, and the joy-filled freedom Christ gives.',
    ],
  },
  {
    slug: 'how-to-hear-gods-voice',
    number: '07',
    title: 'How to Hear God’s Voice',
    teaser:
      'For youth and adults of all ages who are ready to grow in their two-way relationship with God, this workshop builds faith through testimony, teaches discernment, and gives each participant practical activities to hear God’s voice in real time. Be prepared to encounter God in this time.',
    accent: 'coral',
    texture: 'grid',
    icon: 'waveform',
    body: [
      // Michele's approved rewrite, 2026-08-24, verbatim. The "beyond the
      // ways most Christians know God speaks" line below is what the replaced
      // paragraph carried that hers does not, and it is the substance of the
      // workshop, so it stays as its own paragraph.
      'For youth and adults of all ages who are ready to grow in their two-way relationship with God, this workshop builds faith through testimony, teaches discernment, and gives each participant practical activities to hear God’s voice in real time. Be prepared to encounter God in this time.',
      'Beyond the ways most Christians know God speaks (through Scripture, sermons, music), Michele opens the door to the other ways God is already speaking: through a thought, a vision, a picture, a circumstance.',
      'Michele also unpacks the invitation of 1 Corinthians 14:1 ("eagerly desire spiritual gifts, especially the gift of prophecy"), helping listeners grow the prophetic in their homes, their churches, and the encouragement they bring to others.',
      'Delivered for children, teens, families, ministry teams, and pastors. Watching people realize "I can hear God’s voice" is what keeps Michele coming back to this one.',
    ],
    endorsements: [
      {
        quote:
          'She just did a session at Native Camp in Montana and it was excellent, the most impactful session of the whole camp. We had 19 FMI workers there. Every person had an experience of how to prophesy over each other. Simple, practical, and powerful. I saw it all personally. Now many children in our church prophesy and unashamedly pray for healing, all because of Michele.',
        name: 'Pastor Kihāpiʻilani Pimental',
        role: 'Worker Supervisor, Foursquare Missions International',
      },
    ],
  },
]

export function getSpeakerMessage(slug: string): SpeakerMessage | undefined {
  return SPEAKER_MESSAGES.find((message) => message.slug === slug)
}

/**
 * The one-string form of a message's name, for a <title> tag, an og:title, or
 * a schema `name`. A message with a secondary line reads "<subtitle>: <title>"
 * here, which is the order its title was written in before the card layout
 * flipped it. The visual layering is a reading decision for the card and the
 * banner; a search result or a knowledge panel still wants the programme name
 * first, because that is the string people search for.
 */
export function speakerMessageFullTitle(message: SpeakerMessage): string {
  return message.subtitle
    ? `${message.subtitle}: ${message.title}`
    : message.title
}
