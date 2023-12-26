'use client'

import { type HTMLProps } from 'react'
import appConfig from '@/app.config'
import ImageLoader from 'next/image'

export const Logo = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <>
      <span className='sr-only'>{appConfig.name}</span>
      <span className='relative h-12 w-32'>
        <ImageLoader
          src='/assets/crypto-rastas-logo.png'
          alt={appConfig.name}
          fill
          priority
          sizes='(max-width: 640px) 47px, 120px'
        />
      </span>
    </>
  )
}

export default Logo
