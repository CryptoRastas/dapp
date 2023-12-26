import { type HTMLProps } from 'react'
import { ChainConfig } from '@/app/lib/wallet/hooks/useNetwork'
import { NetworkContainer } from './Container'
import { NetworkSelector } from './Selector'
import { OverlayToggle } from '@/app/components/toggle/OverlayToggle'

type NetworkProps = HTMLProps<HTMLDivElement> & {
  chain?: ChainConfig
  chains: ChainConfig[]
}

export const Network = ({ chain, chains, ...props }: NetworkProps) => {
  return (
    <OverlayToggle
      key='network-toggle'
      {...props}
      selector={<NetworkSelector chain={chain} />}
      container={<NetworkContainer chain={chain} chains={chains} />}
    />
  )
}

export default Network
