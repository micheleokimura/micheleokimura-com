# Wikidata entity draft: Michele Okimura

Working draft for submitting a Wikidata item. Nothing here has been submitted.

**How to use this file.** Create the item at <https://www.wikidata.org/wiki/Special:NewItem>,
then add statements one at a time from the table below. When the item is created,
copy its QID (looks like `Q123456789`) into `wikidataId` in
`src/lib/site-config.ts`. That one edit adds the Wikidata URL to the `sameAs`
array in every JSON-LD block on the site, which is the link that lets search
engines and AI answer engines tie the site and the Wikidata item together as one
entity.

---

## Read this before you submit

Wikidata is not Wikipedia and the bar is much lower: an item needs to be a
"clearly identifiable conceptual or material entity" that can be described with
referenced statements. A published author with a state-conferred award clears
that comfortably. **A Wikidata item is realistic now.**

Two rules will decide whether the item survives:

1. **Every statement needs a reference.** An unreferenced item gets tagged and
   may get merged or deleted. The reference column below is not optional.
2. **A subject's own website is a weak but acceptable source on Wikidata** for
   uncontroversial self-descriptive facts (occupation, employer, official
   website). It is not acceptable for the award or the DOE booklet approval. Those need
   the third-party sources flagged below.

**Conflict of interest.** If Michele creates the item herself she should say so
on her Wikidata user page. Self-created items are allowed and common; undisclosed
ones attract scrutiny.

---

## Identifiers we hold

| Thing | Value | Status |
| ----- | ----- | ------ |
| Official website | <https://micheleokimura.com> | Confirmed |
| Nonprofit | Releasing Generations, <https://releasinggenerations.org> | Confirmed |
| Program site | Explicit Movement, <https://www.explicitmovement.org> | Confirmed |
| Amazon author page | `B0086P0V0S` | Confirmed, in `site-config.ts` |
| LinkedIn | `michele-okimura-36861951` | Confirmed |
| Instagram | `michele_okimura` | Confirmed |
| Facebook | `michele.okimura` | Confirmed |
| ISBN, *Dancing with Father* | 978-1613792711 | Confirmed |
| VIAF / ISNI / Library of Congress | none known | **Not yet held.** See "Worth doing first" below. |
| ORCID | none known | Not applicable |

---

## Statements to add

Confidence column: **High** means the QID is standard and safe to use.
**Verify** means search Wikidata for the right item before saving, because
guessing a QID is how a wrong claim gets into the graph.

| Property | Value | QID confidence | Reference to attach |
| -------- | ----- | -------------- | ------------------- |
| P31 instance of | human (`Q5`) | High | none needed |
| P21 sex or gender | female (`Q6581072`) | High | micheleokimura.com/about |
| P27 country of citizenship | United States of America (`Q30`) | High | micheleokimura.com/about |
| P19 place of birth | Honolulu (`Q18094`) | High | micheleokimura.com/about |
| P569 date of birth | **BLANK — Michele to fill** | n/a | Leave empty rather than guess. See privacy note below. |
| P106 occupation | writer (`Q36180`) | High | micheleokimura.com/author |
| P106 occupation | teacher (`Q37226`) | High | micheleokimura.com/about |
| P106 occupation | public speaker | Verify | micheleokimura.com/speaker |
| P106 occupation | pastor | Verify — search "pastor"; do not reuse a "priest" or "cleric" item | micheleokimura.com/about |
| P108 employer | Releasing Generations | **No item exists yet.** Create it first, or skip P108. | releasinggenerations.org |
| P112 founded by (on the RG item, not hers) | Michele Okimura | after both items exist | releasinggenerations.org |
| P734 family name | Okimura | Verify — search for the family-name item, not the surname string | micheleokimura.com |
| P735 given name | Michele | Verify — search for the given-name item | micheleokimura.com |
| P1477 birth name | **HOLD. Do not add.** | n/a | See the name flag below. |
| P800 notable work | *Dancing with Father* | needs a work item, or skip | ISBN 978-1613792711 |
| P800 notable work | *The Birth of Explicit Movement* | needs a work item, or skip | micheleokimura.com/works/birth-of-explicit-movement |
| P800 notable work | The Brave Series | needs a work item, or skip | micheleokimura.com/projects/brave-series |
| P166 award received | Outstanding Advocate for Children and Youth of Hawaiʻi | **Needs a third-party source.** See below. | see notability section |
| P937 work location | Honolulu (`Q18094`) | High | micheleokimura.com/about |
| P973 described at URL | <https://micheleokimura.com> | High | self |
| P856 official website | <https://micheleokimura.com> | High | self |
| P2003 Instagram username | `michele_okimura` | High | linked from the site footer |
| P2013 Facebook ID | `michele.okimura` | High | linked from the site footer |
| P4033 Mastodon address | none | n/a | Skip. Michele has no Mastodon account. |

### Properties the brief listed that should NOT be added

