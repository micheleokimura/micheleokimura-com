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
  /** Renders a flat "Forthcoming" label. Never a pill. */
  forthcoming?: boolean
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

const BRAVE_ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      '“The Brave Series is a groundbreaking, survivor-informed resource that empowers youth with confidence, resilience, and the tools to safeguard themselves from exploitation. Its engaging, age-appropriate approach builds self-worth and inspires leadership, making it an essential prevention tool for protecting and uplifting the next generation.”',
    source:
      'Rachel Fisher, National and International Anti-Trafficking Consultant, Nurse, and Survivor',
  },
  {
    quote:
      '“When first introduced to the materials, I found them breathtaking and unlike anything I had seen. The Brave Series equips young people with the tools to navigate challenges, make informed decisions, and step confidently into their potential by addressing critical topics like self-worth, healthy relationships, and personal responsibility.”',
    source:
      'Phyllis Unebasami, Retired Hawai‘i Deputy Superintendent of the Department of Education',
  },
  {
    quote:
      '“This book has helped me not only to have a brighter mindset but to love myself and be confident in who I am and what I stand for. This book is so simple yet so empowering in every word and detail!”',
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
    forthcoming: true,
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
    forthcoming: true,
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
    meta: 'Published 2023-2025 · Sole author: Michele Okimura',
    cover: '/images/journals/dream-big-with-god-journal-youth-and-adults@2x.jpg',
    coverAlt: 'Dream Big Journal, Youth & Adults',
    teaser:
      'A multi-age curriculum designed to walk readers through the practice of dreaming big, in shorter, age-appropriate journals that meet each reader where they are.',
    description: [
      'A multi-age curriculum designed to walk readers through the practice of dreaming big, in shorter, age-appropriate journals that meet each reader where they are. As children work through the pages, parents and teachers discover what’s alive in their kids’ hearts and gain the language to nurture those dreams before the world quiets them. Many of the adult callings we eventually walk in were first planted in us as children.',
      'In a world that too often teaches us to shrink our vision, these journals do the opposite. Seniors in their twilight years have used them to reignite vision for their season of life with great joy and excitement. How wonderful it would be to raise a generation of dreamers of all ages who would impact the world we live in for good.',
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
    meta: 'A lesson book for equipping the next generation · More than 100 lessons',
    cover: '/images/books/kingdom-kids.webp',
    coverAlt: 'Raising Kingdom Kids',
    teaser:
      'A compilation of over 100 proven, true lessons Michele developed across ten years of active children’s ministry and youth ministry work.',
    description: [
      'A compilation of over 100 proven, true lessons Michele developed across ten years of active children’s ministry and youth ministry work. Every lesson in the book was taught in a real room with real kids before it was written down. Nothing here is theory.',
      'The book was built for children’s ministry leaders and parents, and the range turned out to be much wider than that. Many of the lessons carry straight across every age group, adults included, which is how churches have ended up teaching them from the main platform.',
    ],
    list: {
      label: 'What the lessons cover',
      items: [
        'Identity in Christ',
        'Hearing God’s voice',
        'Raising children leaders',
        'Giving children a voice',
        'Healing hearts',
      ],
    },
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
    teaser:
      'A three-title youth curriculum that develops emotional health, builds self-worth and healthy relationships, and imparts wisdom for life and leadership.',
    pullQuote: 'Every page is a work of art. Just as every child is.',
    description: [
      'The Brave Series is a three-title youth curriculum that develops emotional health, builds self-worth and healthy relationships, imparts wisdom for life and leadership, and empowers readers to protect themselves from exploitation. A powerful preventative resource, available in both faith and non-faith versions. Michele led the series as Chief Editor, Creative Director, and Contributing Author. Twenty-four volumes in all: three titles, four-volume sets each, faith and non-faith versions.',
      'While written for youth, the Brave Series has been adopted by church leaders for leadership development, and by women and men of all ages, from young adults to seniors, who have found their own healing, empowerment, and vision inside the material.',
    ],
    notes: [
      'Brave Together Faith version shipping in the next month; all other volumes available now.',
    ],
    panel: {
      heading: 'Recognition',
      items: [
        'Brave Together (non-faith version) vetted and approved by the Hawaiʻi State Department of Education for use in secondary public schools, 2026',
        '2023 Outstanding Advocate for the Children and Youth of Hawaiʻi, awarded to Releasing Generations by Hawaiʻi’s Governor and Honolulu’s Mayor for the development of the Brave Series',
      ],
    },
    endorsements: BRAVE_ENDORSEMENTS,
    available: [
      { text: 'thebraveseries.com', href: 'https://thebraveseries.com' },
    ],
    availableLabel: 'Buy at',
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
    available: [
      { text: 'thebraveseries.com', href: 'https://thebraveseries.com' },
    ],
    availableLabel: 'Buy at',
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
    available: [
      { text: 'thebraveseries.com', href: 'https://thebraveseries.com' },
    ],
    availableLabel: 'Buy at',
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
    available: [
      { text: 'thebraveseries.com', href: 'https://thebraveseries.com' },
    ],
    availableLabel: 'Buy at',
    storyHref: '/projects/brave-series',
  },
  {
    slug: 'dancing-with-father',
    title: 'Dancing with Father',
    meta: 'Published 2011',
    cover: '/images/books/dancing-with-father.webp',
    coverAlt: 'Dancing with Father',
    teaser: 'A book of poetry, reflection, and beautiful painted illustrations.',
    description: [
      'A book of poetry, reflection, and beautiful painted illustrations. Michele wrote it out of her own difficult journey through youth, as a way for anyone else walking a similar path to know they are seen, pursued, and loved by God as Father. Short enough to read in one sitting. The kind of book readers keep close and return to again and again. Come dance with the One who joys over you with singing.',
    ],
    notes: ['Also available as an audiobook, produced in radio-drama style.'],
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
      'Michele’s founding story, told in full. Written as both testimony and reflection guide, this is the personal account behind Explicit Movement.',
    description: [
      'Michele’s founding story, told in full. Written as both testimony and reflection guide, this is the personal account behind Explicit Movement. Each chapter closes with reflection sections that turn her story into a personal guide for readers learning to hear God’s voice and take their own steps of obedience. The Speaker keynote “Finding Your Brave Purpose” is drawn from this book.',
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
      'A three-week guided journey for readers ready to sit with the questions that shape identity, healing, and purpose.',
    description: [
      'A three-week guided journey for readers ready to sit with the questions that shape identity, healing, and purpose. Each day pairs a reflection prompt with space to write, drawing from the truths that anchor the Explicit Movement teaching: your value, your identity in Christ, and the life God has invited you into. Designed for individual or small-group use. Written by the Explicit Movement team, together with friends and family of the movement. Michele served as Director and Contributing Author.',
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
