import { merge } from 'lodash'

import {
  polygonAmoy as polygonAmoyChain,
  polygon as polygonChain,
  sepolia as sepoliaChain,
  mainnet as mainnetChain,
  baseSepolia as baseSepoliaChain,
  base as baseChain,
  abstractTestnet as abstractTestnetChain
} from 'viem/chains'

import { Chain } from './types'
import { Address } from 'viem'

export type { Chain }

export const polygonAmoy: Chain = merge(polygonAmoyChain, {
  abstractId: 10267,
  name: 'Amoy',
  contracts: merge(polygonAmoyChain.contracts, {
    token: {
      address: '0x357F0dc00AdE231db59aE38aCd8A0E73ed0125Ff' as Address,
      blockNumber: 0
    },
    bridge: {
      address: '0x357F0dc00AdE231db59aE38aCd8A0E73ed0125Ff' as Address,
      blockNumber: 0
    }
  }),
  marketplaceURL: 'https://testnets.opensea.io/collection/cryptorastas-13',
  marketplaceURLTokenId: 'https://testnets.opensea.io/assets/amoy',
  scanClient: 'https://testnet.layerzeroscan.com/address'
})

export const polygon: Chain = merge(polygonChain, {
  abstractId: 109,
  contracts: merge(polygonChain.contracts, {
    token: {
      address: '0xfD691DCf0Cd713986F9218F3dc7aEb5f2b9e7480' as Address,
      blockNumber: 0
    },
    bridge: {
      address: '0xfD691DCf0Cd713986F9218F3dc7aEb5f2b9e7480' as Address,
      blockNumber: 0
    }
  }),
  marketplaceURL: 'https://opensea.io/collection/cryptorastas-polygon',
  marketplaceURLTokenId: 'https://opensea.io/assets/matic',
  scanClient: 'https://layerzeroscan.com/address'
})

export const sepolia: Chain = merge(sepoliaChain, {
  abstractId: 10161,
  contracts: merge(sepoliaChain.contracts, {
    /// @dev: collection NFT
    /// @toDo: change to a proper name
    token: {
      address: '0x9B4d191e71138e100b3e0345cF4365060e3bBD01' as Address,
      blockNumber: 0
    },
    /// @dev: ProxyONFT721
    /// @toDo: change to a proper name
    bridge: {
      address: '0x65d8EDec76C83AC87d0E852Fd170B22A76dee3cF' as Address,
      blockNumber: 0
    }
  }),
  marketplaceURL: 'https://testnets.opensea.io/collection/cryptorastas-222',
  marketplaceURLTokenId: 'https://testnets.opensea.io/assets/sepolia',
  scanClient: 'https://testnet.layerzeroscan.com/address'
})

export const mainnet: Chain = merge(mainnetChain, {
  abstractId: 101,
  contracts: merge(mainnetChain.contracts, {
    token: {
      address: '0x07cd221b2fe54094277a2f4e1c1bc6df14e63678' as Address,
      blockNumber: 0
    },
    bridge: {
      address: '0xfD691DCf0Cd713986F9218F3dc7aEb5f2b9e7480' as Address,
      blockNumber: 0
    }
  }),
  marketplaceURL: 'https://opensea.io/collection/cryptorastas-collection',
  marketplaceURLTokenId: 'https://opensea.io/assets/ethereum',
  scanClient: 'https://layerzeroscan.com/address'
})

export const base: Chain = merge(baseChain, {
  abstractId: 184,
  contracts: merge(baseChain.contracts, {
    token: {
      address: '0x07cd221b2fe54094277a2f4e1c1bc6df14e63678' as Address,
      blockNumber: 0
    },
    bridge: {
      address: '0xfD691DCf0Cd713986F9218F3dc7aEb5f2b9e7480' as Address,
      blockNumber: 0
    }
  }),
  marketplaceURL: 'https://opensea.io/collection/cryptorastas-collection',
  marketplaceURLTokenId: 'https://opensea.io/assets/base',
  scanClient: 'https://layerzeroscan.com/address'
})

export const baseSepolia: Chain = merge(baseSepoliaChain, {
  abstractId: 10245,
  contracts: merge(baseSepoliaChain.contracts, {
    token: {
      address: '0x26711d5868f0f2e233b0e226D961E2172e3106Fc' as Address,
      blockNumber: 0
    },
    bridge: {
      address: '0x26711d5868f0f2e233b0e226D961E2172e3106Fc' as Address,
      blockNumber: 0
    }
  }),
  marketplaceURL: 'https://opensea.io/collection/cryptorastas-collection',
  marketplaceURLTokenId: 'https://opensea.io/assets/base',
  scanClient: 'https://layerzeroscan.com/address'
})

export const abstractTestnet: Chain = merge(abstractTestnetChain, {
  abstractId: 10313,
  contracts: merge(abstractTestnetChain.contracts, {
    token: {
      address: '0x07cd221b2fe54094277a2f4e1c1bc6df14e63678' as Address,
      blockNumber: 0
    },
    bridge: {
      address: '0xfD691DCf0Cd713986F9218F3dc7aEb5f2b9e7480' as Address,
      blockNumber: 0
    }
  }),
  marketplaceURL: 'https://opensea.io/collection/cryptorastas-collection',
  marketplaceURLTokenId: 'https://opensea.io/assets/abstract',
  scanClient: 'https://layerzeroscan.com/address'
})
