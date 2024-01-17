'use client'

import { useNetwork, useWallet } from '@/app/lib/wallet/hooks'
import { AccountConnect, Account } from './account'
import { Network } from './network'
import classNames from 'classnames'

export const Wallet = () => {
  const { chain, chains, switchNetwork } = useNetwork()

  const {
    connectors: [connector],
    connect,
    isConnecting,
    isConnected,
    address,
    disconnect
  } = useWallet()

  const handleConnect = () => {
    connect({ connector })
  }

  return (
    <div>
      {!isConnected || !address ? (
        <AccountConnect onConnect={handleConnect} isConnecting={isConnecting} />
      ) : (
        <div
          className={classNames([
            'flex items-center',
            'rounded-3xl bg-amber-200'
          ])}
        >
          <div className='pl-4 max-lg:pr-2 lg:pr-1'>
            <Network
              chain={chain}
              chains={chains}
              onSwitchNetwork={switchNetwork}
            />
          </div>
          <Account address={address} disconnect={disconnect} />
        </div>
      )}
    </div>
  )
}

export default Wallet
