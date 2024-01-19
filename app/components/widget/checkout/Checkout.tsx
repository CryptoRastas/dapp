import { NFTPortfolioResponse } from '@/app/lib/wallet/hooks/useNFTPortfolio'
import { Heading, Text } from '@/app/components/typography'
import { Step } from '@/app/components/step/Step'
import { Portfolio } from '@/app/components/widget/checkout/Portfolio'
import { FormProvider, useForm } from 'react-hook-form'

export type CheckoutProps = {
  list: NFTPortfolioResponse[]
}

export const TOKEN_IDS_FIELD_ID = 'tokenIds'
export const DESTINATION_CHAIN_ID_FIELD_ID = 'destinationChainId'

export const Checkout = ({ list }: CheckoutProps) => {
  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: {
      [TOKEN_IDS_FIELD_ID]: '',
      [DESTINATION_CHAIN_ID_FIELD_ID]: undefined
    }
  })

  const handleSubmit = console.log

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
        <Step className='w-full'>
          <section className='flex flex-col justify-start space-y-8'>
            <div className='flex flex-col space-y-2'>
              <Heading as='h3'>Select your tokens</Heading>
              <Text size='sm'>
                Before start, select your token IDs that’s going to be used to
                bridge to destination chain.
              </Text>
            </div>
            <Portfolio fieldId={TOKEN_IDS_FIELD_ID} list={list} />
          </section>
          <section className='flex flex-col justify-start space-y-8'>
            <div className='flex flex-col space-y-2'>
              <Heading as='h3'>Select destination chain</Heading>
              <Text size='sm'>
                Almost there, select a chain to bridge your selected tokens
              </Text>
            </div>
          </section>
          <section className='flex flex-col justify-start space-y-8'>
            <div className='flex flex-col space-y-2'>
              <Heading as='h3'>Check your bridge details</Heading>
              <Text size='sm'>
                Almost there, select a chain to bridge your selected tokens
              </Text>
            </div>
          </section>
        </Step>
        <button type='submit'>send</button>
      </form>
    </FormProvider>
  )
}

export default Checkout
