import clsx from 'clsx'
import { Logo } from './Logo'
import { Button } from './Button'
import Link from 'next/link'

export function DashboardHeader() {
  ;<div className={clsx(`h-20 fixed w-full bg-gray-50 flex items-center justify-center`)}>
    <header className="max-w-6xl w-full">
      <div className="flex justify-between items-center h-full">
        <Logo />
        <div>profile</div>
      </div>
    </header>
  </div>
}
