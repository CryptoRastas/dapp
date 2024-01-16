'use client'

import { type HTMLProps, type ReactNode } from 'react'
import classNames from 'classnames'
import { Logo } from '@/app/components/logo'

import dynamic from 'next/dynamic'
import LoadingSkeleton from './loading/Skeleton'

const Wallet = dynamic(() => import('@/app/components/wallet/Wallet'), {
  ssr: false,
  loading: () => <LoadingSkeleton className='h-8 w-full' />
})

export type HeaderProps = HTMLProps<HTMLElement> & {
  contextTitle?: ReactNode
}

export const Header = ({ className, ...props }: HTMLProps<HTMLElement>) => {
  return (
    <header
      {...props}
      className={classNames(
        className,
        'grid grid-cols-12 items-center container'
      )}
    >
      <div className='col-span-6 md:col-span-8 lg:col-span-10'>
        <Logo />
      </div>
      <div className='col-span-6 md:col-span-4 lg:col-span-2'>
        <Wallet />
      </div>
    </header>
  )
}

export default Header
