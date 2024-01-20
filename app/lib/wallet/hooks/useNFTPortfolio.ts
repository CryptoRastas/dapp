import { useEffect, useState } from 'react'

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

  useEffect(() => {
    getNftsForOwner(sdk, {
      contractAddress,
      owner,
      skip
    }).then(setList)
  }, [sdk, contractAddress, owner, skip])

  return list
}

export default useNFTPortfolio
