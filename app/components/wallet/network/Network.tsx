import { type HTMLProps } from 'react'
import { ChainConfig } from '@/app/lib/wallet/hooks/useNetwork'
import { NetworkSelector } from './Selector'

type NetworkProps = HTMLProps<HTMLDivElement> & {
  chain?: ChainConfig
}

export const Network = ({ chain }: NetworkProps) => {
  return <NetworkSelector chain={chain} />
}

export default Network
