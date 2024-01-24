import addressUtils from '@/app/lib/utils/address'
import { ButtonProps, Button } from '@/app/components/button/Button'

type AccountProps = ButtonProps & {
  disconnect: () => void
  address: string
}

export const Account = ({ address, disconnect, ...props }: AccountProps) => {
  return (
    <Button onClick={() => disconnect()} type='button' {...props}>
      {addressUtils.toEllipsis(address, 6, 0)}
    </Button>
  )
}
export default Account
