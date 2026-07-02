# Logo guidelines

**Scope:** How to use the Michele Okimura wordmark and icon.

---

## Files available

The four logo files live in `assets-raw/current-site-archive-2026-06-26/images/shared/original/`:

- `MOkimura_Logo.png` (full wordmark, dark)
- `MOkimura_Logo_white.png` (full wordmark, white for dark backgrounds)
- `MOkimura_Logo_icon_blk.png` (icon-only mark, dark)
- `MOkimura_Logo_icon_white.png` (icon-only mark, white)

## Where each version goes

- **Full wordmark, dark.** Header on light backgrounds. Favicon should render an icon-only fallback since the wordmark does not shrink well.
- **Full wordmark, white.** Footer on the Warm Ivory background sometimes falls to gold; the white wordmark works on darker overlays like the Deep Charcoal footer band.
- **Icon-only, dark.** Favicon, social profile picture, and header lockup at very small sizes (below 40px height).
- **Icon-only, white.** Icon on dark backgrounds.

## Minimum size

- Wordmark: 120px wide minimum. Below this, use the icon-only mark.
- Icon: 24px wide minimum.

## Clear space

Maintain clear space around the logo equal to the height of the "M" in "Michele" on all sides.

## Do not

- Do not stretch, rotate, skew, or recolor the logo.
- Do not put the logo on a busy photograph without a semi-transparent overlay.
- Do not use the logo in text ("as seen at [logo]okimura.com"). Type Michele Okimura in words.

## Favicon

Use `MOkimura_Logo_icon_blk.png` rendered to a 512x512 PNG and a 32x32 ICO. Both should live in `site/public/` at build time.

## Open graph / social preview image

Create a 1200x630 open-graph image with:

- The full wordmark (dark on Warm Ivory) top left.
- A recent stage photo of Michele center-right.
- Tagline "Author. Speaker. Coach." bottom center.
- Save to `site/public/og-image.jpg`.

If not available at build time, use a solid Warm Ivory background with the wordmark and a "micheleokimura.com" URL as a placeholder.
