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
  })
})

export const polygon: Chain = merge(polygonChain, {
  abstractId: 109,
  isSourceChain: false,
  contracts: merge(polygonChain.contracts, {
    token: {
      address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
      blockNumber: 0
    },
    bridge: {
      address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
      blockNumber: 0
    }
  })
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
  })
})

export const mainnet: Chain = merge(mainnetChain, {
  abstractId: 101,
  isSourceChain: true,
  contracts: merge(mainnetChain.contracts, {
    token: {
      address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
      blockNumber: 0
    },
    bridge: {
      address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
      blockNumber: 0
    }
  })
})
