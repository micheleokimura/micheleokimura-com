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
      'You were purposefully created by the Creator to create. Michele expands the definition of creativity to reach anyone who has ever felt unqualified.',
    accent: 'navy',
    texture: 'grid',
    icon: 'palette',
    body: [
      'You were purposefully created by the Creator to create. Moving far beyond traditional fine arts, Michele expands the definition of creativity to reach anyone who has ever felt unqualified. This message equips audiences to rise beyond their insecurities, giving them permission to bring their unique ideas, businesses, and extraordinary solutions into the light. She has led four Rethink Creativity conferences on this theme, activating people in every sphere of influence.',
    ],
    nonFaith: true,
  },
  {
    slug: 'building-a-kingdom-culture',
    number: '04',
    title: 'Building a Kingdom Culture at Home and in Ministry',
    cardTitle: 'Building a Kingdom Culture',
    teaser:
      'How do we shape environments that foster a resilient, deep-rooted, fully alive faith in our children and youth? Michele offers a highly interactive experience for parents and leaders.',
    accent: 'gold',
    texture: 'dots',
    icon: 'house',
    body: [
      'How do we shape environments that foster a resilient, deep-rooted, fully alive faith in our children and youth? Drawing on decades of experience, Michele offers a highly interactive experience for parents and leaders. Through engaging stories and interactive activities, she helps you build homes and healing, positive spaces for the younger saints where the next generation experiences God as undeniably real, personal, and worthy of their entire lives. Taught at conferences, in an eight-hour workshop format, and inside an e-course.',
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
      "Your child's heart has a door, and you hold the key. Michele equips parents to become the safe haven their children run toward.",
    accent: 'violet',
    texture: 'lines',
    icon: 'heart',
    body: [
      'Your child’s heart has a door, and you hold the key. In this transformative workshop, Michele equips parents to become the safe haven their children run toward. Through real-life storytelling, you will gain practical keys to validate feelings, speak unique love languages, turn everyday interactions into lasting deposits of trust, and more.',
    ],
  },
  {
    slug: 'identity-healing-and-brave-purpose',
    number: '06',
    title:
      'Identity, Healing, and Walking in the Fullness of Who God Made You with Brave Purpose',
    cardTitle: 'Identity, Healing, and Brave Purpose',
    teaser:
      'A message Michele is often invited to bring in women’s ministry settings and churches. She walks women through the truth of their identity in Christ, and the healing God offers.',
    accent: 'teal',
    texture: 'rings',
    icon: 'sunrise',
    body: [
      'A message Michele is often invited to bring in women’s ministry settings and churches. She walks women through the truth of their identity in Christ, and the healing God offers for the trauma, wounds, and hindrances that quietly hold them back from walking in confidence and joy. Rooted in her own journey and years of ministering to women in faith communities.',
    ],
  },
  {
    slug: 'how-to-hear-gods-voice',
    number: '07',
    title: 'How to Hear God’s Voice',
    teaser:
      'For children, youth, and adults ready to grow their two-way relationship with God. This workshop teaches discernment, builds faith through testimony, and gives every participant practical activities to practice hearing God’s voice in real time.',
    accent: 'coral',
    texture: 'grid',
    icon: 'waveform',
    body: [
      'For children, youth, and adults ready to grow their two-way relationship with God. Beyond the ways most Christians know God speaks (through Scripture, sermons, music), Michele opens the door to the other ways God is already speaking: through a thought, a vision, a picture, a circumstance. This workshop teaches discernment, builds faith through testimony, and gives every participant practical activities to practice hearing God’s voice in real time.',
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
