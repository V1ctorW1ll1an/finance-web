import clsx from 'clsx'
import { Bank, CurrencyDollarSimple } from 'phosphor-react'
import { HTMLAttributes, useState } from 'react'

import { Heading } from './Heading'
import MovementsCard from './MovementsCard'
import { Text } from './Text'

interface DashboardMainContentProps extends HTMLAttributes<HTMLDivElement> {}

export default function DashboardMainContent({ className, ...props }: DashboardMainContentProps) {
  const [date, setDate] = useState<Date>(new Date())

  const dateHasChanged = (newDate: Date) => {
    setDate(newDate)
    console.log(date)
  }

  return (
    <div className={clsx(className)} {...props}>
      <div className="max-w-6xl w-full flex flex-col justify-start pl-6 pt-16">
        <header className="w-full flex gap-10 items-center">
          <Heading size="lg">Dashboard</Heading>

          <input
            type="month"
            value={date.toISOString().substring(0, 7)}
            onChange={(e) => dateHasChanged(new Date(e.target.value))}
            className="border p-2 rounded-lg bg-transparent border-gray-900 ring-1 ring-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
            placeholder="Select a date"
          />
        </header>
        <main>
          <div className="flex justify-between">
            <MovementsCard>
              <Text size="md" className="text-gray-900">
                Saldo: R$ 100,00
              </Text>
              <Bank className="text-purple-500" size={32} />
            </MovementsCard>
            <MovementsCard>
              <Text size="md" className="text-gray-900">
                Despesas: R$ 100,00
              </Text>
              <CurrencyDollarSimple className="text-red-500" size={32} />
            </MovementsCard>
            <MovementsCard>
              <Text size="md" className="text-gray-900">
                Receitas: R$ 100,00
              </Text>
              <CurrencyDollarSimple className="text-green-500" size={32} />
            </MovementsCard>
          </div>
        </main>
      </div>
    </div>
  )
}
