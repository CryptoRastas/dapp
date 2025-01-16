import { FormProvider, useForm } from 'react-hook-form'
import { Step } from '@/app/components/step/Step'
import { NFTPortfolioResponse } from '@/app/lib/wallet/hooks/useSDK'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import useBridge from '@/app/lib/hooks/bridge/useBridge'
import useChainConfig from '@/app/lib/wallet/hooks/useChainConfig'
import useNetwork, { ChainConfig } from '@/app/lib/wallet/hooks/useNetwork'
import useERC721ApproveAll from '@/app/lib/wallet/hooks/useERC721ApproveAll'
import { useCallback, useEffect, useState } from 'react'
import { useStep } from '@/app/lib/hooks/useStep'
import appConfig from '@/app.config'
import { CollectionStep } from '@/app/components/widget/checkout/CollectionStep'
import { SourceChainStep } from '@/app/components/widget/checkout/SourceChainStep'
import { DestinationChainStep } from '@/app/components/widget/checkout/DestinationChainStep'
import { BridgeStep } from '@/app/components/widget/checkout/BridgeStep'
import { Modal } from '@/app/components/widget/checkout/Modal'
import { useToggle } from 'usehooks-ts'
import { bridgeConfig } from '@/app/config/bridge'
import { allowedChains } from '@/app/config/config'

export type CheckoutFormData = {
  tokenIds: string[]
  destinationChainId: number
  sourceChainId: number
}

export type CheckoutProps = {
  onRefetchList: () => void
  list: NFTPortfolioResponse[]
  collectionAddress: string
  bridgeAddress: string
  senderAddress?: string
  enabled?: boolean
  currentChain: ChainConfig
  balance: bigint
}

export const TOKEN_IDS_FIELD_ID = 'tokenIds'
export const DESTINATION_CHAIN_ID_FIELD_ID = 'destinationChainId'
export const SOURCE_CHAIN_ID_FIELD_ID = 'sourceChainId'

export const DEFAULT_FIELD_VALUES = {
  [TOKEN_IDS_FIELD_ID]: [],
  [DESTINATION_CHAIN_ID_FIELD_ID]: undefined,
  [SOURCE_CHAIN_ID_FIELD_ID]: undefined
}

export const Checkout = ({
  onRefetchList,
  list,
  collectionAddress,
  bridgeAddress,
  senderAddress,
  enabled,
  currentChain,
  balance
}: CheckoutProps) => {
  const [isOpen, , setIsOpen] = useToggle()
  const [internalError, setInternalError] = useState<string>()
  const { config } = useNetwork()

  const methods = useForm<CheckoutFormData>({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: {
      ...DEFAULT_FIELD_VALUES,
      sourceChainId: config?.id
    },
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
        }),
        [SOURCE_CHAIN_ID_FIELD_ID]: z.number({
          required_error: 'Source chain is required'
        })
      })
    )
  })

  const destinationChains = bridgeConfig[config.id]

  const destinationChainFieldValue = methods.watch(
    DESTINATION_CHAIN_ID_FIELD_ID,
    +appConfig.networks.defaultChainId
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
    status,
    reset: resetBridgeState
  } = useBridge({
    bridgeAddress,
    collectionAddress,
    tokenIds: tokenIdsFieldValue,
    destinationChainId: destinationChainConfig.abstractId,
    enabled: !currentChain?.unsupported && enabled,
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
  } = useStep({ steps: 4 })

  const handleStepByStep = async (
    fieldId: keyof typeof DEFAULT_FIELD_VALUES,
    /// function to handle nextstep
    next: () => void
  ) => {
    /// trigger effect to handle validation
    await methods.trigger([fieldId], {
      shouldFocus: true
    })

    /// check if there's any error by field id
    if (methods.getFieldState(fieldId).error) return

    /// move forward
    next()

    /// clear internal errors
    setInternalError(undefined)
    resetBridgeState()
  }

  const resetCheckoutState = useCallback(() => {
    methods.resetField('tokenIds')
    methods.resetField('destinationChainId')

    resetSteps()
  }, [methods, resetSteps])

  const onCloseModal = () => {
    onRefetchList()
    resetCheckoutState()
    resetBridgeState()
    setIsOpen(false)
  }

  const onSubmit = async () => {
    // reset state before transfer
    resetBridgeState()
    setInternalError(undefined)

    if (!isApprovedForAll) {
      /// approve tokens if theres required approval
      try {
        return await approveAll()
      } catch (error) {
        setInternalError(
          'An error occurred while approving your tokens, contact our support.'
        )

        console.log(error)

        return
      }
    }

    /// opening modal bridge
    setIsOpen(true)

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
    if ((!currentChain.unsupported && currentChain.id) || senderAddress) {
      resetCheckoutState()
      resetBridgeState()
    }
  }, [resetBridgeState, resetCheckoutState, currentChain, senderAddress])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        className='h-full w-full'
      >
        <Step steps={4} currentStep={currentStep}>
          {
            {
              1: (
                <SourceChainStep
                  key={0}
                  fieldId={SOURCE_CHAIN_ID_FIELD_ID}
                  error={
                    methods.formState.errors[SOURCE_CHAIN_ID_FIELD_ID]?.message
                  }
                  sourceChains={allowedChains}
                  onNextStep={() =>
                    handleStepByStep(SOURCE_CHAIN_ID_FIELD_ID, nextStep)
                  }
                />
              ),
              2: (
                <CollectionStep
                  key={1}
                  fieldId={TOKEN_IDS_FIELD_ID}
                  collectionAddress={collectionAddress}
                  list={list}
                  marketplaceURLTokenId={currentChain.marketplaceURLTokenId}
                  error={methods.formState.errors[TOKEN_IDS_FIELD_ID]?.message}
                  isLimitReached={tokensReachedLimit}
                  onNextStep={() =>
                    handleStepByStep(TOKEN_IDS_FIELD_ID, nextStep)
                  }
                  onPrevStep={prevStep}
                />
              ),
              3: (
                <DestinationChainStep
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
              4: (
                <BridgeStep
                  key={3}
                  tokens={list}
                  tokenIdsFieldId={TOKEN_IDS_FIELD_ID}
                  destinationChainFieldId={DESTINATION_CHAIN_ID_FIELD_ID}
                  sourceChainFieldId={SOURCE_CHAIN_ID_FIELD_ID}
                  nativeCurrency={currentChain.nativeCurrency}
                  chains={allowedChains}
                  fees={fees}
                  needApproval={!isApprovedForAll}
                  error={internalError}
                  onPrevStep={prevStep}
                  isLoading={isApproving || isBridging}
                  notEnoughBalance={notEnoughBalance}
                  isApproving={isApproving}
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
        destinationChainConfig={destinationChainConfig}
        isBridging={isBridging}
      />
    </FormProvider>
  )
}

export default Checkout
