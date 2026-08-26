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

/**
 * A message page's hero photograph and the ground its copy sits on.
 *
 * `wash` is the PHOTO-DERIVED SECTION WASH convention applied per message:
 * a pale tint of a hue actually present in the photograph, so the picture and
 * the page read as one thing. The hue was sampled from each file rather than
 * guessed (histogram over 30-degree buckets, weighted by saturation and value,
 * ignoring pixels below 10% value or 15% saturation), then lifted to roughly
 * s 0.10-0.17, v 0.96 so navy body copy clears AA on it with room to spare.
 *
 * Measured on every wash below: --color-navy is 11.6:1 at worst and
 * text-neutral-600 is 6.07:1 at worst. Re-measure if you retint one.
 *
 * A caution about the sampling. Five of these six photographs are dominated by
 * warm hues because they are pictures of PEOPLE and skin sits at 10-30 degrees,
 * so a naive "take the peak" would have produced six near-identical beige
 * washes. Each wash below is a hue genuinely present in its own photo but
 * chosen to be the one that characterises it: the Milky Way's rose band rather
 * than the gold airglow beneath it, the park's green rather than the shirt.
 *
 * `focal` is the object-position for the 16:9 crop. Set it whenever the
 * subject is not dead centre, which is most of the time.
 */
export type MessageHero = {
  src: string
  alt: string
  wash: string
  focal?: string
  /**
   * Photographer credit, where the source asks for one or deserves one.
   *
   * NOT rendered anywhere yet: the site has no photo-credit surface, and alt
   * text is the wrong place for it because alt describes the picture for
   * someone who cannot see it. Recorded here so the attribution is tracked in
   * one place and displaying it later is a one-line change.
   */
  credit?: string
}

/**
 * A supporting photograph placed INSIDE the copy rather than after it.
 *
 * `afterBlock` is how many body blocks precede it, so the picture lands at a
 * narrative break the writer chose instead of being dumped at the bottom.
 * Inline images run at 3:2 and at text-column width; heroes run at 16:9 and at
 * container width. That difference is the visual grammar: a wide 16:9 plate
 * means "this is the page", a 3:2 inside the measure means "this supports the
 * sentence you just read".
 */
