import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { parseCookies, setCookie } from 'nookies'
import { createContext, useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { User } from '../common/types/User'
import { useAxios } from '../hooks/useAxios'

type AuthContextData = {
  isAuthenticated: boolean
  userProfile: Omit<User, 'token'> | null
  signIn: (data: FormData) => Promise<any>
  message: string | null
  mutate: UseMutationResult<AxiosResponse<ResponseUserAuth, any>, unknown, FormData, unknown>
}
type AuthProviderProps = { children: React.ReactNode }

type ResponseUserAuth = {
  data: {
    message: string
    user: User
  }
}

type FormData = {
  email: string
  password: string
}

export const AuthContext = createContext({} as AuthContextData)

export default function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false
  const { api } = useAxios()
  const router = useRouter()

  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const authUser = async ({ email, password }: FormData) =>
    await api.post<ResponseUserAuth>('/auth', { email, password })

  const signIn: SubmitHandler<FormData> = async (formData) => {
    try {
      return await mutate.mutateAsync(formData)
    } catch (error) {
      console.log(error)
    }
  }

  const mutate = useMutation({
    mutationFn: authUser,
    onSuccess: ({ data }) => {
      const { user, message } = data.data
      const { token, ...profile } = user
      setCookie(undefined, 'finance.token', token ?? '', {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      })
      setCookie(undefined, 'finance.userprofile', JSON.stringify(profile), {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      })
      setUserProfile(user)
      setMessage(message)
      router.push('/dashboard')
    },
    onError: (error: any) => {
      setMessage(error?.response?.data?.data?.message)
    },
  })

  useEffect(() => {
    const { 'finance.token': token } = parseCookies()

    if (token) {
      const { 'finance.userprofile': userProfile } = parseCookies()
      const user = JSON.parse(userProfile) as User
      setUserProfile(user)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, message, userProfile, mutate }}>
      {children}
    </AuthContext.Provider>
  )
}
