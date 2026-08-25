/**
 * The Author shelf: one record per title, plus the running order the shelf is
 * rendered in.
 *
 * WHY THIS FILE EXISTS. Until 2026-08-23 every word of this content lived
 * inline in src/app/author/page.tsx, which rendered each title as a full
 * two-column essay. Brett's design review turned that page into a grid of
 * tiles, and the long copy moved to a detail page per title under
 * /author/books/<slug>. Both surfaces read from here, so a title's teaser and
 * its full description can never drift apart.
 *
 * === THE ORDER IS THE POINT ===
 * SHELF below is Michele's order, set 2026-08-23 and unchanged by the tile
 * rebuild. Do not resort it alphabetically or by date, and do not reintroduce
 * a divider between her own titles and the Releasing Generations curriculum:
 * she asked for one list.
 *
 *   1 Brave Purpose with God   5 Brave Series Curriculum
 *   2 Brave Purpose                (Beautiful / Bold / Together)
 *   3 Dream Big Journals        6 Dancing with Father
 *     Curriculum                7 The Birth of Explicit Movement
 *       (Journals + Teacher     8 Explicit Movement 21-Day Journal
 *        Guides)
 *   4 Raising Kingdom Kids
 *
 * The faith edition leads at 1, by direction.
 *
 * === COPY RULES ===
 * Endorser quotes are VERBATIM and must stay that way, including any phrasing
 * the house voice guide would otherwise avoid. Trim only by dropping whole
 * sentences.
 *
 * Every `teaser` is the opening sentence or two of that title's own approved
 * description, lifted whole. Nothing here was written fresh for the tiles. If
 * a tile needs a shorter or punchier line, that line has to come from Michele
 * rather than from an edit made here.
 *
 * === WORDING ===
 * This page says "Non-Faith" where the rest of the site still says "Classic".
 * That is Michele's call for the customer-facing shelf. The Brave Series tiles
 * get there through the `editionLabels` prop on BraveSeriesCovers rather than
 * by editing lib/brave-series-covers, which four other pages also read.
 */

export type Endorsement = { quote: string; source: string }

export type AvailableLink = { text: string; href?: string }

export type AuthorBook = {
  /** Route segment under /author/books. */
  slug: string
  title: string
  /** Edition, year, or role. Sits under the title on the detail page. */
  meta?: string
  /**
   * The flat pre-release label, and its exact wording. Never a pill.
   * Michele set this to "Forthcoming Spring 2027" on both Brave Purpose
   * editions on 2026-08-24. It is a string rather than a flag so the two
   * editions cannot end up announcing two different dates.
   */
  forthcoming?: string
  /** Cover art, or undefined for a titled placeholder tile. */
  cover?: string
  coverAlt: string
  /** Tile copy: the first sentence or two of `description`, lifted whole. */
  teaser: string
  /** Full description. One entry per paragraph. */
  description: string[]
  /** Paragraphs set in italic under the description, for shipping notes. */
  notes?: string[]
  /** A line of Michele's that belongs to this title alone. */
  pullQuote?: string
  endorsements?: Endorsement[]
  endorsementsLabel?: string
  available?: AvailableLink[]
  availableLabel?: string
  /** The case study for this title, over on /projects. */
  storyHref?: string
  /**
   * Headed blocks of bold-labelled points. Michele sent this shape for the two
   * curricula on 2026-08-24, straight out of her brochure copy. `label` is
   * stored WITHOUT its trailing colon; the colon is drawn at render time so it
   * never ends up inside the bold run twice.
   */
  sections?: {
    heading: string
    items: { label?: string; text: string }[]
    /** A closing paragraph under the list. */
    outro?: string
  }[]
  /**
   * A series wordmark, shown in place of a cover on the detail page. The Brave
   * Series is a set of twenty-four volumes, so one volume's front cover was
   * standing in for the whole thing at the top of its page.
   */
  logo?: { src: string; width: number; height: number; alt: string }
  /**
   * The prominent purchase call to action. Replaces the quiet `available` row
   * when present; Michele read that row as far too small to find.
   */
  buy?: { label: string; text: string; href: string }
  /** A YouTube Short. Portrait, so the frame is 9:16 and capped narrow. */
  video?: { id: string; title: string; label: string }
  /** A bulleted block only one or two titles carry. */
  list?: { label: string; note?: string; items: string[] }
  /** A quiet panel of recognition or context. */
  panel?: { heading: string; items?: string[]; body?: string }
  /** True when release-date updates are the only call to action available. */
  releaseUpdates?: boolean
}

/* ------------------------------------------------------------ endorsements */

const EXPLICIT_MOVEMENT_ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      '“Michele is a remarkably gifted woman with an unbounded mother’s heart for the incredibly talented and passionate young people she draws into God’s Kingdom. This small book will bring huge encouragement to you, revealing that God is still intimately active in the world and in the hearts of humble and unlikely heroes like Michele.”',
    source:
      'Glenn T. Stanton, Director of Global Family Formation Studies, Focus on the Family',
  },
  {
    quote:
      '“Michele said, ‘Yes, Lord!’ and today she is leading the Explicit Movement that is bringing a message of sexual purity, and along with it hope and healing, to thousands of children and young people in the islands of Hawaii and beyond. You will be inspired and challenged to surrender your own life, just as Michele did, and follow the Lord into the purpose and destiny He has for you.”',
    source:
      'Dr. Ed Silvoso, Founder and President of Harvest Evangelism and the International Transformation Network',
  },
  {
    quote:
      '“Michele Okimura and her team minister healing and freedom to those in pain. If you have been abused or know anyone who has been a victim of abuse, and all of us do, you need to read this book that will give you hope.”',
    source: 'Dr. Caroline Ward Oda, Ph.D.',
  },
]

