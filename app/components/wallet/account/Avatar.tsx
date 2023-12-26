import { type HTMLProps } from 'react'
import { ZeroAddress } from 'ethers'
import classNames from 'classnames'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

export type AccountAvatarProps = HTMLProps<HTMLDivElement> & {
  address: string
  size?: number
}

const SIZE = 20

export const AccountAvatar = ({
  address,
  className,
  size = SIZE,
  ...props
}: AccountAvatarProps) => {
  return (
    <>
      <style jsx>
        {`
          .avatar {
            --avatarSize: ${size / 16}rem;
          }
        `}
      </style>
      <div {...props} className={classNames(className, 'avatar')}>
        <div
          className={classNames(
            `flex h-[var(--avatarSize)] w-[var(--avatarSize)] items-center justify-center overflow-hidden rounded-md`
          )}
        >
          <Jazzicon
            diameter={size * 1.1}
            paperStyles={{ borderRadius: '0.375rem' }}
            seed={jsNumberForAddress(address || ZeroAddress)}
          />
        </div>
      </div>
    </>
  )
}
export default AccountAvatar
