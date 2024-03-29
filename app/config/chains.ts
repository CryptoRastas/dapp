import { merge } from 'lodash'

import {
  polygonMumbai as polygonMumbaiChain,
  polygon as polygonChain,
  sepolia as sepoliaChain,
  mainnet as mainnetChain,
  Chain as WagmiChain
} from 'wagmi/chains'

export interface Chain extends WagmiChain {
  abstractId: number
  isSourceChain: boolean
  contracts: {
    token: {
      address: string
      blockNumber?: number
    }
    bridge: {
      address: string
      blockNumber?: number
    }
  }
  marketplaceURL: string
  marketplaceURLTokenId: string
  scanClient: string
}

export const polygonMumbai: Chain = merge(polygonMumbaiChain, {
  name: 'Mumbai',
  abstractId: 10109,
  isSourceChain: false,
  contracts: merge(polygonMumbaiChain.contracts, {
    token: {
      address: '0x357F0dc00AdE231db59aE38aCd8A0E73ed0125Ff',
      blockNumber: 0
    },
    bridge: {
      address: '0x357F0dc00AdE231db59aE38aCd8A0E73ed0125Ff',
      blockNumber: 0
    }
  }),
  marketplaceURL: 'https://testnets.opensea.io/collection/cryptorastas-13',
  marketplaceURLTokenId: 'https://testnets.opensea.io/assets/mumbai',
  scanClient: 'https://testnet.layerzeroscan.com/address'
})

export const polygon: Chain = merge(polygonChain, {
  abstractId: 109,
  isSourceChain: false,
  contracts: merge(polygonChain.contracts, {
    token: {
      address: '0xfD691DCf0Cd713986F9218F3dc7aEb5f2b9e7480',
      blockNumber: 0
    },
    bridge: {
      address: '0xfD691DCf0Cd713986F9218F3dc7aEb5f2b9e7480',
      blockNumber: 0
    }
  }),
  marketplaceURL: 'https://opensea.io/collection/cryptorastas-polygon',
  marketplaceURLTokenId: 'https://opensea.io/assets/matic',
  scanClient: 'https://layerzeroscan.com/address'
})

export const sepolia: Chain = merge(sepoliaChain, {
  abstractId: 10161,
  isSourceChain: true,
  contracts: merge(sepoliaChain.contracts, {
    token: {
      address: '0xEa1bE678525726C050aE363D6561110567c6A005',
      blockNumber: 0
    },
    bridge: {
      address: '0x08d6474eb92E8c4Df03E4223e0ec8d50f743c75f',
      blockNumber: 0
    }
  }),
  marketplaceURL: 'https://testnets.opensea.io/collection/cryptorastas-222',
  marketplaceURLTokenId: 'https://testnets.opensea.io/assets/sepolia',
  scanClient: 'https://testnet.layerzeroscan.com/address'
})

export const mainnet: Chain = merge(mainnetChain, {
  abstractId: 101,
  isSourceChain: true,
  contracts: merge(mainnetChain.contracts, {
    token: {
      address: '0x07cd221b2fe54094277a2f4e1c1bc6df14e63678',
      blockNumber: 0
    },
    bridge: {
      address: '0xfD691DCf0Cd713986F9218F3dc7aEb5f2b9e7480',
      blockNumber: 0
    }
  }),
  marketplaceURL: 'https://opensea.io/collection/cryptorastas-collection',
  marketplaceURLTokenId: 'https://opensea.io/assets/ethereum',
  scanClient: 'https://layerzeroscan.com/address'
})
