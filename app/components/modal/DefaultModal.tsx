import classNames from 'classnames'
import { HTMLProps } from 'react'
import { Heading } from '@/app/components/typography'
import { ScrollBar } from '..'
import { XMarkIcon } from '@heroicons/react/24/outline'

export type DefaultModalProps = HTMLProps<HTMLDivElement> & {
  title?: string
  onClose?: () => void
  isOpen?: boolean
}

export const DefaultModal = ({
  title,
  onClose,
  isOpen,
  children,
  ...props
}: DefaultModalProps) => {
  return (
    <div {...props}>
      <div
        className={classNames(
          'fixed inset-x-0 top-0 z-50 h-full w-full items-center justify-center overflow-hidden md:inset-0',
          'flex items-center justify-center',
          { hidden: !isOpen }
        )}
      >
        <div
          className={classNames(
            'relative flex h-full w-full flex-col overflow-hidden rounded-lg',
            'bg-black/75 p-6 backdrop-blur md:h-1/2 md:w-1/2  dark:bg-gray-700/75'
          )}
        >
          <div className='relative flex max-h-full flex-col space-y-6 overflow-hidden'>
            <div className='flex items-center justify-between'>
              {title && <Heading as='h3'>{title}</Heading>}
              <button type='button' onClick={onClose}>
                <XMarkIcon width={24} title='exit' />
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            <ScrollBar className='max-h-full flex-1'>{children}</ScrollBar>
          </div>
        </div>
      </div>
    </div>
  )
}
