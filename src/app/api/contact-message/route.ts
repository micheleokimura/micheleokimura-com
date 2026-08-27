import { NextResponse } from 'next/server'

import { siteConfig } from '@/lib/site-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Contact popup intake.
 *
 * The "Get in touch" popup used to POST straight from the browser to a Google
 * Apps Script Web App, which only ever wrote a row to a Sheet and stopped
 * working once the script URL went missing from the environment. This route
 * replaces it: same fields, but the send happens server side through Resend and
 * lands in Michele's inbox.
 *
 * Accepts the popup's own shape (interests, story, first_name, last_name,
 * email, phone) and also a plain { name, email, phone, organization, message }
 * body, so curl checks and any future form can post here without translating.
 */

type Payload = {
  name?: string
  firstName?: string
  first_name?: string
  lastName?: string
  last_name?: string
  email?: string
  phone?: string
  organization?: string
  message?: string
  story?: string
  interests?: unknown
  pageUrl?: string
  // Honeypot. Real people never fill this.
  company?: string
}

function clean(value: unknown, max = 2000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export async function POST(req: Request): Promise<NextResponse> {
  let body: Payload
  try {
    body = (await req.json()) as Payload
  } catch {
    return NextResponse.json(
      { ok: false, error: 'bad_request', message: 'Body must be JSON.' },
      { status: 400 },
    )
  }

  // Drop bots that trip the honeypot, but look successful to them.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true })
  }

  const firstName = clean(body.firstName ?? body.first_name, 80)
  const lastName = clean(body.lastName ?? body.last_name, 80)
  const name = clean(body.name, 120) || [firstName, lastName].filter(Boolean).join(' ')
  const email = clean(body.email, 200)
  const phone = clean(body.phone, 60)
  const organization = clean(body.organization, 200)
  const message = clean(body.message, 4000) || clean(body.story, 4000)
  const pageUrl = clean(body.pageUrl, 500)
  const interests = Array.isArray(body.interests)
    ? body.interests.map((item) => clean(item, 60)).filter(Boolean)
    : []

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'invalid', message: 'A valid email address is required.' },
      { status: 422 },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: 'missing_api_key',
        message:
          'RESEND_API_KEY is not set on this deployment, so no email could be sent.',
      },
      { status: 503 },
    )
  }

  const to = process.env.CONTACT_TO || siteConfig.email
  // onboarding@resend.dev is Resend's shared sender. It works with no DNS setup
  // at all, which is what gets the form live today. TODO: once Michele verifies
  // micheleokimura.com inside Resend, set CONTACT_FROM in Vercel to something
  // like "Michele Okimura <noreply@micheleokimura.com>" and this falls away.
  const from = process.env.CONTACT_FROM || 'Website <onboarding@resend.dev>'

  const who = name || email
  const subject = `Website inquiry from ${who}`
  const text = [
    'New message from the micheleokimura.com contact popup',
    '',
    `Name: ${name || '(not provided)'}`,
    `Email: ${email}`,
    `Phone: ${phone || '(not provided)'}`,
    `Organization: ${organization || '(not provided)'}`,
    `Interested in: ${interests.length ? interests.join(', ') : '(not provided)'}`,
    `Page: ${pageUrl || '(not provided)'}`,
    '',
    'Message:',
    message || '(none provided)',
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
      // Pass Resend's own words through. This is the difference between
      // guessing at a broken form and reading the actual reason.
      const detail = await res.text().catch(() => '')
      return NextResponse.json(
        { ok: false, error: 'send_failed', status: res.status, detail: detail.slice(0, 500) },
        { status: 502 },
      )
    }
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: 'send_failed', detail: String(err).slice(0, 300) },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
