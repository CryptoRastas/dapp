'use client'

import assetsUtils from '@/app/lib/utils/assets'
import { useBalance, useNetwork, useWallet } from '@/app/lib/wallet/hooks'
import { Text } from '@/app/components/typography'
import { Button, Variant, Sizes } from '@/app/components/button/Button'
import { Children } from 'react'
import classNames from 'classnames'

export const BridgeContainer = () => {
  const { balance } = useBalance()
  const { isConnected } = useWallet()
  const { config, chains } = useNetwork()

  return (
    <form noValidate className='flex flex-col space-y-4'>
      <fieldset className='flex flex-col space-y-2'>
        <legend>
          <Text>Type your token id's</Text>
        </legend>
        <input
          disabled={!isConnected}
          type='text'
          name='name'
          id='name'
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
          disabled={!isConnected}
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
      <Button type='submit'>Bridge</Button>
    </form>
  )
}

export default BridgeContainer
