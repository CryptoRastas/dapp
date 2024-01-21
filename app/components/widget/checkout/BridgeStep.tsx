import { Heading, Text } from '@/app/components/typography'
import { Details } from '@/app/components/widget/checkout/Details'
import { NFTPortfolioResponse } from '@/app/lib/wallet/hooks/useSDK'
import { Chain } from '@/app/config/chains'
import { WalletButton } from '@/app/components/wallet/button'
import { Alert } from '@/app/components/Alert'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'

export type BridgeStepProps = {
  list: NFTPortfolioResponse[]
  tokenIdsFieldId: string
  destinationChainFieldId: string
  nativeCurrency: Chain['nativeCurrency']
  destinationChains: Chain[]
  fees: bigint
  isApproving?: boolean
  needApproval?: boolean
  error?: string
  onPrevStep: () => void
  isLoading?: boolean
  notEnoughBalance?: boolean
}

export const BridgeStep = ({
  list,
  isApproving,
  destinationChains,
  nativeCurrency,
  tokenIdsFieldId,
  destinationChainFieldId,
  fees,
  needApproval,
  error,
  onPrevStep,
  isLoading,
  notEnoughBalance
}: BridgeStepProps) => {
  return (
    <section key={3} className='flex flex-col justify-start space-y-8'>
      <div className='flex flex-col space-y-2'>
        <Heading as='h3'>Check your bridge details</Heading>
      </div>
      <Details
        tokenIdsFieldId={tokenIdsFieldId}
        destinationChainFieldId={destinationChainFieldId}
        chainList={destinationChains}
        tokenList={list}
        fees={fees}
        feeToken={nativeCurrency}
      />
      <div className='flex flex-col space-y-8'>
        {needApproval && (
          <Alert variant='warning'>
            <Text size='sm'>
              You need to approve your tokens before bridging
            </Text>
          </Alert>
        )}
        {error && (
          <Alert variant='danger'>
            <Text size='sm'>{error}</Text>
          </Alert>
        )}

        <div className='flex items-center space-x-2'>
          <button
            type='button'
            onClick={onPrevStep}
            title='back'
            disabled={isLoading || isApproving}
          >
            <ArrowLongLeftIcon width={20} height={20} />
          </button>
          <WalletButton
            fullWidth={false}
            type='submit'
            disabled={isLoading || notEnoughBalance || isApproving}
          >
            {notEnoughBalance
              ? 'Insufficient balance'
              : isApproving
                ? 'Approving'
                : needApproval
                  ? 'Approve'
                  : 'Bridge'}
          </WalletButton>
        </div>
      </div>
    </section>
  )
}

export default BridgeStep
