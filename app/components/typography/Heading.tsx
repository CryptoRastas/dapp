import { type HTMLProps, createElement } from 'react'
import classNames from 'classnames'

export const Variant = {
  h1: {
    classes: 'text-3xl lg:text-2xl font-extrabold lg:font-black'
  },
  h2: {
    classes: 'text-2xl lg:text-xl font-bold lg:font-extrabold'
  },
  h3: {
    classes: 'text-base lg:text-lg font-medium lg:font-bold'
  },
  h4: {
    classes: 'text-base font-medium'
  },
  h5: {
    classes: 'text-base font-normal'
  },
  h6: {
    classes: 'text-sm font-normal'
  }
} as const

export type HeadingProps = HTMLProps<HTMLHeadingElement> & {
  variant?: keyof typeof Variant
  as?: keyof typeof Variant
}

export const Heading = ({
  as = 'h1',
  variant,
  children,
  className,
  ...props
}: HeadingProps) =>
  !as
    ? children
    : createElement(
        as,
        {
          ...props,
          className: classNames(className, Variant[variant || as].classes)
        },
        children
      )

export default Heading
