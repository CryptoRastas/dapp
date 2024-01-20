import classNames from 'classnames'
import { Children, HTMLProps, ReactNode } from 'react'
import { useStep } from 'usehooks-ts'

export type ChildrenProps = {
  nextStep(): void
  prevStep(): void
  currentStep: number
}

export type StepProps = Omit<HTMLProps<HTMLDivElement>, 'children'> & {
  step?: number
  children: (props: ChildrenProps) => ReactNode
}

export const Step = ({
  children,
  className,
  step = 1,
  ...props
}: StepProps) => {
  const stepsBar = Array.from({ length: 3 }, (_, i) => i + 1)

  const [currentStep, { goToNextStep, goToPrevStep }] = useStep(step)

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
      {children({
        nextStep: goToNextStep,
        prevStep: goToPrevStep,
        currentStep
      })}
    </div>
  )
}
