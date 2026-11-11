import { Phone } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { openReceptionist } from '@/lib/receptionist'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

export function TryLive() {
  return (
    <Section
      id="try-live"
      title="Try a live Voice Agent"
      description={`Hear the same class of voice agent we deploy for ${siteConfig.niche}. Uses your microphone · about 30 seconds.`}
    >
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        <div className="surface panel-live p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-fg-muted">
            Ask about booking, hours, or a last-minute reservation. This is a real web voice call —
            not a recorded sample.
          </p>
          <Button className="mt-8" size="lg" onClick={() => openReceptionist()}>
            <Phone className="h-4 w-4" />
            Start talking
          </Button>
        </div>

        <div className="surface p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Phone className="h-4 w-4" />
            </span>
            <div>
              <p className="font-medium text-fg">Live voice demo</p>
              <p className="text-xs text-fg-dim">Secure browser call · Retell</p>
            </div>
          </div>
          <ul className="mt-8 space-y-3 text-sm text-fg-muted">
            <li className="flex gap-2">
              <span className="text-accent">·</span>
              Answers in a natural front-desk voice
            </li>
            <li className="flex gap-2">
              <span className="text-accent">·</span>
              Handles booking-style questions
            </li>
            <li className="flex gap-2">
              <span className="text-accent">·</span>
              Same stack we wire to your number
            </li>
          </ul>
        </div>
      </div>
    </Section>
  )
}