- **P2437 is "number of seasons" (a TV property), not LinkedIn.** Wikidata has
  deliberately not had a general LinkedIn personal-profile property; proposals
  have been rejected on privacy grounds. Put LinkedIn in the site's JSON-LD
  `sameAs` (already done) and leave it off Wikidata.
- **P2002 (X/Twitter) and P2397 (YouTube channel ID)**: only add these once the
  social-links task confirms the accounts exist. Michele has no confirmed
  account on either today, and a wrong handle is worse than a missing one.

### Two holds worth respecting

**P569 date of birth.** Wikidata publishes dates of birth openly and they are
scraped constantly. Michele should decide whether she wants hers public. Year
only is an accepted compromise. Leaving it blank costs the item nothing.

**P1477 birth name.** `research/RECONCILIATION.md` (Flag 2) records that several
correspondents address Michele as "Lea", raising the possibility that her legal
first name differs from the name she publishes under. **This is unconfirmed and
Michele has not answered the question.** Do not put an unconfirmed legal name on
Wikidata, where it would be permanent, public, and mirrored. Resolve it with
Michele first, and only add it if she wants it public.

---

## Worth doing first: get a library identifier

The single highest-value thing that could be done before submitting is to obtain
a **VIAF or Library of Congress Name Authority** record. Wikidata items for
authors are routinely matched and trusted on the strength of a library authority
ID, and it is the identifier that most reliably pulls an author into the
knowledge graphs the AI answer engines read. *Dancing with Father* has an ISBN,
which is the usual route in. This is a slower track than Wikidata itself, but it
is the one with the longest payoff.

---

## Notability case

Wikidata does not require notability in the Wikipedia sense, so this section is
really the evidence base for the individual statements.

**Strong, and independently verifiable:**

- **2023 Outstanding Advocate for the Children and Youth of the State of
  Hawaiʻi**, conferred at the 30th anniversary of Hawaiʻi Children and Youth Day
  by Governor Josh Green and Mayor Rick Blangiardi. The award went to Michele and
  the Explicit Movement team.
  *Sourcing status:* the only citation currently in the repo is
  `explicitmovement.org/about/leadership-team`, which is Michele's own
  organization. **An independent source is needed** — a state or City and County
  of Honolulu proclamation, a Children and Youth Day programme, or press
  coverage. Ask Michele whether she holds the physical proclamation.
- **The Hawaiʻi Brave Together three-article booklet was reviewed and approved by
  the Hawaiʻi Department of Education** for the state's Sexual Violence
  Prevention Initiative. Teacher lessons written by Phyllis Unebasami, retired
  Hawaiʻi Deputy Superintendent.
  *Sourcing status:* strong claim, currently sourced only to the site. **A DOE
  approval letter or listing would make this the strongest fact in the item.**
- **Published books with ISBNs.** *Dancing with Father* (Xulon Press, 2011,
  ISBN 978-1613792711) is verifiable through booksellers and library catalogues.

**Weaker than the briefing suggested — checked and corrected:**

- **"Keynote at Missio Nexus global conference."** No record of a keynote exists
  anywhere in this repo. What the repo documents is a **podcast appearance**:
  Michele was a guest of Ted Esler, President and CEO of Missio Nexus, on The
  Mission Matters podcast in February 2026 (`content/copywriting/speaking.md`),
  plus an advance book endorsement from Missio Nexus. A podcast guest spot is
  not a keynote and should not be claimed as one. If a keynote did happen,
  Michele can supply the event and date and it can be added.
- **"Mentioned in Ed Silvoso's *Ekklesia*."** No reference to the book *Ekklesia*
  exists anywhere in this repo. The documented Silvoso connection is personal
  correspondence via Transform Our World, which `content/case-studies/_inbox-mining-rg/`
  marks as private. **Do not cite this until someone has the book in hand and can
  give a page number.** Note that `research/RECONCILIATION.md` Flag 3 records a
  previous instance of a fabricated biographical claim entering this workspace
  from an earlier chat session; that is exactly the failure mode to avoid here.

**Not yet in evidence:**

- Independent press coverage. `research/05-google-knowledge-panel-strategy.md`
  lists Hawaiʻi press interviews (Star-Advertiser, Hawaii Business, KHON2,
  Hawaii News Now) as an **unchecked to-do**, which means no such coverage exists
  yet. This is the gap that matters most, and it is the gap that decides the
  Wikipedia question separately from Wikidata.

---

## Order of operations

1. Resolve the name question (Flag 2) with Michele.
2. Decide the date-of-birth privacy question with Michele.
3. Chase one independent source for the award and one for the DOE booklet approval.
4. Create the item with the High-confidence statements only.
5. Add the Verify-marked statements after checking each QID.
6. Copy the QID into `wikidataId` in `src/lib/site-config.ts`.
7. Consider creating a separate item for Releasing Generations, then link the
   two with P108 / P112.
