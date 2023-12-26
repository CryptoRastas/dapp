import { type HTMLProps, Children, cloneElement, ReactElement } from 'react'
import { ToggleContent } from './ToggleContent'
import classNames from 'classnames'
import { XMarkIcon } from '@heroicons/react/24/outline'

export type OverlayToggleProps = HTMLProps<HTMLDivElement> & {
  selector: ReactElement
  container: ReactElement
}

export const OverlayToggle = ({
  selector,
  container,
  className,
  ...props
}: OverlayToggleProps) => {
  return (
    <ToggleContent
      {...props}
      className={classNames(className, 'lg:relative')}
      useClickOutside={true}
      squareRootClassName={classNames(
        'absolute z-[32] md:rounded-lg',
        'bottom-0 left-0 right-0 top-0',
        'lg:top-6 lg:bottom-auto lg:left-auto ',
        'bg-black'
      )}
      squareRootOpenClassName='visible opacity-100 lg:w-60 lg:h-auto h-full w-full'
      squareRootCloseClassName='invisible opacity-0 w-0 h-0'
      element={({ onClick, isOpen }) =>
        cloneElement(Children.only(selector), {
          className: classNames('relative', {
            'lg:z-[20]': isOpen
          }),
          onClick: onClick,
          isOpen: isOpen
        })
      }
    >
      {({ onClick }) => (
        <div className='flex h-full flex-col space-y-6 overflow-y-auto overflow-x-hidden lg:space-y-0'>
          <div className='flex-none lg:hidden' onClick={onClick}>
            <XMarkIcon width={24} title='exit' />
          </div>
          {cloneElement(Children.only(container), {
            className: 'flex-1'
          })}
        </div>
      )}
    </ToggleContent>
  )
}
export default OverlayToggle
