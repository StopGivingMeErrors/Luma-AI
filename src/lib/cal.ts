import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { siteConfig } from '@/lib/config'

const CAL_NS = 'luma'

let calReady: Promise<Awaited<ReturnType<typeof getCalApi>>> | null = null

function applyCalUi(cal: Awaited<ReturnType<typeof getCalApi>>) {
  try {
    cal('ui', {
      theme: 'dark',
      cssVarsPerTheme: {
        dark: { 'cal-brand': '#3ecf8e' },
        light: { 'cal-brand': '#3ecf8e' },
      },
      hideEventTypeDetails: false,
      layout: 'month_view',
    })
  } catch {
    // Theming must never block booking.
  }
}

function ensureCal() {
  if (!calReady) {
    calReady = getCalApi({ namespace: CAL_NS })
      .then((cal) => {
        applyCalUi(cal)
        return cal
      })
      .catch((err) => {
        // Allow a later click to retry instead of sticking on a rejected promise.
        calReady = null
        throw err
      })
  }
  return calReady
}

function openCalFallback() {
  window.open(siteConfig.calUrl, '_blank', 'noopener,noreferrer')
}

/** Last-resort path when the cached embed promise is wedged. */
function openCalNamespaceModal() {
  const cal = (window as Window & {
    Cal?: { ns?: Record<string, ((...args: unknown[]) => void) | undefined> }
  }).Cal?.ns?.[CAL_NS]
  if (!cal) return false
  applyCalUi(cal as Awaited<ReturnType<typeof getCalApi>>)
  cal('modal', {
    calLink: siteConfig.calLink,
    config: {
      layout: 'month_view',
      theme: 'dark',
    },
  })
  return true
}

/** Opens Cal.com availability modal for the configured event. */
export async function openCalBooking() {
  try {
    const cal = await ensureCal()
    cal('modal', {
      calLink: siteConfig.calLink,
      config: {
        layout: 'month_view',
        theme: 'dark',
      },
    })

    // Stuck loader (common with one-off / ended Cal links) → open Cal page
    window.setTimeout(() => {
      const box = document.querySelector('cal-modal-box')
      if (box?.getAttribute('state') === 'loading') {
        box.remove()
        openCalFallback()
      }
    }, 4500)
  } catch {
    if (!openCalNamespaceModal()) openCalFallback()
  }
}

/** Loads Cal embed once for the whole app. */
export function CalProvider() {
  useEffect(() => {
    void ensureCal()
  }, [])
  return null
}
