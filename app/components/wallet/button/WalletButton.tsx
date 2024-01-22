'use client'

import { Button, ButtonProps } from '@/app/components/button/Button'
import { useNetwork } from '@/app/lib/wallet/hooks'
import { MouseEvent } from 'react'

export const WalletButton = ({ children, onClick, ...props }: ButtonProps) => {
  const { chain, chains, switchNetwork, isLoading } = useNetwork()

  const mustSwitchNetwork = chain?.unsupported

  const handleConnect = (e: MouseEvent<HTMLButtonElement>) => {
    if (mustSwitchNetwork && switchNetwork) {
      return switchNetwork(chains[0].id)
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
        children
      )}
    </Button>
  )
}

export default WalletButton
