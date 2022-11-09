import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '../services/queryClient'
import '../styles/globals.css'
import AuthProvider from '../contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  )
}