const DANCING_ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      '“Michele Okimura has touched a topic that is discussed very little. She invites the reader to share her tragedy and triumph by capturing that experience in Dancing with Father. This poem can be an instrument to bridge the gap in the healing process for others who have had a difficult journey through their youth.”',
    source:
      'Gary and Norma Smalley, President and Founder, Smalley Relationship Center',
  },
  {
    quote:
      '“Just as David wrote his Psalms, so has Michele found a voice for deeper longings of God. This is truly a soul’s cry that rings victorious. I believe Michele has found a voice for so many.”',
    source:
      'Dr. Wayne Cordeiro, Founding Pastor, New Hope Christian Fellowship, Honolulu',
  },
  {
    quote:
      '“When I read Dancing with the Father my heart was deeply touched. I know this deeply artistic, poetic work will touch many deeply.”',
    source:
      'Patricia King, President and Founder of Extreme Prophetic Ministries',
  },
]

const DREAM_BIG_ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      '“I dream bigger. It helped change my fixed mindset, and now I can be more creative and grow my confidence.”',
    source: 'Fourth-grade student',
  },
  {
    quote:
      '“It helped me to grow and find myself and my interests by reflecting on the past and planning for the future.”',
    source: 'Fourth-grade student',
  },
  {
    quote: '“The teacher guide was gold. Love the extensions.”',
    source: 'Teacher',
  },
  {
    quote:
      '“The Dream Big Journal booklet provided an excellent resource to allow our Leadership Team to revisit our ‘dreams and aspirations’ in a safe and nurturing environment through the guidance and support of Michele Okimura.”',
    source: 'Gerald Teramae, Head of School, Island Pacific Academy',
  },
]

const RAISING_KINGDOM_KIDS_ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      '“We purchased your curriculum because it was so amazing! We absolutely love your curriculum! We actually use it churchwide at times. So much of the curriculum is easily taught to all ages.”',
    source: 'Children’s ministry customer',
  },
]

/**
 * The Brave Series endorsements, replaced wholesale 2026-08-24 with the seven
 * from Michele's brochure. Two of the three that used to sit here are in this
 * set, both in longer form, and the third came back with its surname corrected
 * to Fischer.
 *
 * ORDER IS DELIBERATE and it is Michele's: the survivor and front-line voices
 * open, because they carry the weight; the education and authority voices
 * follow and make the case for a classroom; the parent and the teenager close,
 * because they are who a reader pictures using it.
 *
 * VERBATIM. Two edits only, both hers: "life-saving & transformational" takes
 * the ampersand out, and "porn, and sexual exploitation" gains an Oxford comma.
 */
const BRAVE_ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      '\u201cThe Brave Series is a groundbreaking, survivor-informed resource that empowers youth with confidence, resilience, and the tools to safeguard themselves from exploitation. Its engaging, age-appropriate approach builds self-worth and inspires leadership, making it an essential prevention tool for protecting and uplifting the next generation.\u201d',
    source:
      'Rachel Fischer, National and International Anti-Trafficking Consultant, Nurse, and Survivor',
  },
  {
    quote:
      '\u201cHealing, life-saving and transformational! This book tackles a difficult topic in a relatable yet compassionate manner; the reader is guided through a path of inner healing, insight, and purpose while learning to protect themselves from the dangers of sex trafficking. This book is the answer to young girls finding strength to heal and move forward to become Brave, Beautiful, and on a path to meet their destiny!\u201d',
    source:
      'Dr. Shantae Williams, PsyD, Front-Line Worker with Trafficked Youth',
  },
  {
    quote:
      '\u201cI know Brave & Beautiful, a prevention and restorative tool, is exactly what is needed as a resource to help teenage girls. This is a one-of-a-kind publication that will change the world. At the heart of Brave & Beautiful, we see the heart of justice being revealed. I believe you will never come across a resource like this!\u201d',
    source: 'Young Adult Survivor',
  },
  {
    quote:
      '\u201cWhen first introduced to the materials, I found them breathtaking and unlike anything I had seen. Interactive and thought-provoking, The Brave Series fosters meaningful conversations and personal reflection, creating an environment where teens can share and connect. Its beautifully designed presentation captures the attention of even the most discerning teenagers, making it as visually engaging as it is impactful. The Brave Series equips young people with the tools to navigate challenges, make informed decisions, and step confidently into their potential by addressing critical topics like self-worth, healthy relationships, and personal responsibility.\u201d',
    source:
      'Phyllis Unebasami, Retired Hawai\u02bbi Deputy Superintendent, Department of Education',
  },
  {
    quote:
      '\u201cDay by day, I watched eyes, ears, and hearts open to the truth. Students shared how refreshing it was to talk about things they never get to talk about. Others found extreme healing from past abuse. No doubt this material will not only equip young people in their value and identity, but also save many from the lures of trafficking, porn, and sexual exploitation. I cannot recommend this material enough.\u201d',
    source: 'Kelly Balarie, Educator, Comenius School of Creative Leadership',
  },
  {
    quote:
      '\u201cI love Brave & Beautiful! My 87-year-old mom is reading it and can hardly put it down! I\u2019m sharing this with my oldest daughter who is 20 and even my youngest daughter who is 12 years old! The quality is phenomenal! What an all-encompassing range! The impact will be felt!\u201d',
    source: 'Angela Cannon, Parent',
  },
  {
    quote:
      '\u201cThis book has helped me not only to have a brighter mindset but to love myself and be confident in who I am and what I stand for. This book is so simple yet so empowering in every word and detail!\u201d',
    source: 'Malia Colburn, Teenage Girl',
  },
]

