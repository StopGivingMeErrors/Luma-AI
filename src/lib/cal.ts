import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { siteConfig } from '@/lib/config'

const CAL_NS = 'luma'

let calReady: Promise<Awaited<ReturnType<typeof getCalApi>>> | null = null

function ensureCal() {
  if (!calReady) {
    calReady = getCalApi({ namespace: CAL_NS }).then((cal) => {
      cal('ui', {
        theme: 'dark',
        cssVarsPerTheme: {
          dark: { 'cal-brand': '#3ecf8e' },
          light: { 'cal-brand': '#3ecf8e' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
      return cal
    })
  }
  return calReady
}

function openCalFallback() {
  window.open(siteConfig.calUrl, '_blank', 'noopener,noreferrer')
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
    openCalFallback()
  }
}

/** Loads Cal embed once for the whole app. */
export function CalProvider() {
  useEffect(() => {
    void ensureCal()
  }, [])
  return null
}
