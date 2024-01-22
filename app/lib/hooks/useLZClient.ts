import { getMessagesBySrcTxHash } from '@layerzerolabs/scan-client'
import { useNetwork } from '@/app/lib/wallet/hooks'
import { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { includes } from 'lodash'

export type Message = {
  srcUaAddress: string
  dstUaAddress: string
  srcChainId: number
  dstChainId: number
  dstTxHash?: string
  dstTxError?: string
  srcTxHash?: string
  srcBlockHash?: string
  srcBlockNumber?: string
  srcUaNonce: number
  status: MessageStatus
}

export enum MessageStatus {
  INFLIGHT = 'INFLIGHT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  PAYLOAD_STORED = 'PAYLOAD_STORED',
  BLOCKED = 'BLOCKED',
  CONFIRMING = 'CONFIRMING'
}

export const useLZClient = (txHash?: string) => {
  const { config } = useNetwork()
  const [message, setMessage] = useState<Message>()
  const [isPlaying, setPlaying] = useState<boolean>(false)

  useInterval(
    async () => {
      if (!txHash) return
      const result = await getMessagesBySrcTxHash(config.abstractId, txHash)
      const message = result.messages[0]
      setMessage(message)
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? 60000 : null
  )

  useEffect(() => {
    if (!message) return
    if (
      message &&
      includes(
        [
          MessageStatus.DELIVERED,
          MessageStatus.FAILED,
          MessageStatus.PAYLOAD_STORED,
          MessageStatus.BLOCKED
        ],
        message.status
      )
    ) {
      setPlaying(false)
    }
  }, [message])

  useEffect(() => {
    if (!txHash) return
    setPlaying(true)
  }, [config.abstractId, txHash])

  return { message, setMessage }
}
