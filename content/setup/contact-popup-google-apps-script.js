/**
 * micheleokimura.com contact popup: Google Apps Script backend.
 *
 * Paste this whole file into a Google Apps Script project bound to the
 * "Contact form submissions" Google Sheet, then deploy it as a Web App.
 * Step-by-step instructions: content/setup/contact-popup-setup.md
 *
 * What it does, in order:
 *   1. Receives the JSON body the popup posts.
 *   2. Appends one row to the sheet.
 *   3. Emails michele@micheleokimura.com with every field.
 *
 * Note on the request format: the site posts with Content-Type text/plain so
 * the browser skips the CORS preflight, which Apps Script cannot answer. The
 * body is still JSON, and we parse it out of e.postData.contents below.
 */

/** Where the notification email goes. Change this to reroute the alerts. */
var NOTIFY_EMAIL = 'michele@micheleokimura.com'

/** Tab inside the spreadsheet that holds the submissions. */
var SHEET_NAME = 'Submissions'

/** Column order. The header row is written automatically on the first run. */
var HEADERS = [
  'Timestamp',
  'Category',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'Organization',
  'Message',
]

/**
 * Entry point for POST requests. Apps Script calls this automatically when the
 * deployed Web App URL receives a POST.
 */
function doPost(e) {
  try {
    var data = parseBody(e)

    // Honeypot. The popup renders a hidden "company" field that only bots fill
    // in. Report success so the bot moves on, but record nothing.
    if (String(data.company || '').trim()) {
      return jsonResponse({ ok: true })
    }

    var row = {
      timestamp: new Date(),
      category: clean(data.category, 120) || 'Something else',
      firstName: clean(data.firstName, 80),
      lastName: clean(data.lastName, 80),
      email: clean(data.email, 200),
      phone: clean(data.phone, 60),
      organization: clean(data.organization, 200),
      message: clean(data.message, 5000),
      pageUrl: clean(data.pageUrl, 300),
    }

    // An email address is the one hard requirement. Everything else can be
    // blank without losing the lead.
    if (!isEmail(row.email)) {
      return jsonResponse({ ok: false, error: 'invalid_email' })
    }

    appendRow(row)
    sendNotification(row)

    return jsonResponse({ ok: true })
  } catch (err) {
    // Log so failures are visible under Executions in the Apps Script editor.
    console.error(err)
    return jsonResponse({ ok: false, error: String(err) })
  }
}

/**
 * Answers a plain browser visit to the Web App URL. Handy for confirming the
 * deployment is live: open the /exec URL and you should see {"ok":true,...}.
 */
function doGet() {
  return jsonResponse({ ok: true, service: 'micheleokimura.com contact form' })
}

/** Pulls the JSON payload out of the POST body, whatever content type it used. */
function parseBody(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents)
    } catch (err) {
      // Fall through to form-encoded parameters below.
    }
  }
  return (e && e.parameter) || {}
}

/** Appends one submission to the sheet, creating the tab and header if needed. */
function appendRow(row) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
  }
  // First run on a fresh tab: write the header and freeze it.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.setFrozenRows(1)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
  }
  sheet.appendRow([
    row.timestamp,
    row.category,
    row.firstName,
    row.lastName,
    row.email,
    row.phone,
    row.organization,
    row.message,
  ])
}

/** Emails Michele the full submission, with reply-to set to the sender. */
function sendNotification(row) {
  var who = (row.firstName + ' ' + row.lastName).trim() || row.email
  var subject = 'New contact form: ' + row.category + ' from ' + who

  var body = [
    'New contact form submission from micheleokimura.com',
    '',
    'Category: ' + row.category,
    'Name: ' + who,
    'Email: ' + row.email,
    'Phone: ' + (row.phone || '(not provided)'),
    'Organization: ' + (row.organization || '(not provided)'),
    '',
    'Message:',
    row.message || '(none provided)',
    '',
    '---',
    'Submitted: ' + formatStamp(row.timestamp),
    'Page: ' + (row.pageUrl || '(not recorded)'),
  ].join('\n')

  var options = { name: 'micheleokimura.com' }
  // Replying to the alert goes straight back to the person who wrote in.
  if (isEmail(row.email)) {
    options.replyTo = row.email
  }

  GmailApp.sendEmail(NOTIFY_EMAIL, subject, body, options)
}

/** Trims a value to a string and caps its length. */
function clean(value, max) {
  if (value === null || value === undefined) return ''
  var text = String(value).trim()
  return text.length > max ? text.slice(0, max) : text
}

function isEmail(value) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
}

/** Readable Hawai'i time for the email footer. */
function formatStamp(date) {
  return Utilities.formatDate(date, 'Pacific/Honolulu', "MMM d, yyyy 'at' h:mm a") + ' HST'
}

/** JSON response helper. */
function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  )
}

/**
 * Optional: run this once from the editor (Run > testSubmission) to confirm the
 * sheet row and the email both work before pointing the live site at the URL.
 */
function testSubmission() {
  doPost({
    postData: {
      contents: JSON.stringify({
        category: 'Speaking engagement',
        firstName: 'Test',
        lastName: 'Submission',
        email: 'michele@micheleokimura.com',
        phone: '808-555-0100',
        organization: 'Releasing Generations',
        message: 'Checking that the contact form wiring works.',
        pageUrl: 'https://micheleokimura.com/',
      }),
    },
  })
}
