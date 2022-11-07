import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { Envelope, Lock, WarningCircle, X } from 'phosphor-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from './Button'
import { Text } from './Text'
import { TextInput } from './TextInput'
import * as z from 'zod'
import { useAxios } from '../hooks/useAxios'
import { useMutation } from '@tanstack/react-query'
import * as Toast from '@radix-ui/react-toast'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import Link from 'next/link'

type ResponseUserAuth = {
  data: {
    message: string
    user: User
  }
}

type User = {
  id: string
  name: string
  email: string
  token: string
}

type FormData = {
  email: string
  password: string
}

const validateSchema = z.object({
  email: z.string().min(1, { message: 'Campo obrigatório' }),
  password: z.string().min(1, { message: 'Campo obrigatório' }),
})

export function LoginForm() {
  const { api } = useAxios()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(validateSchema),
  })

  const authUser = async (userToAuth: FormData) =>
    await api.post<ResponseUserAuth>('/auth', userToAuth)
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      return await mutateAsync(formData)
    } catch (error) {
      console.log(error)
    }
  }

  const { data, error, isLoading, mutateAsync, isError } = useMutation({
    mutationFn: authUser,
    onSuccess: (resp) => {
      setCookie(null, 'token', resp.data.data.user.token ?? '', {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      })
      setCookie(null, 'user', JSON.stringify(resp.data.data.user), {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      })

      router.push('/dashboard')
    },
  })

  return (
    <div className="flex flex-col gap-8 w-full pl-5">
      {isError && error instanceof AxiosError ? (
        <Toast.Provider>
          <Toast.Root
            className={clsx(
              'bg-red-700 fixed top-2 right-2 shadow-lg p-3 min-w-[300px] rounded-xl flex justify-between text-gray-50'
            )}
          >
            <Toast.Title>
              <WarningCircle size={24} weight="fill" />
            </Toast.Title>
            <Toast.Description className="px-3">
              {error.response?.data?.data?.message}
            </Toast.Description>
            <Toast.Action altText="Close toast" />
            <Toast.Close>
              <X />
            </Toast.Close>
          </Toast.Root>
          <Toast.Viewport />
        </Toast.Provider>
      ) : (
        ''
      )}

      <h1 className="text-5xl text-center">Login</h1>

      <form
        action="/"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className={clsx('flex flex-col justify-center items-center w-full gap-7')}
        noValidate
      >
        <label htmlFor="email" className={clsx('flex flex-col gap-2 w-full')}>
          <Text className={clsx('font-semibold', errors?.email?.message ? 'animate-bounce' : '')}>
            Email
          </Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Envelope />
            </TextInput.Icon>
            <TextInput.Input
              register={register}
              name="email"
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
            />
          </TextInput.Root>
          {errors?.email?.message && (
            <Text className={clsx('text-red-700')} size="sm">
              {errors?.email?.message}
            </Text>
          )}
        </label>
        <label htmlFor="password" className={clsx('flex flex-col gap-2 w-full')}>
          <Text
            className={clsx('font-semibold', errors?.password?.message ? 'animate-bounce' : '')}
          >
            Senha
          </Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input
              register={register}
              name="password"
              type="password"
              id="password"
              placeholder="****************"
            />
          </TextInput.Root>
          {errors?.password?.message && (
            <Text className={clsx('text-red-700')} size="sm">
              {errors?.password?.message}
            </Text>
          )}
        </label>
        <Button
          className={clsx(
            'w-full flex justify-center text-white',
            isLoading ? 'bg-gray-700 cursor-not-allowed' : ''
          )}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Aguarde...' : 'Login'}
        </Button>
        <Button
          className={clsx(
            'w-full flex justify-center text-gray-900 bg-transparent border border-gray-900'
          )}
          disabled={isLoading}
          asChild
        >
          <Link href="/">Voltar</Link>
        </Button>

        <Text size="md" className={clsx('text-gray-900')}>
          Ainda não possui uma conta?{' '}
          <Link className="underline" href="/signup">
            Cadastre-se aqui{' '}
          </Link>
        </Text>
      </form>
    </div>
  )
}
