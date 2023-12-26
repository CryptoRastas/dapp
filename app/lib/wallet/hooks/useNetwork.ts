import { Chain, useNetwork as useNetworkHook, useSwitchNetwork } from 'wagmi'
import useChainConfig from './useChainConfig'

export type ChainConfig = Chain & {
  unsupported?: boolean
}

export function useNetwork() {
  const { chain } = useNetworkHook()

  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const { config } = useChainConfig({
    chainId: chain?.id
  })

  return {
    error,
    isLoading,
    pendingChainId,
    chains,
    chain,
    switchNetwork,
    config
  }
}

export default useNetwork
