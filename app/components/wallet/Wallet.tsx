'use client'

import { useNetwork, useWallet } from '@/app/lib/wallet/hooks'
import { AccountConnect, Account } from './account'
import { Network } from './network'

export const Wallet = () => {
  const { chain } = useNetwork()

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

  return !isConnected || !address ? (
    <AccountConnect onConnect={handleConnect} isConnecting={isConnecting} />
  ) : (
    <div className='flex items-center space-x-2'>
      <Network chain={chain} />
      <Account address={address} disconnect={disconnect} />
    </div>
  )
}

export default Wallet
