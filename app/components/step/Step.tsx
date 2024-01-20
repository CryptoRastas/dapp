import classNames from 'classnames'
import { Children, HTMLProps } from 'react'

export type ChildrenProps = {
  nextStep(): void
  prevStep(): void
  currentStep: number
}

export type StepProps = HTMLProps<HTMLDivElement> & {
  steps?: number
  currentStep?: number
}

export const Step = ({
  children,
  className,
  currentStep = 1,
  steps = 1,
  ...props
}: StepProps) => {
  const stepsBar = Array.from({ length: steps }, (_, i) => i + 1)

  return (
    <div {...props} className={classNames(className, 'flex space-x-8')}>
      <div className='flex flex-col'>
        {Children.toArray(
          stepsBar.map((step) => (
            <div className={step === currentStep ? 'font-bold' : ''}>
              {step}
            </div>
          ))
        )}
      </div>
      {children}
    </div>
  )
}
