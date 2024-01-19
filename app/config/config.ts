import { reduce, merge } from 'lodash'
import { polygonMumbai, polygon, mainnet, sepolia, Chain } from './chains'

export const mainnets = [mainnet, polygon]
export const testnets = [sepolia, polygonMumbai]

export const allowedChains = (
  process.env.NEXT_PUBLIC_TESTNET_MODE === '1' ? testnets : mainnets
) as Chain[]

export const allowedChainsConfig = reduce(
  allowedChains,
  (acc, chain: Chain) =>
    merge(acc, {
      [chain.id]: chain
    }),
  {} as { [key: number]: Chain }
)
