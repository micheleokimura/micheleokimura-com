'use client'

import { useEffect } from 'react'

/**
 * Microsoft Clarity (heatmaps and session recordings, free tier).
 *
 * Read at module scope on purpose. NEXT_PUBLIC_* vars are inlined by the
 * bundler at BUILD time, so this is a literal string in the shipped bundle,
 * not a runtime lookup. The practical consequence: setting the var in Vercel
 * does nothing until the next deploy. See docs/analytics-setup.md.
 */
const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

const SCRIPT_ID = 'ms-clarity'

/**
 * Injects Clarity's tag once, client side, and only when the project ID is
 * set. With the var unset this renders nothing and requests nothing, so local
 * dev and any preview build without the var stay completely untracked.
 *
 * This appends the tag directly rather than reproducing Clarity's window
 * bootstrap. That bootstrap exists only to queue `clarity(...)` calls made
 * before the remote tag finishes loading, and nothing on this site makes one.
 * If we ever call the Clarity API directly (`clarity('identify', ...)`), the
 * queue shim has to come back with it.
 */
export function ClarityAnalytics() {
  useEffect(() => {
    if (!projectId) return
    // Strict Mode runs effects twice in dev, and Clarity double-counts if the
    // tag lands twice.
    if (document.getElementById(SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.async = true
    script.src = `https://www.clarity.ms/tag/${projectId}`
    document.head.appendChild(script)
  }, [])

  return null
}
