import { type ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

export const Sizes = {
  default: {
    classes: 'py-2 px-4'
  },
  md: {
    classes: 'px-3 py-1'
  },
  sm: {
    classes: 'py-1 px-2'
  }
} as const

export const Variant = {
  default: {
    classes: 'bg-black text-yellow-500',
    disabled: 'bg-black text-yellow-500/50',
    hover: 'hover:bg-black/80 outline-none'
  },
  outlined: {
    classes: 'bg-transparent border border-black text-black',
    disabled: 'bg-transparent border border-black/50 text-black/50',
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
        'rounded-md',
        { 'w-full rounded-md': fullWidth },
        props.className,
        props.disabled ? Variant[variant].disabled : Variant[variant].classes,
        Variant[variant].hover,
        Sizes[size].classes
      ])}
    >
      {children}
    </button>
  )
}
export default Button
