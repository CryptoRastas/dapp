import { type HTMLProps, createElement } from 'react'
import classNames from 'classnames'

export const Variant = {
  default: {
    classes: 'text-gray-600 bg-gray-200'
  },
  danger: {
    classes: 'text-red-900 border border-red-900 bg-red-900/10'
  },
  warning: {
    classes: 'text-green-900 bg-green-400'
  }
} as const

export type AlertProps = Omit<HTMLProps<HTMLElement>, 'size'> & {
  variant?: keyof typeof Variant
}

export const Alert = ({
  as = 'div',
  variant = 'default',
  children,
  className,
  ...props
}: AlertProps) =>
  !as
    ? children
    : createElement(
        as,
        {
          ...props,
          className: classNames(
            className,
            ' p-2 rounded-xl',
            Variant[variant].classes
          )
        },
        children
      )

export default Alert
