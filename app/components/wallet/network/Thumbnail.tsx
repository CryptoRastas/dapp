import { type HTMLProps } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

type NetworkThumbnailProps = HTMLProps<HTMLDivElement> & {
  src?: string
  width?: number
  height?: number
}

export const NetworkThumbnail = ({
  src,
  className,
  width = 16,
  height = 16,
  ...props
}: NetworkThumbnailProps) => {
  return (
    <>
      <style jsx>
        {`
          .network-thumbnail {
            --width: ${width}px;
            --height: ${height}px;
          }
        `}
      </style>
      <div
        {...props}
        className={classNames(
          className,
          'network-thumbnail',
          'flex h-[var(--height)] w-[var(--width)] items-center justify-center'
        )}
      >
        {src ? (
          <Image src={src} alt='network' width={width} height={height} />
        ) : (
          <div className='font-bold text-black/75'>?</div>
        )}
      </div>
    </>
  )
}

export default NetworkThumbnail
