'use client'

import { useChainContract, useWallet } from '@/app/lib/wallet/hooks'
import useNFTPortfolio from '@/app/lib/wallet/hooks/useNFTPortfolio'
import { Heading, Text } from '@/app/components/typography'
import { Step } from '@/app/components/step/Step'
import { Children } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

export const Checkout = () => {
  const chainContract = useChainContract('token')
  const { address } = useWallet()

  const list = useNFTPortfolio({
    contractAddress: chainContract?.address,
    owner: String(address)
  })

  return (
    <Step className='w-full'>
      <section className='flex flex-col justify-start space-y-8'>
        <div className='flex flex-col space-y-2'>
          <Heading as='h3'>Select your tokens</Heading>
          <Text size='sm'>
            Before start, select your token IDs that’s going to be used to
            bridge to destination chain.
          </Text>
        </div>
        <ul className='grid grid-flow-row grid-cols-4 gap-4'>
          {Children.toArray(
            list.map((NFT) => (
              <li
                className={classNames(
                  'lg:h-30 lg:w-30 relative h-28 w-28 overflow-hidden',
                  'rounded-3xl border-4 border-yellow-400 shadow-lg',
                  'col-span-2 sm:col-span-1'
                )}
              >
                <Image
                  src={NFT.tokenURI}
                  alt={NFT.tokenId}
                  fill
                  sizes={` 
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
