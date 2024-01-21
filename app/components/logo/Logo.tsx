'use client'

import { type HTMLProps } from 'react'
import appConfig from '@/app.config'
import ImageLoader from 'next/image'
import classNames from 'classnames'

export const Logo = ({ className, ...props }: HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} className={classNames(className, 'relative h-12 w-32')}>
      <span className='sr-only'>{appConfig.name}</span>
      <ImageLoader
        src='/assets/crypto-rastas-logo.png'
        alt={appConfig.name}
        fill
        priority
        sizes={`
          (min-width: 1024px) 128px,
          108px
          
        `}
      />
    </div>
  )
}

export default Logo
