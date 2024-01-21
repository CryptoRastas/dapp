import { Button } from '@/app/components/button'

type AccountConnectProps = {
  isConnecting?: boolean
  onConnect: () => void
}

export const AccountConnect = ({
  onConnect,
  isConnecting
}: AccountConnectProps) => {
  return (
    <Button onClick={onConnect} type='button'>
      {isConnecting ? 'Connecting' : 'Connect'}
    </Button>
  )
}

export default AccountConnect
