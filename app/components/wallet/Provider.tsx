'use client'

import type { ReactNode } from 'react'
import { WagmiConfig } from 'wagmi'
import config from '@/app/lib/wallet/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
import { ConnectKitProvider } from 'connectkit'

type WalletProviderProps = {
  children: ReactNode
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        options={{
          enforceSupportedChains: false
        }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default WalletProvider
