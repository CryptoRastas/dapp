import { LoadingSkeleton } from '@/app/components/loading'

export const Loading = () => {
  return (
    <div className='flex w-3/5 flex-col space-y-4'>
      <LoadingSkeleton className='h-4 w-1/2' />
      <LoadingSkeleton className='h-12 w-full' />
      <div className='flex space-x-4'>
        <LoadingSkeleton className='h-20 w-1/3' />
        <LoadingSkeleton className='h-20 w-1/3' />
        <LoadingSkeleton className='h-20 w-1/3' />
      </div>
      <LoadingSkeleton className='h-4 w-1/3' />
    </div>
  )
}

export const Form = () => {
  return <div>form..</div>
}

export default Form
