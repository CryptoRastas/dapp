import { type HTMLProps } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { NetworkThumbnail } from './Thumbnail'
import classNames from 'classnames'
import { ChainConfig } from '@/app/lib/wallet/hooks/useNetwork'
import { Text } from '@/app/components/typography'

type NetworkSelectorProps = HTMLProps<HTMLDivElement> & {
  isOpen?: boolean
  chain?: ChainConfig
  onClick?: () => void
}

export const NetworkSelector = ({
  chain,
  onClick,
  isOpen,
  ...props
}: NetworkSelectorProps) => {
  return (
    <div
      {...props}
      className={classNames(
        props.className,
        'flex cursor-pointer justify-between pl-2'
      )}
      onClick={onClick}
    >
      <div className='flex items-center space-x-2'>
        {!chain || chain?.unsupported ? (
          <div>
            <ExclamationTriangleIcon
              width={18}
              className={isOpen ? 'text-gray-400' : 'text-red-400'}
            />
          </div>
        ) : (
          <NetworkThumbnail src={`/assets/chains/${chain?.id}.svg`} />
        )}
      </div>
    </div>
  )
}

export default NetworkSelector
