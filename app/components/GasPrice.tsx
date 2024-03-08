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
    <div className='hidden items-center space-x-2 opacity-60 lg:flex'>
      <Text size='xs'>
        {isError || isLoading || !data?.formatted?.gasPrice
          ? 0
          : assetsUtils.formatBalance(data.formatted.gasPrice, 2, 2)}{' '}
        gwei
      </Text>
      <FireIcon width={16} height={16} />
    </div>
  )
}

export default GasPrice
