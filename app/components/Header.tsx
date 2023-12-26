'use client'

import { type HTMLProps, type ReactNode } from 'react'
import classNames from 'classnames'
import { Logo } from '@/app/components/logo'

import dynamic from 'next/dynamic'
import LoadingSkeleton from './loading/Skeleton'

const Wallet = dynamic(() => import('@/app/components/wallet/Wallet'), {
  ssr: false,
  loading: () => <LoadingSkeleton className='h-4 w-full' />
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
        'flex h-[4.5rem] items-center justify-between space-x-4 px-4 container'
      )}
    >
      <div className='flex flex-1 space-x-2'>
        <Logo />
      </div>
      <div
        className={classNames(
          'flex items-center justify-between space-x-4 lg:justify-end'
        )}
      >
        <Wallet />
      </div>
    </header>
  )
}

export default Header
