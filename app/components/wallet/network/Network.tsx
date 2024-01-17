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

  const handleSwitchNetwork = (chainId: number) => {
    toggleIsOpen()
    onSwitchNetwork?.(chainId)
  }

  return (
    <>
      <style jsx>
        {`
          .network-selector {
            --list-width: ${!isOpen ? 0 : filteredChains.length * width}px;
          }
        `}
      </style>
      <div className='network-selector flex items-center lg:space-x-2'>
        <button
          type='button'
          className='flex items-center space-x-1'
          onClick={toggleIsOpen}
        >
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
              {isOpen && (
                <Text className='hidden text-center lg:inline-block'>
                  {chain?.name}
                </Text>
              )}
            </>
          )}
        </button>
        <div
          className={classNames(
            isOpen
              ? [
                  'max-lg:absolute max-lg:h-full max-lg:w-full max-lg:bg-black/80 max-lg:backdrop-blur',
                  'max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:top-0 max-lg:p-6'
                ]
              : ''
          )}
        >
          <ul
            className={classNames([
              'flex items-center space-x-1',
              'overflow-hidden transition-all duration-300',
              'lg:w-[var(--list-width)]',
              isOpen ? 'w-auto' : 'max-lg:w-0',
              isOpen ? 'opacity-100 ease-in-out' : 'opacity-0 ease-in'
            ])}
          >
            {Children.toArray(
              filteredChains.map((availableChain) => (
                <li
                  className={classNames([
                    'flex lg:justify-center',
                    'max-lg:w-full'
                  ])}
                >
                  <button
                    type='button'
                    title={availableChain.name}
                    className={classNames([
                      'max-lg:flex max-lg:space-x-2',
                      'max-lg:text-white'
                    ])}
                    onClick={() => handleSwitchNetwork(availableChain.id)}
                  >
                    <NetworkThumbnail
                      className='grayscale'
                      width={width}
                      height={height}
                      src={`/assets/chains/${availableChain.id}.svg`}
                    />
                    <Text className='inline-block text-center lg:hidden'>
                      {availableChain?.name}
                    </Text>
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
