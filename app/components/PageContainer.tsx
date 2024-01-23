'use client'
import appConfig from '@/app.config'
import { Heading, Text } from '@/app/components/typography'
import Link from 'next/link'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { WidgetLoading } from '@/app/components/widget/loadings'
import Image from 'next/image'
import Greatings from './Greatings'
import { useIsClient } from 'usehooks-ts'
import { useWallet } from '@/app/lib/wallet/hooks'

const Widget = dynamic(() => import('@/app/components/widget/Widget'), {
  ssr: false,
  loading: () => <WidgetLoading />
})

export const PageContainer = () => {
  const isClient = useIsClient()
  const { isConnected, isConnecting, address } = useWallet()
  const sizeRatio = 1.8

  return (
    <main className='flex flex-1 flex-col space-y-8 py-12 container lg:py-8'>
      <div className='flex flex-col space-y-8'>
        <Heading className='flex items-end space-x-8 tracking-[-.5rem] '>
          <span>Bridge</span>
          <Link target='_blank' href='https://polygon.technology/'>
            <Image
              src='/assets/icons/partners/polygon.svg'
              alt='Polygon'
              width={79 * sizeRatio}
              height={17 * sizeRatio}
            />
          </Link>
        </Heading>
        <Heading as='h2' className='tracking-[-.3rem]'>
          About
        </Heading>
      </div>
      <div className='grid grid-cols-2 items-start gap-8'>
        <section className='col-span-2 flex flex-col space-y-4 max-lg:order-2 lg:col-span-1'>
          <article className='flex flex-col space-y-4 text-justify'>
            <Text>
              CryptoRastas is a global club/community platform that uses
              blockchain technology and digital art to engage and empower Reggae
              culture and the Rasta message around the world.
            </Text>
            <Text>
              The project began in March 2021 and continues to be fully
              developed in several areas: art, music, events, fashion, retail
              products, media content, creative economy, education, etc.
            </Text>
            <Text>
              The colorful 8-bit pixel art, vibrant music, and rich narrative
              capture attention and bring an instant smile to our faces. The
              positive vibes in the community are something that makes
              CryptoRastas stand out in the web3 space. But we have a much
              deeper objective: using tools such as art, culture and technology,
              combined with the great opportunity we have in this unique moment
              in time, to bring more justice and equality in our society.
            </Text>

            <Text
              variant='default'
              size='default'
              className='text-base font-bold'
            >
              <Link href={appConfig.siteURL} target='_blank'>
                more details...
              </Link>
            </Text>
          </article>
        </section>
        <div
          className={classNames(
            'col-span-2 max-lg:order-1 lg:col-span-1',
            'flex h-full items-start justify-center'
          )}
        >
          {isClient && isConnected && !!address && !isConnecting ? (
            <Widget />
          ) : (
            <Greatings />
          )}
        </div>
      </div>
    </main>
  )
}

export default PageContainer
