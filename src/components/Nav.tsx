import { useEffect, useId, useState } from 'react'
import { siteConfig } from '@/lib/config'
import { openReceptionist } from '@/lib/receptionist'
import { openCalBooking } from '@/lib/cal'

const links = [
  { label: 'Problem', href: '#problem' },
  { label: 'Try live', href: '#try-live' },
  { label: 'Automations', href: '#automations' },
  { label: 'Pricing', href: '#pricing' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 transition-all duration-400 ${
          scrolled || open
            ? 'glass rounded-2xl border border-line px-3 py-2.5 sm:px-5'
            : 'rounded-2xl px-1 py-2.5 sm:px-2'
        }`}
        aria-label="Primary"
      >
        <a href="#main" className="display text-lg text-fg sm:text-xl">
          {siteConfig.name}
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-fg-muted transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => openReceptionist()}
            className="rounded-full px-3 py-2 text-[13px] text-fg-muted transition-colors hover:text-fg"
          >
            Talk
          </button>
          <button
            type="button"
            onClick={() => void openCalBooking()}
            className="rounded-full bg-fg px-4 py-2 text-[13px] font-medium text-bg transition-transform hover:scale-[1.02]"
          >
            Book a meeting
          </button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5" aria-hidden>
            <span className={`block h-px w-4 bg-fg transition ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`block h-px w-4 bg-fg transition ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-4 bg-fg transition ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </div>
        </button>
      </nav>

      {open && (
        <div
          id={menuId}
          className="glass mx-auto mt-2 max-w-6xl rounded-2xl border border-line p-5 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="display text-2xl text-fg"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                void openCalBooking()
              }}
              className="mt-2 rounded-full bg-fg px-5 py-3 text-center text-sm font-medium text-bg"
            >
              Book a meeting
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
