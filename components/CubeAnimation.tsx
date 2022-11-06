import clsx from 'clsx'
import { HTMLAttributes } from 'react'
import cubeStyle from '../styles/cube.module.css'

interface CubeProps extends HTMLAttributes<HTMLDivElement> {}

export function CubeAnimation({ className, ...props }: CubeProps) {
  return (
    <div className={clsx(cubeStyle.spinner, className)} {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
