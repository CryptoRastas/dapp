import { HTMLProps } from 'react'
import { Media, Partners } from './social'
import classNames from 'classnames'

export const Footer = ({ className, ...props }: HTMLProps<HTMLElement>) => {
  return (
    <footer
      {...props}
      className={classNames(
        className,
        'flex justify-between max-lg:flex-col max-lg:space-y-8 lg:space-x-8'
      )}
    >
      <div className='flex max-lg:justify-center'>
        <Media />
      </div>
      <Partners />
    </footer>
  )
}

export default Footer
