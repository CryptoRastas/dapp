import appConfig from '@/app.config'
import { Metadata } from 'next'
import { Header } from '@/app/components/Header'
import { Heading, Text } from '@/app/components/typography'
import Link from 'next/link'
import Footer from './components/Footer'
import dynamic from 'next/dynamic'
import { LoadingSkeleton } from '@/app/components/loading'
import classNames from 'classnames'

const Widget = dynamic(async () => import('@/app/components/widget/Widget'), {
  ssr: false,
  loading: () => (
    <div className='flex w-3/5 flex-col space-y-4'>
      <LoadingSkeleton className='h-4 w-1/2' />
      <LoadingSkeleton className='h-12 w-full' />
      <div className='flex space-x-4'>
        <LoadingSkeleton className='h-20 w-1/3' />
        <LoadingSkeleton className='h-20 w-1/3' />
        <LoadingSkeleton className='h-20 w-1/3' />
      </div>
      <LoadingSkeleton className='h-4 w-1/3' />
    </div>
  )
})

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${appConfig.name} - Bridge`,
    description: appConfig.meta.description
  }
}

const Homepage = () => {
  return (
    <>
      <Header />
      <main className='flex-1 py-24 container'>
        <div className='grid grid-cols-2 gap-8'>
          <section className='col-span-2 flex flex-col space-y-4 max-lg:order-2 lg:col-span-1'>
            <Heading className='tracking-[-.5rem]'>Bridge</Heading>
            <Heading as='h2' className='tracking-[-.3rem]'>
              About
            </Heading>
            <article className='flex flex-col space-y-4 text-justify'>
              <Text>
                CryptoRastas is a global club/community platform that uses
                blockchain technology and digital art to engage and empower
                Reggae culture and the Rasta message around the world.
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
                deeper objective: using tools such as art, culture and
                technology, combined with the great opportunity we have in this
                unique moment in time, to bring more justice and equality in our
                society.
              </Text>
              <Text>
                We are very optimistic about the new cycle that arrives in 2024
                and we have already started to reorganize our house. Stay tuned
                for the next steps!
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
              'flex items-center justify-center'
            )}
          >
            <Widget />
          </div>
        </div>
      </main>
      <div className='pb-24 container'>
        <Footer />
      </div>
    </>
  )
}

export default Homepage
