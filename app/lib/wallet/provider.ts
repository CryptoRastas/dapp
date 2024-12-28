import { Network, Alchemy } from 'alchemy-sdk'
import { allowedChains } from '@/app/config/config'

export type Provider = Alchemy

export const providerConfig = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!
}

export type ChainSDK = {
  [chainId: number]: Alchemy
}

export const chainsSDK: ChainSDK = {
  1: new Alchemy({
    ...providerConfig,
    network: Network.ETH_MAINNET
  }),
  11155111: new Alchemy({
    ...providerConfig,
    network: Network.ETH_SEPOLIA
  }),
  137: new Alchemy({
    ...providerConfig,
    network: Network.MATIC_MAINNET
  }),
  80001: new Alchemy({
    ...providerConfig,
    network: Network.MATIC_MUMBAI
  }),
  8453: new Alchemy({
    ...providerConfig,
    network: Network.BASE_MAINNET
  }),
  84532: new Alchemy({
    ...providerConfig,
    network: Network.BASE_SEPOLIA
  })
}

Object.values(allowedChains).forEach((chain) => {
  if (!chainsSDK[chain.id]) {
    throw new Error(`No SDK for chain ${chain.id}`)
  }
})
