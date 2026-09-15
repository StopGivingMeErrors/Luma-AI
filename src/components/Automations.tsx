import { useEffect, useId, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Database, MessageSquare, PhoneIncoming, Sparkles, Bell } from 'lucide-react'
import { openCalBooking } from '@/lib/cal'

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
  { id: 'agent', label: 'Luma receptionist', sub: 'Custom voice agent', x: 34, y: 42, icon: Sparkles, live: true },
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

function NodeCard({
  node,
  lit,
  compact,
}: {
  node: NodeDef
  lit: boolean
  compact?: boolean
}) {
  const Icon = node.icon
  return (
    <div
      className={`rounded-2xl border bg-surface-2/95 shadow-lg backdrop-blur-sm transition-all duration-500 ${
        compact ? 'p-3' : 'p-2.5 sm:p-3'
      } ${lit ? 'border-accent/50 shadow-[0_0_24px_rgba(62,207,142,0.15)]' : 'border-line'} ${
        node.live ? 'node-live' : ''
      }`}
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
          <p className="truncate text-[13px] font-medium text-white">{node.label}</p>
          <p className="truncate text-[11px] text-white/50">{node.sub}</p>
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
      radius: '1.5rem 1rem 1.5rem 1rem',
      pattern: 'pattern-dots',
    },
    {
      title: 'Custom conversation logic',
      body: `Scripts for ${niches[activeNiche].toLowerCase()}: bookings, waitlists, emergencies, after-hours.`,
      radius: '1rem 1.5rem 1rem 1.5rem',
      pattern: 'pattern-diag',
    },
    {
      title: 'Human when it matters',
      body: 'Warm transfer and owner alerts when a caller needs a real person.',
      radius: '1.25rem 1.25rem 1rem 1.75rem',
      pattern: 'pattern-grid',
    },
  ]

  return (
    <section id="automations" className="relative px-4 py-16 sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 max-w-2xl sm:mb-14"
        >
          <p className="label mb-3">Custom automations</p>
          <h2 className="display text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
            Workflows designed for your business
          </h2>
          <p className="mt-4 text-base text-fg-muted sm:text-lg">
            We don&apos;t drop in a generic bot. We map your booking flow, tools, and handoffs —
            then wire the receptionist into them.
          </p>
        </motion.div>

        <div className="mb-6 flex flex-wrap gap-2">
          {niches.map((n, i) => (
            <button
              key={n}
              type="button"
              onClick={() => setActiveNiche(i)}
              aria-pressed={i === activeNiche}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                i === activeNiche
                  ? 'border-accent/40 bg-accent-soft text-accent'
                  : 'border-line text-fg-muted hover:border-line-strong hover:text-fg'
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bento relative overflow-hidden rounded-[1.5rem] sm:rounded-[2.25rem]"
        >
          <div className="pattern-grid absolute inset-0 opacity-80" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg/40" />

          <div className="relative border-b border-line px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-accent node-live" />
                <p className="truncate font-mono text-[11px] text-fg-muted sm:text-xs">
                  luma · {niches[activeNiche].toLowerCase()}_flow · live
                </p>
              </div>
              <p className="shrink-0 font-mono text-[11px] text-fg-dim">
                tick {String(tick).padStart(3, '0')}
              </p>
            </div>
          </div>

          {/* Mobile: vertical flow that fits the screen */}
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
                    <div className="relative mx-auto flex h-8 w-px items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-b from-accent/60 to-accent/10" />
                      <span className="absolute h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Desktop / tablet: full graph, width 100% — no forced min-width scroll */}
          <div className="relative hidden h-[400px] w-full md:block lg:h-[460px]">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id={`${uid}-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3ecf8e" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#3ecf8e" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#3ecf8e" stopOpacity="0.25" />
                </linearGradient>
                <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="0.35" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
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
                      strokeWidth={active ? 0.55 : 0.32}
                      vectorEffect="non-scaling-stroke"
                      opacity={active ? 1 : 0.55}
                      className="flow-line"
                      style={{ strokeDasharray: '1.4 1.2' }}
                    />
                    {[0, 0.33, 0.66].map((delay) => (
                      <circle
                        key={`${i}-${delay}`}
                        r={active ? 0.7 : 0.45}
                        fill="#3ecf8e"
                        filter={`url(#${uid}-glow)`}
                        opacity={active ? 1 : 0.75}
                      >
                        <animateMotion
                          dur={active ? '1.6s' : '2.8s'}
                          begin={`${delay * (active ? 1.6 : 2.8)}s`}
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

          <div className="relative grid grid-cols-1 gap-3 border-t border-line p-4 sm:grid-cols-3 sm:gap-4 sm:p-5">
            {tipCards.map((card) => (
              <div
                key={card.title}
                className="bento relative min-h-[120px] overflow-hidden p-4 sm:min-h-[140px] sm:p-5"
                style={{ borderRadius: card.radius }}
              >
                <div className={`${card.pattern} pointer-events-none absolute inset-0 opacity-40`} />
                <p className="relative text-sm font-medium text-white">{card.title}</p>
                <p className="relative mt-1.5 text-xs leading-relaxed text-white/75">{card.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => void openCalBooking()}
            className="inline-flex w-full items-center justify-center rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.02] sm:w-auto"
          >
            Design my automation
          </button>
        </div>
      </div>
    </section>
  )
}