export type MessageInlineImage = {
  src: string
  alt: string
  afterBlock: number
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
  /** Hero photograph, and the wash its description sits on. */
  hero?: MessageHero
  /** One supporting photograph, placed at a break inside `body`. */
  inlineImage?: MessageInlineImage
  /** Further offerings under this same keynote. Rendered below `body`. */
  subtopics?: MessageSubtopic[]
  /**
   * Ambient clip that runs above the description on the message page.
   *
   * Optional, and only "Finding Your Brave Purpose" carries one so far. The
   * clips are silent, so they play the way the home page hero does: autoplay,
   * muted, looping. `description` is the text equivalent a screen reader gets.
   */
  video?: {
    src: string
    poster: string
    description: string
  }
  /**
   * A recording of the message itself, on YouTube, shown above the closing
   * CTA on the message page.
   *
   * Separate from `video` above, which is a silent ambient clip that runs at
   * the top of the page. This one is Michele on a platform, with sound, and a
   * reader watches it right before deciding whether to enquire.
   *
   * Embedded rather than re-hosted: it is Michele's own channel, and pulling
   * the file down to serve ourselves would breach YouTube's terms.
   */
  youtube?: {
    id: string
    title: string
  }
  /**
   * A produced promo film for the message, shown DIRECTLY UNDER the
   * description and above everything else on the page.
   *
   * Third and last of the three video slots, and the three are genuinely
   * different things. `video` is a silent ambient clip that runs above the
   * copy. `youtube` is a recording of Michele delivering the message, and it
   * sits at the foot of the page because a reader watches it while deciding
   * whether to enquire. This one is a piece Michele's team cut on purpose to
   * sell the message, so it wants the reader to have her framing FIRST and
   * then be shown it: her instruction on 2026-08-26 was description, then
   * video, in that order.
   *
   * `intro` is the line printed above the frame and is required, not
   * optional. A produced film dropped into a page with nothing to introduce
   * it reads as an advert that wandered in.
   *
   * Embedded rather than re-hosted, for the same reason as `youtube`.
   */
  promoVideo?: {
    id: string
    title: string
    intro: string
  }
  /**
   * A programme this keynote grows into, shown as a single card at the very
   * bottom of the message page.
   *
   * Added 2026-08-25 for "Activating Your Creativity", whose conference card
   * came off /speaker at Michele's direction. Deliberately NOT read from the
   * project registry the way the /speaker row used to be: Michele retitled
   * this one and asked for the blurb dropped, so the card carries its own
   * words and there is nothing left to keep in step with /projects.
   *
   * `blurb` is optional and currently unused. The card lays out correctly
   * without it; a future programme that needs a line of description can set
   * it rather than forcing one back onto this one.
   *
   * There is no `kicker` any more. The card carried "Conference · 2010 to
   * present" over the title until 2026-08-26, when Michele asked for the
   * eyebrow dropped outright. The date range lives on the conference page
   * itself, which is one click away.
   */
  relatedProgram?: {
    title: string
    href: string
    blurb?: string
  }
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
    // Michele's own rewrite, 2026-08-26, dropped in verbatim. It replaces the
    // single paragraph she sent on 2026-08-24 and keeps every fact that one
    // carried, the decade of delivery included, while adding the wrestling
    // with God she calls "Banter to Obedience". Two paragraphs by her choice.
    body: [
      {
        kind: 'paragraph',
        text: 'The distance between a God-given dream and a courageous "yes" can often feel impossibly wide. In her signature keynote, Michele shares the honest, unfiltered story of founding Releasing Generations. She opens up about her own paralyzing fears, the false starts, and the deep insecurities she faced when God first called her. Because we cannot see the future, we often wrestle with God before stepping into what He has for us. Michele often refers to this message as "Banter to Obedience." But more importantly, she shares the beauty of finally embracing that call, stepping out in faith, and discovering exactly what she was born to do.',
      },
      {
        kind: 'paragraph',
        text: 'For over a decade at conferences, churches, and leadership events, this message has awakened audiences to the "more" God has waiting for them. It is a faith-building journey that reveals the absolute goodness of God and His deep desire to help you fulfill your own beautiful, unique calling. You will leave encouraged, equipped, and armed with a practical framework to step into your brave purpose and live it out loud.',
      },
    ],
    // Shutterstock 1059019742, licensed. Sun breaking through a forest with
    // the camera moving toward the light, which is this keynote's own image:
    // the walk from a God-given dream to a courageous "yes". The source is a
    // silent 4K master; what ships is 1080p at about 8 MB.
    video: {
      src: '/videos/brave-purpose-keynote.mp4',
      poster: '/videos/brave-purpose-keynote-poster.jpg',
      description:
        'Sunlight breaking through the trees of a forest clearing, the camera moving slowly toward the light.',
    },
  },
  {
    slug: 'dreaming-big-with-god',
    hero: {
      src: '/images/keynotes/dream-big-hero.jpg',
      alt: 'A lone figure standing on a ridge, looking up at the Milky Way arching across a star-filled sky',
      // Rose band of the galaxy itself, 330 deg, 12% of the frame. The larger
      // gold airglow low in the picture would have read as another beige.
      wash: '#F6DDF2',
      focal: 'center 60%',
    },
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
    hero: {
      src: '/images/keynotes/creativity-hero.jpg',
      alt: 'Hand-drawn light bulbs and looping scribbles bursting upward from the top of a person’s head',
      // Warm yellow-white: the lit page the drawing sits on, and the bulbs.
      wash: '#FBF4E5',
      focal: 'center 42%',
    },
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
    // The promo film Michele's team cut for this message. It opened the
    // ReThink Creativity conference page from the day that page was built
    // until 2026-08-26, when Michele moved it here: the conference page is
    // the history, and the film is selling the keynote. It is gone from
    // there, not duplicated, and the conference is still one click away on
    // the card at the bottom of this page.
    //
    // Her intro line is verbatim and belongs to the video, so it lives with
    // it here rather than as a trailing paragraph in `body`.
    promoVideo: {
      id: 'z7XSFwSDPj4',
      title: 'ReThink Creativity Conference - Michele Okimura',
      intro:
        'Watch this short video Michele and her team produced to capture the heart of this keynote.',
    },
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
    // The conference this keynote grows into. Moved here 2026-08-25 from the
    // bottom of /speaker, which had it for a few hours after it came off
    // /author. Michele's retitle, and her instruction was to drop the blurb
    // that came with the old card, so there is no description here on purpose.
    //
    // Retitled again 2026-08-26: the two clauses swapped, so the conference
    // NAME leads and the promise follows it. The old order buried the thing a
    // reader is looking for behind a phrase they cannot search for.
    relatedProgram: {
      title:
        'The Rethink Creativity Conference: Unleashing Your Creative Identity',
      href: '/speaker/creativity/rethink-creativity-conference',
    },
    nonFaith: true,
  },
  {
    slug: 'building-a-kingdom-culture',
    hero: {
      src: '/images/keynotes/kingdom-culture-hero.jpg',
      alt: 'A family in a bright living room, two parents leaning together while their daughter talks and their son listens',
      // Warm cream of the room, held near grey so it does not read peach.
      wash: '#F7EFE9',
      focal: 'center 45%',
    },
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
    // Added 2026-08-25.
    youtube: {
      id: 'y4rmy3MbaoI',
      title: 'Michele Okimura — Kingdom Culture',
    },
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
        role: 'Former Principal, Christian Academy',
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
      // Added 2026-08-25 with Michele's revised Missionary Church Hawaiʻi case
      // study, which supplied this endorsement verbatim. "Hawaii" and
      // "Nanaikapono" are spelled without ʻokina because that is how the
      // endorser wrote them; endorser wording is never edited.
      {
        quote:
          'The Kingdom Kids Workshop had a very personal and powerful impact on me. I experienced the power of God’s love being poured out upon not only myself, but on other Senior Pastors, ministry leaders and parents. We were being restored, renewed, refreshed, rejuvenated, and revived by the power of the Holy Spirit. I would recommend every pastor, ministry leader, and parent to attend Kingdom Kids Workshops by Michele Okimura! This workshop will change the future of Hawaii by helping us to collectively work together to look at our children, speak to our children, and love our children from the heart of God.',
        name: 'Allen Cardines',
        role: 'Senior Pastor, Nanaikapono Protestant Church, Nanakuli, Hawaii',
      },
      // ################### TODO: four more endorsers ###################
      // Michele named these four for this message and their quotes have NOT
      // been captured yet, so none of them is stubbed in below. Adding a name
      // without its words would put an empty testimonial on the page.
      //
      //   Russell Higa, Charis Chinen, Megan Junge, Damon Gohata
      //
      // When the text arrives, append each as a normal entry above this
      // comment and the section grows on its own. Endorser wording is
      // verbatim and is never edited.
      // #################################################################
    ],
  },
  {
    slug: 'heart-wide-open',
    // Michele's final pick, 2026-08-24, replacing both the father-and-son
    // beach shot and the girl hugging her mother. One picture now, and a
    // universal one: a hand and a smaller hand, so it reads for a son or a
    // daughter equally.
    //
    // The wash is warm even though the frame is not. Sampled, the dominant
    // hue is the cool dark ground at 180 to 210 degrees, 60% of the colour,
    // against 26% for the skin. The warm hue is the one taken because it is
    // the one that CHARACTERISES the photograph: the hands in low sun are the
    // subject and the dark is only what they are lit against. That is the
    // judgement the convention on MessageHero asks for.
    //
    // It is a tall 2:3 portrait in a 4:3 slot, so the focal point matters
    // more than usual: 70% puts the clasped hands in the middle of the crop
    // instead of the sleeve.
    hero: {
      src: '/images/keynotes/connect-with-child-hero.jpg',
      alt: 'An adult hand holding a small child’s hand, close up in warm low evening light',
      wash: '#F6E3D6',
      focal: 'center 70%',
      credit: 'Busra Akkaya on Pexels',
    },
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
    // Crown photograph dropped 2026-08-24 at Michele's instruction. The
    // butterflies are the whole visual for this message now, so they moved up
    // into the banner and are NOT also repeated inline: the same picture twice
    // on one page reads as a mistake rather than as emphasis.
    //
    // The wash moved with the photograph. It was the crown's sunlit
    // golden-green; it is the butterflies' blue now, sampled the same way
    // (peak hue 202 degrees, 45% of the frame's colour). Navy on it is
    // 11.75:1 and neutral-600 is 6.16:1.
    hero: {
      src: '/images/keynotes/identity-healing-secondary.jpg',
      alt: 'Green butterflies rising out of an open glass jar into a moonlit blue meadow',
      wash: '#D4E9F6',
      focal: 'center 45%',
    },
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
        // Opening line, Michele's second version, 2026-08-24, verbatim. The
        // first was "You were crowned with purpose", written against a crown
        // photograph that has since been dropped. This one answers the
        // butterflies that replaced it, which are a jar being opened.
        text: 'You are made to be set free to reach your fullest potential. For too many women, hidden struggles with self-worth, unresolved pain, and quiet insecurity hold back the brilliant calling God has placed on their lives. Rooted in her own journey of transformation and years of ministering to faith communities, Michele brings a powerful, liberating message designed to break off limitation and elevate women into their true identity in Christ.',
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
    hero: {
      src: '/images/keynotes/hear-gods-voice-hero.jpg',
      alt: 'A man in a park cupping a hand behind his ear to listen, smiling and looking upward',
      // Sunlit green of the park canopy, 60-90 deg, half the frame.
      wash: '#EBF5D3',
      focal: 'center 35%',
    },
    number: '07',
    title: 'How to Hear God’s Voice',
    teaser:
      'For youth and adults of all ages who are ready to grow in their two-way relationship with God, this workshop builds faith through testimony, teaches discernment, and gives each participant practical activities to hear God’s voice in real time. Be prepared to encounter God in this time.',
    accent: 'coral',
    texture: 'grid',
    icon: 'waveform',
    // Michele's full description, 2026-08-24. Her draft was voice-typed, so
    // she asked for light polish: paragraph breaks, punctuation, grammar. The
    // content is hers and unchanged. Three fixes were made and no others:
    // the em dash after "traditional channels" and the one after "your
    // audience" are commas, and "keeps Michele coming backto" became "keeps
    // her coming back to", which fixes the run-together typo and the third
    // mention of her name in one sentence.
    //
    // This replaces all four of the paragraphs that were here and loses
    // nothing: her text carries the other ways God speaks, the 1 Corinthians
    // 14:1 unpacking, the audience list and the closing line. It also settles
    // something flagged in the last pass, where her shorter copy said "youth
    // and adults of all ages" while the delivery line underneath still listed
    // children. Elementary children are back in the audience here.
    body: [
      {
        kind: 'paragraph',
        text: 'God is constantly speaking, but many believers miss His whisper simply because they haven’t learned to recognize the sound of His voice. Designed with the flexibility to serve elementary children, youth, adults, families, or full ministry teams, this transformative experience moves faith from a one-sided conversation into a dynamic, two-way relationship with the Spirit.',
      },
      {
        kind: 'paragraph',
        text: 'Michele expands your spiritual awareness beyond traditional channels, showing you how God speaks through spontaneous thoughts, visions, inner impressions, and everyday circumstances. Unpacking 1 Corinthians 14:1 with clarity and simplicity, she demystifies the gift of prophecy, equipping you to discern God’s voice, release timely encouragement, and build a culture of prophetic hearing in your home and church.',
      },
      {
        kind: 'heading',
        text: 'In this activation experience, participants will:',
      },
      {
        kind: 'list',
        termed: true,
        items: [
          'Recognize the Spectrum of God’s Voice: Learn how to tune into God’s everyday visual, intuitive, and relational prompts.',
          'Master Real-Time Discernment: Gain tools and real-time activations to test and confirm what you hear.',
          'Demystify Prophetic Encouragement: Step confidently into 1 Corinthians 14:1 to speak life, strength, and hope into those around you.',
        ],
      },
      { kind: 'heading', text: 'Tailored for Every Generation' },
      {
        kind: 'paragraph',
        text: 'Michele customizes this message and its practical exercises specifically for your audience, whether for elementary-age kids, youth, adults, multigenerational families, or pastors and ministry teams. Watching people of any age realize "I can hear God’s voice" is what Michele loves most and is what keeps her coming back to this one.',
      },
    ],
    endorsements: [
      {
        quote:
          'She just did a session at Native Camp in Montana, and it was excellent, one of the most impactful sessions of the whole camp. We had 19 FMI workers there. Every person had an experience of how to prophesy over each other. Simple, practical, and powerful. I saw it all personally. Now many children in our church prophesy and unashamedly pray for healing, all because of Michele.',
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
