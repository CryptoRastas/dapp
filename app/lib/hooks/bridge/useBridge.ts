import ABI from './abi.json'
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  usePublicClient,
  useFeeData
} from 'wagmi'

import { ethers } from 'ethers'
import { useLZClient } from '../useLZClient'
import { useCallback, useEffect, useMemo, useState } from 'react'

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
  destinationChainId: number
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

  const [networkFees, setNetworkFees] = useState(0n)

  const { data: requiredMinDstGas } = useContractRead({
    functionName: 'minDstGasLookup',
    enabled: enabled && !!destinationChainId,
    address: bridgeAddress as `0x${string}`,
    abi: ABI,
    args: [destinationChainId, packetTypeSendAndCall],
    watch: true,
    cacheTime: 2_000
  })

  const adapterParams = ethers.solidityPacked(
    ['uint16', 'uint256'],
    [version, requiredMinDstGas || 0n]
  )

  const { data: estimatedFeeToBridgeTokens } = useContractRead<
    any,
    any,
    bigint[]
  >({
    functionName: 'estimateSendBatchFee',
    enabled: enabled && !!destinationChainId && tokenIds.length > 0,
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
    watch: true,
    cacheTime: 2_000
  })

  const { data: feeData } = useFeeData({
    watch: true
  })

  const { config: bridgeTransactionConfig } = usePrepareContractWrite({
    maxFeePerGas: feeData?.maxFeePerGas
      ? feeData.maxFeePerGas + 260_000n
      : undefined,
    maxPriorityFeePerGas: feeData?.maxPriorityFeePerGas
      ? feeData.maxPriorityFeePerGas + 260_000n
      : undefined,
    enabled: enabled && !!destinationChainId && tokenIds.length > 0,
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
    value: estimatedFeeToBridgeTokens?.[0] || 0n
  })

  const client = usePublicClient()

  const {
    data: sendBatchFromData,
    writeAsync,
    isLoading: isWriting
  } = useContractWrite(bridgeTransactionConfig)

  const handleSendBatchFrom = async () => {
    try {
      await writeAsync?.()
    } catch (error) {
      console.log(error)
      throw new Error(`sendBatchFrom contract address ${bridgeAddress} failed`)
    }
  }

  const { isLoading: isPending } = useWaitForTransaction({
    hash: sendBatchFromData?.hash,
    enabled: !!sendBatchFromData?.hash
  })

  const { message, setMessage } = useLZClient(sendBatchFromData?.hash)

  const handleResetState = useCallback(() => {
    setMessage(undefined)
  }, [setMessage])

  useEffect(() => {
    if (!bridgeTransactionConfig?.request?.account) return

    client
      .estimateContractGas(bridgeTransactionConfig.request)
      .then(setNetworkFees)
      .catch(() => {
        // bypass
      })
  }, [client, bridgeTransactionConfig])

  const fees = useMemo(
    () => (estimatedFeeToBridgeTokens?.[0] || 0n) + networkFees,
    [networkFees, estimatedFeeToBridgeTokens]
  )

  return {
    fees,
    bridge: handleSendBatchFrom,
    isLoading: isPending || isWriting,
    status: message?.status,
    reset: handleResetState
  }
}

export default useBridge