const BRAVE_PURPOSE_FAITH_ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      '“There is a lack of practical tools that can assist young adults in discovering the direction that God wants their life to take. This book fills that void. Writing with a positive and uplifting tone, Michele provides practical advice on how to connect with one’s life purpose, no matter what adult life stage you are in.”',
    source:
      'Ted Esler, President and CEO of Missio Nexus (the largest North American mission network)',
  },
  {
    quote:
      '“Brave Purpose with God is a wonderful resource, helping us reflect on who we are, what we can achieve, and where to go from here. Listen for that divine voice of calm and clarity rising above the noise as we explore Brave Purpose with God together.”',
    source:
      'Edwin Keh, CEO of HKRITA; former Senior Vice President and COO of Walmart Global Procurement; Faculty at the Wharton School of the University of Pennsylvania, and A3 Christian Ministry',
  },
  {
    quote:
      '“Okimura masterfully connects the prophetic and the artistic with the dusty, everyday path we actually walk. Readers will come away not just encouraged but awakened as travelers ready to follow God’s clues toward the treasure He has prepared.”',
    source:
      'Ted Vail, D.I.S., Senior Vice President of Mission, The Foursquare Church',
  },
]

const BRAVE_PURPOSE_SECULAR_ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      '“Brave Purpose is a wonderful resource in the midst of all this, helping us reflect on our identity, our potential, and our direction. The intent is for us to find our true purpose and meaning, and to live the unique life we were inherently designed for.”',
    source:
      'Edwin Keh, CEO of HKRITA; former Senior Vice President and COO of Walmart Global Procurement; Faculty at the Wharton School of the University of Pennsylvania',
  },
  {
    quote:
      '“Brave Purpose is not simply a book, it is a sacred invitation. From the first page, you feel gently yet firmly called out of hiding and into the courageous work of becoming who you were always meant to be. This is the kind of book you don’t just read, you experience.”',
    source: 'Gerald Teramae, Head of School, Island Pacific Academy',
  },
]

/* ------------------------------------------------------------ the records */

/** Both Dream Big groups and the Brave Series shelf print the same line. */
export const BOTH_VERSIONS = 'Faith and Non-Faith Versions Available'

/**
 * Author-page wording for the Brave Series editions. `Classic` is still the
 * internal name in lib/brave-series-covers and on the project pages.
 */
export const AUTHOR_EDITION_LABELS = { Classic: 'Non-Faith' } as const

