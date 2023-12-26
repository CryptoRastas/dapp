'use client'

import { type ReactNode } from 'react'
import { Registry } from '@/app/Registry'
import { Provider as WalletProvider } from '@/app/components/wallet'

export type ProvidersProps = {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <WalletProvider>
      <Registry>{children}</Registry>
    </WalletProvider>
  )
}
