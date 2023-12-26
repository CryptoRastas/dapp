import {
  erc721ABI,
  useContractRead,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi'

import { useWallet } from './useWallet'

export const useERC721ApproveAll = (
  contractAddress: string,
  operator: string
) => {
  const { address } = useWallet()

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
    address: contractAddress as `0x${string}`,
    abi: erc721ABI,
    args: [address as `0x${string}`, operator as `0x${string}`]
  })

  const handleApproveAll = async (operatorAddress: string) => {
    try {
      await writeAsync({
        args: [operatorAddress as `0x${string}`, true]
      })
    } catch (error) {
      console.log(`Error setApprovedForAll contract ${operator}`, error)
    }
  }

  const { isLoading: isPending } = useWaitForTransaction({
    hash: setApprovedForAllData?.hash
  })

  return {
    approveAll: handleApproveAll,
    isApprovedForAll: data,
    isLoading: isPending || isWriting || isReading
  }
}
