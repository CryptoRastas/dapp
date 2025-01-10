'use client'
import { Heading, Text } from '@/app/components/typography'
import Link from 'next/link'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { WidgetLoading } from '@/app/components/widget/loadings'
import Image from 'next/image'
import Greatings from './Greatings'
import { useIsClient } from 'usehooks-ts'
import { useNetwork, useWallet } from '@/app/lib/wallet/hooks'
import { Children } from 'react'

const Widget = dynamic(() => import('@/app/components/widget/Widget'), {
  ssr: false,
  loading: () => <WidgetLoading />
})

export const PageContainer = () => {
  const isClient = useIsClient()
  const { chains } = useNetwork()
  const { isConnected, isConnecting, address } = useWallet()

  return (
    <main className='flex flex-1 flex-col justify-start space-y-12 py-12 container lg:py-8'>
      <div className='flex flex-col space-y-12'>
        <div className='flex items-center gap-8 divide-x divide-yellow-700'>
          <Heading className='flex items-end space-x-8 tracking-[-.5rem] '>
            <span>Bridge</span>
          </Heading>
          <div className='flex flex-col gap-1 pl-4'>
            {Children.toArray(
              chains.map((chain) => (
                <Link
                  target='_blank'
                  href={chain.blockExplorers?.default.url!}
                  className='flex items-center gap-1'
                >
                  <Image
                    src={`/assets/chains/${chain?.id}.svg`}
                    alt='Polygon'
                    width={14}
                    height={14}
                  />
                  <Text size='xs'>{chain.name}</Text>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 items-start gap-8'>
        <section className='col-span-2 flex flex-col space-y-4 max-lg:order-2 lg:col-span-1'>
          <article className='flex flex-col space-y-4 text-justify'>
            <Text className='font-bold' variant='default'>
              CryptoRastas is a global community using blockchain technology and
              digital art to engage and empower Reggae culture and Rasta vibes
              around the world.
            </Text>
            <Text>
              The project started in March 2021, and by the end of August, we
              had minted 10,420 NFTs on the {` `}
              <a
                rel='noopener'
                target='_blank'
                href='https://ethereum.org/en/'
                className='font-bold'
              >
                Ethereum blockchain
              </a>
              {` `}. With a solid community and illustrious collectors,
              CryptoRastas continues to develop in several areas such as art,
              music, events, fashion, education, and technology.
            </Text>
            <Text>
              We believe the future is #omnichain and we want the community to
              have the freedom to choose where their NFTs are. Therefore, we are
              offering all CR holders the option to transfer their original NFTs
              from <span className='font-bold'>Ethereum</span> to{' '}
              <span className='font-bold'>Base</span>,{' '}
              <span className='font-bold'>Polygon</span>, and soon the{' '}
              <span className='font-bold'>Abstract chain</span>. Powered by the
              LayerZero protocol, this is a two-way bridge, so you can go back
              to the original chain whenever you want. Using L2s like Base and
              Abstract will make it easier to build more applications to use our
              NFTs with little to no gas fees and will bring less friction to
              onboarding new people into the community.
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
