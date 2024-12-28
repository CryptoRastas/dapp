import { createConfig, fallback, http, Transport, webSocket } from 'wagmi'
import { getDefaultConfig } from 'connectkit'

import {
  allowedChains as chains,
  allowedChainsConfig
} from '@/app/config/config'

import { chainsSDK, Provider } from './provider'
import appConfig from '@/app.config'
import { merge, reduce } from 'lodash'
import { Chain } from '@/app/config/chains'

export const transports = reduce(
  chains,
  (acc, chain: Chain) =>
    merge(
      {
        ...acc
      },
      {
        [chain.id]: fallback([
          webSocket(
            allowedChainsConfig[chain.id].rpcUrls.protocol?.webSocket?.[0],
            {
              key: 'protocol-websocket',
              name: 'protocol-websocket',
              retryCount: 9,
              retryDelay: 100,
              reconnect: {
                attempts: 9,
                delay: 100
              }
            }
          ),
          http(allowedChainsConfig[chain.id].rpcUrls.protocol.http[0], {
            key: 'protocol-http',
            name: 'protocol-http',
            retryCount: 9,
            retryDelay: 100
          }),
          http(allowedChainsConfig[chain.id].rpcUrls.default.http[0]),
          http()
        ])
      }
    ),
  {} as Record<keyof typeof chains, Transport>
)

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    // alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!, // or infuraId
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,

    // Required
    appName: appConfig.name,

    // Optional
    appDescription: appConfig.meta.description,
    appUrl: appConfig.siteURL,
    appIcon:
      'https://crypto-rastas-dapp.vercel.app/_next/image/?url=%2Fassets%2Fcrypto-rastas-logo.png&w=128&q=75', // your app's icon, no bigger than 1024x1024px (max. 1MB),
    chains,
    transports
  })
)

export { chains, chainsSDK }

export type { Provider }

export default config
