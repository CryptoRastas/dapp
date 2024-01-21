import addressUtils from '@/app/lib/utils/address'
import { Button } from '@/app/components/button'

type AccountProps = {
  disconnect: () => void
  address: string
}

export const Account = ({ address, disconnect }: AccountProps) => {
  return (
    <Button onClick={() => disconnect()} type='button'>
      {addressUtils.toEllipsis(address, 6, 0)}
    </Button>
  )
}
export default Account
