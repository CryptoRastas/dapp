'use client'

import assetsUtils from '@/app/lib/utils/assets'
import { useBalance, useNetwork, useWallet } from '@/app/lib/wallet/hooks'
import { Heading, Text } from '@/app/components/typography'
import { Button } from '@/app/components/button'

export const BridgeContainer = () => {
  const { balance } = useBalance()
  const { isConnected } = useWallet()
  const { config } = useNetwork()

  return (
    <div className='flex-col space-y-4'>
      <div>
        <Heading as='h2' variant='h4'>
          My Balance
        </Heading>
        <Text as='p'>
          {assetsUtils.formatBalance(
            isConnected ? balance?.formatted : 0,
            4,
            2
          )}{' '}
          {config.nativeCurrency.name}
        </Text>
      </div>

      <form noValidate className='flex flex-col space-y-4'>
        <fieldset className='flex flex-col space-y-2'>
          <legend>
            <Text>Type your token id's</Text>
          </legend>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='separated by comma'
            className='block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm outline-none focus:border-white focus:ring-white'
          />
        </fieldset>
        <fieldset>
          <legend>
            <Text>Choose your target network</Text>
          </legend>
          <select
            name='network'
            id='network'
            className='block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm outline-none focus:border-white focus:ring-white'
          >
            <option value=''>Select</option>
          </select>
        </fieldset>
        <Button type='submit'>Bridge</Button>
      </form>
    </div>
  )
}

export default BridgeContainer
