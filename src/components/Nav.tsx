import { useEffect, useId, useState } from 'react'
import { siteConfig } from '@/lib/config'
import { openReceptionist } from '@/lib/receptionist'
import { openCalBooking } from '@/lib/cal'
import { Button } from '@/components/ui/Button'

const links = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Live demo', href: '#try-live' },
  { label: 'Automations', href: '#automations' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Why Luma', href: '#why-us' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
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
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-3 py-2 transition-all duration-300 sm:px-4 ${
          scrolled || open ? 'nav-glass' : 'border border-transparent bg-transparent'
        }`}
        aria-label="Primary"
      >
        <a href="#main" className="display text-[17px] text-fg sm:text-lg">
          {siteConfig.name}
        </a>

        <div className="hidden items-center gap-7 lg:flex">
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
          <Button variant="ghost" size="sm" onClick={() => openReceptionist()}>
            Talk
          </Button>
          <Button variant="inverse" size="sm" onClick={() => void openCalBooking()}>
            Book a consultation
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line md:hidden"
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
          className="nav-glass mx-auto mt-2 max-w-6xl rounded-2xl p-5 md:hidden"
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
            <Button
              variant="inverse"
              className="mt-2 w-full"
              onClick={() => {
                setOpen(false)
                void openCalBooking()
              }}
            >
              Book a consultation
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
