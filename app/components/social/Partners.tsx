import Image from 'next/image'
import { Text } from '@/app/components/typography'
import Link from 'next/link'

export const Partners = () => {
  const sizeRatio = 1.4

  return (
    <ul className='flex items-center space-x-4 max-lg:flex-col max-lg:justify-center max-lg:space-y-8'>
      <li>
        <Text size='default' variant='default' className='text-xs'>
          Powered by
        </Text>
      </li>
      <li>
        <Link target='_blank' href='https://layerzero.network/'>
          <Image
            src='/assets/icons/partners/layer-zero.svg'
            alt='LayerZero'
            width={102 * sizeRatio}
            height={27 * sizeRatio}
          />
        </Link>
      </li>
      <li>
        <Link target='_blank' href='https://polygon.technology/'>
          <Image
            src='/assets/icons/partners/polygon.svg'
            alt='Polygon'
            width={79 * sizeRatio}
            height={17 * sizeRatio}
          />
        </Link>
      </li>
    </ul>
  )
}

export default Partners
