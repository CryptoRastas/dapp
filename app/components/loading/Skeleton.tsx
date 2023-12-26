import classNames from 'classnames'
import { type HTMLProps } from 'react'
import { useSsr } from 'usehooks-ts'

export type LoadingSkeletonProps = HTMLProps<HTMLDivElement> & {
  skeleton?: {
    className: string
  }
}

export const LoadingSkeleton = ({
  className,
  skeleton,
  ...props
}: LoadingSkeletonProps) => {
  const { isServer } = useSsr()

  return (
    <div
      role='status'
      className={classNames(className, 'w-full animate-pulse')}
      {...props}
    >
      {isServer ? (
        <span className='sr-only'>Loading...</span>
      ) : (
        <div
          className={classNames(
            skeleton?.className || 'h-2.5 w-48 rounded-full bg-black'
          )}
        />
      )}
    </div>
  )
}

export default LoadingSkeleton
