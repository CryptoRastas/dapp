import Image from 'next/image'
import SocialMedia from './social/Media'
import { Text } from '@/app/components/typography'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className='flex justify-between max-lg:flex-col max-lg:space-y-8 lg:space-x-8'>
      <div className='flex max-lg:justify-center'>
        <SocialMedia />
      </div>
      <ul className='flex items-center space-x-4 max-lg:justify-center'>
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
              width={102}
              height={27}
            />
          </Link>
        </li>
        <li>
          <Link target='_blank' href='https://polygon.technology/'>
            <Image
              src='/assets/icons/partners/polygon.svg'
              alt='Polygon'
              width={79}
              height={17}
            />
          </Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
