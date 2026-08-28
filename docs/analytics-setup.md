# Analytics setup walkthrough

Everything on this page is free and stays free. There is no trial and no card
required for any of the four.

The code is already deployed and waiting. Nothing tracks anything until the
matching value is added in Vercel, so you can do these in any order, one per
sitting, and stop whenever you like.

## Before you start

Two things worth knowing, because they explain most of the confusion people hit
with this setup.

**1. A new value needs a redeploy.** These values get baked into the site's
JavaScript when the site is built. Adding one in Vercel does not change the
live site by itself. You have to redeploy afterward, which is one button and
takes about a minute. There is a section at the bottom that walks through it.

**2. Data takes a day to look like anything.** Google Analytics fills its
"Realtime" report within a minute or two, but the normal reports lag 24 to 48
hours. Clarity needs a handful of sessions before heatmaps are useful. Search
Console can take a few days to show search data even though verification is
instant. Empty reports on day one are normal.

Each section below ends with the exact variable name and value to add. Collect
them as you go, then add them all to Vercel in one pass at the end.

---

## 1. Vercel Analytics and Speed Insights

The easiest one. No account to create, no value to copy, because the site is
already hosted on Vercel.

**Analytics** tells you how many people visited and which pages they read.
**Speed Insights** tells you how fast the site felt to real visitors on their
real phones.

1. Go to https://vercel.com and sign in.
2. Open the **micheleokimura-com** project.
3. Click the **Analytics** tab at the top, then click **Enable**.
4. Click the **Speed Insights** tab, then click **Enable**.

That is the whole thing. Both start collecting on the next page view.

Bookmark these two, they are where you will read the numbers:

- Analytics: `https://vercel.com/<your-team>/micheleokimura-com/analytics`
- Speed Insights: `https://vercel.com/<your-team>/micheleokimura-com/speed-insights`

Replace `<your-team>` with whatever appears in the address bar once you are in
the project. Easier still, just click the tabs and bookmark the page you land
on.

**Variable to add later:** none.

One note on the free tier: Vercel Analytics keeps 30 days of history and caps
at 50,000 events a month. The site is nowhere near that, and Google Analytics
below is the one that keeps history forever, so the cap does not matter.

---

## 2. Google Analytics 4

The long-memory one. Free with no expiry, and it keeps history for years, which
is what makes it worth setting up now even though the numbers will be small at
first.

1. Go to https://analytics.google.com and sign in with a Google account.
   Use the account you want to own this data long term.
2. If this is your first property, Google walks you through account creation.
   If not, click the gear icon (**Admin**) in the bottom left, then **Create**,
   then **Property**.
3. **Account name:** `Michele Okimura` (this is the container, one account can
   hold several properties).
4. **Property name:** `micheleokimura.com`
5. Set the time zone to **Hawaii** and the currency to **US Dollar**. Time zone
   matters, it decides where Google draws the line between one day and the
   next in every report.
6. Answer the business questions. Industry **Other**, size **Small**. None of
   it changes how tracking works, it only tunes which suggestions Google shows
   you.
7. On the "Start collecting data" screen choose **Web**.
8. **Website URL:** `https://micheleokimura.com`
   **Stream name:** `micheleokimura.com`
9. Click **Create stream**.
10. You land on a page showing a **Measurement ID** in the top right. It looks
    like `G-ABC1234XYZ`. Copy it.

Google then offers you installation instructions and a pile of tag options.
Skip all of it. The site already has the code. All it needs is that ID.

**Variable to add later:**

```
NEXT_PUBLIC_GA_MEASUREMENT_ID = G-ABC1234XYZ
```

Use your real ID, not the example.

---

## 3. Microsoft Clarity

The one that shows you what people actually did. Heatmaps of where they
clicked, and video recordings of real sessions. Free with no limits, no sampling
and no paid tier at all.

This is the most useful of the four for a site like this one, because it
answers questions the others cannot. Which part of the Author page do people
read before they leave. Does anyone find the Contact button. Where does the
scroll stop.

1. Go to https://clarity.microsoft.com and click **Sign up**.
2. Sign in with a Microsoft account. If you do not have one, the page offers to
   create one, and any email address works, including a Gmail one.
3. Click **New project**.
4. **Name:** `micheleokimura.com`
   **Website URL:** `https://micheleokimura.com`
   **Site category:** whatever fits closest, it only affects benchmark
   comparisons.
5. Click **Add new project**.
6. Clarity shows a setup screen asking how you want to install it. Choose
   **Install manually** or **Install tracking code**, whichever the screen
   offers.
7. You are shown a code snippet. You do not need the snippet. Inside it, find
   the short ID near the end, in a line that looks like:

   ```
   "clarity", "script", "abcd1234ef"
   ```

   That last quoted value, `abcd1234ef`, is the project ID. Copy it.

   You can also find it any time under **Settings**, then **Overview**, listed
   as the project ID.

**Variable to add later:**

```
NEXT_PUBLIC_CLARITY_PROJECT_ID = abcd1234ef
```

Clarity will keep saying the site is not verified until it receives its first
real page view. That clears itself after the redeploy at the end.

---

## 4. Google Search Console

The one that shows what people typed into Google before they found the site,
and which pages Google has and has not indexed. Different from Analytics:
Analytics covers people already on the site, Search Console covers everything
that happens before they arrive.

