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
            <Text className='font-bold' variant='default'>
              CryptoRastas is a global community/club that uses blockchain
              technology and digital art to engage and empower Reggae culture
              and Rasta vibes around the world.
            </Text>
            <Text>
              The project started in March 2021 and by the end of August we had
              minted
              {` `}
              <a href='https://opensea.io/collection/cryptorastas-collection'>
                10420 NFTs
              </a>
              {` `}
              on the Ethereum blockchain. With a solid community and
              distinguished collectors, CryptoRastas continues in full
              development in several areas like art, music, events, fashion,
              education, and of course, technology.
            </Text>
            <Text>
              <Text as='span' variant='default' className='font-bold'>
                We are now offering all CR holders the option to connect their
                original NFTs to the Polygon network.
              </Text>{' '}
              We believe the future is{' '}
              <Text as='span' variant='default' className='font-bold'>
                #omnichain
              </Text>{' '}
              and we want to give the community freedom to choose where they
              want their NFTs. Additionally, we want to build more applications
              to use our NFTs with less or no gas fees.{' '}
              <Text as='span' variant='default' className='font-bold'>
                Powered by <a href='https://layerzero.network/'>LayerZero</a>
              </Text>{' '}
              protocol, this is a 2-way bridge, so you can go back to the
              original chain whenever you want.
            </Text>

            <Text variant='default' className='font-bold'>
              CONNECT YOUR WALLET NOW TO BRIDGE YOUR RASTAS TO POLYGON
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
