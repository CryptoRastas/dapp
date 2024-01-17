import { useNetwork as useNetworkHook, useSwitchNetwork } from 'wagmi'
import useChainConfig from './useChainConfig'
import { Chain } from '@/app/config/chains'

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
    chains: chains as ChainConfig[],
    chain: chain as ChainConfig,
    switchNetwork,
    config
  }
}

export default useNetwork
