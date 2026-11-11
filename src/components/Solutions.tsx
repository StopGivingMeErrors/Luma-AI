import { ArrowUpRight, Phone } from 'lucide-react'
import { openCalBooking } from '@/lib/cal'
import { openReceptionist } from '@/lib/receptionist'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

function VoiceViz() {
  return (
    <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-xl border border-accent/15 bg-bg-elevated/90 p-4" aria-hidden>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(62,207,142,0.12),transparent_55%)]" />
      <div className="relative flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Phone className="h-3.5 w-3.5" />
        </span>
        <div>
          <p className="text-xs font-medium text-fg">Inbound line</p>
          <p className="text-[11px] text-fg-dim">Ringing → answered</p>
        </div>
      </div>
      <div className="relative mt-6 flex h-16 items-center gap-[2px]">
        {Array.from({ length: 40 }).map((_, i) => {
          const h = 18 + Math.abs(Math.sin(i * 0.55)) * 70
          return (
            <span
              key={i}
              className="flex-1 rounded-full bg-accent/55"
              style={{ height: `${h}%` }}
            />
          )
        })}
      </div>
      <p className="relative mt-4 text-[11px] text-fg-muted">Qualify · Book · Warm transfer</p>
    </div>
  )
}

function ChatViz() {
  return (
    <div className="relative flex min-h-[260px] flex-col rounded-xl border border-line bg-bg-elevated/90 p-4" aria-hidden>
      <div className="mt-auto flex flex-col gap-2.5 pb-1">
        <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-surface-2 px-3 py-2 text-[12px] leading-snug text-fg-muted">
          Do you have availability this week for a haircut?
        </div>
        <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-accent/20 bg-accent-soft px-3 py-2 text-[12px] leading-snug text-fg">
          Yes — Thursday 16:00 or Friday 11:30. Which works better?
        </div>
        <div className="ml-auto max-w-[75%] rounded-2xl rounded-br-md bg-surface-2 px-3 py-2 text-[12px] leading-snug text-fg-muted">
          Thursday 16:00 please.
        </div>
        <div className="inline-flex w-fit shrink-0 rounded-md border border-accent/30 bg-accent-soft px-2.5 py-1.5 text-[11px] text-accent">
          Slot held · awaiting details
        </div>
      </div>
    </div>
  )
}

function WorkflowViz() {
  const steps = ['Call', 'Agent', 'Calendar', 'CRM', 'SMS']
  return (
    <div className="relative flex min-h-[260px] flex-col justify-center overflow-hidden rounded-xl border border-line bg-bg-elevated/90 p-4" aria-hidden>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(62,207,142,0.1),transparent_50%)]" />
      <div className="relative flex flex-col justify-center gap-3">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-md border text-[10px] font-medium ${
                i <= 1
                  ? 'border-accent/40 bg-accent-soft text-accent'
                  : 'border-line bg-surface text-fg-dim'
              }`}
            >
              {i + 1}
            </span>
            <div className={`h-px flex-1 ${i <= 1 ? 'bg-accent/35' : 'bg-line'}`} />
            <span className="w-20 text-right text-[12px] text-fg-muted">{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const pillars = [
  {
    title: 'Voice AI',
    body: 'Intelligent voice agents for reception, customer service, lead qualification, and appointment booking — including AI receptionist coverage for busy front desks.',
    viz: <VoiceViz />,
    action: 'talk' as const,
    cta: 'Talk to a live agent',
  },
  {
    title: 'Chat AI',
    body: 'Conversational agents for your website and customer channels that answer questions, capture leads, and guide visitors toward a booking.',
    viz: <ChatViz />,
    action: 'book' as const,
    cta: 'Scope a chat agent',
  },
  {
    title: 'Workflow Automation',
    body: 'Custom automations that connect calendars, CRM/POS, messaging, and owner alerts — so every conversation triggers the right next step.',
    viz: <WorkflowViz />,
    action: 'book' as const,
    cta: 'Design my automation',
  },
]

export function Solutions() {
  return (
    <Section
      id="solutions"
      title="Three ways Luma works for your business"
      description="Voice, chat, and automation — distinct capabilities that share one goal: faster customer service and cleaner operations."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
        {pillars.map((p) => (
          <article key={p.title} className="surface flex flex-col p-5 sm:p-6">
            {p.viz}
            <h3 className="display mt-6 text-xl text-fg">{p.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{p.body}</p>
            <div className="mt-6">
              {p.action === 'talk' ? (
                <Button variant="secondary" className="w-full sm:w-auto" onClick={() => openReceptionist()}>
                  <Phone className="h-4 w-4" />
                  {p.cta}
                </Button>
              ) : (
                <Button variant="secondary" className="w-full sm:w-auto" onClick={() => void openCalBooking()}>
                  {p.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
