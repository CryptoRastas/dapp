import { useAccount, useBalance } from 'wagmi'

export function useBalace() {
  const { address } = useAccount()

  const { data, isLoading } = useBalance({
    address,
    unit: 'ether'
  })

  return {
    ...data,
    isLoading
  }
}

export default useBalace
