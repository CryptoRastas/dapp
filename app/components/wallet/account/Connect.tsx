import { Button } from '@/app/components/button'

import { useWallet } from '@/app/lib/wallet/hooks'

import { useModal } from 'connectkit'

export const AccountConnect = () => {
  const { setOpen: setModalWalletsOpen } = useModal()
  const { isConnecting } = useWallet()

  const handleConnect = () => {
    setModalWalletsOpen(true)
  }

  return (
    <Button onClick={handleConnect} type='button'>
      {isConnecting ? 'Connecting' : 'Connect'}
    </Button>
  )
}

export default AccountConnect
