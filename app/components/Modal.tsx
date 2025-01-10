import { XMarkIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { ReactNode } from 'react'

export type ModalProps = {
  isClosable?: boolean
  isOpen?: boolean
  onClose: () => void
  children: ReactNode
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  isClosable = true
}: ModalProps) => {
  return (
    <div
      className={classNames(
        isOpen
          ? [
              'fixed bottom-0 left-0 right-0 top-0 z-[9] h-screen w-screen',
              'flex items-center justify-center'
            ]
          : ['hidden h-0 w-0 overflow-hidden']
      )}
    >
      <div className='absolute z-[10] h-full w-full bg-blue-400/70 backdrop-blur' />
      <div
        className={classNames(
          'rounded-xl bg-blue-400',
          'relative z-[11] flex flex-col space-y-4 p-8',
          'max-lg:m-8 max-lg:w-full'
        )}
      >
        {isClosable && (
          <div className='flex justify-end'>
            <button type='button' onClick={onClose} title='close'>
              <XMarkIcon width={32} height={32} />
            </button>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
