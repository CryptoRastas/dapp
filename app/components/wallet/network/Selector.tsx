import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { NetworkThumbnail } from './Thumbnail'
import { ChainConfig } from '@/app/lib/wallet/hooks/useNetwork'

type NetworkSelectorProps = {
  chain?: ChainConfig
}

export const NetworkSelector = ({ chain }: NetworkSelectorProps) => {
  return (
    <div>
      {!chain || chain?.unsupported ? (
        <ExclamationTriangleIcon width={18} className={'text-red-400'} />
      ) : (
        <NetworkThumbnail src={`/assets/chains/${chain?.id}.svg`} />
      )}
    </div>
  )
}

export default NetworkSelector
