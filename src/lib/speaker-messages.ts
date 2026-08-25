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
  /** Omitted for an unnamed attendee, where there is no title to print. */
  role?: string
}

/**
 * One block of a message page's description.
 *
 * This was a plain `string[]` of paragraphs until 2026-08-24, when Michele
 * delivered full descriptions for four of the messages and two of them carry
 * a sub-heading and a bulleted list. A block list keeps that structure in the
 * data instead of smuggling markup into a string.
 *
 * `termed` on a list means each item is written "Term: what it means"; the
 * renderer splits on the FIRST colon and sets the term in semibold, so a
 * scannable list stays scannable. An item with no colon renders whole.
 */
export type MessageBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'list'; items: string[]; termed?: boolean }

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

/**
 * A second offering that travels under the same keynote.
 *
 * Not just more body copy: it is a distinct workshop with its own audience,
 * which is why it is a field of its own rather than more blocks appended to
 * `body`. The message page renders it as a separate section on its own
 * ground, so a reader sees at a glance that it is related but distinct.
 *
 * `tagline` is one short line under the heading saying who it is for. It is a
 * sentence, so it is NOT set as a tracked small-caps eyebrow; the house rule
 * reserves those for labels.
 */
export type MessageSubtopic = {
  heading: string
  tagline?: string
  body: MessageBlock[]
}

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
  body: MessageBlock[]
  /** Further offerings under this same keynote. Rendered below `body`. */
  subtopics?: MessageSubtopic[]
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
    // Michele's full description, 2026-08-24, verbatim bar the em dashes she
    // asked to have taken out (after "Releasing Generations" and after "her
    // calling", both now commas). It supersedes the short paragraph that was
    // here and carries every fact that one did, the decade of delivery
    // included, so nothing is held back.
    body: [
      {
        kind: 'paragraph',
        text: 'The distance between a God-given dream and a courageous "yes" often feels like an insurmountable chasm. In her signature keynote, Michele pulls back the curtain on the raw, unfiltered story of founding Releasing Generations, confronting the paralyzing fears, overcoming the false starts, and capturing the exact moment she stopped dreaming about her calling and started walking in it. For over a decade at conferences, churches, and leadership events, this transformative message has awakened audiences to the "more" God has waiting for them. You won’t just walk away inspired; you will leave equipped with a clear, practical framework to step into your own brave purpose and live it out loud.',
      },
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
    // Michele's full description, 2026-08-24, verbatim bar the em dashes she
    // asked to have taken out (after "season" and after "nudge", both commas).
    body: [
      {
        kind: 'paragraph',
        text: 'Deep within you lies a treasure chest of dormant dreams, waiting to be discovered, uncovered, and reclaimed for a world in desperate need of what you carry. In this high-impact keynote, Michele invites audiences on a sacred treasure hunt to unearth the God-sized vision within them and step into a reality bigger than their history, their fears, or their "what-ifs." Perfect for anyone standing at the threshold of a new season, whether you are holding a quiet whisper or a persistent nudge, this message expands your faith, breaks off limitation, and equips you to embrace the extraordinary possibilities God has waiting on the other side of your trust.',
      },
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
    // Michele's full description, 2026-08-24, verbatim bar the em dash after
    // "artists", now a comma. Her closing paragraph absorbs the Rethink
    // Creativity count that used to sit here as a separate line, so that line
    // is gone rather than printed twice.
    body: [
      {
        kind: 'paragraph',
        text: 'You are purposefully crafted by the Ultimate Creator to create. In this dynamic, eye-opening message, Michele shatters the myth that creativity belongs only to artists, revealing how every individual possesses a reservoir of creative genius waiting to be unlocked in their unique sphere of influence. When you align your mind with God’s unlimited imagination, the impossible becomes achievable: breakthrough solutions emerge, system-level transformation takes root, and miracles happen.',
      },
      {
        kind: 'paragraph',
        text: 'Imagine the ripple effect of stepping into your divine capacity:',
      },
      {
        kind: 'list',
        items: [
          'What if a new family tradition impacts generations to come?',
          'What if a single song ignites a person’s lifelong purpose?',
          'What if an innovative system revolutionizes your entire organization?',
          'What if your boldest idea solves a deeply rooted community problem?',
          'What if your movement or art imparts supernatural hope to the broken?',
          'What if your creative solution unlocks relief for those in desperate need?',
        ],
      },
      {
        kind: 'paragraph',
        text: 'Whether you lead in business, education, ministry, or the arts, this message will awaken your imagination, break off creative blocks, and empower you to respond to the high calling of creating with God. She has led four Rethink Creativity conferences on this theme.',
      },
    ],
    // Second offering under this keynote, added 2026-08-24. Michele's text is
    // verbatim; the only change she asked for was the em dash after
    // "God-sized dreams", now a comma. Nothing above this line was touched.
    subtopics: [
      {
        heading: 'Ways to Nurture Creativity and Dreaming Big in Your Home',
        tagline: 'A curated sub-topic for parents.',
        body: [
          {
            kind: 'paragraph',
            text: 'How do we inspire our children to harbor God-sized dreams, and give them the courage to pursue them? Every child carries a reservoir of divine creativity that includes and extends far beyond the traditional arts, waiting to be awakened in problem-solving, leadership, innovation, and design. In this empowering workshop, Michele equips parents with practical, spiritual keys to nurture their children’s unique gifts without imposing limitations on what is possible.',
          },
          {
            kind: 'paragraph',
            text: 'Parents will walk away equipped to partner with God’s unlimited imagination, learn how to unearth the hidden dreams inside their children’s hearts, and build a household culture where big dreams are celebrated and released. When we awaken creativity in the next generation, we empower them to generate innovative solutions that transform the world around them.',
          },
          {
            kind: 'paragraph',
            text: 'In this workshop, parents will discover how to:',
          },
          {
            kind: 'list',
            termed: true,
            items: [
              'Awaken Latent Creativity: Expand your child’s understanding of creative expression across all areas of life.',
              'Nurture God-Sized Dreams: Unearth the unique passions inside your child’s heart and help them dream without limits.',
              'Release Potential: Remove subtle boundaries and foster the confidence needed to make a lasting, real-world impact.',
            ],
          },
        ],
      },
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
    // Michele's full description, 2026-08-24, verbatim. Her closing line
    // states the delivery formats, so the separate "taught at conferences, in
    // an eight-hour workshop format, and inside an e-course" line that used to
    // sit here is gone rather than saying the same thing twice.
    body: [
      {
        kind: 'paragraph',
        text: 'How do we build an environment where the next generation doesn’t just inherit our faith, but encounters a living God for themselves? In this highly interactive experience, Michele equips parents, ministry teams, and church leaders with practical, supernatural keys to cultivate a resilient, deep-rooted, and fully alive Kingdom culture in their homes and communities.',
      },
      {
        kind: 'paragraph',
        text: 'Rather than training youth to simply be the "church of tomorrow," this message empowers young people to hear the voice of the Holy Spirit, walk in intimacy with Him, and minister in power alongside adults today.',
      },
      { kind: 'heading', text: 'Core Activation Topics' },
      {
        kind: 'list',
        termed: true,
        items: [
          'Discerning God’s Voice: Cultivating real-time intimacy and conversation with the Spirit',
          'Heart Wholeness & Identity: Rooting young lives in their true standing in Christ',
          'Relational Evangelism: Sharing faith naturally through love and supernatural encounters',
          'Generational Leadership: Unlocking spiritual authority and leadership in youth',
        ],
      },
      {
        kind: 'paragraph',
        text: 'Available as an immersive keynote, a comprehensive 8-hour hands-on workshop, or a self-paced digital course.',
      },
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
      // Added 2026-08-24. Michele sent two attendee quotes and called them A
      // and B; A is already on the home page, so this is B and it lives here
      // so the same words are never on two pages. No name and no title: it
      // came in unattributed, and inventing either would be inventing a
      // testimonial. Leave `role` off unless she supplies one.
      {
        quote:
          'Michele’s words touched our hearts, stirred our emotions, and challenged us to take action! I gained ways to encourage our children to be bold, to minister to others, to pray and to demonstrate love. I received tools we can pass on to our own children to show God’s love!',
        name: 'Workshop attendee',
      },
      // ################### TODO: five more endorsers ###################
      // Michele named these five for this message and their quotes have NOT
      // been captured yet, so none of them is stubbed in below. Adding a name
      // without its words would put an empty testimonial on the page.
      //
      //   Allen Cardines, Russell Higa, Charis Chinen, Megan Junge,
      //   Damon Gohata
      //
      // When the text arrives, append each as a normal entry above this
      // comment and the section grows on its own. Endorser wording is
      // verbatim and is never edited.
      // #################################################################
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
    // Michele's full description, 2026-08-24, verbatim. Her source carries no
    // em dash, so nothing was restructured. It supersedes the short paragraph
    // that was here, including the "gain practical keys to build strong
    // emotional connections within your family" sentence she had added to the
    // front of it the day before: her longer text makes the same point in its
    // own words. That sentence still opens the CARD teaser, which is
    // deliberate and unchanged.
    body: [
      {
        kind: 'paragraph',
        text: 'Your child’s heart has a door, and as a parent, you hold the key. We all long to shape, guide, and speak into the lives of our children, yet every parent encounters seasons of feeling disconnected or unsure how to reach them. In this transformative message, Michele empowers parents to build deep emotional connections and become a safe haven their children instinctively run toward.',
      },
      {
        kind: 'paragraph',
        text: 'Through relatable stories and practical framework, you will learn how to unlock your child’s heart, discovering how to validate complex feelings, speak their unique love language, diffuse conflict with grace, and turn everyday interactions into lasting deposits of trust that last a lifetime.',
      },
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
    // Michele's full description, 2026-08-24, verbatim. The only change she
    // asked for was the em dash in "who God created you to be, free from
    // pride", now a comma.
    //
    // It replaces the whole paragraph that was here, and that DELIBERATELY
    // drops "She walks women through the truth of their identity in Christ,
    // the healing God offers, and the joy-filled freedom Christ gives", the
    // sentence she had added the day before. Her call: the new text covers
    // the same ground at length, so keeping the older line would say it
    // twice. The sentence is not lost from the site, it still closes the CARD
    // teaser on /speaker, which is unchanged.
    body: [
      {
        kind: 'paragraph',
        text: 'For too many women, hidden struggles with self-worth, unresolved pain, and quiet insecurity hold back the brilliant calling God has placed on their lives. Rooted in her own journey of transformation and years of ministering to faith communities, Michele brings a powerful, liberating message designed to break off limitation and elevate women into their true identity in Christ.',
      },
      {
        kind: 'paragraph',
        text: 'In this uplifting and deeply restorative message, Michele walks women through the healing truth of who they are, guiding them to see and embrace their worth through God’s eyes. Audiences are empowered to step out of passivity, celebrate their divine value in a healthy, holy way, and step boldly into their purpose with unshakeable confidence, freedom, and joy.',
      },
      { kind: 'heading', text: 'Key Takeaways for Women' },
      {
        kind: 'list',
        termed: true,
        items: [
          'Rooted Identity: Dismantle the lies of worthlessness and insecurity by anchoring your heart in God’s divine estimation of you.',
          'Holy Self-Value: Learn to honor and celebrate who God created you to be, free from pride, comparison, or shame.',
          'Unstoppable Freedom: Overcome spiritual and emotional blocks to walk out your unique calling with passion and courage.',
        ],
      },
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
      { kind: 'paragraph', text: 'For youth and adults of all ages who are ready to grow in their two-way relationship with God, this workshop builds faith through testimony, teaches discernment, and gives each participant practical activities to hear God’s voice in real time. Be prepared to encounter God in this time.' },
      { kind: 'paragraph', text: 'Beyond the ways most Christians know God speaks (through Scripture, sermons, music), Michele opens the door to the other ways God is already speaking: through a thought, a vision, a picture, a circumstance.' },
      { kind: 'paragraph', text: 'Michele also unpacks the invitation of 1 Corinthians 14:1 ("eagerly desire spiritual gifts, especially the gift of prophecy"), helping listeners grow the prophetic in their homes, their churches, and the encouragement they bring to others.' },
      { kind: 'paragraph', text: 'Delivered for children, teens, families, ministry teams, and pastors. Watching people realize "I can hear God’s voice" is what keeps Michele coming back to this one.' },
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
