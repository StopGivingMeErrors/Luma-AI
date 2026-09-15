import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'
import { openCalBooking } from '@/lib/cal'

const points = [
  {
    title: 'Local & hands-on',
    body: 'We work with owners who need a reliable front desk — not another software login.',
    radius: '2.25rem 1.25rem 2.25rem 1.25rem',
    pattern: 'pattern-dots',
  },
  {
    title: 'Built for your niche',
    body: `Specialized for ${siteConfig.niche}. We know how your callers sound.`,
    radius: '1.25rem 2.25rem 1.25rem 2.25rem',
    pattern: 'pattern-diag',
  },
  {
    title: 'Up to 5x ROI',
    body: 'Average clients recover far more in booked revenue than they spend each month.',
    radius: '2rem 2rem 2.5rem 1rem',
    pattern: 'pattern-grid',
  },
  {
    title: 'Free trial if it fits',
    body: 'If we agree it’s a match, you can try the receptionist before you commit.',
    radius: '2.5rem 1rem 2rem 2rem',
    pattern: 'pattern-rings',
  },
]

export function WhyUs() {
  return (
    <section id="why-us" className="px-4 py-16 sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 max-w-xl sm:mb-14"
        >
          <p className="label mb-3">Why us</p>
          <h2 className="display text-3xl text-fg sm:text-4xl md:text-5xl">
            Why owners choose Luma AI
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5">
          {points.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="bento relative min-h-[180px] overflow-hidden p-6 sm:min-h-[200px] sm:p-7 lg:min-h-[220px] lg:p-8"
              style={{ borderRadius: p.radius }}
            >
              <div className={`${p.pattern} pointer-events-none absolute inset-0 opacity-40`} />
              <h3 className="display relative text-xl text-white lg:text-2xl">{p.title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-white/80">{p.body}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 sm:mt-10">
          <button
            type="button"
            onClick={() => void openCalBooking()}
            className="inline-flex rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.02]"
          >
            Book a meeting
          </button>
        </div>
      </div>
    </section>
  )
}
