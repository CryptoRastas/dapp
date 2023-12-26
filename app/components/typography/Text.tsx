import { type HTMLProps, createElement } from 'react'
import classNames from 'classnames'

export const Sizes = {
  default: 'text-xs',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
} as const

export const Variant = {
  p: {
    classes: ['font-normal', Sizes.base].concat(' ')
  },
  span: {
    classes: ['font-light', Sizes.default].concat(' ')
  }
} as const

export type TextProps = Omit<HTMLProps<HTMLElement>, 'size'> & {
  size?: keyof typeof Sizes
  variant?: keyof typeof Variant
  as?: keyof typeof Variant
}

export const Text = ({
  as = 'p',
  variant = 'p',
  size = 'default',
  children,
  className,
  ...props
}: TextProps) =>
  !as
    ? children
    : createElement(
        as,
        {
          ...props,
          className: classNames(
            className,
            size ? Sizes[size] : Variant[as || variant].classes
          )
        },
        children
      )

export default Text
