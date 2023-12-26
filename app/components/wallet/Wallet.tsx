'use client'

import { useNetwork, useWallet } from '@/app/lib/wallet/hooks'
import { AccountConnect, Account } from './account'
import classNames from 'classnames'
import { Variant, Sizes } from '../button/Button'
import { Network } from './network'

export const Wallet = () => {
  const { chain, chains } = useNetwork()

  const {
    connectors: [connector],
    connect,
    isConnecting,
    isConnected,
    address,
    disconnect
  } = useWallet()

  return (
    <div
      className={classNames(
        'flex items-center justify-center space-x-2 rounded-lg'
      )}
    >
      {!isConnected || !address ? (
        <AccountConnect
          connector={connector}
          isConnecting={isConnecting}
          connect={connect}
        />
      ) : (
        <>
          <Network chain={chain} chains={chains} />
          <Account
            address={address}
            disconnect={disconnect}
            className={classNames(
              'cursor-pointer rounded-md',
              Sizes.sm.classes,
              Variant.default.classes,
              Variant.default.hover,
              Variant.default.disabled
            )}
          />
        </>
      )}
    </div>
  )
}

export default Wallet
