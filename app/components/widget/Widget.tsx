'use client'

import {
  useBalance,
  useChainContract,
  useNetwork,
  useWallet
} from '@/app/lib/wallet/hooks'
import { Greatings } from './Greatings'
import { Checkout } from './checkout/Checkout'
import useNFTPortfolio from '@/app/lib/wallet/hooks/useNFTPortfolio'

export const Widget = () => {
  const { isConnected, isConnecting, address } = useWallet()
  const { config, chain, remainingChains } = useNetwork()

  const collectionContract = useChainContract('token')
  const bridgeContract = useChainContract('bridge')

  const { balance } = useBalance()

  const { list, refetch } = useNFTPortfolio({
    contractAddress: collectionContract?.address,
    owner: String(address),
    skip: !address || !collectionContract?.address
  })

  return isConnecting || !isConnected ? (
    <Greatings />
  ) : (
    <Checkout
      list={list}
      collectionAddress={collectionContract.address}
      bridgeAddress={bridgeContract.address}
      senderAddress={address}
      enabled={isConnected && !!address && !chain?.unsupported}
      chain={config}
      destinationChains={remainingChains}
      marketplaceURL={config.marketplaceURL}
      balance={balance?.value || 0n}
      onRefetchList={refetch}
    />
  )
}

export default Widget
