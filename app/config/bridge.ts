import {
  polygonMumbai,
  polygon,
  mainnet,
  sepolia,
  base,
  baseSepolia,
  Chain
} from './chains'

type BridgeConfig = {
  [id in Chain['id']]: Array<Chain>
}

export const bridgeConfig: BridgeConfig = {
  [polygonMumbai.id]: [sepolia, baseSepolia],
  [sepolia.id]: [polygonMumbai, baseSepolia],
  [baseSepolia.id]: [sepolia, polygonMumbai],
  [polygon.id]: [mainnet, base],
  [mainnet.id]: [polygon, base],
  [base.id]: [mainnet, polygon]
}
