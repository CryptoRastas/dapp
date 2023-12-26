import { Connector } from 'wagmi'
import { Button, ButtonProps } from '@/app/components/button/Button'

type AccountConnectProps = ButtonProps & {
  isConnecting?: boolean
  connect: (
    args?: Partial<{ connector: Connector<any, any> }> | undefined
  ) => void
  connector: Connector<any, any>
}

export const AccountConnect = ({
  connector,
  connect,
  isConnecting,
  ...props
}: AccountConnectProps) => {
  const handleConnect = () => {
    connect({ connector })
  }

  return (
    <Button onClick={handleConnect} {...props} size='md'>
      {isConnecting ? 'Connecting' : 'Connect'}
    </Button>
  )
}

export default AccountConnect
