import { Children, useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Chain } from '@/app/config/chains'
import { Text } from '@/app/components/typography'
import { NetworkThumbnail } from '@/app/components/wallet/network/Thumbnail'
import classNames from 'classnames'
import { isEqual } from 'lodash'

export type DestinationChainFieldProps = {
  list: Chain[]
  fieldId: string
}

export const DestinationChainField = ({
  list,
  fieldId
}: DestinationChainFieldProps) => {
  const { setValue, register, watch, clearErrors } = useFormContext()

  const fieldValue: number = watch(fieldId)

  const handleSelectOption = useCallback(
    (chainId: number) => {
      clearErrors(fieldId)

      setValue(fieldId, chainId, {
        shouldValidate: true,
        shouldDirty: true
      })
    },
    [clearErrors, setValue, fieldId]
  )

  useEffect(() => {
    // register react hook form field
    register(fieldId, {
      required: true
    })
  }, [fieldId, register])

  return (
    <ul className='grid grid-flow-row grid-cols-4 gap-4'>
      {Children.toArray(
        list.map((chain) => (
          <li className='col-span-2 sm:col-span-1'>
            <div
              className={classNames(
                'lg:h-30 lg:w-30 relative flex h-28 w-28 flex-col items-center justify-center gap-2 overflow-hidden',
                'group cursor-pointer rounded-3xl ',
                'flex flex-col items-center justify-center space-y-2',
                {
                  ' border-4 border-green-200 bg-white/10 shadow-lg': isEqual(
                    fieldValue,
                    chain.id
                  ),
                  ' bg-green-400': !isEqual(fieldValue, chain.id)
                }
              )}
              onClick={() => handleSelectOption(chain.id)}
            >
              <NetworkThumbnail
                width={20}
                height={20}
                src={`/assets/chains/${chain?.id}.svg`}
                className={classNames('transition-all duration-300', {
                  'scale-110': isEqual(fieldValue, chain.id),
                  'group-hover:scale-125': !isEqual(fieldValue, chain.id)
                })}
              />
              <Text size='xs' className='text-black'>
                {chain.name}
              </Text>
            </div>
          </li>
        ))
      )}
    </ul>
  )
}

export default DestinationChainField
