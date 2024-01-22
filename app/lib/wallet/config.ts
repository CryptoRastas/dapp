import { createConfig } from 'wagmi'
import { getDefaultConfig } from 'connectkit'

import { allowedChains as chains } from '@/app/config/config'

import { chainsSDK, Provider } from './provider'
import appConfig from '@/app.config'

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!, // or infuraId
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,

    // Required
    appName: appConfig.name,

    // Optional
    appDescription: appConfig.meta.description,
    appUrl: appConfig.siteURL,
    appIcon:
      'https://crypto-rastas-dapp.vercel.app/_next/image/?url=%2Fassets%2Fcrypto-rastas-logo.png&w=128&q=75', // your app's icon, no bigger than 1024x1024px (max. 1MB),
    chains
  })
)

export { chains, chainsSDK }

export type { Provider }

export default config
