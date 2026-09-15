import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { openCalBooking } from '@/lib/cal'

const features = [
  'Answers every call 24/7',
  `${siteConfig.pricing.includedMinutes} minutes included each month`,
  `€${siteConfig.pricing.overageEuroPerMinute.toFixed(2)} per extra minute`,
  'Books appointments and takes messages',
  'Keeps your existing phone number',
  'Custom automations for your stack',
]

export function Pricing() {
  const { monthlyEuro, includedMinutes, overageEuroPerMinute } = siteConfig.pricing

  return (
    <section id="pricing" className="px-4 py-16 sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 max-w-2xl sm:mb-14"
        >
          <p className="label mb-3">Pricing</p>
          <h2 className="display text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
            Less than one missed week
          </h2>
          <p className="mt-4 text-base text-fg-muted sm:text-lg">
            The average small business loses $126,000 a year to missed calls. This costs a fraction
            of that.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-5 lg:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="bento relative overflow-hidden p-6 sm:p-8 lg:col-span-3 lg:min-h-[420px] lg:p-10"
            style={{ borderRadius: '2.25rem 1.5rem 2.25rem 1.5rem' }}
          >
            <div className="pattern-grid pointer-events-none absolute inset-0 opacity-50" />
            <div className="pointer-events-none absolute -right-16 top-10 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
            <p className="label relative">Full-service receptionist</p>
            <div className="relative mt-4 flex flex-wrap items-baseline gap-2">
              <span className="display text-5xl text-white sm:text-6xl lg:text-7xl">€{monthlyEuro}</span>
              <span className="text-white/60">/month</span>
            </div>
            <p className="relative mt-3 text-sm text-white/75">
              Includes {includedMinutes} minutes. Extra at €{overageEuroPerMinute.toFixed(2)}.
            </p>

            <ul className="relative mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => void openCalBooking()}
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-all hover:brightness-110 sm:mt-10"
            >
              Book a meeting
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="bento relative flex min-h-[240px] flex-col justify-between overflow-hidden border-accent/25 bg-accent-soft p-6 sm:min-h-[280px] sm:p-8 lg:col-span-2 lg:min-h-[420px] lg:p-10"
            style={{ borderRadius: '1.5rem 2.75rem 1.5rem 2.75rem' }}
          >
            <div className="pattern-rings pointer-events-none absolute inset-0 opacity-70" />
            <div className="relative">
              <p className="label text-white/60">Cost of doing nothing</p>
              <p className="display mt-4 text-5xl text-white sm:text-6xl">$126K</p>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                Average yearly loss from unanswered calls. One booked appointment covers months of
                Luma AI.
              </p>
            </div>
            <p className="relative mt-8 text-sm font-medium text-warn">
              Free trial available if it&apos;s a good fit.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
