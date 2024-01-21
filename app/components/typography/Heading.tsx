import { type HTMLProps, createElement } from 'react'
import classNames from 'classnames'

export const Variant = {
  h1: {
    classes: 'text-6xl lg:text-8xl font-extrabold'
  },
  h2: {
    classes: 'text-3xl lg:text-4xl font-bold'
  },
  h3: {
    classes: 'text-xl lg:text-2xl font-bold'
  },
  h4: {
    classes: 'text-base font-bold'
  },
  h5: {
    classes: 'text-base font-medium'
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
