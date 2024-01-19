import { NFTPortfolioResponse } from '@/app/lib/wallet/hooks/useNFTPortfolio'
import { Children, useCallback, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { useEffectOnce } from 'usehooks-ts'
import { useFormContext } from 'react-hook-form'

export type PortfolioProps = {
  list: NFTPortfolioResponse[]
  fieldId: string
}

export const Portfolio = ({ list, fieldId }: PortfolioProps) => {
  const { setValue, register, watch, clearErrors } = useFormContext()
  const [selectedTokenIds, setSelectedTokenIds] = useState<string[]>([])

  const checkIsSelected = (tokenId: string) => {
    return selectedTokenIds.includes(tokenId)
  }

  const fieldValue = watch(fieldId, '')

  const handleSelectOption = useCallback(
    (tokenId: string) => {
      clearErrors(tokenId)

      let _selectedTokenIds: string[] = [...selectedTokenIds]

      if (selectedTokenIds.includes(tokenId)) {
        _selectedTokenIds = selectedTokenIds.filter(
          (_tokenId) => _tokenId !== tokenId
        )

        setSelectedTokenIds(_selectedTokenIds)
      } else {
        _selectedTokenIds = [...selectedTokenIds, tokenId]
        setSelectedTokenIds(_selectedTokenIds)
      }

      setValue(fieldId, _selectedTokenIds.join(','), {
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
                  'lg:h-30 lg:w-30 relative h-28 w-28 overflow-hidden',
                  'group cursor-pointer rounded-3xl border-4 hover:shadow',
                  {
                    'border-yellow-400 shadow-lg': checkIsSelected(NFT.tokenId),
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
                  className='group-hover:scale-105'
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
