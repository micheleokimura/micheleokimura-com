# WordPress micheleokimura.com — About Page Inventory (partial)

**Crawled:** 2026-08-21. Source: live WordPress site (Elementor). Partial capture — stopped mid-crawl.

## Site navigation (header)

| Label | URL |
|---|---|
| Home | https://micheleokimura.com/ |
| About | https://micheleokimura.com/about/ |
| Books | https://micheleokimura.com/books-2/ |
| Blog | https://micheleokimura.com/blog/ |
| Contact | https://micheleokimura.com/contact/ |
| Publishing | https://dreambigpublish.com/ (external) |

Site `<title>` on homepage: *"Michele Okimura – Come up with a tagline for your business here"* (unset WordPress placeholder).

## About page — structure

- URL: `https://micheleokimura.com/about/`
- `<title>`: *About – Michele Okimura*
- Section heading captured: **"Welcome."** (H2). Section heading above the timeline: **"My Story"**.
- Timeline: 24 image tiles laid out as a 3-column grid (approx 265×265px each), ordered top-to-bottom, left-to-right.
- No strict chronological sort — items are grouped roughly chronologically but item #2 (1955 sisters) sits after #1 (1962 birth), so ordering is by narrative/publish sequence, not strict date.

## Design finding — caption behavior (important)

**Captions are ALWAYS visible, not hover-triggered.**

- Elementor `image-box` widget with `.elementor-image-box-content` positioned `absolute; top:0; width:100%; height:100%; padding:20px; background: rgba(0,0,0,0.6);`
- Description text: white (`rgb(255,255,255)`), 20px, `text-align:center`, sits as an overlay panel on top of the photo.
- The dark overlay covers the entire tile at all times, so the photo reads dimmed behind the text. This is not a hover reveal — Brett's "hover interaction" impression may come from the visual pattern of overlay-over-photo, but the DOM shows it's static.
- Implication for rebuild: we can choose either (a) faithfully mirror always-on overlay, or (b) improve on it with an actual hover reveal so photos read cleanly by default and captions appear on hover. Recommend confirming with Michele/Brett.

## Timeline photos (24 items, in on-page order)

Base asset path: `https://micheleokimura.com/wp-content/uploads/`

