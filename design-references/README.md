# design-references

Reference material for the site revamp. Nothing in here is deployed.

- `pages-web/` - every page of each source PDF, 1600px JPEG. Committed. This is what to look at.
- `pdf-pages/` - the same pages at 300 DPI PNG. Gitignored, local only, roughly 284MB.
  Regenerate with the Swift PDFKit renderer described below if you need print-resolution crops.

Source PDFs are Michele's print-ready Brave Series files. See
`../DESIGN-GUIDE-MICHELE-AESTHETIC.md` for the study drawn from them.

## Regenerating the 300 DPI pages

This Mac has no Homebrew, poppler, Ghostscript, ImageMagick, or Python PIL. Pages were
rendered with a small Swift tool built against PDFKit, which ships with the macOS command
line tools. `sips` alone only renders page one of a PDF.
