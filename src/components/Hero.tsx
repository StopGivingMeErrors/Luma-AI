import { motion } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'
import { openReceptionist } from '@/lib/receptionist'
import { openCalBooking } from '@/lib/cal'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/config'

function AgentConsole() {
  return (
    <div className="surface-glass panel-live relative w-full overflow-hidden p-4 sm:p-5 lg:p-6">
      <div className="mb-3 flex items-center justify-between border-b border-line pb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-medium text-fg">Voice agent · live</span>
        </div>
        <span className="font-mono text-[10px] text-fg-dim">00:24</span>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        <div className="rounded-lg border border-line bg-surface-2/90 px-3 py-2.5">
          <p className="text-[11px] text-fg-dim">Caller</p>
          <p className="mt-1 text-sm text-fg-muted">
            Hi — do you have a table for four this Friday evening?
          </p>
        </div>
        <div className="rounded-lg border border-accent/30 bg-accent-soft px-3 py-2.5">
          <p className="text-[11px] text-accent">Luma Voice</p>
          <p className="mt-1 text-sm text-fg">
            Yes. I can hold 19:30. Shall I book it under your name?
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-bg-elevated/90 px-3 py-2.5">
          <div className="min-w-0">
            <p className="text-[11px] text-fg-dim">Outcome</p>
            <p className="truncate text-sm font-medium text-fg">Appointment booked · 19:30</p>
          </div>
          <span className="shrink-0 rounded-md bg-accent/15 px-2 py-1 text-[11px] font-medium text-accent">
            Confirmed
          </span>
        </div>
      </div>

      <div className="mt-4 flex h-8 items-end gap-[3px]" aria-hidden>
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="flex-1 rounded-sm bg-accent/40"
            style={{ height: `${22 + ((i * 37) % 68)}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-28 lg:pb-32">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-5 text-sm text-fg-muted"
            >
              {siteConfig.name} · AI agents & automation · {siteConfig.serviceArea}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="display text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1.02] text-fg text-balance"
            >
              AI agents that move your business forward.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="measure mt-5 text-base leading-relaxed text-fg-muted sm:text-lg"
            >
              From intelligent voice and chat agents to custom business automations, Luma AI helps
              businesses serve customers faster and operate smarter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button size="lg" onClick={() => void openCalBooking()}>
                Book a consultation
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => openReceptionist()}>
                <Phone className="h-4 w-4" />
                Talk to a live agent
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:col-span-6"
          >
            <div className="mx-auto w-full max-w-md lg:ml-auto lg:mr-0 lg:max-w-lg">
              <AgentConsole />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
