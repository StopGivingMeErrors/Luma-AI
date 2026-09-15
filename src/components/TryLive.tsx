import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { openReceptionist } from '@/lib/receptionist'

export function TryLive() {
  return (
    <section id="try-live" className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="bento relative overflow-hidden px-5 py-10 sm:px-10 sm:py-14 md:px-14 md:py-20"
          style={{ borderRadius: '1.75rem' }}
        >
          <div className="pattern-dots pointer-events-none absolute inset-0 opacity-40" />
          <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="label mb-3">Try it live</p>
              <h2 className="display text-3xl text-white sm:text-4xl md:text-5xl text-balance">
                Talk to our receptionist now
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                This is the exact receptionist we build for {siteConfig.niche}. Talk to it.
              </p>
              <button
                type="button"
                onClick={() => openReceptionist()}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-all hover:brightness-110 sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                Start talking
              </button>
            </div>

            <div
              className="bento relative p-6 sm:p-8"
              style={{ borderRadius: '1.5rem 2.75rem 1.5rem 2.75rem' }}
            >
              <div className="pattern-rings pointer-events-none absolute inset-0 opacity-50" />
              <div className="relative mb-5 flex items-center gap-3">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent/20" />
                  <Phone className="relative h-4 w-4 text-accent" />
                </span>
                <div>
                  <p className="display text-xl text-white">Live demo</p>
                  <p className="text-xs text-white/55">Uses your microphone · ~30 seconds</p>
                </div>
              </div>
              <p className="relative text-sm leading-relaxed text-white/80">
                Ask about booking, hours, or a last-minute reservation. Hear how a real front desk
                sounds — without waiting for a sales call.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
