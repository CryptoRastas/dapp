import { Heading, Text } from '@/app/components/typography'
import { PortfolioField } from '@/app/components/widget/checkout/PortfolioField'
import { NFTPortfolioResponse } from '@/app/lib/wallet/hooks/useSDK'
import { WalletButton } from '@/app/components/wallet/button'
import { Alert } from '@/app/components/Alert'
import appConfig from '@/app.config'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { Button } from '../../button'

export type CollectionStepProps = {
  list: NFTPortfolioResponse[]
  collectionAddress: string
  marketplaceURLTokenId: string
  error?: string
  fieldId: string
  onNextStep: () => void
  onPrevStep: () => void
  isLimitReached?: boolean
}

export const CollectionStep = ({
  list,
  marketplaceURLTokenId,
  error,
  isLimitReached,
  fieldId,
  collectionAddress,
  onNextStep,
  onPrevStep
}: CollectionStepProps) => {
  return (
    <section className='flex flex-col justify-start space-y-8'>
      <div className='flex flex-col space-y-2'>
        <Heading as='h3'>select your NFTs</Heading>
      </div>
      <PortfolioField
        fieldId={fieldId}
        list={list}
        collectionAddress={collectionAddress}
        marketplaceURLTokenId={marketplaceURLTokenId}
      />

      <div className='flex flex-col space-y-8'>
        {isLimitReached && (
          <Alert variant='warning'>
            <Text size='sm'>
              You reached the maximum of {appConfig.bridge.transferNFTLimit}{' '}
              tokens to bridge
            </Text>
          </Alert>
        )}
        {error && (
          <Alert variant='danger'>
            <Text size='sm'>{error}</Text>
          </Alert>
        )}

        <div className='flex items-center space-x-2'>
          <Button
            type='button'
            onClick={onPrevStep}
            title='back'
            fullWidth={false}
            variant='outlined'
          >
            <ArrowLongLeftIcon width={20} height={20} />
          </Button>
          <WalletButton fullWidth={false} type='button' onClick={onNextStep}>
            Continue
          </WalletButton>
        </div>
      </div>
    </section>
  )
}

export default CollectionStep
