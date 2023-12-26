import { type HTMLProps } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

type NetworkThumbnailProps = HTMLProps<HTMLDivElement> & {
  src?: string
}

export const NetworkThumbnail = ({
  src,
  className,
  ...props
}: NetworkThumbnailProps) => {
  return (
    <div
      {...props}
      className={classNames(
        className,
        'flex h-5 w-5 items-center justify-center rounded-full bg-black'
      )}
    >
      {src ? (
        <Image src={src} alt='network' width={20} height={20} />
      ) : (
        <div className='font-bold text-black/75'>?</div>
      )}
    </div>
  )
}

export default NetworkThumbnail
