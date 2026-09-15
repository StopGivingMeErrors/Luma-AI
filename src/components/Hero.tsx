import { ArrowUpRight, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedBlob } from './AnimatedBlob'
import { siteConfig } from '@/lib/config'
import { openReceptionist } from '@/lib/receptionist'
import { openCalBooking } from '@/lib/cal'

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Single blob instance — repositioned via CSS (avoids dual RAF loops) */}
      <div
        className="pointer-events-none absolute z-0 mx-auto h-[48vw] max-h-[360px] w-full opacity-80 sm:h-[42vw] inset-x-0 bottom-0 lg:inset-y-[6%] lg:right-[-12%] lg:left-auto lg:bottom-auto lg:mx-0 lg:h-[90%] lg:max-h-none lg:w-[62%] lg:opacity-100 xl:right-[-6%] xl:w-[54%]"
        aria-hidden
      >
        <AnimatedBlob className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-36 pt-28 sm:px-6 sm:pb-28 lg:pb-24 lg:pt-24">
        <div className="max-w-xl lg:max-w-[36rem]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="label mb-5"
          >
            {siteConfig.name} · {siteConfig.serviceArea}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="display text-[clamp(2.6rem,8vw,5.25rem)] leading-[0.96] text-fg text-balance"
          >
            Never miss a call again
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-md text-base leading-relaxed text-fg-muted sm:text-lg"
          >
            An always-on receptionist for hotels, restaurants, salons, barbers, and clinics.
            Every ring answered.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={() => void openCalBooking()}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-[14px] font-medium text-bg transition-all hover:brightness-110"
            >
              Book a meeting
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => openReceptionist()}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-surface/60 px-6 text-[14px] font-medium text-fg backdrop-blur-md transition-colors hover:border-fg/25 hover:bg-surface-2"
            >
              <Phone className="h-4 w-4" />
              Talk to our receptionist
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
