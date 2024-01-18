'use client'

import { useChainContract, useWallet } from '@/app/lib/wallet/hooks'
import useNFTPortfolio from '@/app/lib/wallet/hooks/useNFTPortfolio'
import { Heading, Text } from '@/app/components/typography'
import { Step } from '@/app/components/step/Step'
import { Children } from 'react'
import Image from 'next/image'
import { Button } from '@/app/components/button'

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
        <Heading as='h3'>Select your tokens</Heading>
        <Text size='sm'>
          Before start, select your token IDs that’s going to be used to bridge
          to destination chain.
        </Text>
        <ul className='flex flex-wrap'>
          {Children.toArray(
            list.map((NFT) => (
              <li className='relative h-40 w-32'>
                <Image
                  src={NFT.tokenURI}
                  alt={NFT.tokenId}
                  fill
                  sizes={` 
                  (min-width: 640px) 150px,
                  100%
                 `}
                />
              </li>
            ))
          )}
        </ul>
        <div className='flex'>
          <div>
            <Button>Continue</Button>
          </div>
        </div>
      </section>
    </Step>
  )
}

export default Checkout
