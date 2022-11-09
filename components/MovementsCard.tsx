import clsx from 'clsx'
import { HTMLAttributes } from 'react'

interface MovementsCardProps extends HTMLAttributes<HTMLDivElement> {}

export default function MovementsCard({ className, children, ...props }: MovementsCardProps) {
  return (
    <div
      className={clsx(
        'cursor-pointer flex justify-between items-center border border-gray-100 px-3 py-8 w-full max-w-[350px] shadow-xl rounded-lg mt-14 hover:bg-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
