import appConfig from '@/app.config'
import { allowedChainsConfig, allowedChains } from '@/app/config/config'
import { find } from 'lodash'

export type UseChainConfigProps = {
  chainId?: number
}

export function useChainConfig({ chainId }: UseChainConfigProps) {
  const chainIdRefined = find(allowedChains, { id: chainId })

  const configByCurrentChainOrDefaultId =
    allowedChainsConfig[
      chainIdRefined?.id || +appConfig.networks.defaultChainId
    ]

  return {
    config: configByCurrentChainOrDefaultId
  }
}

export default useChainConfig
