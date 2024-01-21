import { FormProvider, useForm } from 'react-hook-form'
import { Step } from '@/app/components/step/Step'
import { NFTPortfolioResponse } from '@/app/lib/wallet/hooks/useSDK'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import useBridge from '@/app/lib/hooks/bridge/useBridge'
import useChainConfig from '@/app/lib/wallet/hooks/useChainConfig'
import { Chain } from '@/app/config/chains'
import { ChainConfig } from '@/app/lib/wallet/hooks/useNetwork'
import useERC721ApproveAll from '@/app/lib/wallet/hooks/useERC721ApproveAll'
import { useCallback, useEffect, useState } from 'react'
import { useStep } from '@/app/lib/hooks/useStep'
import appConfig from '@/app.config'
import { CollectionStep } from '@/app/components/widget/checkout/CollectionStep'
import { ChainStep } from '@/app/components/widget/checkout/ChainStep'
import { BridgeStep } from '@/app/components/widget/checkout/BridgeStep'
import { Modal } from '@/app/components/widget/checkout/Modal'
import { useToggle } from 'usehooks-ts'

export type CheckoutFormData = {
  tokenIds: string[]
  destinationChainId: number
}

export type CheckoutProps = {
  onRefetchList: () => void
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
  onRefetchList,
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
  const [isOpen, , setIsOpen] = useToggle()
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
    isLoading: isBridging,
    status
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

  const onCloseModal = () => {
    resetCheckoutState()
    onRefetchList()
    setIsOpen(false)
  }

  const onSubmit = async () => {
    setIsOpen(true)
    setInternalError(undefined)

    if (!isApprovedForAll) {
      /// approve tokens if theres required approval
      try {
        await approveAll()
      } catch (error) {
        setInternalError(
          'An error occurred while approving your tokens, contact our support.'
        )

        console.log(error)
        setIsOpen(false)

        return
      }
    }

    /// bridge tokens
    try {
      await bridge()
    } catch (error) {
      setInternalError(
        'An error occurred while bridging your tokens, contact our support.'
      )

      console.log(error)
      setIsOpen(false)
    }
  }

  useEffect(() => {
    /// reset checkout state if user changes chain
    if (!chain.unsupported && chain.id) {
      resetCheckoutState()
    }
  }, [resetCheckoutState, chain])

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
                <CollectionStep
                  key={1}
                  fieldId={TOKEN_IDS_FIELD_ID}
                  list={list}
                  marketplaceURL={marketplaceURL}
                  collectionAddress={collectionAddress}
                  error={methods.formState.errors[TOKEN_IDS_FIELD_ID]?.message}
                  isLimitReached={tokensReachedLimit}
                  onNextStep={() =>
                    handleStepByStep(TOKEN_IDS_FIELD_ID, nextStep)
                  }
                />
              ),
              2: (
                <ChainStep
                  key={2}
                  fieldId={DESTINATION_CHAIN_ID_FIELD_ID}
                  error={
                    methods.formState.errors[DESTINATION_CHAIN_ID_FIELD_ID]
                      ?.message
                  }
                  destinationChains={destinationChains}
                  onPrevStep={prevStep}
                  onNextStep={() =>
                    handleStepByStep(DESTINATION_CHAIN_ID_FIELD_ID, nextStep)
                  }
                />
              ),
              3: (
                <BridgeStep
                  key={3}
                  list={list}
                  tokenIdsFieldId={TOKEN_IDS_FIELD_ID}
                  destinationChainFieldId={DESTINATION_CHAIN_ID_FIELD_ID}
                  nativeCurrency={chain.nativeCurrency}
                  destinationChains={destinationChains}
                  fees={fees}
                  needApproval={!isApproving && !isApprovedForAll}
                  error={internalError}
                  onPrevStep={prevStep}
                  isLoading={isApproving || isBridging}
                  notEnoughBalance={notEnoughBalance}
                />
              )
            }[currentStep]
          }
        </Step>
      </form>
      <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        status={status}
        senderAddress={senderAddress}
        destinationChainConfig={destinationChainConfig}
        isBridging={isBridging}
      />
      {/* <div className='flex flex-col space-y-8 text-center'>
          <Heading as='h2'>
            Bridging your
            <br /> {appConfig.name} tokens
          </Heading>
          <div className='flex items-center justify-center space-x-4'>
            <Spinner />
            <Text>
              {isBridging ? (
                'Sending tokens'
              ) : (
                <>
                  {status === MessageStatus.DELIVERED ? (
                    <span className='flex space-x-1'>
                      <span>Your tokens has been bridged successfully to</span>
                      <Link
                        href={`${destinationChainConfig.blockExplorers?.default.url}/${senderAddress}`}
                        target='_blank'
                        className='flex space-x-px'
                      >
                        <ArrowTopRightOnSquareIcon width={16} height={16} />
                        <span>{destinationChainConfig.name}</span>
                      </Link>
                    </span>
                  ) : (
                    'Almost there'
                  )}
                </>
              )}
            </Text>
          </div>
        </div>
      </Modal> */}
    </FormProvider>
  )
}

export default Checkout
