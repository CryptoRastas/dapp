'use client'

import { useWallet } from '@/app/lib/wallet/hooks'
import Greatings from './Greatings'
import Checkout from './Checkout'

export const Widget = () => {
  const { isConnected } = useWallet()

  return !isConnected ? <Greatings /> : <Checkout />
}

export default Widget
