'use client'

import { Children, type HTMLProps } from 'react'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import useNetwork, { ChainConfig } from '@/app/lib/wallet/hooks/useNetwork'
import { Text } from '@/app/components/typography'

type NetworkContainerProps = HTMLProps<HTMLUListElement> & {
  chain?: ChainConfig
  chains: ChainConfig[]
}

export const NetworkContainer = ({
  chain,
  chains,
  className,
  ...props
}: NetworkContainerProps) => {
  const { switchNetwork, isLoading } = useNetwork()

  return (
    <ul {...props} className={classNames(className, {})}>
      {Children.toArray(
        chains.map((chainItem) => (
          <li
            className={classNames(
              'text-yellow-500',
              'cursor-pointer hover:bg-white/10',
              'flex items-center justify-between space-x-2 p-2'
            )}
            onClick={
              isLoading ? undefined : () => switchNetwork?.(chainItem.id)
            }
          >
            <Text as='span'>{chainItem.name}</Text>
            <span className='flex items-center space-x-px'>
              {chain?.id === chainItem.id && (
                <CheckBadgeIcon width={18} className='text-green-400' />
              )}
            </span>
          </li>
        ))
      )}
    </ul>
  )
}

export default NetworkContainer
