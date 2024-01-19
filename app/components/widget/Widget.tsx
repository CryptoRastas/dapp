'use client'

import { useChainContract, useWallet } from '@/app/lib/wallet/hooks'
import Greatings from './Greatings'
import Checkout from './checkout/Checkout'
import useNFTPortfolio from '@/app/lib/wallet/hooks/useNFTPortfolio'

export const Widget = () => {
  const { isConnected, address } = useWallet()

  const chainContract = useChainContract('token')

  const list = useNFTPortfolio({
    contractAddress: chainContract?.address,
    owner: String(address),
    skip: !address || !chainContract?.address
  })

  return !list.length || !isConnected ? <Greatings /> : <Checkout list={list} />
}

export default Widget
