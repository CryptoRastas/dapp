import { Heading, Text } from '@/app/components/typography'
import { DestinationChainField } from '@/app/components/widget/checkout/DestinationChainField'
import { Chain } from '@/app/config/chains'

import { WalletButton } from '@/app/components/wallet/button'
import { Alert } from '@/app/components/Alert'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'

export type ChainStepProps = {
  error?: string
  fieldId: string
  onNextStep: () => void
  onPrevStep: () => void
  destinationChains: Chain[]
}

export const ChainStep = ({
  fieldId,
  destinationChains,
  error,
  onNextStep,
  onPrevStep
}: ChainStepProps) => {
  return (
    <section key={2} className='flex flex-col justify-start space-y-8'>
      <div className='flex flex-col space-y-2'>
        <Heading as='h3'>Select destination chain</Heading>
        <Text size='sm'>
          Almost there, select a chain to bridge your selected tokens
        </Text>
      </div>
      <DestinationChainField fieldId={fieldId} list={destinationChains} />
      <div className='flex flex-col space-y-8'>
        {error && (
          <Alert variant='danger'>
            <Text size='sm'>{error}</Text>
          </Alert>
        )}
        <div className='flex items-center space-x-2'>
          <button type='button' onClick={onPrevStep} title='back'>
            <ArrowLongLeftIcon width={20} height={20} />
          </button>
          <WalletButton fullWidth={false} type='button' onClick={onNextStep}>
            Continue
          </WalletButton>
        </div>
      </div>
    </section>
  )
}

export default ChainStep
