import classNames from 'classnames'
import { HTMLProps } from 'react'

export type StepProps = HTMLProps<HTMLDivElement>

export const Step = ({ children, className, ...props }: StepProps) => {
  return (
    <div {...props} className={classNames(className, 'flex space-x-8')}>
      <div className='flex flex-col'>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
      <div>{children}</div>
    </div>
  )
}
