import { siteConfig } from '@/lib/config'
import { Section } from '@/components/ui/Section'

export function Problem() {
  const [a, b, c, hero] = siteConfig.stats

  return (
    <Section
      id="problem"
      title="Missed conversations cost real revenue"
      description="When calls go unanswered or replies are slow, customers move on. Luma covers the moments your team cannot."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="surface panel-live p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <p className="font-mono text-xs text-fg-dim">Industry research</p>
          <p className="display mt-4 text-5xl text-accent sm:text-6xl">{hero.value}</p>
          <p className="mt-4 text-sm leading-relaxed text-fg-muted sm:text-base">{hero.label}</p>
          <p className="mt-6 text-xs text-fg-dim">Average small business · yearly</p>
        </div>

        <div className="flex flex-col justify-center gap-8 lg:col-span-7 lg:pl-4">
          {[a, b, c].map((stat) => (
            <div key={stat.label} className="border-b border-line pb-6 last:border-0 last:pb-0">
              <p className="display text-3xl text-accent sm:text-4xl">{stat.value}</p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
