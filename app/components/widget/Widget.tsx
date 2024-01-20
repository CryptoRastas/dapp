'use client'

import { useChainContract, useNetwork, useWallet } from '@/app/lib/wallet/hooks'
import { Greatings } from './Greatings'
import { Checkout } from './checkout/Checkout'
import useNFTPortfolio from '@/app/lib/wallet/hooks/useNFTPortfolio'

export const Widget = () => {
  const { isConnected, isConnecting, address } = useWallet()
  const { config, remainingChains } = useNetwork()

  const collectionContract = useChainContract('token')
  const bridgeContract = useChainContract('bridge')

  const list = useNFTPortfolio({
    contractAddress: collectionContract?.address,
    owner: String(address),
    skip: !address || !collectionContract?.address
  })

  return !list.length || isConnecting || !isConnected ? (
    <Greatings />
  ) : (
    <Checkout
      list={list}
      collectionAddress={collectionContract.address}
      bridgeAddress={bridgeContract.address}
      senderAddress={address}
      enabled={isConnected && !!address}
      chain={config}
      destinationChains={remainingChains}
      marketplaceURL={config.marketplaceURL}
    />
  )
}

export default Widget
