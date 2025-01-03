import { allowedChainsConfig } from '@/app/config/config'
import { ChainContracts } from '@/app/config/types'
import { useNetwork } from '@/app/lib/wallet/hooks'

export function useChainContract<T extends keyof ChainContracts>(
  contractName: T
) {
  const { config } = useNetwork()

  return allowedChainsConfig[config.id].contracts[contractName]
}

export default useChainContract
