import { Chain } from '@/app/config/chains'
import { NFTPortfolioResponse } from '@/app/lib/wallet/hooks/useNFTPortfolio'
import classNames from 'classnames'
import { Children } from 'react'
import { useFormContext } from 'react-hook-form'
import { NetworkThumbnail } from '@/app/components/wallet/network/Thumbnail'
import { Heading, Text } from '@/app/components/typography'
import Image from 'next/image'
import { filter, find, reduce, concat } from 'lodash'
import assetsUtils from '@/app/lib/utils/assets'
import { ethers } from 'ethers'

export type DetailsProps = {
  fees: bigint
  tokenIdsFieldId: string
  destinationChainFieldId: string
  sourceChainFieldId: string
  tokens: NFTPortfolioResponse[]
  chains: Chain[]
  feeToken: Chain['nativeCurrency']
}

export const Details = ({
  tokenIdsFieldId,
  destinationChainFieldId,
  sourceChainFieldId,
  tokens,
  chains,
  feeToken,
  fees
}: DetailsProps) => {
  const { watch } = useFormContext()

  const tokenIdsFieldValue: string = watch(tokenIdsFieldId, [])

  const destinationChainFieldValue: number | undefined = watch(
    destinationChainFieldId
  )

  const sourceChainFieldValue: number | undefined = watch(sourceChainFieldId)

  const tokenIdsList = filter(tokenIdsFieldValue, Boolean)

  const selectedTokenIds = filter(
    reduce<string, NFTPortfolioResponse[]>(
      tokenIdsList,
      (acc, tokenId) =>
        concat(acc, [find(tokens, { tokenId })]) as NFTPortfolioResponse[],
      []
    ),
    Boolean
  )

  const selectedDestinationChain = find(chains, {
    id: destinationChainFieldValue
  })
  const selectedSourceChain = find(chains, { id: sourceChainFieldValue })

  return (
    <div className='flex flex-col space-y-8'>
      {selectedSourceChain && (
        <div className='flex flex-col space-y-2'>
          <Heading as='h4'>From source chain</Heading>
          <div className='flex items-center space-x-2'>
            <NetworkThumbnail
              width={20}
              height={20}
              src={`/assets/chains/${selectedSourceChain?.id}.svg`}
            />
            <Text>{selectedSourceChain?.name}</Text>
          </div>
        </div>
      )}
      <div className='flex flex-col space-y-2'>
        <Heading as='h4'>Transferring tokens</Heading>

        <ul className='grid grid-flow-row grid-cols-4 gap-4'>
          {Children.toArray(
            selectedTokenIds.map((NFT) => (
              <li className='col-span-2 flex items-center space-x-2 lg:col-span-1 '>
                <div
                  className={classNames(
                    'relative h-10 w-10 overflow-hidden rounded-lg'
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
                </div>
                <Text variant='default' className='font-bold'>
                  #{NFT.tokenId}
                </Text>
              </li>
            ))
          )}
        </ul>
      </div>
      {selectedDestinationChain && (
        <div className='flex flex-col space-y-2'>
          <Heading as='h4'>To destination chain</Heading>
          <div className='flex items-center space-x-2'>
            <NetworkThumbnail
              width={20}
              height={20}
              src={`/assets/chains/${selectedDestinationChain?.id}.svg`}
            />
            <Text>{selectedDestinationChain?.name}</Text>
          </div>
        </div>
      )}
      <div className='hidden flex-col space-y-2'>
        <Heading as='h4'>Required fees in {feeToken.symbol}</Heading>
        <Text>
          {assetsUtils.formatBalance(
            fees > 0n ? ethers.formatUnits(fees.toString()).toString() : 0,
            12,
            4
          )}
        </Text>
      </div>
    </div>
  )
}

export default Details
