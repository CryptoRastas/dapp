import { chainsSDK, type Provider } from '@/app/lib/wallet/config'
import { cache, use, useMemo } from 'react'
import { useNetwork } from '.'
import appConfig from '@/app.config'

export type NFTPortfolioParams = {
  contractAddress: string
  owner: string
}

export type NFTPortfolioResponse = {
  tokenId: string
  tokenURI: string
}

export const getData = cache(
  async (
    sdk: Provider,
    { owner, contractAddress }: NFTPortfolioParams
  ): Promise<NFTPortfolioResponse[]> => {
    const portfolio = await sdk.nft.getNftsForOwner(owner, {
      contractAddresses: [contractAddress]
    })

    return portfolio.ownedNfts.map((nft) => ({
      tokenId: nft.tokenId,
      tokenURI: nft.image.originalUrl || appConfig.collection.defaultThumbnail
    }))
  }
)

export function useNFTPortfolio(params: NFTPortfolioParams) {
  const { config } = useNetwork()
  const sdk = useMemo(() => chainsSDK[config.id], [config])

  return use(getData(sdk, params))
}

export default useNFTPortfolio
