'use client'

import appConfig from '@/app.config'
import { Button, ButtonProps } from '@/app/components/button/Button'
import { useNetwork, useWallet } from '@/app/lib/wallet/hooks'
import { MouseEvent, ReactNode, useEffect, useMemo, useState } from 'react'

export const WalletButton = ({
  children,
  onClick,
  type,
  disabled,
  ...props
}: ButtonProps) => {
  const [text, setText] = useState<ReactNode>(<>Connect</>)

  const { chain, switchChain, isLoading } = useNetwork()

  const { isConnected, isConnecting, isReady } = useWallet()

  const mustSwitchChain = useMemo(
    () => isReady && isConnected && !chain,
    [chain, isReady, isConnected]
  )

  const buttonType = useMemo(() => {
    /// if not connected or must switch chain, return button type
    if (!isReady || !isConnected || mustSwitchChain) return 'button'

    /// if connected, return type
    if (type) return type

    /// if connected and no type, return button
    return 'button'
  }, [isConnected, type, mustSwitchChain, isReady])

  const handleConnect = (e: MouseEvent<HTMLButtonElement>) => {
    if (mustSwitchChain && switchChain) {
      switchChain({
        chainId: appConfig.networks.defaultChainId
      })
      return
    }

    /// if not connected, avoid executing on click
    if (!isConnected) return

    onClick?.(e)
  }

  useEffect(() => {
    if (isConnecting) {
      setText('Connecting')
      return
    }

    if ((!isConnected && !isReady) || (isConnected && isReady)) {
      setText(children)
      return
    }

    setText('Connect')
  }, [isReady, isConnected, children, isConnecting])

  return (
    <Button
      {...props}
      disabled={disabled || isLoading}
      type={buttonType}
      onClick={handleConnect}
    >
      {mustSwitchChain ? (
        <>{isLoading ? 'Connecting' : 'Switch chain'}</>
      ) : (
        <>{text}</>
      )}
    </Button>
  )
}

export default WalletButton
