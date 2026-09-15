import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'

const ease = [0.22, 1, 0.36, 1] as const

function GeoCircles() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" aria-hidden>
      <circle cx="85%" cy="18%" r="48" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent/40" />
      <circle cx="85%" cy="18%" r="78" fill="none" stroke="currentColor" strokeWidth="1" className="text-fg/10" />
      <circle cx="85%" cy="18%" r="112" fill="none" stroke="currentColor" strokeWidth="1" className="text-fg/5" />
      <circle cx="12%" cy="88%" r="36" fill="currentColor" className="text-accent/15" />
    </svg>
  )
}

function GeoTriangles() {
  return (
    <svg className="pointer-events-none absolute right-3 top-3 h-20 w-20 opacity-50 sm:right-4 sm:top-4 sm:h-28 sm:w-28" aria-hidden>
      <polygon points="48,6 90,86 6,86" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-accent/50" />
      <polygon points="48,22 76,74 20,74" fill="none" stroke="currentColor" strokeWidth="1" className="text-fg/20" />
      <circle cx="48" cy="52" r="3" className="fill-accent" />
    </svg>
  )
}

export function ProblemBento() {
  const [a, b, c, hero] = siteConfig.stats

  return (
    <section id="problem" className="relative px-4 py-16 sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease }}
          className="mb-8 max-w-2xl sm:mb-14"
        >
          <p className="label mb-3">The problem</p>
          <h2 className="display text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
            Missed calls are lost money
          </h2>
          <p className="mt-4 text-base text-fg-muted sm:text-lg">
            When your front desk is busy, guests and patients go elsewhere.
          </p>
        </motion.div>

        {/* Same bento structure: hero + side tiles. Reflows to fit width. */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-12 md:grid-rows-[auto_auto] lg:gap-5">
          {/* $126K */}
          <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease, delay: 0.04 }}
            className="bento relative min-h-[260px] overflow-hidden p-6 sm:min-h-[300px] sm:p-8 md:col-span-7 md:row-span-2 md:min-h-[420px] lg:rounded-[2.5rem] lg:p-10"
            style={{ borderRadius: '2rem' }}
          >
            <div className="pattern-rings pointer-events-none absolute inset-0" />
            <GeoCircles />
            <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
            <p className="label relative text-white/70">Cost of silence</p>
            <p className="display relative mt-5 text-5xl text-white sm:mt-8 sm:text-7xl lg:text-8xl">
              {hero.value}
            </p>
            <p className="relative mt-4 max-w-xs text-sm leading-relaxed text-white sm:mt-6 sm:text-base">
              {hero.label}
            </p>
            <p className="relative mt-6 text-xs text-white/70 sm:mt-10">
              Per year · average small business
            </p>
          </motion.article>

          {/* 62% unanswered */}
          <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease, delay: 0.08 }}
            className="bento relative flex min-h-[180px] flex-col overflow-hidden p-6 sm:min-h-[200px] md:col-span-5"
            style={{ borderRadius: '1.75rem 2.5rem 1.75rem 2.5rem' }}
          >
            <div className="pattern-dots pointer-events-none absolute inset-0 opacity-60" />
            <GeoTriangles />
            <p className="display relative text-4xl text-accent sm:text-5xl md:text-6xl">{a.value}</p>
            <p className="relative mt-3 max-w-[16rem] text-sm leading-relaxed text-white sm:mt-4">
              {a.label}
            </p>
          </motion.article>

          {/* 85% voicemail */}
          <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease, delay: 0.12 }}
            className="bento relative flex min-h-[160px] flex-col overflow-hidden bg-surface-2 p-6 md:col-span-5 md:min-h-[180px]"
            style={{ borderRadius: '2.5rem 1.25rem 2.5rem 1.25rem' }}
          >
            <div className="pattern-diag pointer-events-none absolute inset-0" />
            <p className="display relative text-4xl text-white sm:text-5xl">{b.value}</p>
            <p className="relative mt-3 max-w-[16rem] text-sm leading-relaxed text-white">
              {b.label}
            </p>
          </motion.article>

          {/* 62% competitor — text on top, bars below (no overlap) */}
          <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease, delay: 0.16 }}
            className="bento relative flex min-h-[200px] flex-col overflow-hidden p-6 md:col-span-7"
            style={{ borderRadius: '1.5rem 2.75rem 1.5rem 2.75rem' }}
          >
            <div className="pattern-grid pointer-events-none absolute inset-0 opacity-70" />
            <div className="relative z-10">
              <p className="display text-4xl text-white sm:text-5xl md:text-6xl">{c.value}</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white">{c.label}</p>
            </div>
            <div
              className="relative z-10 mt-8 flex h-14 items-end gap-1.5 sm:mt-auto sm:pt-8"
              aria-hidden
            >
              {[40, 70, 45, 90, 55, 75, 35, 85, 50, 60].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-accent/45"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
