'use client'

import type { ReactNode } from 'react'
import { WagmiConfig } from 'wagmi'
import config from '@/app/lib/wallet/config'

type WalletProviderProps = {
  children: ReactNode
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}

export default WalletProvider
