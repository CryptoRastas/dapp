import { Text } from '@/app/components/typography'

type AccountConnectProps = {
  isConnecting?: boolean
  onConnect: () => void
}

export const AccountConnect = ({
  onConnect,
  isConnecting
}: AccountConnectProps) => {
  return (
    <button onClick={onConnect} type='button'>
      <Text>{isConnecting ? 'Connecting' : 'Connect'}</Text>
    </button>
  )
}

export default AccountConnect
