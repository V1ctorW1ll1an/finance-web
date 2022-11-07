import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import { CaretCircleDown, CaretCircleUp, SignOut, UserCircle } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { User } from '../common/types/User'
import { Logo } from './Logo'

export function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<User>()

  const router = useRouter()

  useEffect(() => {
    const { user } = parseCookies()
    const userParser = JSON.parse(user) as User
    setUserProfile(userParser)
  }, [])

  const logout = () => {
    destroyCookie(null, 'token')
    destroyCookie(null, 'user')
    router.push('/login')
  }

  return (
    <div className={clsx(`h-20 fixed w-full bg-gray-50 flex items-center justify-center`)}>
      <header className="max-w-6xl w-full">
        <div className="flex justify-between items-center h-full">
          <Link href="/dashboard">
            <Logo />
          </Link>
          <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button
              id="dropdownDefault"
              data-dropdown-toggle="dropdown"
              className="relative text-gray-900 bg-transparent focus:outline-none font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center"
              type="button"
            >
              <UserCircle className="mx-2" size={24} />
              {userProfile ? userProfile.name : 'Usuário anónimo'}
              {isOpen ? (
                <CaretCircleUp className="mx-2" size={24} />
              ) : (
                <CaretCircleDown className="mx-2" size={24} />
              )}
            </button>

            <div
              id="dropdown"
              className={clsx(
                'z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow absolute',
                isOpen ? '' : 'hidden'
              )}
            >
              <ul className="right-2 py-1 text-sm text-gray-700 " aria-labelledby="dropdownDefault">
                <li>
                  <button
                    onClick={logout}
                    className="w-full py-2 px-4 hover:bg-gray-100 flex justify-between"
                  >
                    Logout
                    <SignOut size={24} />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
