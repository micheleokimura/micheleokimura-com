# Contact popup setup

The Contact button in the top right of every page opens a popup with six intake
categories and a short form. When someone hits Send, the form posts to a Google
Apps Script Web App running in Michele's own Google Workspace. That script does
two things: it adds a row to a Google Sheet, and it emails
`michele@micheleokimura.com` with everything the person typed.

No Zapier, no third-party form service, no monthly fee. The whole backend is one
script file living in Michele's Google account.

Setup takes about ten minutes and runs once.

---

## Step 1. Create the Google Sheet

1. Go to [sheets.new](https://sheets.new) while signed in as
   `michele@micheleokimura.com`.
2. Name the spreadsheet **Contact form submissions**.
3. Rename the first tab (bottom left, it says `Sheet1`) to **Submissions**.

The script writes the header row on the first submission, so there is nothing
else to fill in. For reference, the columns end up as:

| Timestamp | Category | First Name | Last Name | Email | Phone | Organization | Message |
| --------- | -------- | ---------- | --------- | ----- | ----- | ------------ | ------- |

---

## Step 2. Open the script editor

With that spreadsheet open, go to **Extensions > Apps Script**. A new tab opens
with an empty project and a file called `Code.gs` holding a stub `myFunction`.

Opening it this way matters: the script is then bound to this specific
spreadsheet, which is how `SpreadsheetApp.getActiveSpreadsheet()` knows where to
write.

Rename the project (click **Untitled project** at the top left) to
**Contact form handler**.

---

## Step 3. Paste in the code

1. Select everything already in `Code.gs` and delete it.
2. Open `content/setup/contact-popup-google-apps-script.js` from this repo, copy
   the entire file, and paste it into `Code.gs`.
3. Click the save icon.

The one value worth checking is near the top:

```js
var NOTIFY_EMAIL = 'michele@micheleokimura.com'
```

That is where the alert emails go. Change it if Michele wants them somewhere
else, or add a second address later.

---

## Step 4. Run it once to grant permission

Google will not let a script send email or write to a sheet until it has been
approved by hand, one time.

1. In the toolbar, pick **testSubmission** from the function dropdown.
2. Click **Run**.
3. A dialog appears: **Review permissions**. Choose the
   `michele@micheleokimura.com` account.
4. Google shows a warning screen that says the app is not verified. This is
   expected for a personal script. Click **Advanced**, then
   **Go to Contact form handler (unsafe)**.
5. Click **Allow**.

The run finishes in a second or two. Check two things:

- The **Submissions** tab of the spreadsheet now has a header row plus one test
  row for "Test Submission".
- The inbox at `michele@micheleokimura.com` has an email with the subject
  "New contact form: Speaking engagement from Test Submission".

Delete the test row from the sheet once both look right.

---

## Step 5. Deploy it as a Web App

1. Top right of the script editor, click **Deploy > New deployment**.
2. Click the gear icon next to **Select type** and choose **Web app**.
3. Fill in:
   - **Description:** `Contact popup v1`
   - **Execute as:** `Me (michele@micheleokimura.com)`
   - **Who has access:** `Anyone`
4. Click **Deploy**.

**Who has access must be "Anyone."** Visitors to the website are not signed in
to Google, so anything narrower blocks every real submission. "Anyone" lets the
public URL accept a post; it does not give anyone access to the spreadsheet or
the Google account.

Copy the **Web app URL** it hands back. It looks like:

```
https://script.google.com/macros/s/AKfycb...long-string.../exec
```

Paste that URL into a browser tab as a quick check. It should print:

```json
{ "ok": true, "service": "micheleokimura.com contact form" }
```

---

## Step 6. Give the site the URL

Two ways. Either one works, and the environment variable wins if both are set.

### Option A: environment variable (preferred)

In the Vercel dashboard for `micheleokimura.com`, go to
**Settings > Environment Variables** and add:

| Name                             | Value                           | Environments                     |
| -------------------------------- | ------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_CONTACT_SCRIPT_URL` | the `/exec` URL from step 5     | Production, Preview, Development |

Then redeploy so the new value is picked up.

The `NEXT_PUBLIC_` prefix is required. The popup runs in the visitor's browser,
and only variables with that prefix are available there. The URL is not a
secret: it is an endpoint that only accepts submissions.

### Option B: edit the file

Open `src/components/ContactPopup.tsx` and replace the placeholder near the top:

```js
const SCRIPT_URL_PLACEHOLDER = 'YOUR_APPS_SCRIPT_URL_HERE'
```

Swap `YOUR_APPS_SCRIPT_URL_HERE` for the `/exec` URL, then commit and push.
Vercel deploys from `main` on its own.

Until one of these is done, the popup skips the network call and shows the
fallback message pointing people at `michele@micheleokimura.com`, so nothing
silently disappears.

---

## Step 7. Send a real one

Load the live site, click **Contact** in the top right, pick a category, fill in
the form, and hit Send. Within a few seconds:

- a new row lands in the **Submissions** tab, and
- an email arrives at `michele@micheleokimura.com` with the subject
  `New contact form: [Category] from [First Last]`.

Replying to that email goes straight back to the person who wrote in, because
the script sets their address as the reply-to.

---

## Changing the script later

Editing the code is not enough on its own. Apps Script serves whatever version
was deployed, so after any edit:

**Deploy > Manage deployments >** pencil icon **> Version: New version > Deploy**

That keeps the same URL, so nothing on the site needs to change.

---

## The six categories

The popup offers these, and the chosen one is written to the Category column and
into the email subject:

1. Speaking engagement
2. Brave Purpose Author Method (coaching)
3. Nonprofit consulting
4. Media, interview, or podcast
5. Bulk order or curriculum inquiry
6. Something else

To change the wording, edit the `CATEGORIES` array at the top of
`src/components/ContactPopup.tsx`. Each entry has a `value` (what gets recorded)
and a `label` (the shorter text on the button, kept short so all six fit on a
phone screen without scrolling). The Apps Script needs no change: it records
whatever category it receives.

---

## If submissions stop arriving

- **Nothing in the sheet or the inbox.** Open the Apps Script editor and check
  **Executions** in the left sidebar. Failed runs show the error there.
- **The site shows the fallback message every time.** The URL is probably wrong
  or the deployment access is not set to "Anyone." Load the `/exec` URL in a
  browser: it should print `{"ok":true,...}`. If it asks for a Google login,
  redeploy with access set to "Anyone."
- **It worked and then stopped after an edit.** The edit was saved but not
  deployed. See "Changing the script later" above.
- **Gmail sending quota.** A consumer Gmail account can send 500 emails a day
  from Apps Script, a Workspace account 1,500. Contact form volume is nowhere
  near this, but that is the ceiling.

---

## Files involved

| File                                                | What it is                                     |
| --------------------------------------------------- | ---------------------------------------------- |
| `src/components/ContactPopup.tsx`                   | The popup: categories, form, states, blur       |
| `src/components/SiteHeader.tsx`                     | The Contact button that opens it                |
| `content/setup/contact-popup-google-apps-script.js` | The code to paste into Apps Script              |
| `content/setup/contact-popup-setup.md`              | This guide                                      |
