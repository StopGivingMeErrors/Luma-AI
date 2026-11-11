import type { ReactNode } from 'react'

type Props = {
  id?: string
  children: ReactNode
  className?: string
  title?: string
  description?: string
  narrow?: boolean
}

export function Section({
  id,
  children,
  className = '',
  title,
  description,
  narrow = false,
}: Props) {
  return (
    <section id={id} className={`px-5 py-20 sm:px-6 sm:py-28 lg:py-32 ${className}`}>
      <div className={`mx-auto ${narrow ? 'max-w-3xl' : 'max-w-6xl'}`}>
        {(title || description) && (
          <div className={`mb-10 sm:mb-14 ${narrow ? '' : 'max-w-2xl'}`}>
            {title && (
              <h2 className="display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] text-fg text-balance">
                {title}
              </h2>
            )}
            {description && (
              <p className="measure mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
