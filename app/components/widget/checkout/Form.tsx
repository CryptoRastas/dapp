import { useFormContext } from 'react-hook-form'

import { ReactNode } from 'react'

export type FormData = {
  tokenIds: string
  destinationChainId: number
}

export type FormProps = {
  onSubmit: (data: FormData) => void
  children: ReactNode
}

export const Form = ({ onSubmit, children }: FormProps) => {
  const { handleSubmit } = useFormContext<FormData>()

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))} noValidate>
      {children}
    </form>
  )
}

export default Form
