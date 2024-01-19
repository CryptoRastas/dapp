import { use } from 'react'
import useSDK, { NFTPortfolioParams, NFTPortfolioResponse } from './useSDK'

export type { NFTPortfolioParams, NFTPortfolioResponse }

export function useNFTPortfolio(params: NFTPortfolioParams) {
  const { sdk, getNftsForOwner } = useSDK()

  return use(getNftsForOwner(sdk, params))
}

export default useNFTPortfolio
