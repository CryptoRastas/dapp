import appConfig from '@/app.config'
import { Chain } from '@/app/config/chains'
import { allowedChainsConfig, allowedChains } from '@/app/config/config'
import { find, filter } from 'lodash'
import { useMemo } from 'react'

export type UseChainConfigProps = {
  chainId?: number
}

const checkChainId = (chainToCheck: Chain, chainId?: number) => {
  return chainToCheck.id !== chainId
}

export function useChainConfig({ chainId }: UseChainConfigProps) {
  const chainIdRefined = useMemo(
    () => find(allowedChains, { id: chainId }),
    [chainId]
  )

  const defaultConfig = useMemo(
    () =>
      allowedChainsConfig[
        chainIdRefined?.id || +appConfig.networks.defaultChainId
      ],
    [chainIdRefined]
  )

  /// returns only chains != chainId
  const remainingChains = useMemo(
    () => filter(allowedChains, (chain) => checkChainId(chain, chainId)),
    [chainId]
  ) as [Chain, ...Chain[]]

  return {
    config: defaultConfig,
    remainingChains
  }
}

export default useChainConfig
