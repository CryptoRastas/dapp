import useWallet from '@/app/lib/wallet/hooks/useWallet'
import ABI from './abi.json'

import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi'
import { ethers } from 'ethers'

export type BridgePayload = {
  bridgeAddress: string
  tokenIds: string[]
  destinationChainId: number
}

export const useBridge = ({
  bridgeAddress,
  tokenIds,
  destinationChainId
}: BridgePayload) => {
  const { address, isConnected } = useWallet()

  const { data: sendBatchFromData, writeAsync } = useContractWrite({
    functionName: 'sendBatchFrom',
    address: bridgeAddress as `0x${string}`,
    abi: ABI
  })

  const packetTypeSendAndCall = 1n

  const { data: requiredMinDstGas } = useContractRead({
    functionName: 'minDstGasLookup',
    enabled: isConnected && !!destinationChainId,
    address: bridgeAddress as `0x${string}`,
    abi: ABI,
    args: [destinationChainId, packetTypeSendAndCall],
    watch: true,
    cacheTime: 2_000
  })

  const version = 1n

  const adapterParams = ethers.solidityPacked(
    ['uint16', 'uint256'],
    [version, requiredMinDstGas || 0n]
  )

  const useZRO = false

  const { data: estimateData } = useContractRead<any, any, bigint[]>({
    functionName: 'estimateSendBatchFee',
    enabled: isConnected,
    address: bridgeAddress as `0x${string}`,
    abi: ABI,
    args: [destinationChainId, address, tokenIds, useZRO, adapterParams],
    watch: true,
    cacheTime: 2_000
  })

  const zroPaymentAddress = ethers.ZeroAddress

  const handleSendBatchFrom = async () => {
    await writeAsync({
      args: [
        address,
        destinationChainId,
        address,
        tokenIds,
        address,
        zroPaymentAddress,
        adapterParams
      ],
      value: estimateData?.[0]
    })
  }

  const { isLoading: isPending } = useWaitForTransaction({
    hash: sendBatchFromData?.hash,
    enabled: !!sendBatchFromData?.hash
  })

  return {
    sendBatchFrom: handleSendBatchFrom
  }
}

export default useBridge
