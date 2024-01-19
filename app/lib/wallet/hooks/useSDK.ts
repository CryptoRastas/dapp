import { type Provider } from '@/app/lib/wallet/config'

import { chainsSDK } from '@/app/lib/wallet/config'
import { useMemo, cache } from 'react'
import { useNetwork } from '.'
import appConfig from '@/app.config'

export type NFTPortfolioParams = {
  contractAddress: string
  owner: string
  skip?: boolean
}

export type NFTPortfolioResponse = {
  tokenId: string
  tokenURI: string
}

export const getNftsForOwner = cache(
  async (
    sdk: Provider,
    { owner, contractAddress, skip }: NFTPortfolioParams
  ): Promise<NFTPortfolioResponse[]> => {
    if (skip) return []

    const portfolio = await sdk.nft.getNftsForOwner(owner, {
      /// it can handle more than one contract
      contractAddresses: [contractAddress]
    })

    return portfolio.ownedNfts.map((nft) => ({
      tokenId: nft.tokenId,
      tokenURI: nft.image.originalUrl || appConfig.collection.defaultThumbnail
    }))
  }
)

export function useSDK() {
  const { config } = useNetwork()
  const sdk = useMemo(() => chainsSDK[config.id], [config])

  return { sdk, getNftsForOwner }
}

export default useSDK
