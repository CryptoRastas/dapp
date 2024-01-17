import { Children, type HTMLProps } from 'react'
import { ChainConfig } from '@/app/lib/wallet/hooks/useNetwork'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { NetworkThumbnail } from './Thumbnail'
import { Text } from '@/app/components/typography'
import { useToggle } from 'usehooks-ts'
import { Chain } from '@/app/config/chains'
import classNames from 'classnames'

type NetworkProps = HTMLProps<HTMLDivElement> & {
  chain?: ChainConfig
  chains: ChainConfig[]
  onSwitchNetwork?: (chainId: number) => void
}

export const Network = ({ chain, chains, onSwitchNetwork }: NetworkProps) => {
  const [isOpen, toggleIsOpen] = useToggle()

  /// Thumbsize
  const [width, height] = [20, 20]

  const handleFilterOnlyUnconnectedChains = (chainToCheck: Chain) => {
    return chainToCheck.id !== chain?.id
  }

  const filteredChains = chains.filter(handleFilterOnlyUnconnectedChains)

  return (
    <>
      <style jsx>
        {`
          .network-selector {
            --list-width: ${!isOpen ? 0 : filteredChains.length * width}px;
          }
        `}
      </style>
      <div
        className='network-selector flex items-center space-x-2'
        onClick={toggleIsOpen}
      >
        <button type='button' className='flex items-center space-x-1'>
          {!chain || chain?.unsupported ? (
            <>
              <ExclamationTriangleIcon className='h-4 w-4 text-red-500' />
              <span className='text-red-500'>Unsupported</span>
            </>
          ) : (
            <>
              <NetworkThumbnail
                width={width}
                height={height}
                src={`/assets/chains/${chain?.id}.svg`}
                className='grayscale'
              />
              {isOpen && <Text className='text-center'>{chain?.name}</Text>}
            </>
          )}
        </button>
        <div>
          <ul
            className={classNames([
              'flex items-center space-x-1',
              'overflow-hidden transition-all duration-1000',
              'w-[var(--list-width)]',
              isOpen ? 'ease-in-out' : 'ease-in'
            ])}
          >
            {Children.toArray(
              filteredChains.map((availableChain) => (
                <li className='flex justify-center'>
                  <button
                    type='button'
                    title={availableChain.name}
                    onClick={() => onSwitchNetwork?.(availableChain.id)}
                  >
                    <NetworkThumbnail
                      className='grayscale'
                      width={width}
                      height={height}
                      src={`/assets/chains/${availableChain.id}.svg`}
                    />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Network
