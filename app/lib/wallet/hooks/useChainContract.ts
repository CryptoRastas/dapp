import { allowedChainsConfig } from '@/app/config/config'
import { useNetwork } from '@/app/lib/wallet/hooks'

export function useChainContract(contractName: any) {
  const { config } = useNetwork()

  return allowedChainsConfig?.[config.id]?.contracts?.[contractName]
}

export default useChainContract
