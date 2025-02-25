import { reduce, merge } from 'lodash'
import {
  polygonAmoy,
  polygon,
  mainnet,
  sepolia,
  base,
  baseSepolia,
  Chain,
  abstractTestnet,
  abstract
} from './chains'

export const mainnets = [base, mainnet, polygon, abstract]
export const testnets = [sepolia, polygonAmoy, baseSepolia, abstractTestnet]

export const allowedChains = (
  process.env.NEXT_PUBLIC_TESTNET_MODE === '1' ? testnets : mainnets
) as [Chain, ...Chain[]]

export const allowedChainsConfig = reduce(
  allowedChains,
  (acc, chain: Chain) =>
    merge(acc, {
      [chain.id]: chain
    }),
  {} as { [key: number]: Chain }
)
