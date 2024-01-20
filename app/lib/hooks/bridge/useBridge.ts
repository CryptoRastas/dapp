import ABI from './abi.json'
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi'
import { ethers } from 'ethers'
import { useLZClient } from '../useLZClient'

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

const VERSION = 1n
const USE_ZRO = false
const ZRO_PAYMENT_ADDRESS = ethers.ZeroAddress
const PACKET_TYPE_SEND_AND_CALL = 1n

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
    writeAsync,
    isLoading: isWriting
  } = useContractWrite({
    functionName: 'sendBatchFrom',
    address: bridgeAddress as `0x${string}`,
    abi: ABI
  })

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

  const { data: estimateData } = useContractRead<any, any, bigint[]>({
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

  const handleSendBatchFrom = async () => {
    try {
      await writeAsync({
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
        value: estimateData?.[0] || 0n
      })
    } catch (error) {
      console.log(error)
      throw new Error(`sendBatchFrom contract address ${bridgeAddress} failed`)
    }
  }

  const { isLoading: isPending } = useWaitForTransaction({
    hash: sendBatchFromData?.hash,
    enabled: !!sendBatchFromData?.hash
  })

  const messages = useLZClient(sendBatchFromData?.hash)

  return {
    fees: estimateData?.[0] || 0n,
    bridge: handleSendBatchFrom,
    isLoading: isPending || isWriting,
    status: messages?.status
  }
}

export default useBridge
