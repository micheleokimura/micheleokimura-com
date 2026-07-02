# About Page - Photo to Caption Mapping

**Source:** https://micheleokimura.com/about/
**Crawled:** 2026-05-22

---

## Important note on what "hover-text" means here

The brief asked for the Brené Brown-style hover-text on photos. I could not get the raw HTML of the page from this session (the proxy blocks `curl` to external hosts; the WordPress REST API URL is not in this session's provenance set; no Chrome browser is currently connected to the Claude in Chrome extension). The `web_fetch` tool returns the page as markdown, which strips out:

- `title=""`, `alt=""`, and `data-*` attributes on `<img>` tags
- CSS pseudo-element content (`::before content`, `::after content`)
- Elementor overlay widget classes (`.elementor-overlay-content`, `.elementor-image-box-content`, `.elementor-image-box-description`)
- Any JavaScript-driven `data-content` swap text

**However:** each photo on the About page is paired in the markdown with a year + caption that immediately follows it. In Elementor, the image-box widget renders an image plus an always-visible caption underneath. So the caption text below IS captured. What I cannot verify without raw HTML is whether the captions are always-visible (image-box widget) or hover-reveal (overlay widget). Both render the same in markdown.

**Action for the rebuild:** treat the table below as the canonical image-caption pairing. If the rebuild needs to preserve a hover-reveal effect, Michele or Brett should open one photo in browser dev tools, confirm whether the caption is always-visible or hover-only, and tell the developer.

---

## Image to caption table

The photo files all live under `https://micheleokimura.com/wp-content/uploads/2025/09/` unless otherwise noted. Listed in the page's display order.

| # | Image filename | Caption text (as it appears with the photo) |
|---|---|---|
| 1 | `1-mom-and-dad-scaled.jpeg` | 1962: Born in Honolulu, Hawaii. (My parents, grandma, and I) |
| 2 | `2-sisters--scaled.jpeg` | 1955: Oldest of two beautiful younger sisters. |
| 3 | `3-MIss-Teen-USA-scaled.jpeg` | 1979: Miss Teen USA Finalist I didn't win. But loved the experience! |
| 4 | `4-HS-Graduation-scaled.jpeg` | 1979: Graduated from high school |
| 5 | `5-UH-graduation.jpeg` | 1984: Graduated from college with a bachelor's degree in Elementary Education. |
| 6 | `6-wedding-scaled.jpeg` | 1984: Married Rob after dating for three years. The love of my life and best friend. |
| 7 | `7-Aaron-scaled.jpeg` | 1991: Overflowing joy! Adopted our son Aaron. |
| 8 | `8-Jessica-joned--scaled.jpeg` | 1993: More rivers of joy! Adopted our daughter Jessica...who happened to be 9 days older than than Aaron! My twin-like sweeties. |
| 9 | `9-LIfespring-Church.png` | 1997: Rob and I founded Lifespring Church. I was unconventionally qualified to be a pastor by comedian Jim Carrey, but that is another story for another time. |
| 10 | `Renaissance-2010-and-2011-scaled.jpeg` | Renaissance Conferences in 2010 and 2011: my first two arts conferences to release people into greater creativity! |
| 11 | `10-Dancing-with-Father-scaled.jpeg` | 2011: Published Dancing with Father. Let's heal hearts. |
| 12 | `11-2014-EX-conference-.jpeg` | 2014: Our first island-wide youth and parent conference. Little did I know then that it would grow into a movement. |
| 13 | `12-Middle-School-Conf.jpeg` | 2015: Unexpected curve ball! Explicit Conferences grew into a non-profit organization. And we held our first middle school, young adult, and parent conferences AND repeated our! high school conference. How ever did we do 4 in one year?!! |
| 14 | `13-Philippines.jpeg` | 2016: Another shocker... going global! Philippines Conferences in Manila and Baguio. |
| 15 | `14-Singapore.jpeg` | 2016: Asia here we come! Youth and Parent Conference in Singapore! |
| 16 | `15-PACRIM.png` | 2018: Teaching my first University course. |
| 17 | `16-EX-books-scaled.jpeg` | 2018: Published 2018: Published The Birth of Explicit Movement: Discover Keys to Fulfilling Your Purpose and the Explicit Movement 21-Day Journal. |
| 18 | `17-SoCal-scaled.jpeg` | 2018: Hello SoCal! The first California Youth and Parent Conference. |
| 19 | `Kingdom-Kids-Workshops.jpeg` | 2019: Began launching equipping events for parents, teachers, and leaders in raising healthy and flourishing children and youth! |
| 20 | `ReThink-Creativity-2020-and-2021-scaled.jpeg` | MY GREAT JOY! Online Creativity Conferences in 2020 and 2021, hosting global speakers! |
| 21 | `18-B-and-Beautiful-.jpeg` | 2022: Published the Brave & Beautiful Curriculum. Empowering teen girls and women with confidence, purpose, and tools to protect themselves from exploitation. |
| 22 | `19-award.jpeg` | 2023: SURPRISE! Awarded the Hawaii State's 2023 'Outstanding Advocate for the Children and Youth in The State of Hawaii Award' by Mayor Blangiardi and Governor Green. Humbled greatly. I didn't even know we were nominated! |
| 23 | `20-10th-Annniversary-scaled.jpeg` | 2023: Happy 10th Birthday to our non- profit organization Releasing Generations. Overwhelmed with gratitude for the journey. |
| 24 | `21-dream-books-scaled.jpeg` | 2023-2025: Published the Dream Big Journals curriculum. Versions created for Preschoolers through adults. |

---

## Source file mapping (Brett's master folder, 2026-05-22)

The 20 high-resolution originals from Brett's `about page photos and text/` folder have been copied into `images/about/original/` (and WebP versions into `images/about/webp/`). They map back to the live-site table above as follows.

| Source filename (Brett's master folder) | Maps to table row # | Caption summary |
|---|---|---|
| `1 - mom and dad.jpeg` | 1 | 1962: Born in Honolulu |
| `2 - sisters .jpeg` | 2 | 1955 [typo, see flag #1]: Oldest of two younger sisters |
| `3 - MIss Teen USA.jpeg` | 3 | 1979: Miss Teen USA Finalist |
| `4 - HS Graduation.jpeg` | 4 | 1979: Graduated from high school |
| `5 - UH graduation.jpeg` | 5 | 1984: Graduated from college |
| `6 - wedding.jpeg` | 6 | 1984: Married Rob |
| `7 - Aaron.jpeg` | 7 | 1991: Adopted son Aaron |
| `8 - Jessica joned .jpeg` | 8 | 1993: Adopted daughter Jessica |
| `9 - LIfespring Church.png` | 9 | 1997: Founded Lifespring Church |
| `10- Dancing with Father.jpeg` | 11 | 2011: Published Dancing with Father |
| `12 - Middle School Conf..jpeg` | 13 | 2015: Explicit Conferences become a non-profit |
| `13 - Philippines.jpeg` | 14 | 2016: Philippines Conferences |
| `14 - Singapore.jpeg` | 15 | 2016: Singapore Youth and Parent Conference |
| `15 - PACRIM.png` | 16 | 2018: First University course (PACRIM) |
| `16 - EX books.jpeg` | 17 | 2018: Published The Birth of Explicit Movement + 21-Day Journal |
| `17 - SoCal.jpeg` | 18 | 2018: First California Youth and Parent Conference |
| `18- B and Beautiful .jpeg` | 21 | 2022: Published Brave & Beautiful Curriculum |
| `19 - award.jpeg` | 22 | 2023: Hawaii State Outstanding Advocate Award |
| `20 - 10th Annniversary.jpeg` | 23 | 2023: 10th anniversary of Releasing Generations |
| `21 - dream books.jpeg` | 24 | 2023-2025: Published Dream Big Journals curriculum |

**Source-side numbering note:** The source files are numbered 1 through 21 with **#11 missing**. Source #11 would correspond to row 12 on the live site (`11-2014-EX-conference-.jpeg`, caption "2014: Our first island-wide youth and parent conference. Little did I know then that it would grow into a movement."). If the rebuild needs that photo, request it from Brett or pull it from the live-site upload directory.

**Three captions on the live site have no matching numbered source in Brett's master folder:**

- Row 10 - Renaissance Conferences 2010/2011 (live file: `Renaissance-2010-and-2011-scaled.jpeg`)
- Row 19 - Kingdom Kids Workshops 2019 (live file: `Kingdom-Kids-Workshops.jpeg`)
- Row 20 - ReThink Creativity 2020/2021 (live file: `ReThink-Creativity-2020-and-2021-scaled.jpeg`)

These appear to have been added on the live site without making it back into Brett's master folder. To verify, check the live-site WordPress media library, or ask Brett.

### Canva check (2026-05-22)

I searched Michele's Canva account by title for "Renaissance", "Kingdom Kids", "ReThink Creativity", "EX Conference 2014", and several broader sweeps. **None of the four missing About-page photos turned up as identifiable Canva designs.**

Specifically:
- "Renaissance" returned ZERO matching designs.
- "Kingdom Kids" returned 25 marketing/curriculum designs, none of which are the 2019 workshop photo.
- "ReThink Creativity" returned generic creativity-themed marketing material, not the conference photo.
- "EX Conference 2014" returned EX-branded conference flyers and posters from 2022-2025, not the 2014 photo.

I also inspected the four highest-probability candidate designs (Media Kit, Releasing Generations Ideas, Identity 2, Adventure Continues 2). None of them contain a bio timeline or the 4 missing photos.

The Canva MCP cannot text-search the `Uploads` folder, which has 1000+ raw images with mostly hash filenames - so the photos may still be there, just not findable programmatically. See `../canva-inventory.md` for the full Canva survey and a recommendation for manual lookup.

**Best paths to actually get these 4 photos into the archive:**
1. Pull them directly from the live WordPress site at `https://micheleokimura.com/wp-content/uploads/2025/09/`, which has all 4 files.
2. Or open Canva manually, go to Uploads, sort by oldest first, and scan visually.

---

## Flags for Michele / Brett to review

1. **Item #2's date appears wrong on the live site.** The caption reads "1955" but Michele was born in 1962 (per item #1). This is almost certainly a typo. The rebuild should fix it (likely should say "1965" for "oldest of two younger sisters", or a different year that matches when her sisters arrived).

2. **Item #17 has a doubled prefix.** The caption begins "2018: Published 2018: Published..." - the words "2018: Published" appear twice. Clear typo on the live site. The rebuild should clean it up to a single "2018: Published The Birth of Explicit Movement..."

3. **Item #13's caption ends in "?!!"** - just flagging in case the rebuild prefers cleaner punctuation. ("How ever did we do 4 in one year?!!")

4. **Hover vs always-visible captions.** Per the note at the top, I could not verify from this session whether these captions are displayed always-visible (Elementor image-box widget) or hover-reveal (Elementor overlay widget). Both render identically in the markdown I pulled. To verify, open https://micheleokimura.com/about/ in a browser and check: do the captions appear under the photos at all times, or only on hover? If hover, the rebuild needs to preserve that interaction.

5. **Filename oddities to keep as-is when downloading.** Some filenames have double dashes or unusual capitalization (`2-sisters--scaled.jpeg`, `8-Jessica-joned--scaled.jpeg`, `9-LIfespring-Church.png` with capital L-I, `20-10th-Annniversary-scaled.jpeg` with three n's). The originals in `images/about/original/` keep these names verbatim so they're preserved.

---

## Caveat

The image-caption pairing is high confidence: every photo in the markdown is followed immediately by exactly one block of caption text, in the same order they render on the page. If the live site moves a photo or reorders the timeline, the pairing here will need to be re-checked.
