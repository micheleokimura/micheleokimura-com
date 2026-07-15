import { NextResponse } from 'next/server'

import { siteConfig } from '@/lib/site-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Payload = {
  firstName?: string
  lastName?: string
  email?: string
  churchDomain?: string
  // Which CTA the signup came from (header, footer, case-study:<slug>, etc).
  source?: string
  // Honeypot. Real users never fill this.
  company?: string
}

function clean(value: unknown, max = 2000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/**
 * Wait-list intake for the shared modal.
 *
 * Fans the signup out to three places, in priority order, none of which block
 * the others:
 *  1. Google Sheet via an Apps Script web app (WAITLIST_SHEET_WEBHOOK_URL) so
 *     Brett can see every lead and which CTA it came from.
 *  2. GHL contact (best-effort) so it lands in the pipeline.
 *  3. Resend email notification (the hard requirement — a non-OK status here lets
 *     the client surface an error rather than silently dropping a lead).
 *
 * See _handoff/google-sheets-waitlist-setup-2026-06-15.md for the Sheet setup.
 */
export async function POST(req: Request): Promise<NextResponse> {
  let body: Payload
  try {
    body = (await req.json()) as Payload
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  // Drop bots that trip the honeypot, but look successful to them.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true })
  }

  const firstName = clean(body.firstName, 80)
  const lastName = clean(body.lastName, 80)
  const email = clean(body.email, 200)
  const churchDomain = clean(body.churchDomain, 200)
  const source = clean(body.source, 120) || 'unknown'
  const name = [firstName, lastName].filter(Boolean).join(' ')
  const timestamp = new Date().toISOString()

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 })
  }

  const record = { firstName, lastName, email, churchDomain, source, timestamp }

  // Best-effort fan-out. Neither the Sheet nor the CRM blocks the email.
  await Promise.allSettled([
    appendToSheet(record),
    createGhlContact({ ...record, name }),
  ])

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  const to = process.env.WAITLIST_TO || siteConfig.email
  const from =
    process.env.WAITLIST_FROM || `Michele Okimura <noreply@${siteConfig.domain}>`
  const who = name || email
  const subject = `[Wait list] New signup: ${who} (${source})`
  const text = [
    'New wait list signup',
    '',
    `Name: ${name || '(not provided)'}`,
    `Email: ${email}`,
    `Church domain: ${churchDomain || '(not provided)'}`,
    `Source: ${source}`,
    `Time: ${timestamp}`,
  ].join('\n')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text }),
    })
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

type Record = {
  firstName: string
  lastName: string
  email: string
  churchDomain: string
  source: string
  timestamp: string
}

// POST the signup to the Apps Script web app, which appends a row to the
// "CCM Wait List Signups" sheet. No-op until the webhook URL is configured.
async function appendToSheet(record: Record): Promise<void> {
  const url = process.env.WAITLIST_SHEET_WEBHOOK_URL
  if (!url) return
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  })
}

async function createGhlContact(p: Record & { name: string }): Promise<void> {
  const apiKey = process.env.GHL_API_KEY
  const locationId = process.env.GHL_LOCATION_ID
  if (!apiKey || !locationId) return

  const tags = ['wait-list-2026', `source:${p.source}`]
  await fetch('https://services.leadconnectorhq.com/contacts/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      locationId,
      firstName: p.firstName || p.name || undefined,
      lastName: p.lastName || undefined,
      email: p.email,
      website: p.churchDomain || undefined,
      source: `Website wait list (${p.source})`,
      tags,
    }),
  })
}
