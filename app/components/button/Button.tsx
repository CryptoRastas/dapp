import { type ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

export const Sizes = {
  default: {
    classes: 'py-1.5 px-4'
  }
} as const

export const Variant = {
  default: {
    classes: 'bg-black text-yellow-500',
    disabled: 'disabled:text-yellow-500/50',
    hover: 'hover:bg-black/80 outline-none'
  },
  outlined: {
    classes: 'bg-transparent border border-black text-black',
    disabled:
      'disabled:bg-transparent disabled:border-black/50 disabled:text-black/50',
    hover: 'hover:bg-yellow-900/20 hover:text-black'
  }
} as const

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean
  variant?: keyof typeof Variant
  size?: keyof typeof Sizes
}

export const Button = ({
  children,
  fullWidth = true,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={classNames([
        { 'w-full rounded-3xl': fullWidth },
        props.className,
        Variant[variant].disabled,
        Variant[variant].classes,
        Variant[variant].hover,
        Sizes[size].classes
      ])}
    >
      {children}
    </button>
  )
}
export default Button
