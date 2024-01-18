'use client'

import { useWallet } from '@/app/lib/wallet/hooks'
import Greatings from './Greatings'
import dynamic from 'next/dynamic'
import { Loading } from './Form'

const Form = dynamic(async () => import('./Form'), {
  ssr: false,
  loading: () => <Loading />
})

export const Widget = () => {
  const { isConnected } = useWallet()

  return (
    <div className='flex h-full items-center justify-center'>
      {!isConnected ? <Greatings /> : <Form />}
    </div>
  )
}

export default Widget
