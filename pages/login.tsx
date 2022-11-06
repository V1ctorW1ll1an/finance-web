import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { DigitalCurrencyImage } from '../components/DigitalCurrencyImage'
import { LoginForm } from '../components/LoginForm'

export default function Login() {
  return (
    <main className="flex items-center justify-center w-screen h-screen flex-wrap bg-gray-50">
      <div className="h-[613px] max-w-[485px] w-full flex justify-center items-center">
        <DigitalCurrencyImage />
      </div>
      <div className="h-[613px] max-w-[485px] w-full flex justify-center items-center">
        <LoginForm />
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context)

  if (cookies.token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
