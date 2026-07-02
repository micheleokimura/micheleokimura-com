# Deployment guide

**Purpose:** Every step from "code committed to `main`" to "site live at `micheleokimura.com`."

**Reader:** Brett, Michele, or a future Cowork session touching the deployment.

---

## The pipeline

```
edit content in this repo
      |
      v
git commit + push to main
      |
      v
GitHub webhook fires
      |
      v
Vercel builds site/
      |
      v
Vercel deploys to production
      |
      v
micheleokimura.com serves the new build
```

Elapsed time from commit to live: typically 30-90 seconds.

---

## First-time Vercel setup

1. Sign in to Vercel at `vercel.com` with either Michele's account or a shared LLC account. If Brett owns the Vercel side of the operator work, Brett's Vercel account can host the project; Michele's GitHub is the source repo either way.
2. Click **Add New Project**.
3. Import from Git repo: choose `micheleokimura/micheleokimura-com`.
4. Configure:
   - **Framework preset:** Next.js (or Astro, if that was the pick).
   - **Root directory:** `site/`.
   - **Build command:** `npm run build`.
   - **Output directory:** `.next` (Next.js) or `dist` (Astro).
   - **Node version:** 20.x LTS or later.
5. Environment variables: add any secret keys the site needs (form endpoint, newsletter API key, etc.). None required for the initial content-only build.
6. Deploy.

The first deploy will run automatically. Once complete, Vercel gives you a preview URL like `micheleokimura-com.vercel.app`. Confirm the site renders. Fix any build errors before wiring up the custom domain.

---

## Custom domain: `micheleokimura.com`

### DNS switch

The domain is currently pointed at the WordPress host. To switch to Vercel:

1. Log in to the domain registrar (likely GoDaddy, Google Domains, Namecheap, or Cloudflare). Michele owns this account.
2. Locate the DNS management panel.
3. Update the following records:

**For the apex domain (`micheleokimura.com`):**

- Type: `A`, Name: `@`, Value: `76.76.21.21`, TTL: 300

**For the `www` subdomain (`www.micheleokimura.com`):**

- Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`, TTL: 300

**Remove any conflicting A or CNAME records** pointing at the WordPress host.

**Preserve the MX records** for Michele's email (`michele@micheleokimura.com`). These are Google Workspace records and are independent of the web hosting. Do not modify them.

### Add the domain in Vercel

1. In the Vercel project settings, go to **Domains**.
2. Add `micheleokimura.com` and `www.micheleokimura.com`.
3. Vercel will verify DNS. This takes 5-60 minutes.
4. Vercel automatically issues an SSL certificate via Let's Encrypt. This takes another few minutes.
5. When both green, the site is live at `micheleokimura.com`.

### Redirect www -> apex (or apex -> www; pick one)

In Vercel settings, set `www.micheleokimura.com` to redirect to `micheleokimura.com` (recommended for brevity), or the other direction if Michele prefers. Vercel handles the 301 redirect.

---

## Post-launch verification

Within 24 hours of the domain switch:

- [ ] Site loads at `micheleokimura.com` (HTTPS with valid cert).
- [ ] Site loads at `www.micheleokimura.com` (redirects to apex).
- [ ] All pages return HTTP 200.
- [ ] `robots.txt` is served at `micheleokimura.com/robots.txt`.
- [ ] `sitemap.xml` is served at `micheleokimura.com/sitemap.xml`.
- [ ] Google Search Console verified (see below).
- [ ] Bing Webmaster Tools verified.

### Google Search Console

1. Add `micheleokimura.com` as a property in Google Search Console.
2. Verify via DNS TXT record or via a meta tag in the site's `<head>`.
3. Submit `sitemap.xml`.
4. Watch impressions and click-through data over the first 30 days.

### Bing Webmaster Tools

1. Add the property.
2. Verify via meta tag.
3. Submit sitemap.

---

## Ongoing deployment

Once wired up, deployment is fully automated. Every push to `main` produces a fresh build.

For content updates:

1. Edit the Markdown file in `content/`.
2. Commit and push to `main`.
3. Wait 60 seconds. Refresh the site.

For schema updates:

1. Edit the JSON-LD file in `schema/`.
2. Commit and push to `main`.
3. Wait 60 seconds.
4. Validate at `search.google.com/test/rich-results`.

For dependency updates:

1. Bump versions in `site/package.json`.
2. Test locally with `npm run build`.
3. Commit and push to `main`.
4. Vercel builds and deploys.

---

## Rollback

Vercel keeps every deployment. To roll back:

1. Go to the Vercel project's Deployments tab.
2. Find the last known-good deployment.
3. Click the three-dot menu, then **Promote to Production**.

Rollback is instant.

---

## Failure modes and remedies

- **Build fails.** Check the build logs in Vercel. Common causes: missing environment variable, syntax error in a Markdown file frontmatter, invalid JSON in a schema file. Fix and re-push.
- **Site loads but pages are blank.** Content pull failed. Check that Markdown files have valid frontmatter and that the content library is finding them.
- **SSL error.** Domain not yet fully propagated or Vercel has not yet issued the cert. Wait 15 minutes and refresh.
- **Sitemap not found.** Build did not generate it. Confirm the sitemap-generation code runs at build time.

---

## Contact

Deployment questions: `brett@brettkmore.com`.

Content questions: `michele@micheleokimura.com`.
