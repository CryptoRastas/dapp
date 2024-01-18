import { alchemyProvider } from 'wagmi/providers/alchemy'
import { Network, Alchemy } from 'alchemy-sdk'
import { ChainProviderFn } from 'wagmi'
import { Chain } from '@/app/config/chains'
import { allowedChains } from '@/app/config/config'

export type Provider = Alchemy

export const providerConfig = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!
}

export const chainsSDK = {
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
  })
} as {
  [chainId: number]: Alchemy
}

Object.values(allowedChains).forEach((chain) => {
  if (!chainsSDK[chain.id]) {
    throw new Error(`No SDK for chain ${chain.id}`)
  }
})

export default alchemyProvider({
  ...providerConfig
}) as ChainProviderFn<Chain>
