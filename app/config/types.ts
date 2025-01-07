// import { Chain as IChain } from 'wagmi/chains'
import { ChainContract, Chain as IChain } from 'viem'

export type AvailableChainContracts = 'token' | 'bridge'

export type Chain = IChain & {
  abstractId: number
  marketplaceURLTokenId: string
  marketplaceURL: string
  contracts: {
    [k in AvailableChainContracts]: ChainContract
  }
}

export type ChainContracts = Chain['contracts']
