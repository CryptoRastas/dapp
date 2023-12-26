import { useBalance as useBalanceHook } from 'wagmi'
import { useWallet } from './useWallet'
import { useNetwork } from './useNetwork'

function useBalance() {
  const { address } = useWallet()
  const { chain } = useNetwork()

  const { data, isLoading } = useBalanceHook({
    address,
    chainId: chain?.id,
    formatUnits: 'ether'
  })

  return {
    data,
    isLoading
  }
}

export default useBalance
