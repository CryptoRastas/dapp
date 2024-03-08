import { useFeeData } from 'wagmi'
import assetsUtils from '../lib/utils/assets'
import { Text } from './typography'
import { FireIcon } from '@heroicons/react/24/solid'

export const GasPrice = () => {
  const { data, isError, isLoading } = useFeeData({
    watch: true,
    formatUnits: 'gwei'
  })

  return (
    <div className='hidden items-center space-x-2 lg:flex'>
      <div className='flex space-x-px'>
        <Text size='xs' as='span'>
          {isError || isLoading || !data?.formatted?.gasPrice
            ? 0
            : assetsUtils.formatBalance(data.formatted.gasPrice, 2, 2)}
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
