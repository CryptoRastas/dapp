import classNames from 'classnames'
import { Children, HTMLProps } from 'react'
import { Text } from '@/app/components/typography'

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
  /// create new step array filled by integers from 1 not zero
  const stepsBar = Array.from({ length: steps }, (_, i) => i + 1)

  return (
    <div {...props} className={classNames(className, 'flex space-x-8')}>
      <div className='flex flex-col'>
        {Children.toArray(
          stepsBar.map((step) => (
            <div
              className={step === currentStep ? 'font-extrabold' : 'font-bold'}
            >
              <div
                className={classNames(
                  'flex h-7 w-7 items-center justify-center rounded-full border-4 border-black',
                  {
                    'bg-black text-yellow-400': step <= currentStep
                  }
                )}
              >
                <Text size='sm'>{step}</Text>
              </div>
              {step < stepsBar.length && (
                <div className='flex items-center justify-center'>
                  <div className='h-16 w-1 bg-black' />
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {children}
    </div>
  )
}
