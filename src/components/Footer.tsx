import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { openReceptionist } from '@/lib/receptionist'
import { openCalBooking } from '@/lib/cal'
import { Button } from '@/components/ui/Button'

export function Footer() {
  return (
    <footer className="px-5 pb-10 pt-4 sm:px-6 sm:pb-12">
      <div className="surface mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-14">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="display text-2xl text-fg sm:text-3xl">{siteConfig.name}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-muted">
              AI voice agents, chat agents, and workflow automation for businesses{' '}
              {siteConfig.serviceArea}.
            </p>
            <p className="mt-4 text-xs text-fg-dim">Service area: {siteConfig.serviceArea}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="secondary" onClick={() => openReceptionist()}>
              Talk to a live agent
            </Button>
            <Button onClick={() => void openCalBooking()}>
              Book a consultation
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 text-xs text-fg-dim sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => void openCalBooking()}
            className="text-left text-fg-dim transition-colors hover:text-fg-muted"
          >
            Schedule a consultation
          </button>
        </div>
      </div>
    </footer>
  )
}
