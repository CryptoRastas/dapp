import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi'

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
    writeAsync,
    isLoading: isWriting
  } = useContractWrite({
    functionName: 'setApprovalForAll',
    address: contractAddress as `0x${string}`,
    abi: erc721Abi
  })

  const { data, isLoading: isReading } = useContractRead({
    functionName: 'isApprovedForAll',
    enabled: isConnected && !chain?.unsupported,
    address: contractAddress as `0x${string}`,
    abi: erc721Abi,
    args: [address as `0x${string}`, operatorAddress as `0x${string}`],
    watch: true,
    cacheTime: 2_000
  })

  const handleApproveAll = async () => {
    try {
      await writeAsync({
        args: [operatorAddress as `0x${string}`, true]
      })
    } catch (error) {
      console.log(error)
      throw new Error(
        `setApprovedForAll contract address ${operatorAddress} failed`
      )
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

export default useERC721ApproveAll
