import ABI from './abi.json'
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt
} from 'wagmi'
import { ethers } from 'ethers'
import { useLZClient } from '../useLZClient'
import { useCallback } from 'react'

export type BridgeConfig = {
  version: bigint
  useZro: boolean
  zroPaymentAddress: string
  packetTypeSendAndCall: bigint
}

export type BridgePayload = {
  senderAddress?: string
  bridgeAddress: string
  tokenIds: string[]
  destinationChainId?: number
  collectionAddress: string
  enabled?: boolean
  config?: BridgeConfig
}

export const VERSION = 1n
export const USE_ZRO = false
export const ZRO_PAYMENT_ADDRESS = ethers.ZeroAddress
export const PACKET_TYPE_SEND_AND_CALL = 1n

export const useBridge = ({
  enabled,
  senderAddress,
  bridgeAddress,
  collectionAddress,
  tokenIds,
  destinationChainId,
  config = {
    version: VERSION,
    useZro: USE_ZRO,
    zroPaymentAddress: ZRO_PAYMENT_ADDRESS,
    packetTypeSendAndCall: PACKET_TYPE_SEND_AND_CALL
  }
}: BridgePayload) => {
  const { version, useZro, zroPaymentAddress, packetTypeSendAndCall } = config

  const {
    data: sendBatchFromData,
    writeContractAsync,
    isPending: isWriting
  } = useWriteContract()

  const { data: requiredMinDstGas } = useReadContract({
    functionName: 'minDstGasLookup',
    address: bridgeAddress as `0x${string}`,
    abi: ABI,
    args: [destinationChainId, packetTypeSendAndCall],
    query: {
      enabled: enabled && !!destinationChainId,
      refetchInterval: 2_000
    }
  })

  /// todo: check it from dstChainIdToTransferGas read method
  const extraGas = BigInt(tokenIds.length) * 1n

  const adapterParams = ethers.solidityPacked(
    ['uint16', 'uint256'],
    [version, BigInt((requiredMinDstGas as bigint) || 0n) + extraGas]
  )

  const { data: estimateData } = useReadContract({
    functionName: 'estimateSendBatchFee',
    address: bridgeAddress as `0x${string}`,
    abi: ABI,
    args: [
      destinationChainId,
      senderAddress,
      collectionAddress,
      tokenIds,
      useZro,
      adapterParams
    ],
    query: {
      enabled: enabled && !!destinationChainId && tokenIds.length > 0,
      refetchInterval: 2_000
    }
  })

  const handleSendBatchFrom = async () => {
    try {
      await writeContractAsync({
        functionName: 'sendBatchFrom',
        address: bridgeAddress as `0x${string}`,
        abi: ABI,
        args: [
          senderAddress,
          destinationChainId,
          senderAddress,
          collectionAddress,
          tokenIds,
          senderAddress,
          zroPaymentAddress,
          adapterParams
        ],
        value: (estimateData as any)?.[0] || 0n
      })
    } catch (error) {
      console.log(error)
      throw new Error(`sendBatchFrom contract address ${bridgeAddress} failed`)
    }
  }

  const { isLoading: isPending } = useWaitForTransactionReceipt({
    hash: sendBatchFromData,
    query: {
      enabled: !!sendBatchFromData
    }
  })

  const { message, setMessage } = useLZClient(sendBatchFromData)

  const handleResetState = useCallback(() => {
    setMessage(undefined)
  }, [setMessage])

  return {
    fees: (estimateData as any)?.[0] || 0n,
    bridge: handleSendBatchFrom,
    isLoading: isPending || isWriting,
    status: message?.status,
    reset: handleResetState
  }
}

export default useBridge
