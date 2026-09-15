export const siteConfig = {
  name: import.meta.env.VITE_BUSINESS_NAME || 'Luma AI',
  niche: 'hotels, restaurants, salons, barbershops, and doctor offices',
  serviceArea: import.meta.env.VITE_SERVICE_AREA || 'Across Europe',
  siteUrl: (import.meta.env.VITE_SITE_URL || 'https://lumaai.online').replace(/\/$/, ''),
  /** Full URL (fallback / share links) */
  calUrl:
    import.meta.env.VITE_CAL_URL ||
    'https://cal.com/error-stopper-uj3wog/luma-ai-technical-consultation-session',
  /** Cal.com event slug for the embed popup */
  calLink:
    import.meta.env.VITE_CAL_LINK ||
    (
      import.meta.env.VITE_CAL_URL ||
      'https://cal.com/error-stopper-uj3wog/luma-ai-technical-consultation-session'
    )
      .replace(/^https?:\/\/(www\.)?cal\.com\//, '')
      .replace(/\/$/, ''),
  pricing: {
    monthlyEuro: 300,
    includedMinutes: 600,
    overageEuroPerMinute: 0.75,
  },
  stats: [
    {
      value: '62%',
      label: 'of calls to small businesses go unanswered',
    },
    {
      value: '85%',
      label: 'of callers who hit voicemail never call back',
    },
    {
      value: '62%',
      label: 'of unanswered callers contact a competitor instead',
    },
    {
      value: '$126K',
      label: 'average yearly loss from missed calls',
    },
  ],
} as const

export const retellConfig = {
  publicKey: import.meta.env.VITE_RETELL_PUBLIC_KEY as string | undefined,
  agentId: import.meta.env.VITE_RETELL_AGENT_ID as string | undefined,
}
