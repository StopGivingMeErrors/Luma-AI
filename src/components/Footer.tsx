import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { openReceptionist } from '@/lib/receptionist'
import { openCalBooking } from '@/lib/cal'

export function Footer() {
  return (
    <footer className="px-5 pb-8 pt-6 sm:px-6 sm:pb-10">
      <div
        className="bento relative mx-auto max-w-6xl overflow-hidden px-6 py-12 sm:px-10 sm:py-14 md:px-12"
        style={{ borderRadius: '2rem' }}
      >
        <div className="pattern-dots pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="display text-2xl text-white sm:text-3xl">{siteConfig.name}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
              AI receptionists for {siteConfig.niche}. Serving businesses {siteConfig.serviceArea}.
            </p>
            <p className="mt-4 text-xs text-white/45">Service area: {siteConfig.serviceArea}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openReceptionist()}
              className="rounded-full border border-line-strong px-5 py-3 text-sm text-fg transition-colors hover:bg-surface-2"
            >
              Talk to receptionist
            </button>
            <button
              type="button"
              onClick={() => void openCalBooking()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-bg"
            >
              Book a meeting
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 text-xs text-fg-dim sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => void openCalBooking()}
            className="text-left hover:text-fg-muted"
          >
            Schedule a consultation
          </button>
        </div>
      </div>
    </footer>
  )
}
