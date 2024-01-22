import { useStep as useStepLib } from 'usehooks-ts'

export type UseStepProps = {
  steps?: number
}

export const useStep = ({ steps = 1 }: UseStepProps) => {
  const [currentStep, { goToNextStep, goToPrevStep, reset }] = useStepLib(steps)

  return {
    currentStep,
    nextStep: goToNextStep,
    prevStep: goToPrevStep,
    reset
  }
}
