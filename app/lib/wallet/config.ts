import { createConfig, configureChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { allowedChains } from '@/app/config/config'
import { publicProvider } from 'wagmi/providers/public'
import provider, { chainsSDK, Provider } from './provider'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  allowedChains,
  [provider, publicProvider()]
)

const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true
      }
    })
  ],
  publicClient,
  webSocketPublicClient
})

export { chains, chainsSDK }
export type { Provider }

export default config
