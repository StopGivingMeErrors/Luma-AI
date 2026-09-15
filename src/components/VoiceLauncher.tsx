import { useCallback, useEffect, useRef, useState } from 'react'
import { Mic, PhoneOff, X } from 'lucide-react'
import { RetellClient, type WebCallSession } from 'retell-client-js-sdk'
import { retellConfig } from '@/lib/config'
import { requestMicrophoneAccess } from '@/lib/receptionist'
import { openCalBooking } from '@/lib/cal'

type CallState = 'idle' | 'connecting' | 'live' | 'error'

function MisconfiguredLauncher() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener('luma:open-receptionist', onOpen)
    return () => window.removeEventListener('luma:open-receptionist', onOpen)
  }, [])

  if (!open) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[9999] flex justify-end p-4 sm:p-6">
      <div className="pointer-events-auto bento relative w-[min(100vw-2rem,18rem)] rounded-2xl p-4 pr-10 text-sm">
        <p className="mb-2 text-white/90">
          Voice demo isn&apos;t configured yet. Book a consultation instead.
        </p>
        <button
          type="button"
          onClick={() => void openCalBooking()}
          className="text-accent underline underline-offset-2"
        >
          Book a meeting
        </button>
        <button
          type="button"
          className="absolute right-2 top-2 p-1 text-fg-dim"
          onClick={() => setOpen(false)}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

/**
 * Custom floating launcher — no Retell FAB script, so no double-button glitch.
 * Uses Retell Web SDK for the voice call.
 */
export function VoiceLauncher() {
  const [bubbleVisible, setBubbleVisible] = useState(false)
  const [micError, setMicError] = useState<string | null>(null)
  const [callState, setCallState] = useState<CallState>('idle')
  const callRef = useRef<WebCallSession | null>(null)
  const clientRef = useRef<RetellClient | null>(null)
  const openedRef = useRef(false)
  const { publicKey, agentId } = retellConfig

  useEffect(() => {
    // Remove any leftover Retell widget script/FAB from older builds
    document.getElementById('retell-widget')?.remove()
    document.getElementById('luma-hide-retell-fab')?.remove()
    const root = document.getElementById('retell-widget-root')
    if (root) root.style.display = 'none'
  }, [])

  useEffect(() => {
    if (!publicKey) return
    clientRef.current = new RetellClient({ key: publicKey })
  }, [publicKey])

  const endCall = useCallback(async () => {
    try {
      await callRef.current?.end()
    } catch {
      /* ignore */
    }
    callRef.current = null
    setCallState('idle')
  }, [])

  const startCall = useCallback(async () => {
    if (!publicKey || !agentId || !clientRef.current) return
    if (callRef.current) return

    setMicError(null)
    setBubbleVisible(false)

    const mic = await requestMicrophoneAccess()
    if (!mic.ok) {
      setMicError(mic.message || 'Microphone unavailable.')
      setCallState('error')
      return
    }

    openedRef.current = true
    setCallState('connecting')

    try {
      const call = clientRef.current.createWebCall({
        agent_id: agentId,
        hooks: {
          onStatus: (status) => {
            if (status === 'live') setCallState('live')
            if (status === 'ended') {
              callRef.current = null
              setCallState('idle')
            }
          },
          onEnd: () => {
            callRef.current = null
            setCallState('idle')
          },
          onError: (err) => {
            console.error(err)
            callRef.current = null
            setCallState('error')
            setMicError(
              'Could not start the call. Check your mic, or book a consultation.',
            )
          },
        },
      })
      callRef.current = call
    } catch {
      setCallState('error')
      setMicError('Could not start the call. Please try again.')
    }
  }, [publicKey, agentId])

  useEffect(() => {
    const handler = () => {
      if (callState === 'live' || callState === 'connecting') {
        void endCall()
      } else {
        void startCall()
      }
    }
    window.addEventListener('luma:open-receptionist', handler)
    return () => window.removeEventListener('luma:open-receptionist', handler)
  }, [startCall, endCall, callState])

  useEffect(() => {
    let showT: number
    let hideT: number
    let cycleT: number

    const run = () => {
      showT = window.setTimeout(() => {
        if (!openedRef.current && callState === 'idle') setBubbleVisible(true)
        hideT = window.setTimeout(() => {
          setBubbleVisible(false)
          cycleT = window.setTimeout(run, 5000)
        }, 5000)
      }, 5000)
    }
    run()
    return () => {
      window.clearTimeout(showT)
      window.clearTimeout(hideT)
      window.clearTimeout(cycleT)
    }
  }, [callState])

  useEffect(() => {
    return () => {
      void callRef.current?.end()
    }
  }, [])

  if (!publicKey || !agentId) {
    // Still listen so Talk CTAs get feedback when env is missing
    return <MisconfiguredLauncher />
  }

  const isActive = callState === 'live' || callState === 'connecting'

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[9999] flex justify-end p-4 sm:p-6">
      <div className="pointer-events-auto flex max-w-full flex-col items-end gap-3">
        {micError && (
          <div className="bento relative w-[min(100vw-2rem,18rem)] rounded-2xl p-4 pr-10 text-sm">
            <p className="mb-2 text-white/90">{micError}</p>
            <button
              type="button"
              onClick={() => void openCalBooking()}
              className="text-accent underline underline-offset-2"
            >
              Book a free consultation
            </button>
            <button
              type="button"
              className="absolute right-2 top-2 p-1 text-fg-dim"
              onClick={() => {
                setMicError(null)
                setCallState('idle')
              }}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {bubbleVisible && !micError && !isActive && (
          <button
            type="button"
            onClick={() => void startCall()}
            className="bento w-[min(100vw-2rem,15rem)] rounded-2xl px-4 py-3 text-left text-sm text-white shadow-xl"
          >
            Want to hear how we answer your calls? Talk to me.
          </button>
        )}

        {/* Single premium launcher — dark capsule + accent orb */}
        <button
          type="button"
          onClick={() => (isActive ? void endCall() : void startCall())}
          aria-label={isActive ? 'End call' : 'Talk to our receptionist'}
          className={`group relative flex items-center gap-3 overflow-hidden rounded-full border pl-2 pr-5 transition-all duration-300 ${
            isActive
              ? 'border-red-400/30 bg-red-500/15 text-white'
              : 'border-line-strong bg-surface-2/90 text-fg shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl hover:border-accent/40 hover:bg-surface-3'
          } h-14`}
        >
          <span
            className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              isActive ? 'bg-red-500 text-white' : 'bg-accent text-bg'
            }`}
          >
            {!isActive && (
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
            )}
            {isActive ? (
              <PhoneOff className="relative h-4 w-4" />
            ) : (
              <Mic className="relative h-4 w-4" />
            )}
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="text-[13px] font-medium tracking-tight">
              {callState === 'connecting'
                ? 'Connecting…'
                : callState === 'live'
                  ? 'End call'
                  : 'Talk to receptionist'}
            </span>
            <span className="text-[10px] text-fg-dim">
              {isActive ? 'Tap to hang up' : 'Live voice demo'}
            </span>
          </span>
        </button>
      </div>
    </div>
  )
}
