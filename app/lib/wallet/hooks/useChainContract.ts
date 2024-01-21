import { Chain } from '@/app/config/chains'
import { allowedChainsConfig } from '@/app/config/config'
import { useNetwork } from '@/app/lib/wallet/hooks'
import { useMemo } from 'react'

export function useChainContract(
  contractName: keyof Chain['contracts'],
  chainId?: number
) {
  const { config } = useNetwork()

  return useMemo(
    () => allowedChainsConfig[chainId || config.id].contracts[contractName],
    [config, contractName, chainId]
  )
}

export default useChainContract
