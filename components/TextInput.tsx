import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import { InputHTMLAttributes, ReactNode } from 'react'
import { HTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  name: string
  validation?: any
}

export interface TextInputRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export interface TextInputIconProps {
  children: ReactNode
}

function TextInputRoot(props: TextInputRootProps) {
  return (
    <div
      className={clsx(
        `flex h-12 items-center gap-3 px-4 py-3 font-sans w-full focus-within:ring-2 rounded bg-gray-50 ring-gray-800 border-solid border-gray-400 border`,
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

// change name
TextInputRoot.displayName = 'TextInput.Root'

function TextInputIcon(props: TextInputIconProps) {
  return <Slot className="w-6 h-6 text-gray-400">{props.children}</Slot>
}

TextInputIcon.displayName = 'TextInput.Icon'

function TextInputElement({ register, ...props }: TextInputProps) {
  return (
    <input
      {...register?.(props.name)}
      className={`bg-transparent text-gray-900 flex-1 text-xs placeholder:text-gray-400 outline-none`}
      {...props}
    />
  )
}

TextInputElement.displayName = 'TextInput.Input'

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputElement,
  Icon: TextInputIcon,
}
