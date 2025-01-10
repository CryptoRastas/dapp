'use client'

import useWallet from '@/app/lib/wallet/hooks/useWallet'
import { AccountConnect, Account } from './account'
import { Network } from './network'
import classNames from 'classnames'

export const Wallet = () => {
  const { isConnected, address } = useWallet()

  return (
    <>
      {!isConnected || !address ? (
        <AccountConnect />
      ) : (
        <div
          className={classNames([
            'flex items-center',
            'rounded-3xl bg-blue-200'
          ])}
        >
          <div className='pl-4 max-lg:pr-2 lg:pr-2'>
            <Network />
          </div>
          <Account className='border border-blue-200 shadow' />
        </div>
      )}
    </>
  )
}

export default Wallet
