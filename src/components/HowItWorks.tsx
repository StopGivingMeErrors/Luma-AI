import { motion } from 'framer-motion'

const steps = [
  {
    n: '01',
    title: 'We build your receptionist',
    body: 'Trained on your services, hours, and booking style — so callers feel like they reached your front desk.',
    radius: '2.25rem 1.25rem 2.25rem 1.25rem',
    pattern: 'pattern-diag',
  },
  {
    n: '02',
    title: 'We attach it to your number',
    body: 'Your business phone number never changes. Calls forward when you need cover.',
    radius: '1.25rem 2.25rem 1.25rem 2.25rem',
    pattern: 'pattern-dots',
  },
  {
    n: '03',
    title: 'You never miss a call again',
    body: 'Day, night, lunch rush, or after hours — every caller gets a clear path to book.',
    radius: '2rem 2rem 1.25rem 2.5rem',
    pattern: 'pattern-grid',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-16 sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 max-w-xl sm:mb-14"
        >
          <p className="label mb-3">How it works</p>
          <h2 className="display text-3xl text-fg sm:text-4xl md:text-5xl">
            Three steps. Same number.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5">
          {steps.map((step, i) => (
            <motion.article
              key={step.n}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="bento relative min-h-[200px] overflow-hidden p-6 sm:min-h-[240px] sm:p-7 lg:min-h-[280px] lg:p-8"
              style={{ borderRadius: step.radius }}
            >
              <div className={`${step.pattern} pointer-events-none absolute inset-0 opacity-45`} />
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/10 blur-2xl" />
              <span className="relative font-mono text-xs tracking-widest text-accent">{step.n}</span>
              <h3 className="display relative mt-5 text-xl text-white sm:mt-6 lg:text-2xl">
                {step.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-white/80">{step.body}</p>
              <div className="relative mt-6 h-px w-10 bg-accent/40" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
