# design-references

Reference material for the site revamp. Nothing in here is deployed.

- `pages-web/` - every page of all seven source PDFs, 315 sheets. Committed. This is what
  to look at. `bt-hawaii-vol4/` is at 1600px because it is the north-star book; the other
  six are at 900px to keep the repo clonable.
- `pdf-pages/` - the same pages at 300 DPI PNG. Gitignored, local only, roughly 1.2GB.

Source PDFs are Michele's print-ready Brave Series files. See
`../DESIGN-GUIDE-MICHELE-AESTHETIC.md` for the study drawn from them, including which of
the two design families should drive which part of the site.

## The seven books

| Slug | Book | Sheets | Family |
|---|---|---|---|
| `bt-hawaii-vol4` | Brave Together Hawai'i Vol 4 Classic | 13 | Brave Together |
| `bt-vol2-classic` | Brave Together Vol 2 Classic | 53 | Brave Together |
| `bt-vol3-faith` | Brave Together Vol 3 Faith | 90 | Brave Together |
| `bb-journey-vol1` | Brave & Beautiful Journey Secular Vol 1 | 45 | Brave & Beautiful |
| `bb-vol2` | Brave & Beautiful Vol 2 Secular | 39 | Brave & Beautiful |
| `bb-vol3` | Brave & Beautiful Vol 3 Secular | 39 | Brave & Beautiful |
| `bb-vol4` | Brave & Beautiful Vol 4 Secular | 36 | Brave & Beautiful |

Interiors are two-up spreads at 5100x3300 (300 DPI), except `bt-vol3-faith`, which is
single pages. Covers are single 2550x3300 pages.

## Regenerating the 300 DPI pages

This Mac has no Homebrew, poppler, Ghostscript, ImageMagick, or Python PIL, and `sips`
renders only page one of a PDF. Pages were rendered with a small Swift tool built against
PDFKit and ImageIO, which ship with the macOS command line tools. The tool also does
percentage-based cropping, dominant-colour sampling, and contact-sheet generation, which
is how 315 pages were triaged down to the 48 extracted photographs.
