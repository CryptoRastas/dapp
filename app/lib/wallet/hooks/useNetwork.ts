import appConfig from '@/app.config'
import { allowedChainsConfig, allowedChains } from '@/app/config/config'
import { find } from 'lodash'
import { Chain, useNetwork as useNetworkHook, useSwitchNetwork } from 'wagmi'

export type ChainConfig = Chain & {
  unsupported?: boolean
}

export function useNetwork() {
  const { chain } = useNetworkHook()

  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const chainIdRefined = find(allowedChains, { id: chain?.id })

  const configByCurrentChainOrDefaultId =
    allowedChainsConfig[
      chainIdRefined?.id || +appConfig.networks.defaultChainId
    ]

  return {
    error,
    isLoading,
    pendingChainId,
    chains,
    chain,
    switchNetwork,
    config: configByCurrentChainOrDefaultId
  }
}

export default useNetwork
