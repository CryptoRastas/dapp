import { type HTMLProps } from 'react'
import classNames from 'classnames'
import addressUtils from '@/app/lib/utils/address'
import { AccountAvatar } from './Avatar'
import { Text } from '@/app/components/typography'

type AccountProps = HTMLProps<HTMLDivElement> & {
  disconnect: () => void
  address: string
}

export const Account = ({ address, disconnect, ...props }: AccountProps) => {
  return (
    <div onClick={() => disconnect()} {...props}>
      <div
        className={classNames('flex w-full items-center space-x-2 rounded-md')}
      >
        <AccountAvatar title={address} address={address} />
        <Text size='base' className='hidden md:inline-block'>
          {addressUtils.toEllipsis(address, 4, 4)}
        </Text>
      </div>
    </div>
  )
}
export default Account
