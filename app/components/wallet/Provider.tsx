'use client'

import type { ReactNode } from 'react'
import { WagmiConfig } from 'wagmi'
import config from '@/app/lib/wallet/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

type WalletProviderProps = {
  children: ReactNode
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiConfig>
  )
}

export default WalletProvider
