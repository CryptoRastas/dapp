import addressUtils from '@/app/lib/utils/address'
import { Text } from '@/app/components/typography'

type AccountProps = {
  disconnect: () => void
  address: string
}

export const Account = ({ address, disconnect }: AccountProps) => {
  return (
    <button onClick={() => disconnect()} type='button'>
      <Text>{addressUtils.toEllipsis(address, 4, 4)}</Text>
    </button>
  )
}
export default Account
