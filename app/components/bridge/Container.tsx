'use client'

import assetsUtils from '@/app/lib/utils/assets'
import {
  useBalance,
  useChainContract,
  useNetwork,
  useWallet
} from '@/app/lib/wallet/hooks'
import { Text } from '@/app/components/typography'
import { Button, Variant, Sizes } from '@/app/components/button/Button'
import { Children, SyntheticEvent } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { useERC721ApproveAll } from '@/app/lib/wallet/hooks/useERC721ApproveAll'
import { LoadingSkeleton } from '../loading'

export const BridgeContainer = () => {
  const { balance } = useBalance()
  const { isConnected } = useWallet()
  const { config, chains } = useNetwork()

  const token = useChainContract('token')
  const bridge = useChainContract('bridge')

  const { isApproving, isApprovedForAll, isLoading, approveAll } =
    useERC721ApproveAll(token.address, bridge.address)

  console.log(isApprovedForAll)

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    try {
      if (!isApprovedForAll) {
        await approveAll()
      } else {
        /// @dev apply bridge
      }
    } catch {
      console.log('error')
    }
  }

  return (
    <form
      noValidate
      className='flex flex-col space-y-4'
      onSubmit={handleSubmit}
    >
      <fieldset>
        <legend>
          <Text>Collection Address</Text>
        </legend>
        <Link
          target='_blank'
          href={`${config.blockExplorers?.default.url}/address/${token.address}`}
        >
          <Text>{token.address}</Text>
        </Link>
      </fieldset>
      <fieldset className='flex flex-col space-y-2'>
        <legend>
          <Text>Type your token id's</Text>
        </legend>
        <input
          disabled={!isConnected || isLoading}
          type='text'
          name='tokenIds'
          id='tokenIds'
          placeholder='separated by comma'
          className={classNames(
            Sizes.default.classes,
            'w-full rounded-md',
            isConnected
              ? [Variant.default.classes, Variant.default.hover]
              : [Variant.default.disabled]
          )}
        />
      </fieldset>
      <fieldset>
        <legend>
          <Text>Choose your target network</Text>
        </legend>
        <select
          name='network'
          id='network'
          disabled={!isConnected || isLoading}
          defaultValue={isConnected ? config.id : ''}
          className={classNames(
            Sizes.default.classes,
            'w-full rounded-md',
            isConnected
              ? [Variant.default.classes, Variant.default.hover]
              : [Variant.default.disabled]
          )}
        >
          <option value=''>Select a network</option>

          {Children.toArray(
            chains.map((chain) => (
              <option value={chain.id}>{chain.name}</option>
            ))
          )}
        </select>
      </fieldset>
      <div>
        <ul>
          <li>
            <Text>
              Balance:
              {`${assetsUtils.formatBalance(
                isConnected ? balance?.formatted : 0,
                4,
                0
              )} ${config.nativeCurrency.symbol}`}
            </Text>
          </li>
          <li>
            <Text>
              Fees: {assetsUtils.formatBalance(isConnected ? 0 : 0, 4, 0)}{' '}
              {config.nativeCurrency.symbol}
            </Text>
          </li>
        </ul>
      </div>
      {isApproving && (
        <div className='flex flex-col items-center justify-center'>
          <Text>Your are approving bridge to transfer your tokens</Text>
          <LoadingSkeleton className='h-2 w-full flex-1' />
        </div>
      )}
      <Button type='submit' disabled={!isConnected || isLoading}>
        <>{!isApprovedForAll ? 'Approve' : 'Bridge'}</>
      </Button>
    </form>
  )
}

export default BridgeContainer
