import { type HTMLProps, createElement } from 'react'
import classNames from 'classnames'

export const Sizes = {
  xs: { classes: 'text-xs' },
  default: { classes: '' },
  sm: { classes: 'text-sm' },
  base: { classes: 'text-base' },
  lg: { classes: 'text-lg' },
  xl: { classes: 'text-xl' },
  '3xl': { classes: 'text-3xl' }
} as const

export const Variant = {
  // inherit from parent
  default: {
    classes: ''
  },
  p: {
    classes: 'font-medium'
  },
  span: {
    classes: 'font-light'
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
            Sizes[size].classes,
            Variant[variant || as].classes
          )
        },
        children
      )

export default Text
