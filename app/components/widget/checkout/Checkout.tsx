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
import { useCallback, useEffect, useState } from 'react'
import { WalletButton } from '@/app/components/wallet/button'
import { Alert } from '@/app/components/Alert'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { useStep } from '@/app/lib/hooks/useStep'
import appConfig from '@/app.config'

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
  balance: bigint
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
  marketplaceURL,
  balance
}: CheckoutProps) => {
  const [internalError, setInternalError] = useState<string>()

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

  const tokensReachedLimit =
    tokenIdsFieldValue.length >= appConfig.bridge.transferNFTLimit

  const { config: destinationChainConfig } = useChainConfig({
    chainId: destinationChainFieldValue
  })

  const {
    fees,
    bridge,
    isLoading: isBridging
  } = useBridge({
    bridgeAddress,
    collectionAddress,
    tokenIds: tokenIdsFieldValue,
    destinationChainId: destinationChainConfig.abstractId,
    enabled: !chain?.unsupported && enabled,
    senderAddress: senderAddress
  })

  const notEnoughBalance = balance < fees

  const { isApproving, isApprovedForAll, approveAll } = useERC721ApproveAll(
    collectionAddress,
    bridgeAddress
  )

  const {
    currentStep,
    nextStep,
    prevStep,
    reset: resetSteps
  } = useStep({ step: 3 })

  const handleStepByStep = async (
    fieldId: keyof typeof DEFAULT_FIELD_VALUES,
    next: () => void
  ) => {
    /// trigger effect to handle validation
    await methods.trigger([fieldId], {
      shouldFocus: true
    })
    /// check if there's any error by field id
    if (methods.getFieldState(fieldId).error) return

    next()

    setInternalError(undefined)
  }

  const resetCheckoutState = useCallback(() => {
    methods.reset(DEFAULT_FIELD_VALUES)
    resetSteps()
  }, [methods, resetSteps])

  const onSubmit = async () => {
    setInternalError(undefined)

    /// approve tokens
    try {
      await approveAll()
    } catch (error) {
      setInternalError(
        'An error occurred while approving your tokens, contact our support.'
      )
      console.log(error)

      return
    }

    /// bridge tokens
    try {
      await bridge()
    } catch (error) {
      setInternalError(
        'An error occurred while bridging your tokens, contact our support.'
      )
      console.log(error)
    }

    resetCheckoutState()
  }

  useEffect(() => {
    /// reset checkout state if user changes chain
    if (chain.id) {
      resetCheckoutState()
    }
  }, [resetCheckoutState, chain.id])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        className='h-full w-full'
      >
        <Step steps={3} currentStep={currentStep}>
          {
            {
              1: (
                <section
                  key={1}
                  className='flex flex-col justify-start space-y-8'
                >
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

                  <div className='flex flex-col space-y-8'>
                    {tokensReachedLimit && (
                      <Alert variant='warning'>
                        <Text size='sm'>
                          You reached the maximum of{' '}
                          {appConfig.bridge.transferNFTLimit} tokens to bridge
                        </Text>
                      </Alert>
                    )}
                    {methods.formState.errors[TOKEN_IDS_FIELD_ID] && (
                      <Alert variant='danger'>
                        <Text size='sm'>
                          {methods.formState.errors[TOKEN_IDS_FIELD_ID].message}
                        </Text>
                      </Alert>
                    )}
                    <div>
                      <WalletButton
                        fullWidth={false}
                        type='button'
                        onClick={() =>
                          handleStepByStep(TOKEN_IDS_FIELD_ID, nextStep)
                        }
                      >
                        Continue
                      </WalletButton>
                    </div>
                  </div>
                </section>
              ),
              2: (
                <section
                  key={2}
                  className='flex flex-col justify-start space-y-8'
                >
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
                  <div className='flex flex-col space-y-8'>
                    {methods.formState.errors[
                      DESTINATION_CHAIN_ID_FIELD_ID
                    ] && (
                      <Alert variant='danger'>
                        <Text size='sm'>
                          {
                            methods.formState.errors[
                              DESTINATION_CHAIN_ID_FIELD_ID
                            ].message
                          }
                        </Text>
                      </Alert>
                    )}
                    <div className='flex items-center space-x-2'>
                      <button type='button' onClick={prevStep} title='back'>
                        <ArrowLongLeftIcon width={20} height={20} />
                      </button>
                      <WalletButton
                        fullWidth={false}
                        type='button'
                        onClick={() =>
                          handleStepByStep(
                            DESTINATION_CHAIN_ID_FIELD_ID,
                            nextStep
                          )
                        }
                      >
                        Continue
                      </WalletButton>
                    </div>
                  </div>
                </section>
              ),
              3: (
                <section
                  key={3}
                  className='flex flex-col justify-start space-y-8'
                >
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
                  <div className='flex flex-col space-y-8'>
                    {!isApprovedForAll && !isApproving && (
                      <Alert variant='warning'>
                        <Text size='sm'>
                          You need to approve your tokens before bridging
                        </Text>
                      </Alert>
                    )}
                    {internalError && (
                      <Alert variant='danger'>
                        <Text size='sm'>{internalError}</Text>
                      </Alert>
                    )}

                    <div className='flex items-center space-x-2'>
                      <button
                        type='button'
                        onClick={prevStep}
                        title='back'
                        disabled={isApproving || isBridging}
                      >
                        <ArrowLongLeftIcon width={20} height={20} />
                      </button>
                      <WalletButton
                        fullWidth={false}
                        type='submit'
                        disabled={isApproving || isBridging || notEnoughBalance}
                      >
                        {notEnoughBalance ? 'Insufficient balance' : 'Bridge'}
                      </WalletButton>
                    </div>
                  </div>
                </section>
              )
            }[currentStep]
          }
        </Step>
      </form>
    </FormProvider>
  )
}

export default Checkout
