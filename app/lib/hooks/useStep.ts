import { useStep as useStepLib } from 'usehooks-ts'

export type UseStepProps = {
  step?: number
}

export const useStep = ({ step = 1 }: UseStepProps) => {
  const [currentStep, { goToNextStep, goToPrevStep, reset }] = useStepLib(step)

  return {
    currentStep,
    nextStep: goToNextStep,
    prevStep: goToPrevStep,
    reset
  }
}
