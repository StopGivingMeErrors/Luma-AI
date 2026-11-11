import { Section } from '@/components/ui/Section'

const steps = [
  {
    title: 'We design your agents',
    body: 'Voice and chat behavior trained on your services, hours, and booking rules — so customers feel they reached your business.',
  },
  {
    title: 'We connect your systems',
    body: 'Calendars, CRM/POS, messaging, and alerts. Your phone number stays the same when voice coverage is attached.',
  },
  {
    title: 'You run with coverage',
    body: 'Day, night, and peak hours — conversations get answered and the right next step happens automatically.',
  },
]

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      title="How engagement works"
      description="A clear path from first conversation to a working system — without replacing the tools you already trust."
    >
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {steps.map((step) => (
          <article key={step.title} className="bg-surface p-6 sm:p-8">
            <h3 className="display text-xl text-fg">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{step.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
