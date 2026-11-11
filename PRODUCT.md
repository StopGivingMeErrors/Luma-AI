# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are owners and operators of small-to-midsize businesses in Greece and across Europe — especially hotels, restaurants, salons, barbershops, and clinics — who lose revenue when calls go unanswered, replies are slow, or staff are buried in repetitive coordination work.

They evaluate Luma AI when they need reliable customer communication coverage and operational automation without replacing their phone number or adopting another complex software stack.

## Product Purpose

Luma AI provides AI agents and business automation that handle customer conversations and repetitive operational work so businesses can serve customers faster and operate smarter.

Success means a prospective customer understands within seconds that Luma offers Voice AI, Chat AI, and Workflow Automation; can try a live voice agent; and can book a consultation to scope a deployment.

## Positioning

Luma AI is a premium AI agents & automation company — not exclusively an AI receptionist provider.

Three primary offerings:

1. **Voice AI** — intelligent voice agents for reception, customer service, lead qualification, and appointment booking.
2. **Chat AI** — intelligent conversational agents for websites and customer interactions.
3. **Workflow Automation** — custom business workflows that eliminate repetitive work and connect business processes.

AI receptionists remain an important Voice AI use case (flagship for hospitality and local services) but must not define the entire company.

Approved hero messaging:

- Headline: **AI agents that move your business forward.**
- Supporting: **From intelligent voice and chat agents to custom business automations, Luma AI helps businesses serve customers faster and operate smarter.**

## Operating Context

- Single-page Vite + React + Tailwind marketing site at https://lumaai.online/
- Conversion paths: Cal.com booking modal; Retell live voice demo (multiple entry points + persistent FAB)
- Consultation booking uses Cal event type: `error-stopper-uj3wog/luma-ai-technical-consultation-session`
- Niche-specific automation visualization (hotels, restaurants, salons, clinics, barbers)
- Deployed on Vercel; dark-first brand identity

## Capabilities and Constraints

### Confirmed capabilities to preserve

- Cal.com embed booking on every Book / Design my automation / Schedule consultation CTA
- Retell live voice demo from Nav Talk, Hero, Try live, Footer, and persistent VoiceLauncher FAB
- Pricing commercial terms (unchanged, single tier): **€300/month**, **600 minutes included**, **€0.75/minute overage**
- Niche-specific automation canvas visualization
- SEO metadata, canonical URL (`https://lumaai.online/`), Open Graph / Twitter tags, robots.txt, sitemap
- Accessibility: skip link, mobile nav with Escape-to-close and aria-expanded, keyboard-reachable CTAs
- Environment-driven configuration via `VITE_*` (Retell, Cal, branding, site URL)

### Explicit constraints

- No backend, auth, database, payment, or API schema changes in this redesign
- No fabricated testimonials, client logos, statistics, or performance claims
- Existing industry stats already in product copy may be retained and reframed; do not invent new ones
- Do not introduce additional pricing tiers
- Automatic Impeccable design hooks remain disabled unless explicitly approved
- `master` branch protected; implementation occurs on `redesign/premium-saas` only
- No push, merge, or deploy without separate explicit approval
- Never expose or commit environment secrets

### Undecided / out of scope for current redesign prep

- Live interactive Chat AI widget (present Chat as an offering with visualization + consultation CTA until productized)
- Greek-language localization
- Light theme

## Brand Commitments

- Name: **Luma AI**
- Dark-first visual identity (do not force a light theme)
- Evolve toward a sophisticated European SaaS aesthetic (quality references: Linear, Stripe, Vercel — do not copy interfaces)
- Avoid generic AI gradients, excessive glowing effects, repetitive bento layouts, unnecessary animations, emoji icons
- Solutions section must be visually distinctive: Voice AI, Chat AI, and Workflow Automation each get their own recognizable product visualization (not three generic identical cards)
- Improve trust through professional presentation of actual capabilities only
- Existing green/emerald accent DNA may evolve to a more restrained emerald (`#34D399` proposed in Phase 2) without abandoning Luma identity

## Evidence on Hand

- Live production site: https://lumaai.online/
- Live Retell voice demonstration on-page
- Cal.com bookable consultation sessions
- Existing problem-section statistics already published on the site (industry figures; do not invent replacements)
- Pricing terms as configured in `src/lib/config.ts`
- **Absent — must not fabricate:** customer testimonials, client logos, case-study metrics, invented ROI guarantees

## Product Principles

1. **Platform first, use case second** — lead with agents & automation; receptionist is a flagship Voice use case.
2. **Real demos and real booking** — never fake interactivity; Voice can be tried live; Chat/Automation convert via consultation until wired.
3. **Commercial honesty** — one clear pricing tier; no invented proof.
4. **Enterprise calm** — premium restraint over decorative AI spectacle.
5. **Preserve the rails** — redesign chrome and narrative; keep Cal, Retell, pricing, SEO, a11y, and env config working.

## Accessibility & Inclusion

- Maintain WCAG-oriented contrast on dark surfaces (body/secondary text readable)
- Preserve skip link, keyboard navigation, focus visibility, reduced-motion respect
- Touch targets usable on mobile; no horizontal overflow
