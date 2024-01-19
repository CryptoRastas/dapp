import { FormProvider, useForm } from 'react-hook-form'
import { Form } from './Form'
import { Heading, Text } from '@/app/components/typography'
import { Step } from '@/app/components/step/Step'
import { useChainContract, useNetwork } from '@/app/lib/wallet/hooks'
import { Details } from '@/app/components/widget/checkout/Details'
import { Portfolio } from '@/app/components/widget/checkout/Portfolio'
import { DestinationChain } from '@/app/components/widget/checkout/DestinationChain'
import { NFTPortfolioResponse } from '@/app/lib/wallet/hooks/useSDK'

export type CheckoutProps = {
  list: NFTPortfolioResponse[]
}

export const TOKEN_IDS_FIELD_ID = 'tokenIds'
export const DESTINATION_CHAIN_ID_FIELD_ID = 'destinationChainId'

export const Checkout = ({ list }: CheckoutProps) => {
  const { config, remainingChains } = useNetwork()
  const contract = useChainContract('token')

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
      <Form onSubmit={handleSubmit}>
        <Step className='w-full'>
          <section className='flex flex-col justify-start space-y-8'>
            <div className='flex flex-col space-y-2'>
              <Heading as='h3'>Select your tokens</Heading>
              <Text size='sm'>
                Before start, select your token IDs that’s going to be used to
                bridge to destination chain.
              </Text>
            </div>
            <Portfolio
              fieldId={TOKEN_IDS_FIELD_ID}
              list={list}
              marketplaceURL={config.openSeaURL}
              collectionAddress={contract.address}
            />
          </section>
          <section className='flex flex-col justify-start space-y-8'>
            <div className='flex flex-col space-y-2'>
              <Heading as='h3'>Select destination chain</Heading>
              <Text size='sm'>
                Almost there, select a chain to bridge your selected tokens
              </Text>
            </div>
            <DestinationChain
              fieldId={DESTINATION_CHAIN_ID_FIELD_ID}
              list={remainingChains}
            />
          </section>
          <section className='flex flex-col justify-start space-y-8'>
            <div className='flex flex-col space-y-2'>
              <Heading as='h3'>Check your bridge details</Heading>
            </div>
            <Details
              tokenIdsFieldId={TOKEN_IDS_FIELD_ID}
              destinationChainFieldId={DESTINATION_CHAIN_ID_FIELD_ID}
              chainList={remainingChains}
              tokenList={list}
            />
          </section>
        </Step>
      </Form>
    </FormProvider>
  )
}

export default Checkout