| # | Filename (relative) | Caption text |
|---|---|---|
| 1 | `2025/09/1-mom-and-dad-scaled.jpeg` | 1962: Born in Honolulu, Hawaii. (My parents, grandma, and I) |
| 2 | `2025/09/2-sisters--scaled.jpeg` | 1955: Oldest of two beautiful younger sisters. |
| 3 | `2025/09/3-MIss-Teen-USA-scaled.jpeg` | 1979: Miss Teen USA Finalist I didn't win. But loved the experience! |
| 4 | `2025/09/4-HS-Graduation-scaled.jpeg` | 1979: Graduated from high school |
| 5 | `2025/09/5-UH-graduation.jpeg` | 1984: Graduated from college with a bachelor's degree in Elementary Education. |
| 6 | `2025/09/6-wedding-scaled.jpeg` | 1984: Married Rob after dating for three years. The love of my life and best friend. |
| 7 | `2025/09/7-Aaron-scaled.jpeg` | 1991: Overflowing joy! Adopted our son Aaron. |
| 8 | `2025/09/8-Jessica-joned--scaled.jpeg` | 1993: More rivers of joy! Adopted our daughter Jessica…who happened to be 9 days older than than Aaron! My twin-like sweeties. |
| 9 | `2025/09/9-LIfespring-Church.png` | 1997: Rob and I founded Lifespring Church. I was unconventionally qualified to be a pastor by comedian Jim Carrey, but that is another story for another time. |
| 10 | `2025/09/Renaissance-2010-and-2011-scaled.jpeg` | Renaissance Conferences in 2010 and 2011: my first two arts conferences to release people into greater creativity! |
| 11 | `2025/09/10-Dancing-with-Father-scaled.jpeg` | 2011: Published Dancing with Father. Let's heal hearts. |
| 12 | `2025/09/11-2014-EX-conference-.jpeg` | 2014: Our first island-wide youth and parent conference. Little did I know then that it would grow into a movement. |
| 13 | `2025/09/12-Middle-School-Conf.jpeg` | 2015: Unexpected curve ball! Explicit Conferences grew into a non-profit organization. And we held our first middle school, young adult, and parent conferences AND repeated our! high school conference. How ever did we do 4 in one year?!! |
| 14 | `2025/09/13-Philippines.jpeg` | 2016: Another shocker… going global! Philippines Conferences in Manila and Baguio. |
| 15 | `2025/09/14-Singapore.jpeg` | 2016: Asia here we come! Youth and Parent Conference in Singapore! |
| 16 | `2025/09/15-PACRIM.png` | 2018: Teaching my first University course. |
| 17 | `2025/09/16-EX-books-scaled.jpeg` | 2018: Published 2018: Published The Birth of Explicit Movement: Discover Keys to Fulfilling Your Purpose and the Explicit Movement 21-Day Journal. |
| 18 | `2025/09/17-SoCal-scaled.jpeg` | 2018: Hello SoCal! The first California Youth and Parent Conference. |
| 19 | `2025/09/Kingdom-Kids-Workshops.jpeg` | 2019: Began launching equipping events for parents, teachers, and leaders in raising healthy and flourishing children and youth! |
| 20 | `2025/09/ReThink-Creativity-2020-and-2021-scaled.jpeg` | MY GREAT JOY! Online Creativity Conferences in 2020 and 2021, hosting global speakers! |
| 21 | `2025/09/18-B-and-Beautiful-.jpeg` | 2022: Published the Brave & Beautiful Curriculum. Empowering teen girls and women with confidence, purpose, and tools to protect themselves from exploitation. |
| 22 | `2025/09/19-award.jpeg` | 2023: SURPRISE! Awarded the Hawaii State's 2023 'Outstanding Advocate for the Children and Youth in The State of Hawaii Award' by Mayor Blangiardi and Governor Green. Humbled greatly. I didn't even know we were nominated! |
| 23 | `2025/09/20-10th-Annniversary-scaled.jpeg` | 2023: Happy 10th Birthday to our non-profit organization Releasing Generations. Overwhelmed with gratitude for the journey. |
| 24 | `2025/09/21-dream-books-scaled.jpeg` | 2023-2025: Published the Dream Big Journals curriculum. Versions created for Preschoolers through adults. |

Note on captions #17: the WordPress content has a duplicated "2018: Published" phrase — treat as a typo on the source site, do not preserve in the rebuild.

## Homepage copy captured (partial)

Featured quotes visible on homepage:

- *"The future belongs to those who believe in the beauty of their dreams."* — Eleanor Roosevelt
- *"People, even more than things, have to be restored, renewed, revived, reclaimed, and redeemed; never throw anyone out."* — Audrey Hepburn

Homepage blog post links captured:

- https://micheleokimura.com/the-great-dance/
- https://micheleokimura.com/the-mantle/
- https://micheleokimura.com/dreaming-big/

Contact: `mailto:michele@micheleokimura.com?subject=Website%20Inquiry`

## Assets and headers

- Logo (white on dark): `https://micheleokimura.com/wp-content/uploads/2025/07/MOkimura_Logo_white-1024x595.png`
- Logo (color): `https://micheleokimura.com/wp-content/uploads/2025/07/MOkimura_Logo-scaled.png`
- Header layout: horizontal nav with duplicated mobile-menu copy (Home / About / Books / Blog / Contact / Publishing).

## NOT captured (open work for a follow-up crawl)

- Screenshot of the About page as rendered (was queued to save to `~/dev/micheleokimura-com/site/public/reference/wordpress-about-current.png` — not saved).
- Any intro paragraph, section headers below "My Story", or closing copy block on the About page beyond the 24 timeline items.
- Books, Blog, Contact page contents.
- Footer link inventory (only header was captured).
- Podcast section — not located before crawl was stopped. May not exist as its own nav item; Brett's "podcast section" reference needs a source pointer from him.
- CSS spacing/typography details beyond caption behavior (font family, line-height, tile gap, section paddings).
