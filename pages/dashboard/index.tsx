import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export default function Dashboard() {
  return <div>dashboard</div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context)

  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
