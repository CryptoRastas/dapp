import {
  erc721ABI,
  useContractRead,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi'

import { useWallet } from './useWallet'

export const useERC721ApproveAll = (
  contractAddress: string,
  operatorAddress: string
) => {
  const { address, isConnected } = useWallet()

  const {
    data: setApprovedForAllData,
    writeAsync,
    isLoading: isWriting
  } = useContractWrite({
    functionName: 'setApprovalForAll',
    address: contractAddress as `0x${string}`,
    abi: erc721ABI
  })

  const { data, isLoading: isReading } = useContractRead({
    functionName: 'isApprovedForAll',
    enabled: isConnected,
    address: contractAddress as `0x${string}`,
    abi: erc721ABI,
    args: [address as `0x${string}`, operatorAddress as `0x${string}`],
    watch: true,
    cacheTime: 2_000
  })

  const handleApproveAll = async () => {
    try {
      if (!isConnected) throw new Error('Wallet not connected')
      await writeAsync({
        args: [operatorAddress as `0x${string}`, true]
      })
    } catch (error) {
      console.log(`Error setApprovedForAll contract ${operatorAddress}`, error)
    }
  }

  const { isLoading: isPending } = useWaitForTransaction({
    hash: setApprovedForAllData?.hash,
    enabled: !!setApprovedForAllData?.hash
  })

  return {
    approveAll: handleApproveAll,
    isApprovedForAll: data,
    isLoading: isPending || isWriting || isReading,
    isApproving: isWriting || isPending
  }
}