export const AUTHOR_BOOKS: AuthorBook[] = [
  {
    slug: 'brave-purpose-with-god',
    title: 'Brave Purpose with God',
    meta: 'Faith edition · Targeted Spring 2027',
    forthcoming: 'Forthcoming Spring 2027',
    coverAlt: 'Brave Purpose with God',
    teaser: 'For anyone longing to dream big with God.',
    description: [
      'For anyone longing to dream big with God. Michele lays out the Brave Purpose Framework: 15 steps in three movements (Uncover, Recover, Ignite) that walk readers through discovering the God-breathed dreams He has planted within them, dealing with the fears and voices that have held them back, and taking real next steps of obedience. Written for the young adult finding first footing, the middle-aged reader navigating the sustained trek, and the senior stepping into a golden legacy. Includes a companion workbook.',
      // The two-editions framing. It used to be the italic lead over the whole
      // shelf on /author; the tile rebuild leaves no block between the hero and
      // the grid, so it moved onto the two records it is actually about.
      'Brave Purpose is Michele’s forthcoming book, releasing in two editions: one faith, one non-faith. Both share the same core message: you were made to step off the rock and into the current of the life you were designed for. Each edition is voiced for its audience.',
    ],
    endorsements: BRAVE_PURPOSE_FAITH_ENDORSEMENTS,
    endorsementsLabel: 'Early praise',
    storyHref: '/projects/brave-purpose-with-god',
    releaseUpdates: true,
  },
  {
    slug: 'brave-purpose',
    title: 'Brave Purpose',
    meta: 'Non-faith edition · Releasing 2027',
    forthcoming: 'Forthcoming Spring 2027',
    coverAlt: 'Brave Purpose',
    teaser:
      'For anyone ready to dream big and step into the life they were designed for.',
    description: [
      'For anyone ready to dream big and step into the life they were designed for. Same 15-step Brave Purpose Framework, same three movements, voiced without the faith framing. Includes a companion workbook.',
      // See the note on brave-purpose-with-god.
      'Brave Purpose is Michele’s forthcoming book, releasing in two editions: one faith, one non-faith. Both share the same core message: you were made to step off the rock and into the current of the life you were designed for. Each edition is voiced for its audience.',
    ],
    endorsements: BRAVE_PURPOSE_SECULAR_ENDORSEMENTS,
    endorsementsLabel: 'Early praise',
    storyHref: '/projects/brave-purpose',
    releaseUpdates: true,
  },
  {
    slug: 'dream-big-journal-curriculum',
    title: 'Dream Big Journals Curriculum',
    meta: 'Published 2023-2025 \u00b7 Sole author: Michele Okimura',
    cover: '/images/journals/dream-big-with-god-journal-youth-and-adults@2x.jpg',
    coverAlt: 'Dream Big Journal, Youth & Adults',
    // Teaser follows the description, as every teaser on this shelf does: it is
    // the opening sentence, lifted whole. It moved when the description was
    // replaced on 2026-08-24. This one shows only in metadata, because the
    // Dream Big parent renders as a family heading rather than a tile.
    teaser: 'You never outgrow the God-given capacity to dream.',
    // Michele's brochure copy, 2026-08-24, verbatim. Her cleanups, carried
    // through: the en dashes in "Preschool\u2013Youth" and "Middle Age\u2013Seniors"
    // are spelled out as " to ", and the em dashes in "invites you\u2014and those
    // you love\u2014to expand it" are commas.
    description: [
      'You never outgrow the God-given capacity to dream. Whether a young child is taking their first steps toward understanding their purpose or a senior is stepping into a vibrant legacy season, the Dream Big Journal Series meets every heart right where it is.',
      'Designed as a tailored, age-appropriate curriculum, these journals walk readers through interactive activities that draw out the rich treasure hidden within. By helping you discover and uncover the unique seeds planted in your heart, this series empowers you to live out those dreams and release them to make an extraordinary difference in the world around you.',
    ],
    sections: [
      {
        heading: 'Why the Dream Big Series Changes Everything',
        items: [
          {
            label: 'Uncover Your Inner Treasure',
            text: 'Guided prompts and reflective exercises draw out the hidden gifts, ideas, and passions waiting to be released.',
          },
          {
            label: 'For Young Hearts (Preschool to Youth)',
            text: 'Many adult callings begin as seeds planted in childhood. These journals give parents and educators a front-row seat into what is alive inside a young heart, providing the language needed to nurture those dreams before the world tries to quiet them.',
          },
          {
            label: 'For Next-Gen Leaders (Young Adults)',
            text: 'Navigate critical life transitions, overcome self-doubt, and anchor personal ambitions in purposeful action.',
          },
          {
            label: 'For Seasoned Visionaries (Middle Age to Seniors)',
            text: 'It is never too late for a new beginning. Seniors in their twilight years use these journals to reignite passion, discover fresh purpose, and pass down a legacy of faith and joy.',
          },
        ],
        outro:
          'In a world that continually tempts us to shrink our vision, the Dream Big series invites you, and those you love, to expand it.',
      },
      {
        heading: 'Tailored for Every Stage of Life',
        items: [
          {
            label: 'Preschool & Elementary',
            text: 'Interactive prompts to ignite wonder, curiosity, and divine identity.',
          },
          {
            label: 'Youth & Young Adults',
            text: 'Focused guidance to discover passion, overcome fear, and set purposeful goals.',
          },
          {
            label: 'Middle Age & Seniors',
            text: 'Deep reflection tools to recalibrate vision, embrace new chapters, and leave a lasting impact.',
          },
        ],
      },
    ],
    notes: ['Piloted with fourth-grade students at Kamehameha Schools, Hawaiʻi.'],
    panel: {
      heading: 'Available in four age brackets',
      body: 'Preschool, Younger Elementary (grades 1-2), Older Elementary (grades 3-5), Youth & Adults (“Keys to Unlock Your Dreams”). Every bracket comes in a Faith version and a Non-Faith version. The Non-Faith version is the one that goes into public school classrooms and secular leadership rooms.',
    },
    endorsements: DREAM_BIG_ENDORSEMENTS,
    endorsementsLabel: 'Voices from the classroom',
    available: [{ text: 'micheleokimura.com/store' }],
    storyHref: '/projects/dream-big-journals',
  },
  {
    slug: 'raising-kingdom-kids',
    title: 'Raising Kingdom Kids',
    meta: 'A lesson book for equipping the next generation \u00b7 More than 100 lessons',
    cover: '/images/books/kingdom-kids.webp',
    coverAlt: 'Raising Kingdom Kids',
    teaser:
      'Tested in the trenches and proven in real ministry, the Kingdom Kids Curriculum is a dynamic compilation of over 100 field-tested lessons developed across ten years of active children\u2019s and youth ministry.',
    // Michele's brochure copy, 2026-08-24, verbatim, with one edit of hers:
    // Hawai\u02bbi takes the \u02bbokina. Her copy calls it "the Kingdom Kids
    // Curriculum" where the title on the shelf is "Raising Kingdom Kids". That
    // is her wording and it stays.
    description: [
      'Tested in the trenches and proven in real ministry, the Kingdom Kids Curriculum is a dynamic compilation of over 100 field-tested lessons developed across ten years of active children\u2019s and youth ministry. Every single lesson was taught in a real room with real kids before being written down, ensuring that nothing here is abstract theory, but time-tested, practical truth that works.',
      'Originally built for children\u2019s ministry leaders and parents, the impact of this curriculum has reached far beyond the Sunday school classroom. Trusted by churches across Hawai\u02bbi and throughout the U.S. mainland, its core truths carry seamlessly across every generation. In fact, pastors regularly adapt these foundational principles to teach from the main platform for full adult congregations.',
    ],
    // This replaces the bare five-item "What the lessons cover" list. Same five
    // pillars, now with Michele's line on each.
    sections: [
      {
        heading: 'Some Core Pillars Covered in the Curriculum',
        items: [
          {
            label: 'Identity in Christ',
            text: 'Rooting young hearts in who God says they are, breaking off lies of worthlessness and fear.',
          },
          {
            label: 'Hearing God\u2019s Voice',
            text: 'Demystifying the Spirit to help kids recognize, test, and respond to God\u2019s whisper in real time.',
          },
          {
            label: 'Raising Child and Youth Leaders',
            text: 'Equipping kids to step into active ministry, prayer, and service rather than remaining passive listeners.',
          },
          {
            label: 'Giving Children and Youth a Voice',
            text: 'Empowering the next generation to articulate their faith, share their testimony, and lead their peers.',
          },
          {
            label: 'Healing Hearts',
            text: 'Guiding children and youth through emotional restoration, forgiveness, and the comforting truth of God\u2019s love.',
          },
        ],
      },
    ],
    endorsements: RAISING_KINGDOM_KIDS_ENDORSEMENTS,
    endorsementsLabel: 'What churches say',
    available: [{ text: 'micheleokimura.com/store' }],
    storyHref: '/projects/raising-kingdom-kids',
  },
  {
    slug: 'brave-series',
    title: 'Brave Series Curriculum',
    meta: BOTH_VERSIONS,
    cover: '/images/brave-series/optimized/brave-and-beautiful-vol1.jpg',
    coverAlt: 'Brave & Beautiful, Volume 1',
    // The series wordmark stands at the top of the detail page instead of the
    // cover. One volume's front cover was speaking for all twenty-four, so the
    // page opened with the words "Brave & Beautiful" over a heading that said
    // Brave Series Curriculum. The tile on /author still uses the cover: a tile
    // needs an image with colour in it, and a black wordmark on cream is not
    // that. Black on transparent, so it needs a light ground.
    logo: {
      src: '/images/brave-series/logo-black.png',
      width: 719,
      height: 321,
      alt: 'The Brave Series',
    },
    teaser:
      'The Brave Series is a comprehensive, three-title youth curriculum designed to build self-worth, foster healthy relationships, impart essential life and leadership wisdom, and proactively empower young people to protect themselves from exploitation.',
    pullQuote: 'Every page is a work of art. Just as every child is.',
    // Michele's brochure copy, 2026-08-24, verbatim. Her cleanups, carried
    // through: the em dashes in "Contributing Author\u2014producing" and in
    // "adults of all ages\u2014including" are commas.
    description: [
      'Equipping the next generation with emotional resilience and moral clarity is one of the most vital investments we can make. The Brave Series is a comprehensive, three-title youth curriculum designed to build self-worth, foster healthy relationships, impart essential life and leadership wisdom, and proactively empower young people to protect themselves from exploitation.',
      'As a powerful preventative tool, this series serves as an invaluable resource whether you are an educator aiming to cultivate leadership skills, a mentor guiding at-risk youth, or a parent looking to invest deeply in your son or daughter. Michele led the series as Chief Editor, Creative Director, and Contributing Author, producing 24 volumes in total across faith-based and non-faith versions to serve every community.',
    ],
    sections: [
      {
        heading: 'Versatile for Every Environment',
        items: [
          {
            label: 'For the Classroom & Small Groups',
            text: 'The co-ed Brave Together version is specifically optimized for school settings, youth groups, and interactive cohort discussions.',
          },
          {
            label: 'For Families & Mentors',
            text: 'The complete series offers a shared language for parents, guardians, and mentors to navigate tough topics with teens and young adults safely and constructively.',
          },
        ],
      },
      {
        heading: 'Impact Across Generations',
        items: [
          {
            label: 'Youth & Teens',
            text: 'Develops core emotional health, identity, and practical decision-making skills before crisis hits.',
          },
          {
            label: 'Adults & Seniors',
            text: 'While written for youth, adults of all ages, including church leaders, young adults, and seniors, have embraced these volumes to find their own healing, empowerment, and renewed vision.',
          },
        ],
      },
    ],
    notes: [
      'Brave Together Faith version shipping in the next month; all other volumes available now.',
    ],
    buy: {
      label: 'Buy at',
      text: 'thebraveseries.com',
      href: 'https://thebraveseries.com',
    },
    panel: {
      heading: 'Recognition',
      items: [
        'Brave Together (non-faith version) vetted and approved by the Hawaiʻi State Department of Education for use in secondary public schools, 2026',
        '2023 Outstanding Advocate for the Children and Youth of Hawaiʻi, awarded to Releasing Generations by Hawaiʻi’s Governor and Honolulu’s Mayor for the development of the Brave Series',
      ],
    },
    endorsements: BRAVE_ENDORSEMENTS,
    storyHref: '/projects/brave-series',
  },
  {
    slug: 'brave-and-beautiful',
    title: 'Brave & Beautiful',
    meta: 'For teen girls · Four volumes · Faith and Non-Faith Versions Available',
    cover: '/images/brave-series/optimized/brave-and-beautiful-vol1.jpg',
    coverAlt: 'Brave & Beautiful, Volume 1',
    teaser:
      'Leadership curriculum for teen girls focused on identity, worth, and protection from exploitation.',
    description: [
      'Leadership curriculum for teen girls focused on identity, worth, and protection from exploitation. One of the three titles in the Brave Series, in a four-volume set, available in both faith and non-faith versions.',
    ],
    // TODO(copy): Michele to supply a full description for this title on its
    // own terms. The paragraph above is the registry subtitle from
    // lib/site-config plus the series facts, and it is deliberately thin
    // rather than invented.
    // Same prominent treatment as the parent series page. Michele's note was
    // about this exact link being too small to find, and it is the same link.
    buy: {
      label: 'Buy at',
      text: 'thebraveseries.com',
      href: 'https://thebraveseries.com',
    },
    storyHref: '/projects/brave-series',
  },
  {
    slug: 'brave-and-bold',
    title: 'Brave & Bold',
    meta: 'For teen boys · Four volumes · Faith and Non-Faith Versions Available',
    cover: '/images/brave-series/optimized/brave-and-bold-vol1.jpg',
    coverAlt: 'Brave & Bold, Volume 1',
    teaser:
      'Leadership curriculum for teen boys focused on courage, healthy masculinity, and purpose.',
    description: [
      'Leadership curriculum for teen boys focused on courage, healthy masculinity, and purpose. One of the three titles in the Brave Series, in a four-volume set, available in both faith and non-faith versions.',
    ],
    // TODO(copy): see the note on brave-and-beautiful.
    // Same prominent treatment as the parent series page. Michele's note was
    // about this exact link being too small to find, and it is the same link.
    buy: {
      label: 'Buy at',
      text: 'thebraveseries.com',
      href: 'https://thebraveseries.com',
    },
    storyHref: '/projects/brave-series',
  },
  {
    slug: 'brave-together',
    title: 'Brave Together',
    meta: 'Co-ed · Four volumes · Faith and Non-Faith Versions Available',
    cover: '/images/brave-series/optimized/brave-together-vol1.jpg',
    coverAlt: 'Brave Together, Volume 1',
    teaser:
      'Co-ed teen leadership curriculum focused on shared identity and mission.',
    description: [
      'Co-ed teen leadership curriculum focused on shared identity and mission. One of the three titles in the Brave Series, in a four-volume set, available in both faith and non-faith versions.',
    ],
    notes: [
      'The non-faith version was vetted and approved by the Hawaiʻi State Department of Education for use in secondary public schools in 2026. The faith version ships in the next month.',
    ],
    // TODO(copy): see the note on brave-and-beautiful.
    // Same prominent treatment as the parent series page. Michele's note was
    // about this exact link being too small to find, and it is the same link.
    buy: {
      label: 'Buy at',
      text: 'thebraveseries.com',
      href: 'https://thebraveseries.com',
    },
    storyHref: '/projects/brave-series',
  },
  {
    slug: 'dancing-with-father',
    title: 'Dancing with Father',
    meta: 'Published 2011',
    cover: '/images/books/dancing-with-father.webp',
    coverAlt: 'Dancing with Father',
    teaser:
      'A rich blend of poetry, personal reflection, and vibrant painted illustrations, Dancing with Father was born out of Michele\u2019s own journey through deep youth pain into radical, lingering healing.',
    // Michele's copy, 2026-08-24, verbatim. It arrived opening "A rich
    // tapestry of poetry"; she replaced "tapestry" with "blend" herself before
    // it shipped. Do not reach for a third word: this reads exactly as she
    // wants it.
    description: [
      'A rich blend of poetry, personal reflection, and vibrant painted illustrations, Dancing with Father was born out of Michele\u2019s own journey through deep youth pain into radical, lingering healing. Written as a tender lifeline for anyone walking through seasons of heartache or brokenness, this book imparts a profound message of hope, restoring the heart to know it is intimately seen, pursued, and cherished by God as Father.',
      'Designed as a comforting \u201cgo-to\u201d resource, its beauty lies in its accessible, deeply moving brevity. Perfect for reading in a single sitting, it serves as a spiritual sanctuary that readers keep close on their nightstands and return to again and again whenever they need to soak in the Father\u2019s love once more.',
    ],
    sections: [
      {
        heading: 'Why Readers Keep Returning to Dancing with Father',
        items: [
          {
            label: 'A Journey of True Healing',
            text: 'Reflects a powerful testimony of overcoming personal pain, offering a proven pathway to emotional and spiritual restoration.',
          },
          {
            label: 'Poetic & Visual Sanctuary',
            text: 'Combines heart-stirring poetry with original, beautiful painted artwork that brings God\u2019s presence into vivid focus.',
          },
          {
            label: 'Quick to Read, Deep to Soak In',
            text: 'Short enough to finish in one sitting, yet rich enough to re-read continuously for fresh peace and encouragement.',
          },
          {
            label: 'An Invitation to Joy',
            text: 'Encourages you to step out of fear and heaviness to come dance with the One who rejoices over you with singing.',
          },
        ],
      },
    ],
    notes: ['Also available as an audiobook, produced in radio-drama style.'],
    // Michele's own Short, on her own channel, embedded rather than re-hosted.
    // It is a vertical 9:16 clip, so the frame is portrait and capped narrow;
    // a 16:9 box would letterbox it inside two black bars.
    video: {
      id: 'IDfSPZ6D4wg',
      title: 'Dancing with Father, book short by Michele Okimura',
      label: 'Watch the short',
    },
    endorsements: DANCING_ENDORSEMENTS,
    list: {
      label: 'Reader impact',
      note: 'From testimonies Michele has received.',
      items: [
        'A woman in her darkest moment saw the book on her dining table, a gift from a friend. She picked it up, was met by God as she read, and instead of what she had planned, went to church the next morning. She later found Michele at a conference to tell her the book had saved her life.',
        'A woman driving cross-country to escape abuse played the audiobook on repeat for hours. Tears and healing came, mile after mile, page after page.',
        'The book has reached readers around the world, including as far as Norway and the Philippines.',
      ],
    },
    available: [{ text: 'micheleokimura.com/store (book, audiobook)' }],
    storyHref: '/projects/dancing-with-father',
  },
  {
    slug: 'birth-of-explicit-movement',
    title:
      'The Birth of Explicit Movement: Discover Keys to Fulfilling Your Purpose',
    meta: 'Published 2018',
    cover: '/images/books/birth-of-explicit-movement-cover@2x.jpg',
    coverAlt: 'The Birth of Explicit Movement',
    teaser:
      'Part inspiring memoir and part transformative leadership tool, Birth of Explicit Movement tells Michele\u2019s full founding story, packed with profound and practical keys to following God and fulfilling your divine purpose.',
    // Michele's copy, 2026-08-24, verbatim.
    //
    // NAMING. Her prose says "Birth of Explicit Movement" with no leading
    // "The", while the official title above keeps it. That is deliberate and it
    // is hers. Do not "fix" the body copy to match the title, and do not strip
    // the "The" from the title to match the body.
    description: [
      'Part inspiring memoir and part transformative leadership tool, Birth of Explicit Movement tells Michele\u2019s full founding story, packed with profound and practical keys to following God and fulfilling your divine purpose.',
      'Each chapter opens with an extraordinary, supernatural God story that draws you in and sets the stage for high-impact teachable moments. Written as both a personal testimony and a practical reflection guide, every chapter closes with structured reflection sections designed to help readers hear God\u2019s voice, apply wisdom, and take bold steps of obedience.',
    ],
    sections: [
      {
        // Long on purpose: it repeats the book's subtitle, which is Michele's
        // phrasing. Left exactly as she wrote it.
        heading:
          'Why Birth of Explicit Movement: Discover Keys to Fulfilling Your Purpose Resonates So Deeply',
        items: [
          {
            label: 'Profound & Practical Keys',
            text: 'Unpacks actionable truths for discerning God\u2019s calling and walking it out in everyday life.',
          },
          {
            label: 'Tested Leadership Resource',
            text: 'Proven across all levels of ministry, as a senior pastor even used this book to mentor and align his core leadership teams.',
          },
          {
            label: 'Supernatural Testimony',
            text: 'Features real, awe-inspiring stories of God\u2019s guidance that build faith and impart courage.',
          },
          {
            label: 'Interactive Reflection Sections',
            text: 'Turns Michele\u2019s personal account into an interactive blueprint for your own spiritual journey.',
          },
          {
            label: 'The Keynote Foundation',
            text: 'Serves as the rich foundational material for Michele\u2019s signature speaker keynote, \u201cFinding Your Brave Purpose.\u201d',
          },
        ],
      },
    ],
    panel: {
      heading: 'About Explicit Movement',
      body: 'Explicit Movement equips parents, church leaders, and young people themselves through events, courses, and resources on topics such as pornography addiction, sexual violence, and healthy relationships. With a compassionate, grace-filled approach rooted in God’s truth, the ministry helps young people find hope and healing, know their value and identity in Christ, and walk in sexual integrity as they step into the fullness of who God created them to be.',
    },
    endorsements: EXPLICIT_MOVEMENT_ENDORSEMENTS,
    available: [
      { text: 'explicitmovement.org', href: 'https://explicitmovement.org' },
      {
        text: 'releasinggenerations.org',
        href: 'https://releasinggenerations.org',
      },
    ],
    storyHref: '/projects/birth-of-explicit-movement',
  },
  {
    slug: 'explicit-movement-21-day-journal',
    title: 'The Explicit Movement 21-Day Interactive Journal',
    meta: 'Published 2018',
    cover: '/images/books/explicit-movement-21-day-journal-cover@2x.jpg',
    coverAlt: 'The Explicit Movement 21-Day Interactive Journal',
    teaser:
      'Will you live fearless and free? The Explicit Movement 21-Day Journal is an invitation to embark on an unforgettable three-week adventure into the heart of God.',
    // Michele's copy, 2026-08-24, verbatim.
    description: [
      'Will you live fearless and free? The Explicit Movement 21-Day Journal is an invitation to embark on an unforgettable three-week adventure into the heart of God. Written by the Explicit Movement team alongside friends and family of the movement, with Michele serving as Director and Contributing Author, this interactive resource bridges vulnerable, raw human experience with life-changing truth.',
      'Through a powerful collection of truthful memoirs, storytellers open up with incredible vulnerability to touch the heart and engage the mind. Designed for both individual quiet times and small-group discussions, each day pairs a high-impact reflection prompt with generous journaling space, anchoring your daily walk in your true value, your identity in Christ, and the abundant life God invites you into.',
    ],
    sections: [
      {
        heading: 'The Three Pillars of the 21-Day Journey',
        items: [
          {
            label: 'Real',
            text: 'Real people share about real hurt, deep pain, and consequences, as well as the real wholeness, healing, and hope found on the other side.',
          },
          {
            label: 'Raw',
            text: 'Courageous contributors honestly share what they have walked through, refusing to shrink back from tough topics like relational and sexual brokenness, and identity struggles.',
          },
          {
            label: 'Relevant',
            text: 'Crucial topics are explored heart-to-heart, proving that you are never alone in the struggle.',
          },
        ],
        outro:
          'Discover how God\u2019s grace and truth can restore your hope, heal your heart, and reignite your joy. If you are ready to sit with the questions that shape identity, healing, and purpose, start your 21-day adventure today and step into God\u2019s wondrous design for your life.',
      },
    ],
    // TODO(endorsements): no endorsements exist for this title yet. The detail
    // page renders nothing rather than borrowing a quote from another book.
    available: [
      { text: 'explicitmovement.org', href: 'https://explicitmovement.org' },
      {
        text: 'releasinggenerations.org (book and e-book)',
        href: 'https://releasinggenerations.org',
      },
    ],
  },
]

