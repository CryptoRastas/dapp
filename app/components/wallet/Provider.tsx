'use client'

import type { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import config from '@/app/lib/wallet/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'

type WalletProviderProps = {
  children: ReactNode
}

const queryClient = new QueryClient()

export const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <ConnectKitProvider
        customTheme={{
          '--ck-overlay-background': 'rgb(250 204 21 / 0.8)',
          '--ck-overlay-backdrop-filter': 'blur(8px)',
          '--ck-body-background': 'black'
        }}
        mode='dark'
        options={{
          enforceSupportedChains: false,
          embedGoogleFonts: true,
          avoidLayoutShift: true
        }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ConnectKitProvider>
    </WagmiProvider>
  )
}

export default WalletProvider
