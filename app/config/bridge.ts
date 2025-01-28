import {
  polygonAmoy,
  polygon,
  mainnet,
  sepolia,
  base,
  baseSepolia,
  abstractTestnet,
  abstract,
  Chain
} from './chains'

type BridgeConfig = {
  [id in Chain['id']]: Array<Chain>
}

export const bridgeConfig: BridgeConfig = {
  /// testnets
  [polygonAmoy.id]: [sepolia, baseSepolia],
  [sepolia.id]: [polygonAmoy, baseSepolia, abstractTestnet],
  [baseSepolia.id]: [sepolia, abstractTestnet],
  [abstractTestnet.id]: [sepolia, baseSepolia],

  /// mainnet
  [polygon.id]: [mainnet, base],
  [mainnet.id]: [polygon, base, abstract],
  [base.id]: [mainnet, polygon, abstract],
  [abstract.id]: [mainnet, base]
}
