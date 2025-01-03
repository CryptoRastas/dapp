import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt
} from 'wagmi'

import { useWallet } from './useWallet'
import { useNetwork } from './useNetwork'
import { erc721Abi } from 'viem'

export const useERC721ApproveAll = (
  contractAddress: string,
  operatorAddress: string
) => {
  const { chain } = useNetwork()
  const { address, isConnected } = useWallet()

  const {
    data: setApprovedForAllData,
    writeContractAsync,
    isPending: isWriting
  } = useWriteContract()

  const { data, isLoading: isReading } = useReadContract({
    functionName: 'isApprovedForAll',
    address: contractAddress as `0x${string}`,
    abi: erc721Abi,
    args: [address as `0x${string}`, operatorAddress as `0x${string}`],
    query: {
      enabled: isConnected && !chain?.unsupported,
      refetchInterval: 2_000
    }
  })

  const handleApproveAll = async () => {
    try {
      await writeContractAsync({
        functionName: 'setApprovalForAll',
        address: contractAddress as `0x${string}`,
        abi: erc721Abi,
        args: [operatorAddress as `0x${string}`, true]
      })
    } catch (error) {
      console.log(error)
      throw new Error(
        `setApprovedForAll contract address ${operatorAddress} failed`
      )
    }
  }

  const { isLoading: isPending } = useWaitForTransactionReceipt({
    hash: setApprovedForAllData,
    query: {
      enabled: !!setApprovedForAllData
    }
  })

  return {
    approveAll: handleApproveAll,
    isApprovedForAll: data,
    isLoading: isPending || isWriting || isReading,
    isApproving: isWriting || isPending
  }
}

export default useERC721ApproveAll
