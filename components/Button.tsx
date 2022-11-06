import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  asChild?: boolean
}

export function Button({ children, asChild, className, ...props }: ButtonProps) {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={clsx(
        `py-3 px-4 rounded-lg font-semibold text-white bg-gray-900 
      text-sm text-center`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
