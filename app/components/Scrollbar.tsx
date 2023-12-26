'use client'

import classNames from 'classnames'
import { HTMLProps, ReactNode } from 'react'
import { useDarkMode } from 'usehooks-ts'

type ScrollBarProps = HTMLProps<HTMLDivElement> & {
  maxHeight?: string
  children: ReactNode
}

export const ScrollBar = ({
  maxHeight,
  children,
  className,
  ...props
}: ScrollBarProps) => {
  const { isDarkMode } = useDarkMode()
  return (
    <>
      <style jsx>
        {`
          .scrollbar {
            max-height: ${maxHeight};
          }
          .scrollbar::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          .scrollbar::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }

          .scrollbar::-webkit-scrollbar-thumb {
            border-radius: 20px;
          }

          .scrollbar-dark.scrollbar::-webkit-scrollbar-thumb {
            border-radius: 20px;
            background-color: #6366f1;
          }

          .scrollbar-light.scrollbar::-webkit-scrollbar-thumb {
            background-color: rgb(199 210 254 / var(--tw-bg-opacity));
          }
        `}
      </style>
      <div
        className={classNames(className, 'scrollbar overflow-y-auto', {
          'scrollbar-dark': isDarkMode,
          'scrollbar-light': !isDarkMode
        })}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

export default ScrollBar
