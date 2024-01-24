'use client'

import { useNetwork, useWallet } from '@/app/lib/wallet/hooks'
import { AccountConnect, Account } from './account'
import { Network } from './network'
import classNames from 'classnames'

import { useModal } from 'connectkit'

export const Wallet = () => {
  const { chain, switchNetwork, remainingChains } = useNetwork()
  const { setOpen: setModalWalletsOpen } = useModal()
  const { isConnecting, isConnected, address, disconnect } = useWallet()

  const handleConnect = () => {
    setModalWalletsOpen(true)
  }

  return (
    <>
      {!isConnected || !address ? (
        <AccountConnect onConnect={handleConnect} isConnecting={isConnecting} />
      ) : (
        <div
          className={classNames([
            'flex items-center',
            'rounded-3xl bg-amber-200'
          ])}
        >
          <div className='pl-4 max-lg:pr-2 lg:pr-2'>
            <Network
              chain={chain}
              chains={remainingChains}
              onSwitchNetwork={switchNetwork}
            />
          </div>
          <Account
            address={address}
            disconnect={disconnect}
            className='border border-amber-200 shadow'
          />
        </div>
      )}
    </>
  )
}

export default Wallet
