# UI microcopy, button styles, tooltip strings, form-field labels

**Purpose:** The one place for every small string that appears in the UI. Buttons, tooltips, form-field labels, form-field placeholders, and accessibility strings.

**Notes for Brett:** Consistency matters more than cleverness in microcopy. Use these strings verbatim.

---

## Nav bar labels

- Home
- About
- Works
- Speaking
- Coaching
- Blog
- Contact

The nav label for the coaching page is "Coaching," not "Work with Michele" or "Services." The buyer searches for "coaching."

## Footer nav labels

- Home
- About
- Works
- Speaking
- Coaching
- Blog
- Contact
- Privacy Policy
- Terms

## Footer copy

Copyright (c) 2026 Michele Okimura LLC. All rights reserved.

Content by Michele Okimura. Site built by Brett Moore in Fable 5. Deployed via Vercel.

## Form-field labels (used across contact, speaking, session zero, subscribe)

- Full name (never "Name" alone; the qualifier is warmer)
- Email
- Phone number
- Organization
- Message
- Tell Michele about the book you want to write. What is it about, who is it for, and what brings you to writing it now?
- Do you have a draft already? (dropdown: Yes full draft / Some chapters or scenes / No, starting from a blank page / Previously published, looking for the next book)
- How did you hear about Michele?

## Placeholder strings (inside empty form fields)

- Full name: "Jane Smith"
- Email: "jane@example.com"
- Phone: "(808) 555-0100"
- Organization: "Kalani High School"
- Message: "Tell Michele what you are thinking about."

## Aria labels for icons

- Menu toggle: "Open menu" / "Close menu"
- Search icon: "Search this site"
- Social icon (Instagram): "Michele on Instagram"
- Social icon (LinkedIn): "Michele on LinkedIn"
- Social icon (Facebook): "Michele on Facebook"

## Cookie banner (only if regulatory requirement demands one)

This site uses only essential cookies (session, security, analytics). By continuing to browse, you agree.

[ OK ] [ Learn more ]

## Loading state string

Loading... (default; do not use "One moment, please" or similar)

## Empty-state strings

- Empty search results: "No matches found. Try a different word?"
- Empty blog category: "No posts here yet. Come back soon, or read the latest at /blog."

---

## Button style hierarchy (guidance)

- **Primary.** Solid background, brand color, white text. Used once per page. The single action the reader should take.
- **Secondary.** Outlined, brand color border, brand color text. Used once or twice per page.
- **Tertiary.** Plain text with underline, brand color. Used inline in prose.

Every button visible on a page should be readable at a glance. If the reader has to squint or hover to know what a button does, rewrite the label.
