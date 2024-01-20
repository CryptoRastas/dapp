'use client'

import { Button, ButtonProps } from '@/app/components/button/Button'
import { useNetwork, useWallet } from '@/app/lib/wallet/hooks'
import { MouseEvent } from 'react'

export const WalletButton = ({ children, onClick, ...props }: ButtonProps) => {
  const { chain, chains, switchNetwork, isLoading } = useNetwork()

  const {
    isConnected,
    connect,
    connectors: [connector],
    isConnecting
  } = useWallet()

  const mustSwitchNetwork = isConnected && chain?.unsupported

  const handleConnect = (e: MouseEvent<HTMLButtonElement>) => {
    if (mustSwitchNetwork && switchNetwork) {
      return switchNetwork(chains[0].id)
    }

    if (!isConnected) {
      connect({ connector })
      return
    }

    onClick?.(e)
  }

  return (
    <Button {...props} onClick={handleConnect}>
      {mustSwitchNetwork ? (
        <>
          {isLoading ? 'Connecting' : 'Switch Chain'}
          {` `}
          {`to ${chains[0].name}`}
        </>
      ) : (
        <>{isConnected ? children : isConnecting ? 'Connecting' : 'Connect'}</>
      )}
    </Button>
  )
}

export default WalletButton