export function getAuthorBook(slug: string): AuthorBook | undefined {
  return AUTHOR_BOOKS.find((book) => book.slug === slug)
}

export const authorBookSlugs = AUTHOR_BOOKS.map((book) => book.slug)

/* -------------------------------------------------------------- the shelf */

/**
 * The four Dream Big age brackets, youngest first, with the journal cover and
 * its companion teacher guide.
 *
 * One cover per bracket, not two: Michele cut the second row of Non-Faith
 * covers on 2026-08-23 because the two versions are the same art and the
 * doubled grid read as eight different journals. The "Faith and Non-Faith
 * Versions Available" line on each group carries that fact instead.
 *
 * TODO(copy): these eight tiles carry a cover and an age bracket and no teaser.
 * They are editions of one curriculum rather than eight separate books, and no
 * approved one-line description exists for a single bracket. Ask Michele for
 * one line per bracket if the tiles should read like the book tiles do.
 */
export const DREAM_BIG_EDITIONS = [
  {
    label: 'Preschool',
    journal: '/images/journals/dream-big-with-god-journal-preschool@2x.jpg',
    guide: '/images/journals/dream-big-with-god-teacher-guide-preschool@2x.jpg',
  },
  {
    label: 'Younger Elementary, grades 1-2',
    journal:
      '/images/journals/dream-big-with-god-journal-younger-elementary@2x.jpg',
    guide:
      '/images/journals/dream-big-with-god-teacher-guide-younger-elementary@2x.jpg',
  },
  {
    label: 'Older Elementary, grades 3-5',
    journal:
      '/images/journals/dream-big-with-god-journal-older-elementary@2x.jpg',
    guide:
      '/images/journals/dream-big-with-god-teacher-guide-older-elementary@2x.jpg',
  },
  {
    label: 'Youth & Adults, “Keys to Unlock Your Dreams”',
    journal:
      '/images/journals/dream-big-with-god-journal-youth-and-adults@2x.jpg',
    guide:
      '/images/journals/dream-big-with-god-teacher-guide-youth-and-adults@2x.jpg',
  },
]

