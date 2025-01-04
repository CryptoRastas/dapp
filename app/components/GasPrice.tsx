import { assetsUtils } from '../lib/utils/assets'
import { Text } from './typography'
import { FireIcon } from '@heroicons/react/24/solid'
import { useGasPrice } from 'wagmi'
import { formatGwei } from 'viem'

export const GasPrice = () => {
  const { data, isError, isLoading } = useGasPrice({
    query: {
      enabled: true,
      refetchInterval: 60_000
    }
  })

  return (
    <div className='hidden items-center space-x-2 lg:flex'>
      <div className='flex space-x-px'>
        <Text size='xs' as='span'>
          {isError || isLoading || !data
            ? 0
            : assetsUtils.formatBalance(formatGwei(data), 2, 2)}
        </Text>
        <Text size='xs' as='span'>
          gwei
        </Text>
      </div>
      <div>
        <FireIcon width={18} height={18} />
      </div>
    </div>
  )
}

export default GasPrice
