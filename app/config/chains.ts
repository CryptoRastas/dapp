import { merge } from 'lodash'

import {
  polygonMumbai as polygonMumbaiChain,
  polygon as polygonChain,
  sepolia as sepoliaChain,
  mainnet as mainnetChain,
  Chain as WagmiChain
} from 'wagmi/chains'

export interface Chain extends WagmiChain {
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
  contracts: merge(polygonMumbaiChain.contracts, {
    token: {
      address: '0xc8ce0cA761935859c457C1b0cBE953A66757E777',
      blockNumber: 0
    },
    bridge: {
      address: '0xc8ce0cA761935859c457C1b0cBE953A66757E777',
      blockNumber: 0
    }
  })
})

export const polygon: Chain = merge(polygonChain, {
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
  contracts: merge(sepoliaChain.contracts, {
    token: {
      address: '0x0888CF7Ee20c0E1d43bd2073bb334c65cF7B6FF1',
      blockNumber: 0
    },
    bridge: {
      address: '0xf17c3853379947f7B750953AaFa5C59B78153e10',
      blockNumber: 0
    }
  })
})

export const mainnet: Chain = merge(mainnetChain, {
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
