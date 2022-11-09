import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'

export interface TextProps {
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

export function Text({ size = 'md', children, asChild, className }: TextProps) {
  const Component = asChild ? Slot : 'span'

  return (
    <Component
      className={clsx(
        'text-gray-900 font-sans',
        {
          'text-xs': size === 'sm',
          'text-sm': size === 'md',
          'text-md': size === 'lg',
        },
        className
      )}
    >
      {children}
    </Component>
  )
}
