import { Children, useCallback } from 'react'
import { useEffectOnce } from 'usehooks-ts'
import { useFormContext } from 'react-hook-form'
import { Chain } from '@/app/config/chains'
import { Text } from '@/app/components/typography'
import { NetworkThumbnail } from '@/app/components/wallet/network/Thumbnail'
import classNames from 'classnames'

export type DestinationChainProps = {
  list: Chain[]
  fieldId: string
}

export const DestinationChain = ({ list, fieldId }: DestinationChainProps) => {
  const { setValue, register, watch, clearErrors } = useFormContext()

  const fieldValue = watch(fieldId, '')

  const checkIsSelected = (chainId: number) => {
    return fieldValue === chainId
  }

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

  useEffectOnce(() => {
    // register react hook form field
    register(fieldId)
  })

  return (
    <>
      <ul className='grid grid-flow-row grid-cols-4 gap-4'>
        {Children.toArray(
          list.map((chain) => (
            <li className='col-span-2 sm:col-span-1'>
              <div
                className={classNames(
                  'lg:h-30 lg:w-30 relative h-28 w-28 overflow-hidden',
                  'group cursor-pointer rounded-3xl border-4',
                  'flex flex-col items-center justify-center space-y-2',
                  {
                    ' border-yellow-400 bg-white/10 shadow-lg': checkIsSelected(
                      chain.id
                    ),
                    'border-white/10 bg-yellow-400 hover:border-white/20':
                      !checkIsSelected(chain.id)
                  }
                )}
                onClick={() => handleSelectOption(chain.id)}
              >
                <NetworkThumbnail
                  width={20}
                  height={20}
                  src={`/assets/chains/${chain?.id}.svg`}
                  className={classNames('transition-all duration-300', {
                    'scale-110': checkIsSelected(chain.id),
                    'group-hover:scale-110': !checkIsSelected(chain.id)
                  })}
                />
                <Text className='text-black'>{chain.name}</Text>
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

export default DestinationChain
