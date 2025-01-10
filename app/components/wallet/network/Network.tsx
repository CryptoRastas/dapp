import { Children } from 'react'
import { useNetwork } from '@/app/lib/wallet/hooks/useNetwork'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { NetworkThumbnail } from './Thumbnail'
import { Text } from '@/app/components/typography'
import { useToggle } from 'usehooks-ts'
import classNames from 'classnames'
import { useWallet } from '@/app/lib/wallet/hooks/useWallet'

export const Network = () => {
  const [isOpen, toggleIsOpen] = useToggle()

  /// Thumbsize
  const [width, height] = [16, 16]

  const { chain, switchChain, remainingChains } = useNetwork()
  const { connector } = useWallet()

  const handleSwitchChain = (chainId: number) => {
    switchChain({ chainId: chainId, connector })
  }

  return (
    <>
      <style jsx>
        {`
          .network-selector {
            --list-width: ${!isOpen
              ? 0
              : (remainingChains.length + 1) * width + 32}px;
          }
        `}
      </style>
      <div
        className={classNames('flex items-center', {
          'lg:space-x-2': isOpen
        })}
      >
        <button
          type='button'
          className='flex items-center space-x-1'
          onClick={toggleIsOpen}
        >
          {!chain || chain?.unsupported ? (
            <>
              <ExclamationTriangleIcon className='h-4 w-4 text-red-500' />
              {isOpen && <span className='text-red-500'>Unsupported</span>}
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
                <Text
                  className='hidden text-center text-xs leading-none lg:inline-block'
                  size='default'
                >
                  {chain?.name}
                </Text>
              )}
            </>
          )}
        </button>
        <div
          className={classNames(
            'network-selector w-[var(--list-width)] overflow-hidden',
            [
              'max-lg:fixed max-lg:h-full max-lg:w-full max-lg:bg-blue-400/80 max-lg:backdrop-blur',
              'max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:top-0 max-lg:z-[10] max-lg:p-6'
            ],
            isOpen ? 'visible opacity-100' : 'invisible opacity-0'
          )}
        >
          <div className='flex justify-end lg:hidden'>
            <button type='button' title='close' onClick={toggleIsOpen}>
              <XMarkIcon width={32} height={32} />
            </button>
          </div>
          <ul
            className={classNames([
              'flex items-center space-x-1',
              'max-lg:flex-col max-lg:space-y-6',
              isOpen ? 'w-auto' : 'max-lg:w-0',
              isOpen ? 'opacity-100 ease-in-out' : 'opacity-0 ease-in'
            ])}
          >
            <li className='max-lg:hidden'>|</li>
            {Children.toArray(
              remainingChains.map((availableChain, index) => (
                <li
                  className={classNames([
                    'flex lg:justify-center',
                    'max-lg:w-full',
                    {
                      'max-lg:!mt-0': index === 0 && isOpen
                    }
                  ])}
                >
                  <button
                    type='button'
                    title={availableChain.name}
                    className={classNames([
                      'max-lg:flex max-lg:space-x-2',
                      'max-lg:items-center max-lg:text-black'
                    ])}
                    onClick={() => handleSwitchChain(availableChain.id)}
                  >
                    <NetworkThumbnail
                      className='grayscale'
                      width={width}
                      height={height}
                      src={`/assets/chains/${availableChain.id}.svg`}
                      alt={availableChain.name}
                    />
                    <Text
                      className='inline-block text-center text-lg  lg:hidden'
                      size='default'
                    >
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
