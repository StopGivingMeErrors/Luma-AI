import { useEffect, useId, useMemo, useState } from 'react'
import { Calendar, Database, MessageSquare, PhoneIncoming, Sparkles, Bell } from 'lucide-react'
import { openCalBooking } from '@/lib/cal'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

type NodeDef = {
  id: string
  label: string
  sub: string
  x: number
  y: number
  icon: typeof PhoneIncoming
  live?: boolean
}

const nodes: NodeDef[] = [
  { id: 'call', label: 'Incoming call', sub: 'Any line', x: 8, y: 42, icon: PhoneIncoming, live: true },
  { id: 'agent', label: 'Luma voice agent', sub: 'Custom agent', x: 34, y: 42, icon: Sparkles, live: true },
  { id: 'cal', label: 'Calendar', sub: 'Book appointment', x: 64, y: 16, icon: Calendar },
  { id: 'crm', label: 'CRM / POS', sub: 'Log guest data', x: 64, y: 42, icon: Database },
  { id: 'sms', label: 'SMS / WhatsApp', sub: 'Confirm + follow-up', x: 64, y: 68, icon: MessageSquare },
  { id: 'alert', label: 'Owner alert', sub: 'Urgent handoff', x: 90, y: 42, icon: Bell },
]

const edges: [string, string][] = [
  ['call', 'agent'],
  ['agent', 'cal'],
  ['agent', 'crm'],
  ['agent', 'sms'],
  ['crm', 'alert'],
  ['cal', 'alert'],
]

const niches = ['Hotels', 'Restaurants', 'Salons', 'Clinics', 'Barbers'] as const

function pathD(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`
}

function NodeCard({ node, lit, compact }: { node: NodeDef; lit: boolean; compact?: boolean }) {
  const Icon = node.icon
  return (
    <div
      className={`rounded-xl border bg-surface-2 transition-colors duration-500 ${
        compact ? 'p-3' : 'p-2.5 sm:p-3'
      } ${lit ? 'border-accent/45 node-live' : 'border-line'} `}
    >
      <div className="flex items-start gap-2.5">
        <span
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            lit ? 'bg-accent-soft text-accent' : 'bg-surface-3 text-fg-muted'
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-fg">{node.label}</p>
          <p className="truncate text-[11px] text-fg-dim">{node.sub}</p>
        </div>
      </div>
    </div>
  )
}

export function Automations() {
  const uid = useId().replace(/:/g, '')
  const [activeNiche, setActiveNiche] = useState(0)
  const [tick, setTick] = useState(0)
  const [pulseEdge, setPulseEdge] = useState(0)

  useEffect(() => {
    const t = window.setInterval(() => setActiveNiche((n) => (n + 1) % niches.length), 2800)
    return () => window.clearInterval(t)
  }, [])

  useEffect(() => {
    const t = window.setInterval(() => setTick((n) => n + 1), 900)
    return () => window.clearInterval(t)
  }, [])

  useEffect(() => {
    const t = window.setInterval(() => setPulseEdge((n) => (n + 1) % edges.length), 1400)
    return () => window.clearInterval(t)
  }, [])

  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>()
    nodes.forEach((n) => map.set(n.id, { x: n.x, y: n.y }))
    return map
  }, [])

  const tipCards = [
    {
      title: 'Built around your tools',
      body: 'Calendars, CRMs, POS, and messaging — connected the way your team already works.',
    },
    {
      title: 'Custom conversation logic',
      body: `Scripts for ${niches[activeNiche].toLowerCase()}: bookings, waitlists, emergencies, after-hours.`,
    },
    {
      title: 'Human when it matters',
      body: 'Warm transfer and owner alerts when a caller needs a real person.',
    },
  ]

  return (
    <Section
      id="automations"
      title="Workflows designed for your business"
      description="We map your booking flow, tools, and handoffs — then wire Voice and Chat agents into the systems you already use."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {niches.map((n, i) => (
          <button
            key={n}
            type="button"
            onClick={() => setActiveNiche(i)}
            aria-pressed={i === activeNiche}
            className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              i === activeNiche
                ? 'border-accent/40 bg-accent-soft text-accent'
                : 'border-line text-fg-muted hover:border-line-strong hover:text-fg'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
            <p className="truncate font-mono text-[11px] text-fg-muted sm:text-xs">
              luma · {niches[activeNiche].toLowerCase()}_flow · live
            </p>
          </div>
          <p className="shrink-0 font-mono text-[11px] text-fg-dim">
            tick {String(tick).padStart(3, '0')}
          </p>
        </div>

        <div className="relative space-y-0 p-4 md:hidden">
          {nodes.map((node, i) => {
            const lit =
              node.live ||
              edges[pulseEdge]?.[0] === node.id ||
              edges[pulseEdge]?.[1] === node.id
            return (
              <div key={node.id}>
                <NodeCard node={node} lit={lit} compact />
                {i < nodes.length - 1 && (
                  <div className="mx-auto h-6 w-px bg-line" aria-hidden />
                )}
              </div>
            )
          })}
        </div>

        <div className="relative hidden h-[400px] w-full md:block lg:h-[460px]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id={`${uid}-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#34d399" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            {edges.map(([from, to], i) => {
              const a = positions.get(from)!
              const b = positions.get(to)!
              const d = pathD(a, b)
              const active = i === pulseEdge
              return (
                <g key={`${from}-${to}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke={`url(#${uid}-grad)`}
                    strokeWidth={active ? 0.5 : 0.28}
                    vectorEffect="non-scaling-stroke"
                    opacity={active ? 1 : 0.45}
                    className="flow-line"
                    style={{ strokeDasharray: '1.4 1.2' }}
                  />
                  {[0, 0.4].map((delay) => (
                    <circle key={`${i}-${delay}`} r={active ? 0.55 : 0.4} fill="#34d399" opacity={0.85}>
                      <animateMotion
                        dur={active ? '1.8s' : '3s'}
                        begin={`${delay * (active ? 1.8 : 3)}s`}
                        repeatCount="indefinite"
                        path={d}
                      />
                    </circle>
                  ))}
                </g>
              )
            })}
          </svg>

          {nodes.map((node) => {
            const lit =
              node.live ||
              edges[pulseEdge]?.[0] === node.id ||
              edges[pulseEdge]?.[1] === node.id
            return (
              <div
                key={node.id}
                className="absolute w-[140px] -translate-x-1/2 -translate-y-1/2 lg:w-[160px]"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <NodeCard node={node} lit={lit} />
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-px border-t border-line bg-line sm:grid-cols-3">
          {tipCards.map((card) => (
            <div key={card.title} className="bg-surface p-5">
              <p className="text-sm font-medium text-fg">{card.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Button variant="inverse" onClick={() => void openCalBooking()}>
          Design my automation
        </Button>
      </div>
    </Section>
  )
}
