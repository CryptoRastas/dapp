import addressUtils from '@/app/lib/utils/address'
import { ButtonProps, Button } from '@/app/components/button/Button'
import { useWallet } from '@/app/lib/wallet/hooks/useWallet'

type AccountProps = ButtonProps

export const Account = ({ ...props }: AccountProps) => {
  const { address, disconnect } = useWallet()

  return (
    <Button onClick={() => disconnect()} type='button' {...props}>
      {addressUtils.toEllipsis(address, 6, 0)}
    </Button>
  )
}
export default Account
