import classNames from 'classnames'
import { type HTMLProps } from 'react'

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
  return (
    <div
      role='status'
      className={classNames(className, 'animate-pulse rounded-2xl bg-black')}
      {...props}
    >
      <div className={classNames(skeleton?.className || 'h-2.5 w-48')}>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}

export default LoadingSkeleton
