'use client'

import { useChainContract, useWallet } from '@/app/lib/wallet/hooks'
import useNFTPortfolio from '@/app/lib/wallet/hooks/useNFTPortfolio'
import { Heading, Text } from '@/app/components/typography'
import { Step } from '@/app/components/step/Step'
import { Children } from 'react'
import Image from 'next/image'

export const Checkout = () => {
  const chainContract = useChainContract('token')
  const { address } = useWallet()

  const list = useNFTPortfolio({
    contractAddress: chainContract?.address,
    owner: String(address)
  })

  return (
    <Step>
      <section className='flex flex-col justify-start space-y-8'>
        <div className='flex flex-col space-y-2'>
          <Heading as='h3'>Select your tokens</Heading>
          <Text size='sm'>
            Before start, select your token IDs that’s going to be used to
            bridge to destination chain.
          </Text>
        </div>
        <ul className='flex flex-wrap'>
          {Children.toArray(
            list.map((NFT) => (
              <li className='relative h-32 w-32'>
                <Image
                  src={NFT.tokenURI}
                  alt={NFT.tokenId}
                  fill
                  sizes={` 
                  (min-width: 640px) 128px,
                  100%
                 `}
                />
              </li>
            ))
          )}
        </ul>
      </section>
    </Step>
  )
}

export default Checkout
