import { Network, Alchemy } from 'alchemy-sdk'
import { allowedChains } from '@/app/config/config'
import {
  polygonAmoy,
  polygon,
  mainnet,
  sepolia,
  base,
  baseSepolia,
  abstractTestnet
} from '@/app/config/chains'
export type Provider = Alchemy

export const providerConfig = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!
}

export type ChainSDK = {
  [chainId: number]: Alchemy
}

export const chainsSDK: ChainSDK = {
  [mainnet.id]: new Alchemy({
    ...providerConfig,
    network: Network.ETH_MAINNET
  }),
  [sepolia.id]: new Alchemy({
    ...providerConfig,
    network: Network.ETH_SEPOLIA
  }),
  [polygon.id]: new Alchemy({
    ...providerConfig,
    network: Network.MATIC_MAINNET
  }),
  [polygonAmoy.id]: new Alchemy({
    ...providerConfig,
    network: Network.MATIC_AMOY
  }),
  [base.id]: new Alchemy({
    ...providerConfig,
    network: Network.BASE_MAINNET
  }),
  [baseSepolia.id]: new Alchemy({
    ...providerConfig,
    network: Network.BASE_SEPOLIA
  }),
  [abstractTestnet.id]: new Alchemy({
    ...providerConfig
  })
}

Object.values(allowedChains).forEach((chain) => {
  if (!chainsSDK[chain.id]) {
    throw new Error(`No SDK for chain ${chain.id}`)
  }
})
