import { type HTMLProps, createElement } from 'react'
import classNames from 'classnames'

export const Sizes = {
  default: 'text-xs',
  base: 'text-base'
} as const

export const Variant = {
  p: {
    classes: ['font-normal']
  },
  span: {
    classes: ['font-light']
  }
} as const

export type TextProps = Omit<HTMLProps<HTMLElement>, 'size'> & {
  size?: keyof typeof Sizes
  variant?: keyof typeof Variant
  as?: keyof typeof Variant
}

export const Text = ({
  as = 'span',
  variant = 'span',
  size = 'base',
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
