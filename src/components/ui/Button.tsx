import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-bg hover:bg-accent-hover border border-transparent shadow-[0_10px_28px_rgba(62,207,142,0.22)] hover:shadow-[0_14px_36px_rgba(62,207,142,0.3)]',
  secondary:
    'bg-surface-2/80 text-fg border border-line-strong backdrop-blur-sm hover:bg-surface-3 hover:border-accent/25',
  ghost: 'bg-transparent text-fg-muted border border-transparent hover:text-fg hover:bg-accent-soft',
  inverse: 'bg-fg text-bg border border-transparent hover:bg-fg/90 shadow-sm shadow-black/25',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[13px]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
}

type Props = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
