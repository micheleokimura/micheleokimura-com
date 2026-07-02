# Schema markup templates: strategy and per-type notes

**Purpose:** The strategy behind the JSON-LD schema files in `schema/`. Which schema goes on which page, what fields matter, and what to keep updated over time.

**Date:** 2026-07-01

---

## The eight schema types the site needs

Each has a template in `schema/`:

1. `person.jsonld` - Michele's Person schema. Goes on the About page and injected as `sameAs` reference from every page footer.
2. `organization.jsonld` - Michele Okimura LLC (primary). Also a version for Releasing Generations if we choose to represent the nonprofit here.
3. `service-brave-purpose-author-method.jsonld` - Service schema on the coaching offering page.
4. `book-brave-purpose.jsonld` - Book schema template. Copy per book on `/works/<slug>` pages.
5. `article-template.jsonld` - Article schema for blog posts.
6. `faqpage-template.jsonld` - FAQPage schema on the FAQ page.
7. `breadcrumb-template.jsonld` - BreadcrumbList on every non-home page.
8. `howto-template.jsonld` - HowTo schema for tutorial blog posts.

---

## Per-page schema coverage matrix

| Page | Schemas |
|---|---|
| `/` (home) | Organization, WebSite (with SearchAction), Person (via `sameAs`) |
| `/about` | Person (primary), Breadcrumb |
| `/works` | ItemList (of the case studies), Breadcrumb |
| `/works/<slug>` (each case study) | Book (or CreativeWork for non-book items), Breadcrumb |
| `/coaching/the-brave-purpose-author-method` | Service, Breadcrumb, FAQPage (Section 11 questions) |
| `/coaching/session-zero` | Service, Breadcrumb |
| `/speaking` | Service (as EventSeries / SpeakingEngagement), Breadcrumb |
| `/faq` | FAQPage (primary), Breadcrumb |
| `/blog` | Blog, Breadcrumb |
| `/blog/<slug>` (each post) | Article, Breadcrumb, HowTo (only on tutorial posts) |
| `/contact` | ContactPage, Breadcrumb |
| `/works/dream-big` etc (book pages) | Book (with Person as author) |

---

## Field priorities

### Person (Michele)

Required for rich results:
- `@type: Person`
- `name: Michele Okimura`
- `url: https://micheleokimura.com`
- `image: https://micheleokimura.com/michele-headshot.jpg`
- `jobTitle: Author, speaker, and founder of Michele Okimura LLC`

Recommended:
- `sameAs`: LinkedIn, Facebook, Instagram, Amazon author page, Explicit Movement bio
- `birthPlace: Honolulu, Hawaii, USA`
- `worksFor: Michele Okimura LLC + Releasing Generations` (both, as arrays)
- `alumniOf: University of Hawaii at Manoa + Kalani High School`
- `award: Outstanding Advocate for Children and Youth (State of Hawaii, 2023)`
- `knowsAbout: memoir writing, book coaching, Christian author coaching, purpose, dreaming, healing, sexual integrity, children's ministry, teen leadership development`
- `hasOccupation`: Author, Speaker, Executive Director, Coach

### Organization (Michele Okimura LLC)

- `@type: Organization`
- `name: Michele Okimura LLC`
- `url: https://micheleokimura.com`
- `logo: https://micheleokimura.com/logo.png`
- `founder: Michele Okimura (Person reference)`
- `foundingDate: 2017`
- `address: PostalAddress with city Honolulu, state HI, country US`
- `contactPoint: ContactPoint with email michele@micheleokimura.com`
- `sameAs`: LinkedIn, other social profiles

### Service (The Brave Purpose Author Method)

- `@type: Service`
- `name: The Brave Purpose Author Method`
- `provider: Michele Okimura (Person reference)`
- `description`: the one-paragraph program description
- `serviceType: Author coaching`
- `offers: Offer` with price `4997.00 USD`
- `areaServed: Worldwide (virtual)` with note about in-person on Oahu
- `hasOfferCatalog`: reference to the two-payment and six-payment plans

### Book (each of Michele's works)

- `@type: Book`
- `name`: the book title
- `author: Michele Okimura` (Person reference)
- `isbn` where available
- `datePublished` where available
- `publisher`: the imprint
- `bookFormat: Paperback, Ebook, Audiobook` as applicable
- `inLanguage: en`
- `about`: the topic
- `description`: the positioning paragraph
- `image`: cover URL
- `offers`: purchase link

### FAQPage

- `@type: FAQPage`
- `mainEntity`: array of `Question` objects
- Each Question has `name` (the question) and `acceptedAnswer` (the answer as Text)

Every FAQ question on `/faq` MUST match an entry in the JSON-LD. Keep the two in sync.

### Article (each blog post)

- `@type: Article` (or `BlogPosting`)
- `headline`: the post title
- `datePublished` and `dateModified`
- `author: Michele Okimura` (Person reference)
- `publisher: Michele Okimura LLC` (Organization reference)
- `image`: featured image URL
- `mainEntityOfPage`: the post URL
- `description`: the excerpt

### BreadcrumbList

- `@type: BreadcrumbList`
- `itemListElement`: array of `ListItem` with `position`, `name`, `item` (URL)

### HowTo (tutorial blog posts only)

- `@type: HowTo`
- `name`: the tutorial title
- `step`: array of `HowToStep`

---

## Validation

Validate every schema template at `search.google.com/test/rich-results` before shipping. The rich-results test also flags missing recommended fields.

---

## Update discipline

- The **Person** schema needs an update when Michele's award list, works list, or affiliations change.
- The **Book** schema needs an update per book on release (add `datePublished`, `isbn`, `offers`).
- The **Service** schema needs an update if the anchor price or the program name changes.
- The **FAQPage** schema needs an update every time an answer changes on `/faq`.

Assign schema updates to whoever is closest to the change. Michele or Brett runs a validator pass at least quarterly.
