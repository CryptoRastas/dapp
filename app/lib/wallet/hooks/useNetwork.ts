import { useAccount, useSwitchChain } from 'wagmi'
import useChainConfig from './useChainConfig'
import { Chain } from '@/app/config/chains'

export type ChainConfig = Chain & {
  unsupported?: boolean
}

export function useNetwork() {
  const { chain } = useAccount()

  const { chains, error, switchChain, status } = useSwitchChain()

  const { config, remainingChains } = useChainConfig({
    chainId: chain?.id
  })

  return {
    error,
    isLoading: status === 'pending',
    chains,
    chain: chain as ChainConfig,
    switchChain,
    config,
    remainingChains
  }
}

export default useNetwork
