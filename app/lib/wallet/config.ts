import { createConfig } from 'wagmi'
import { getDefaultConfig } from 'connectkit'

// import { createConfig, configureChains } from 'wagmi'
// import { InjectedConnector } from 'wagmi/connectors/injected'

import { allowedChains as chains } from '@/app/config/config'
// import { publicProvider } from 'wagmi/providers/public'

import { chainsSDK, Provider } from './provider'

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   allowedChains,
//   [provider, publicProvider()]
// )

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!, // or infuraId
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,

    // Required
    appName: 'Your App Name',

    // Optional
    appDescription: 'Your App Description',
    appUrl: 'https://family.co', // your app's url
    appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB),
    chains
  })
)

export { chains, chainsSDK }

export type { Provider }

export default config
