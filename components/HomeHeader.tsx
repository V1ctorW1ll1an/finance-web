import clsx from 'clsx'
import Link from 'next/link'

import { Button } from './Button'
import { Logo } from './Logo'

export function HomeHeader() {
  return (
    <div
      className={clsx(`h-20 fixed w-full bg-gray-50 shadow-lg flex items-center justify-center`)}
    >
      <header className="max-w-6xl w-full">
        <div className="flex justify-between items-center h-full">
          <Logo />
          <Button className="w-[160px]">
            <Link href="/login">Entrar</Link>
          </Button>
        </div>
      </header>
    </div>
  )
}
