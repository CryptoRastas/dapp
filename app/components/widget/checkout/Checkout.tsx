import { FormProvider, useForm } from 'react-hook-form'
import { Heading, Text } from '@/app/components/typography'
import { Step } from '@/app/components/step/Step'
import { Details } from '@/app/components/widget/checkout/Details'
import { Portfolio } from '@/app/components/widget/checkout/Portfolio'
import { DestinationChain } from '@/app/components/widget/checkout/DestinationChain'
import { NFTPortfolioResponse } from '@/app/lib/wallet/hooks/useSDK'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import useBridge from '@/app/lib/hooks/bridge/useBridge'
import useChainConfig from '@/app/lib/wallet/hooks/useChainConfig'
import { Chain } from '@/app/config/chains'
import { ChainConfig } from '@/app/lib/wallet/hooks/useNetwork'
import useERC721ApproveAll from '@/app/lib/wallet/hooks/useERC721ApproveAll'
import { useEffect } from 'react'

export type CheckoutFormData = {
  tokenIds: string[]
  destinationChainId: number
}

export type CheckoutProps = {
  list: NFTPortfolioResponse[]
  collectionAddress: string
  bridgeAddress: string
  senderAddress?: string
  enabled?: boolean
  chain: ChainConfig
  destinationChains: Chain[]
  marketplaceURL: string
}

export const TOKEN_IDS_FIELD_ID = 'tokenIds'

export const DESTINATION_CHAIN_ID_FIELD_ID = 'destinationChainId'

export const DEFAULT_FIELD_VALUES = {
  [TOKEN_IDS_FIELD_ID]: [],
  [DESTINATION_CHAIN_ID_FIELD_ID]: undefined
}

export const Checkout = ({
  list,
  collectionAddress,
  bridgeAddress,
  senderAddress,
  enabled,
  destinationChains,
  chain,
  marketplaceURL
}: CheckoutProps) => {
  const methods = useForm<CheckoutFormData>({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_FIELD_VALUES,
    resolver: zodResolver(
      z.object({
        [TOKEN_IDS_FIELD_ID]: z
          .array(z.string())
          .refine(
            (selectedTokenIds) => selectedTokenIds.length > 0,
            'Token IDs are required'
          ),
        [DESTINATION_CHAIN_ID_FIELD_ID]: z.number({
          required_error: 'Destination chain is required'
        })
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
    bridgeAddress,
    collectionAddress,
    tokenIds: tokenIdsFieldValue,
    destinationChainId: destinationChainConfig.abstractId,
    enabled: !chain?.unsupported && enabled,
    senderAddress: senderAddress
  })

  const {
    // isApproving,
    isApprovedForAll
    // isLoading: isApproveAllLoading,
    // approveAll
  } = useERC721ApproveAll(collectionAddress, bridgeAddress)

  const handleStepByStep = async (
    fieldId: keyof typeof DEFAULT_FIELD_VALUES,
    next: () => void
  ) => {
    await methods.trigger([fieldId], {
      shouldFocus: true
    })
    const error = methods.getFieldState(fieldId).error

    if (error) return

    next()
  }

  const onSubmit = async () => {
    console.log('data...')
    try {
      await bridge()
    } catch {
      /** */
    }
  }

  console.log(fees, bridge.name, isLoading, methods.formState.errors)

  useEffect(() => {
    if (chain.id) {
      methods.reset(DEFAULT_FIELD_VALUES)
    }
  }, [chain.id, methods])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        className='h-full  w-full'
      >
        <Step step={3}>
          {({ currentStep, nextStep, prevStep }) =>
            ({
              1: (
                <>
                  <section className='flex flex-col justify-start space-y-8'>
                    <div className='flex flex-col space-y-2'>
                      <Heading as='h3'>Select your tokens</Heading>
                      <Text size='sm'>
                        Before start, select your token IDs that’s going to be
                        used to bridge to destination chain.
                      </Text>
                    </div>
                    <Portfolio
                      fieldId={TOKEN_IDS_FIELD_ID}
                      list={list}
                      marketplaceURL={marketplaceURL}
                      collectionAddress={collectionAddress}
                    />
                    {methods.formState.errors[TOKEN_IDS_FIELD_ID] && (
                      <Text size='sm' className='text-red-400'>
                        {methods.formState.errors[TOKEN_IDS_FIELD_ID].message}
                      </Text>
                    )}
                    <button
                      type='button'
                      onClick={() =>
                        handleStepByStep(TOKEN_IDS_FIELD_ID, nextStep)
                      }
                    >
                      Continue
                    </button>
                  </section>
                </>
              ),
              2: (
                <section className='flex flex-col justify-start space-y-8'>
                  <div className='flex flex-col space-y-2'>
                    <Heading as='h3'>Select destination chain</Heading>
                    <Text size='sm'>
                      Almost there, select a chain to bridge your selected
                      tokens
                    </Text>
                  </div>
                  <DestinationChain
                    fieldId={DESTINATION_CHAIN_ID_FIELD_ID}
                    list={destinationChains}
                  />
                  {methods.formState.errors[DESTINATION_CHAIN_ID_FIELD_ID] && (
                    <Text size='sm' className='text-red-400'>
                      {
                        methods.formState.errors[DESTINATION_CHAIN_ID_FIELD_ID]
                          .message
                      }
                    </Text>
                  )}
                  <button type='button' onClick={prevStep}>
                    Back
                  </button>
                  <button
                    type='button'
                    onClick={() =>
                      handleStepByStep(DESTINATION_CHAIN_ID_FIELD_ID, nextStep)
                    }
                  >
                    Continue
                  </button>
                </section>
              ),
              3: (
                <section className='flex flex-col justify-start space-y-8'>
                  <div className='flex flex-col space-y-2'>
                    <Heading as='h3'>Check your bridge details</Heading>
                  </div>
                  <Details
                    tokenIdsFieldId={TOKEN_IDS_FIELD_ID}
                    destinationChainFieldId={DESTINATION_CHAIN_ID_FIELD_ID}
                    chainList={destinationChains}
                    tokenList={list}
                    fees={fees}
                    feeToken={chain.nativeCurrency}
                  />
                  {!isApprovedForAll && (
                    <Text size='sm' className='text-red-400'>
                      You need to approve your tokens first
                    </Text>
                  )}
                  <button type='button' onClick={prevStep}>
                    Back
                  </button>
                  <button type='submit'>
                    {isApprovedForAll ? 'Bridge' : 'Approve all tokens'}
                  </button>
                </section>
              )
            })[currentStep]
          }
        </Step>
      </form>
    </FormProvider>
  )
}

export default Checkout
