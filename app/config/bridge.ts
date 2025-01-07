import {
  polygonAmoy,
  polygon,
  mainnet,
  sepolia,
  base,
  baseSepolia,
  abstractTestnet,
  Chain
} from './chains'

type BridgeConfig = {
  [id in Chain['id']]: Array<Chain>
}

export const bridgeConfig: BridgeConfig = {
  /// testnets
  [polygonAmoy.id]: [sepolia, baseSepolia, abstractTestnet],
  [sepolia.id]: [polygonAmoy, baseSepolia, abstractTestnet],
  [baseSepolia.id]: [sepolia],
  [abstractTestnet.id]: [sepolia],

  /// mainnet
  [polygon.id]: [mainnet, base /** abstractMainnet */],
  [mainnet.id]: [polygon, base /** abstractMainnet */],
  [base.id]: [mainnet, polygon]
  /** [abstractMainnet.id]: [mainnet]*/
}
