import { ArrowUpRight, Check } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { openCalBooking } from '@/lib/cal'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

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
    <Section
      id="pricing"
      title="Straightforward pricing"
      description="One full-service plan. Industry research puts average yearly loss from missed calls near $126K for small businesses — this costs a fraction of that."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-6">
        <div className="surface panel-live p-6 sm:p-8 lg:col-span-3 lg:p-10">
          <p className="text-sm text-fg-muted">Full-service receptionist & voice coverage</p>
          <div className="mt-4 flex flex-wrap items-baseline gap-2">
            <span className="display text-5xl text-accent sm:text-6xl">€{monthlyEuro}</span>
            <span className="text-fg-muted">/month</span>
          </div>
          <p className="mt-3 text-sm text-fg-muted">
            Includes {includedMinutes} minutes. Extra at €{overageEuroPerMinute.toFixed(2)}.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-fg-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-fg">{f}</span>
              </li>
            ))}
          </ul>

          <Button className="mt-8" onClick={() => void openCalBooking()}>
            Book a consultation
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="surface flex flex-col justify-between p-6 sm:p-8 lg:col-span-2 lg:p-10">
          <div>
            <p className="text-sm text-fg-muted">Cost of doing nothing</p>
            <p className="display mt-4 text-5xl text-fg">$126K</p>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              Average yearly loss from unanswered calls (industry research). One recovered booking
              can cover months of Luma AI.
            </p>
          </div>
          <p className="mt-8 text-sm text-fg-muted">
            Free trial available when it&apos;s a good fit.
          </p>
        </div>
      </div>
    </Section>
  )
}
