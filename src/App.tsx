import { lazy, Suspense } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ProblemBento } from './components/ProblemBento'
import { TryLive } from './components/TryLive'
import { Automations } from './components/Automations'
import { HowItWorks } from './components/HowItWorks'
import { Pricing } from './components/Pricing'
import { WhyUs } from './components/WhyUs'
import { Footer } from './components/Footer'
import { CalProvider } from '@/lib/cal'

const VoiceLauncher = lazy(() =>
  import('./components/VoiceLauncher').then((m) => ({ default: m.VoiceLauncher })),
)

export default function App() {
  return (
    <>
      <CalProvider />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="pb-24 sm:pb-20">
        <Hero />
        <ProblemBento />
        <TryLive />
        <Automations />
        <HowItWorks />
        <Pricing />
        <WhyUs />
        <Footer />
      </main>
      <Suspense fallback={null}>
        <VoiceLauncher />
      </Suspense>
    </>
  )
}
