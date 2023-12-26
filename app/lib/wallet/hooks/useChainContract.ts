import { Chain } from '@/app/config/chains'
import { allowedChainsConfig } from '@/app/config/config'
import { useNetwork } from '@/app/lib/wallet/hooks'

export function useChainContract(
  contractName: keyof Chain['contracts'],
  chainId?: number
) {
  const { config } = useNetwork()

  return allowedChainsConfig?.[chainId || config.id]?.contracts?.[
    contractName
  ] as Chain['contracts'][typeof contractName]
}

export default useChainContract
