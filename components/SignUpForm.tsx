import { yupResolver } from '@hookform/resolvers/yup'
import * as Toast from '@radix-ui/react-toast'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import clsx from 'clsx'
import Link from 'next/link'
import Router from 'next/router'
import { CheckCircle, Envelope, Lock, User, WarningCircle, X } from 'phosphor-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { ResponseType } from '../common/types/ResponseType'
import { useAxios } from '../hooks/useAxios'
import { Button } from './Button'
import { Text } from './Text'
import { TextInput } from './TextInput'

type FormData = {
  name: string
  email: string
  password: string
}

const validateSchema = Yup.object({
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string().email('Email invalido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
}).required()

export function SignupForm() {
  const { api } = useAxios()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(validateSchema),
  })

  const postUser = async (newUser: FormData) => await api.post<ResponseType>('/user', newUser)
  const redirectToLoginAfterThreeSeconds = () => setTimeout(() => Router.push('/login'), 3000)

  const { data, error, isLoading, mutateAsync, isError, isSuccess } = useMutation({
    mutationFn: postUser,
    onSuccess: redirectToLoginAfterThreeSeconds,
  })

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      await mutateAsync(formData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full">
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

      {isSuccess && data ? (
        <Toast.Provider>
          <Toast.Root
            className={clsx(
              'bg-green-700 fixed top-3 right-2 shadow-lg p-3 min-w-[300px] rounded-xl flex justify-between text-gray-50'
            )}
          >
            <Toast.Title>
              <CheckCircle size={24} weight="fill" />
            </Toast.Title>
            <Toast.Description className="px-3">{data?.data?.data?.message}</Toast.Description>
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

      <h1 className="text-5xl text-center">Cadastro</h1>

      <form
        action="/"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className={clsx('flex flex-col justify-center items-center w-full gap-7')}
        noValidate
      >
        <label htmlFor="name" className={clsx('flex flex-col gap-2 w-full')}>
          <Text className={clsx('font-semibold', errors?.name?.message ? 'animate-bounce' : '')}>
            Nome completo
          </Text>
          <TextInput.Root>
            <TextInput.Icon>
              <User />
            </TextInput.Icon>
            <TextInput.Input
              register={register}
              name="name"
              type="text"
              id="name"
              placeholder="Digite seu nome"
            />
          </TextInput.Root>
          {errors?.name?.message && (
            <Text className={clsx('text-red-700')} size="sm">
              {errors?.name?.message}
            </Text>
          )}
        </label>
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
          {isLoading ? 'Aguarde...' : 'Cadastrar'}
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
          Já possui uma conta?{' '}
          <Link href="/login" className="underline">
            Faça login
          </Link>
        </Text>
      </form>
    </div>
  )
}