This one has a small ordering wrinkle. Verification only succeeds after the
token is live on the site, so it is: get token, add to Vercel, redeploy, then
come back and click Verify.

1. Go to https://search.google.com/search-console and sign in with the same
   Google account you used for Analytics.
2. You are asked to choose a property type. Two boxes appear.
   Choose the right-hand one, **URL prefix**.
3. Enter `https://micheleokimura.com` and click **Continue**.
4. A verification panel opens with several methods. Ignore the recommended
   HTML file method, it needs a file upload. Expand **HTML tag** instead.
5. You are shown a full meta tag:

   ```html
   <meta name="google-site-verification" content="AbCdEf123456_xyz789" />
   ```

   **Copy only the value inside `content`**, so `AbCdEf123456_xyz789` in this
   example. Not the whole tag. The site builds the tag around the token
   itself, and pasting the entire tag in will fail verification.
6. **Leave this browser tab open.** You need the Verify button on it after the
   redeploy.

**Variable to add later:**

```
NEXT_PUBLIC_GSC_VERIFICATION = AbCdEf123456_xyz789
```

---

## 5. Add the variables to Vercel and redeploy

Do this once, after you have collected whichever values you have.

### Add the variables

1. Go to https://vercel.com and open the **micheleokimura-com** project.
2. Click **Settings**, then **Environment Variables** in the left sidebar.
3. For each value you collected, click **Add**, then fill in:
   - **Key:** the variable name, exactly as written above, including the
     `NEXT_PUBLIC_` prefix. It is case sensitive.
   - **Value:** the ID or token. No quotes, no spaces at either end. It is
     worth clicking into the box and pressing End to check nothing trailed in
     from the copy.
   - **Environments:** tick **Production**, **Preview**, and **Development**.
4. Click **Save** after each one.

The three possible keys:

| Key | Value looks like | Where it came from |
| --- | --- | --- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-ABC1234XYZ` | Google Analytics |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | `abcd1234ef` | Microsoft Clarity |
| `NEXT_PUBLIC_GSC_VERIFICATION` | `AbCdEf123456_xyz789` | Search Console |

### Redeploy

This is the step that actually turns the tracking on.

1. Click the **Deployments** tab.
2. Find the deployment at the top of the list, the current one.
3. Click the **...** menu on its right, then **Redeploy**.
4. In the dialog, leave **Use existing Build Cache** unticked, then confirm.
5. Wait for the status to go green, roughly one to two minutes.

### Finish Search Console

Back on the Search Console tab you left open, click **Verify**. It should
succeed immediately. If it does not, give the deploy another minute and try
again, since it is checking the live page.

Once verified, do one more thing while you are there. In the left sidebar click
**Sitemaps**, enter `sitemap.xml`, and click **Submit**. That tells Google
where the site's page list lives and speeds up indexing considerably.

---

## Checking it worked

Wait for the deploy to finish, then:

**Google Analytics.** Open https://micheleokimura.com in a normal browser tab
and click around a few pages. In Analytics go to **Reports**, then
**Realtime**. You should appear within a minute or so as one active user. If
you use an ad blocker it will block Google Analytics, so try a private window
or a different browser before concluding something is broken.

**Clarity.** Open the Clarity dashboard. The "not verified" warning clears
once it sees a page view. Recordings show up within a few minutes, heatmaps
need more traffic before they mean anything.

**Vercel Analytics.** The Analytics tab fills within a few minutes of real
traffic.

**Search Console.** Verification is instant. Actual search data takes a few
days, and indexing coverage can take a couple of weeks to settle.

---

## Turning any of it off

Delete the variable in Vercel and redeploy. The site stops loading that
product's script entirely and nothing else changes. Vercel Analytics and Speed
Insights have their own toggle on their dashboard tabs.

One caution on Search Console: leave `NEXT_PUBLIC_GSC_VERIFICATION` in place
permanently once verified. Google re-checks the tag periodically, and removing
the token un-verifies the property.

---

## Notes for whoever maintains this

The implementation is deliberately dependency free. All four are wired with
first-party script endpoints rather than the npm wrappers
(`@vercel/analytics`, `@vercel/speed-insights`, `@next/third-parties`,
`@microsoft/clarity`), because this repo is edited on a machine with no Node
installed, so `pnpm-lock.yaml` cannot be regenerated. Vercel builds with
`--frozen-lockfile`, so adding a dependency to `package.json` without a
matching lockfile entry fails the build.

Files involved:

- `src/app/layout.tsx` mounts the Vercel beacons, the GA4 tag, and the
  Search Console meta tag through the Next `metadata.verification` API.
- `src/components/ClarityAnalytics.tsx` injects the Clarity tag client side.

One behavioral difference is worth recording. The Vercel Analytics npm package
reports page views using the Next route pattern, for example
`/speaker/messages/[slug]`. The plain script reports the literal URL, for
example `/speaker/messages/finding-your-brave`. For this site that is arguably
the more useful grouping, since each message page is its own piece of content
rather than an instance of a template. If it ever becomes a problem, install
`@vercel/analytics` and `@vercel/speed-insights` on a machine with Node, swap
the two `<Script>` tags in `layout.tsx` for `<Analytics />` and
`<SpeedInsights />`, and commit the updated lockfile alongside it.
