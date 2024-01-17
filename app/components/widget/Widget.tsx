'use client'

import { useWallet } from '@/app/lib/wallet/hooks'
import Greatings from './Greatings'

export const Widget = () => {
  const { isConnected } = useWallet()

  return (
    <div className='flex h-full items-center justify-center'>
      {!isConnected ? <Greatings /> : 'widget'}
    </div>
  )
}

export default Widget
