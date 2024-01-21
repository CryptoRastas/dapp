import { NFTPortfolioResponse } from '@/app/lib/wallet/hooks/useNFTPortfolio'
import { Children, useCallback } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { useEffectOnce } from 'usehooks-ts'
import { useFormContext } from 'react-hook-form'
import { concat, filter, includes } from 'lodash'
import { Text } from '@/app/components/typography'
import Link from 'next/link'
import appConfig from '@/app.config'
import { Alert } from '@/app/components/Alert'

export type PortfolioFieldProps = {
  list: NFTPortfolioResponse[]
  fieldId: string
  marketplaceURL: string
  collectionAddress: string
}

export const PortfolioField = ({
  list,
  fieldId,
  marketplaceURL,
  collectionAddress
}: PortfolioFieldProps) => {
  const { setValue, register, clearErrors, watch } = useFormContext()

  const fieldValue = watch(fieldId, [])

  const handleSelectOption = useCallback(
    (tokenId: string) => {
      if (fieldValue.length >= appConfig.bridge.transferNFTLimit) return

      clearErrors(tokenId)

      let _selectedTokenIds: string[] = [...fieldValue]

      if (fieldValue.includes(tokenId)) {
        _selectedTokenIds = filter(
          fieldValue,
          (_tokenId) => _tokenId !== tokenId
        )
      } else {
        _selectedTokenIds = concat(fieldValue, [tokenId])
      }

      setValue(fieldId, _selectedTokenIds, {
        shouldValidate: true,
        shouldDirty: true
      })
    },
    [fieldId, clearErrors, fieldValue, setValue]
  )

  useEffectOnce(() => {
    // register react hook form field
    register(fieldId)
  })

  return (
    <ul className='grid grid-flow-row grid-cols-4 gap-4'>
      {list.length > 0 ? (
        Children.toArray(
          list.map((NFT) => (
            <li className='col-span-2 sm:col-span-1'>
              <div
                className={classNames(
                  'lg:h-30 lg:w-30 relative h-28 w-28 overflow-hidden bg-yellow-200',
                  'group cursor-pointer rounded-3xl',
                  {
                    'border-4 border-yellow-200 shadow-lg': includes(
                      fieldValue,
                      NFT.tokenId
                    )
                  }
                )}
              >
                <Image
                  key={NFT.tokenId}
                  src={NFT.tokenURI}
                  alt={NFT.tokenId}
                  fill
                  sizes={` 
                    100%
                 `}
                  className={classNames(
                    'relative z-[1] transition-all duration-300',
                    {
                      'scale-110': includes(fieldValue, NFT.tokenId),
                      'group-hover:scale-110': !includes(
                        fieldValue,
                        NFT.tokenId
                      )
                    }
                  )}
                  onClick={() => handleSelectOption(NFT.tokenId)}
                />
                <div className='absolute bottom-2 left-2 z-[2]'>
                  <Link
                    title={`${NFT.tokenId}`}
                    href={`${marketplaceURL}/${collectionAddress}/${NFT.tokenId}`}
                    target='_blank'
                  >
                    <Text size='sm' className='text-white'>
                      #{NFT.tokenId}
                    </Text>
                  </Link>
                </div>
              </div>
            </li>
          ))
        )
      ) : (
        <li className='col-span-4'>
          <Alert variant='warning'>
            <Text size='sm' className='text-center'>
              No {appConfig.name} found
            </Text>
          </Alert>
        </li>
      )}
    </ul>
  )
}

export default PortfolioField