/**
 * The shelf, rendered top to bottom in exactly this order.
 *
 * `books` is a run of standalone titles that share one grid. `family` is a
 * parent work with a heading of its own and its children underneath, which is
 * how the Dream Big and Brave Series parent-child relationships survive the
 * move to tiles. A run of one or two titles is a deliberate partial row: the
 * order matters more than a full grid does.
 */
export type ShelfBlock =
  | { kind: 'books'; slugs: string[] }
  | {
      kind: 'family'
      /** The parent title's own record, linked from the heading. */
      slug: string
      subtitle?: string
      /** Child tiles that are titles in their own right. */
      childSlugs?: string[]
      /** Child tiles that are editions: cover and label, no teaser. */
      editions?: { title: string; subtitle?: string; field: 'journal' | 'guide' }[]
    }

export const SHELF: ShelfBlock[] = [
  { kind: 'books', slugs: ['brave-purpose-with-god', 'brave-purpose'] },
  {
    kind: 'family',
    slug: 'dream-big-journal-curriculum',
    subtitle: BOTH_VERSIONS,
    editions: [
      { title: 'Journals', subtitle: BOTH_VERSIONS, field: 'journal' },
      { title: 'Teacher Guides', subtitle: BOTH_VERSIONS, field: 'guide' },
    ],
  },
  { kind: 'books', slugs: ['raising-kingdom-kids'] },
  {
    kind: 'family',
    slug: 'brave-series',
    subtitle: BOTH_VERSIONS,
    childSlugs: ['brave-and-beautiful', 'brave-and-bold', 'brave-together'],
  },
  {
    kind: 'books',
    slugs: [
      'dancing-with-father',
      'birth-of-explicit-movement',
      'explicit-movement-21-day-journal',
    ],
  },
]
