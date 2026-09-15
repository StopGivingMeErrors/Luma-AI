/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RETELL_PUBLIC_KEY?: string
  readonly VITE_RETELL_AGENT_ID?: string
  readonly VITE_CAL_URL?: string
  readonly VITE_CAL_LINK?: string
  readonly VITE_BUSINESS_NAME?: string
  readonly VITE_SERVICE_AREA?: string
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
