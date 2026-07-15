'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { JoinWaitListModal } from '@/components/wait-list/JoinWaitListModal'

type WaitListContextValue = {
  /** Open the shared wait-list modal, tagging which CTA the lead came from. */
  openWaitListModal: (source: string) => void
}

const WaitListContext = createContext<WaitListContextValue | null>(null)

export function useWaitList(): WaitListContextValue {
  const ctx = useContext(WaitListContext)
  if (!ctx) {
    throw new Error('useWaitList must be used inside <WaitListProvider>')
  }
  return ctx
}

/**
 * App-wide host for the single wait-list modal. Every `<JoinWaitListButton>`
 * calls `openWaitListModal(source)` to open it; the `source` string is carried
 * into the submission payload so signups are attributed to the exact CTA that
 * was clicked (header, footer, a specific case study, etc.). Wrapped around the
 * whole tree in the root layout so the modal lives once and is reachable from
 * anywhere.
 */
export function WaitListProvider({ children }: { children: React.ReactNode }) {
  const [source, setSource] = useState<string | null>(null)

  const openWaitListModal = useCallback((nextSource: string) => {
    setSource(nextSource)
  }, [])

  const close = useCallback(() => setSource(null), [])

  return (
    <WaitListContext.Provider value={{ openWaitListModal }}>
      {children}
      <JoinWaitListModal source={source} onClose={close} />
    </WaitListContext.Provider>
  )
}
