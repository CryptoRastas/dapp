import { FormProvider, useForm } from 'react-hook-form'
import { Heading, Text } from '@/app/components/typography'
import { Step } from '@/app/components/step/Step'
import { useChainContract, useNetwork } from '@/app/lib/wallet/hooks'
import { Details } from '@/app/components/widget/checkout/Details'
import { Portfolio } from '@/app/components/widget/checkout/Portfolio'
import { DestinationChain } from '@/app/components/widget/checkout/DestinationChain'
import { NFTPortfolioResponse } from '@/app/lib/wallet/hooks/useSDK'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { includes, map } from 'lodash'
import useBridge from '@/app/lib/hooks/bridge/useBridge'
import useWallet from '@/app/lib/wallet/hooks/useWallet'
import useChainConfig from '@/app/lib/wallet/hooks/useChainConfig'

export type CheckoutProps = {
  list: NFTPortfolioResponse[]
}

export type CheckoutFormData = {
  tokenIds: string[]
  destinationChainId: number
}

export const TOKEN_IDS_FIELD_ID = 'tokenIds'
export const DESTINATION_CHAIN_ID_FIELD_ID = 'destinationChainId'

export const Checkout = ({ list }: CheckoutProps) => {
  const { config, chain, remainingChains } = useNetwork()
  const { isConnected, address } = useWallet()
  const collectionContract = useChainContract('token')
  const bridgeContract = useChainContract('bridge')

  const methods = useForm<CheckoutFormData>({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: {
      [TOKEN_IDS_FIELD_ID]: [],
      [DESTINATION_CHAIN_ID_FIELD_ID]: undefined
    },
    resolver: zodResolver(
      z.object({
        tokenIds: z
          .string()
          .refine(
            (selectedTokenIds) => selectedTokenIds.length > 0,
            'Token IDs are required'
          ),
        destinationChainId: z.number().refine(
          (selectedDestinationChain) =>
            //check if selected chain is not the same as the source chain
            includes(
              /// get only ids
              map(remainingChains, (chain) => chain.id),
              selectedDestinationChain
            ),
          'Destination chain is required'
        )
      })
    )
  })

  const destinationChainFieldValue = methods.watch(
    DESTINATION_CHAIN_ID_FIELD_ID,
    undefined
  )

  const tokenIdsFieldValue = methods.watch(TOKEN_IDS_FIELD_ID, [])

  const { config: destinationChainConfig } = useChainConfig({
    chainId: destinationChainFieldValue
  })

  const { fees, bridge, isLoading } = useBridge({
    bridgeAddress: bridgeContract.address,
    collectionAddress: collectionContract.address,
    tokenIds: tokenIdsFieldValue,
    destinationChainId: destinationChainConfig.abstractId,
    enabled: !chain?.unsupported && isConnected && address !== undefined,
    senderAddress: address
  })

  const onSubmit = (data: CheckoutFormData) => {
    console.log(data)
  }

  console.log(fees, bridge.name, isLoading)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
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
              marketplaceURL={config.marketplaceURL}
              collectionAddress={collectionContract.address}
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
              fees={fees}
              feeToken={config.nativeCurrency}
            />
          </section>
        </Step>
      </form>
    </FormProvider>
  )
}

export default Checkout
