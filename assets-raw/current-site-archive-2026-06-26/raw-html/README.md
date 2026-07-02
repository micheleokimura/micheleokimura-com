# raw-html/ folder

This folder is meant to hold the raw page source for each URL crawled. In this session, the sandbox could only fetch via the markdown-converting `web_fetch` tool. True page HTML (with full DOM, `title=""`/`alt=""` attributes, Elementor widget classes, hover-state CSS, etc.) was not retrievable because:

- the outbound proxy blocks direct `curl` / `wget` / Python `urllib` requests to micheleokimura.com (returns "blocked-by-allowlist")
- the WordPress REST API endpoint (`/wp-json/wp/v2/pages?slug=...`) is not in this session's provenance set
- no Chrome browser was connected to the Claude in Chrome extension at crawl time

What this folder DOES contain: nothing yet. The page content has been captured into clean markdown under `pages/`. To get true raw HTML for any of these pages later, the simplest paths are:

1. Run a session with the proxy allowlist updated to include micheleokimura.com, then re-fetch via `curl`.
2. Open the page in Safari or Chrome, do View Source (Cmd+Option+U), select all, copy, paste into a `.html` file in this folder.
3. Install the Claude in Chrome browser extension, run a session, and use `mcp__Claude_in_Chrome__javascript_tool` with `document.documentElement.outerHTML` to grab the rendered HTML.

The pages crawled were:

- home: https://micheleokimura.com/
- about: https://micheleokimura.com/about/
- books: https://micheleokimura.com/books-2/
- blog: https://micheleokimura.com/blog/
- contact: https://micheleokimura.com/contact/
- the-great-dance: https://micheleokimura.com/the-great-dance/
- the-mantle: https://micheleokimura.com/the-mantle/
- dreaming-big: https://micheleokimura.com/dreaming-big/
