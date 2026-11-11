import type { HTMLAttributes, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'aside'
} & HTMLAttributes<HTMLElement>

export function Surface({ children, className = '', as: Tag = 'div', ...rest }: Props) {
  return (
    <Tag className={`surface ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
