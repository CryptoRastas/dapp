import { Heading, Text } from '@/app/components/typography'
import { SourceChainField } from '@/app/components/widget/checkout/SourceChainField'
import { Chain } from '@/app/config/chains'
import { WalletButton } from '@/app/components/wallet/button'
import { Alert } from '@/app/components/Alert'
import { useNetwork, useWallet } from '@/app/lib/wallet/hooks'
import { useFormContext } from 'react-hook-form'
import { isUndefined } from 'lodash'

export type SourceChainStepProps = {
  error?: string
  fieldId: string
  onNextStep: () => void
  sourceChains: Chain[]
}

export const SourceChainStep = ({
  fieldId,
  sourceChains,
  error,
  onNextStep
}: SourceChainStepProps) => {
  const { connector } = useWallet()
  const { chain, switchChain } = useNetwork()
  const { watch } = useFormContext()

  const fieldValue = watch(fieldId)

  const isWrongNetwork =
    !isUndefined(fieldValue) && Number(fieldValue) !== chain.id

  const handleSwitchChain = () => {
    switchChain({ chainId: Number(fieldValue), connector })
  }

  return (
    <section key={0} className='flex flex-col justify-start space-y-8'>
      <div className='flex flex-col space-y-2'>
        <Heading as='h3'>Select the chain source</Heading>
      </div>
      <SourceChainField fieldId={fieldId} list={sourceChains} />
      <div className='flex flex-col space-y-8'>
        {error && (
          <Alert variant='danger'>
            <Text size='sm'>{error}</Text>
          </Alert>
        )}
        <div>
          <WalletButton
            fullWidth={false}
            type='button'
            onClick={isWrongNetwork ? handleSwitchChain : onNextStep}
          >
            {isWrongNetwork ? 'Switch network' : 'Continue'}
          </WalletButton>
        </div>
      </div>
    </section>
  )
}

export default SourceChainStep
