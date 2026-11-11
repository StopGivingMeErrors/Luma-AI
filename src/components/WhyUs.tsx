import { siteConfig } from '@/lib/config'
import { openCalBooking } from '@/lib/cal'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

const points = [
  {
    title: 'Local & hands-on',
    body: 'We work with owners who need reliable coverage — not another software login to manage alone.',
  },
  {
    title: 'Built for your niche',
    body: `Specialized for ${siteConfig.niche}. We know how your callers and customers sound.`,
  },
  {
    title: 'Practical ROI focus',
    body: 'Clients recover booked revenue by answering conversations that would otherwise go missing.',
  },
  {
    title: 'Trial when it fits',
    body: 'If we agree it’s a match, you can try the voice agent before you commit.',
  },
]

export function WhyUs() {
  return (
    <Section
      id="why-us"
      title="Why businesses choose Luma AI"
      description="Clear capabilities, real demos, and a deployment process built around how European SMBs actually operate."
    >
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {points.map((p) => (
          <article key={p.title} className="bg-surface p-6 sm:p-8">
            <h3 className="display text-xl text-fg">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{p.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Button variant="inverse" onClick={() => void openCalBooking()}>
          Book a consultation
        </Button>
      </div>
    </Section>
  )
}
