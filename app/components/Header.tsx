'use client'

import { type HTMLProps, type ReactNode } from 'react'
import classNames from 'classnames'
import { Logo } from '@/app/components/logo'

import dynamic from 'next/dynamic'
import LoadingSkeleton from '@/app/components/loading/Skeleton'

const GasPrice = dynamic(() => import('@/app/components/GasPrice'), {
  ssr: false,
  loading: () => <LoadingSkeleton className='h-9  w-24 rounded-3xl' />
})

const Wallet = dynamic(() => import('@/app/components/wallet/Wallet'), {
  ssr: false,
  loading: () => <LoadingSkeleton className='h-9 w-full rounded-3xl' />
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
        'flex items-center justify-between space-x-4 py-4 container'
      )}
    >
      <Logo />
      <div className='flex items-center justify-end space-x-2'>
        <GasPrice />
        <Wallet />
      </div>
    </header>
  )
}

export default Header
