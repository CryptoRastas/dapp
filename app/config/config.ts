import { reduce } from 'lodash'
import { polygonMumbai, polygon, mainnet, sepolia } from './chains'
import { Chain } from 'wagmi'

export const mainnets = [mainnet, polygon]
export const testnets = [sepolia, polygonMumbai]

export const allowedChains = (
  process.env.NEXT_PUBLIC_TESTNET_MODE === '1' ? testnets : mainnets
) as Chain[]

export const allowedChainsConfig = reduce(
  allowedChains,
  (acc, chain: Chain) => {
    acc[chain.id] = chain

    return acc
  },
  {} as { [key: number]: Chain }
)
