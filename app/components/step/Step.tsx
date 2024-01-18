import classNames from 'classnames'
import { HTMLProps } from 'react'
import { Button } from '@/app/components/button'

export type StepProps = HTMLProps<HTMLDivElement>

export const Step = ({ children, className, ...props }: StepProps) => {
  return (
    <div>
      <div {...props} className={classNames(className, 'flex space-x-8')}>
        <div className='flex flex-col'>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>
        <div className='flex flex-col space-y-8'>
          <div>{children}</div>
          <div className='flex'>
            <div>
              <Button>Continue</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
