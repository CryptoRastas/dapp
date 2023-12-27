'use client'

import BridgeForm from './Form'
import { FormProvider, useForm } from 'react-hook-form'

export const BridgeContainer = () => {
  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: {
      tokenIds: '',
      destinationChainId: undefined
    }
  })

  return (
    <FormProvider {...methods}>
      <BridgeForm />
    </FormProvider>
  )
}

export default BridgeContainer
