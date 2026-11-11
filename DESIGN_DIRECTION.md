# Design direction (active)

Authoritative product truth: `PRODUCT.md`.

## Visual world

**Forest green immersion** — not flat near-black SaaS chrome.

- Atmosphere: deep forest base (`#070a09`) with living green / warm amber radial washes
- Accent: `#3ecf8e` (Luma green) with soft green elevation, glass panels, and offset accent shadows
- Surfaces: gradient panels with inset highlight + depth shadow (`.surface`, `.surface-glass`, `.panel-live`)
- Hero: full-viewport immersion — high-fidelity ASCII orb + glass AgentConsole
- Keep Phase 3 component architecture (Solutions pillars, Section/Button primitives, pricing terms)

## Approved hero copy

- **Headline:** AI agents that move your business forward.
- **Supporting:** From intelligent voice and chat agents to custom business automations, Luma AI helps businesses serve customers faster and operate smarter.

## Color tokens

| Token | HEX |
|-------|-----|
| bg | `#070A09` |
| bg-elevated | `#0E1412` |
| surface | `#121A17` |
| surface-2 | `#18211E` |
| accent | `#3ECF8E` |
| accent-hover | `#5FE0A5` |
| accent-dim | `#1A5C42` |
| warn | `#E8B86D` |
| fg | `#F2F5F3` |
| fg-muted | `#9AABA3` |

## Typography

- Primary: Outfit
- Mono (data/code only): IBM Plex Mono

## Solutions visualizations (required distinctiveness)

1. **Voice AI** — waveform call UI + live Retell path
2. **Chat AI** — static chat panel + Book CTA
3. **Workflow Automation** — step rail / niche canvas + Design my automation → Cal

## Orb quality bar

- Adaptive density (denser on small canvases)
- DPR up to 3 on mobile
- Soft radial core glow + liquid aura
- Pause when off-screen; honor `prefers-reduced-motion`

## Pricing (unchanged)

€300/month · 600 minutes · €0.75 overage · single tier only

## Motion

Hero orb + console entrance; quiet hovers; live FAB energy; honor `prefers-reduced-motion`
