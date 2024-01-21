import { useCallback, useEffect, useState } from 'react'

import useSDK, {
  NFTPortfolioParams,
  NFTPortfolioResponse,
  getNftsForOwner
} from './useSDK'

export type { NFTPortfolioParams, NFTPortfolioResponse }

export function useNFTPortfolio({
  contractAddress,
  owner,
  skip
}: NFTPortfolioParams) {
  const [list, setList] = useState<NFTPortfolioResponse[]>([])

  const { sdk } = useSDK()

  const refetch = useCallback(() => {
    getNftsForOwner(sdk, {
      contractAddress,
      owner,
      skip
    }).then(setList)
  }, [sdk, contractAddress, owner, skip])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { list, refetch }
}

export default useNFTPortfolio
