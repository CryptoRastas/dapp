import useWallet from '@/app/lib/wallet/hooks/useWallet'
import ABI from './abi.json'

import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi'
import { ethers } from 'ethers'
/// https://www.npmjs.com/package/@layerzerolabs/scan-client

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

  const {
    data: sendBatchFromData,
    writeAsync,
    isLoading: isWriting
  } = useContractWrite({
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
      value: estimateData?.[0] || 0n
    })
  }

  const { isLoading: isPending } = useWaitForTransaction({
    hash: sendBatchFromData?.hash,
    enabled: !!sendBatchFromData?.hash
  })

  return {
    fees: estimateData?.[0] || 0n,
    sendBatchFrom: handleSendBatchFrom,
    isLoading: isPending || isWriting
  }
}

export default useBridge
