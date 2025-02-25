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
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={{
            '--ck-overlay-background': 'rgb(183 183 183 / 37%)',
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
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default WalletProvider
