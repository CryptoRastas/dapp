import { NFTPortfolioResponse } from '@/app/lib/wallet/hooks/useNFTPortfolio'
import { Children, useCallback, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { useEffectOnce } from 'usehooks-ts'
import { useFormContext } from 'react-hook-form'
import { concat, filter, join } from 'lodash'

export type PortfolioProps = {
  list: NFTPortfolioResponse[]
  fieldId: string
}

export const Portfolio = ({ list, fieldId }: PortfolioProps) => {
  const { setValue, register, watch, clearErrors } = useFormContext()
  const [selectedTokenIds, setSelectedTokenIds] = useState<string[]>([])

  const fieldValue = watch(fieldId, '')

  const checkIsSelected = (tokenId: string) => {
    return selectedTokenIds.includes(tokenId)
  }

  const handleSelectOption = useCallback(
    (tokenId: string) => {
      clearErrors(tokenId)

      let _selectedTokenIds: string[] = [...selectedTokenIds]

      if (selectedTokenIds.includes(tokenId)) {
        _selectedTokenIds = filter(
          selectedTokenIds,
          (_tokenId) => _tokenId !== tokenId
        )

        setSelectedTokenIds(_selectedTokenIds)
      } else {
        _selectedTokenIds = concat(selectedTokenIds, [tokenId])
        setSelectedTokenIds(_selectedTokenIds)
      }

      setValue(fieldId, join(_selectedTokenIds, ','), {
        shouldValidate: true,
        shouldDirty: true
      })
    },
    [fieldId, clearErrors, selectedTokenIds, setValue]
  )

  useEffectOnce(() => {
    // register react hook form field
    register(fieldId)
  })

  return (
    <>
      <ul className='grid grid-flow-row grid-cols-4 gap-4'>
        {Children.toArray(
          list.map((NFT) => (
            <li className='col-span-2 sm:col-span-1'>
              <div
                className={classNames(
                  'lg:h-30 lg:w-30 relative h-28 w-28 overflow-hidden bg-yellow-400',
                  'group cursor-pointer rounded-3xl',
                  {
                    'border-4 border-yellow-400 shadow-lg': checkIsSelected(
                      NFT.tokenId
                    ),
                    'border-transparent': !checkIsSelected(NFT.tokenId)
                  }
                )}
              >
                <Image
                  src={NFT.tokenURI}
                  alt={NFT.tokenId}
                  fill
                  sizes={` 
                    100%
                 `}
                  className={classNames('transition-all duration-300', {
                    'scale-110': checkIsSelected(NFT.tokenId),
                    'group-hover:scale-110': !checkIsSelected(NFT.tokenId)
                  })}
                  onClick={() => handleSelectOption(NFT.tokenId)}
                />
              </div>
            </li>
          ))
        )}
      </ul>
      <input
        type='hidden'
        name={fieldId}
        id={fieldId}
        defaultValue={fieldValue}
      />
    </>
  )
}

export default Portfolio
