'use client'

import dynamic from 'next/dynamic'
import { LoadingSkeleton } from '@/app/components/loading/Skeleton'
import { Heading, Text } from '@/app/components/typography'

const BridgeContainer = dynamic(async () => await import('./Container'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
})

export const Bridge = () => {
  return (
    <section className='mx-auto flex w-[32rem] flex-col space-y-6'>
      <Heading as='h1' variant='h2'>
        Bridge
      </Heading>
      <BridgeContainer />
      <Text as='p' size='default'>
        CryptoRastas is a global club/community platform that uses blockchain
        technology and digital art to engage and empower Reggae culture and the
        Rasta message around the world. The project began in March 2021 and
        continues to be fully developed in several areas: art, music, events,
        fashion, retail products, media content, creative economy, education,
        etc. The colorful 8-bit pixel art, vibrant music, and rich narrative
        capture attention and bring an instant smile to our faces. The positive
        vibes in the community are something that makes CryptoRastas stand out
        in the web3 space. But we have a much deeper objective: using tools such
        as art, culture and technology, combined with the great opportunity we
        have in this unique moment in time, to bring more justice and equality
        in our society. We are very optimistic about the new cycle that arrives
        in 2024 and we have already started to reorganize our house. Stay tuned
        for the next steps!
      </Text>
    </section>
  )
}

export default Bridge
