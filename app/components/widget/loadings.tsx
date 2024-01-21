import { LoadingSkeleton } from '@/app/components/loading'

export const WidgetLoading = () => (
  <div className='flex w-full flex-col items-start justify-center space-y-8'>
    <LoadingSkeleton className='h-8 w-1/3' />
    <LoadingSkeleton className='h-16 w-3/4' />
    <LoadingSkeleton className='h-32 w-full' />
    <LoadingSkeleton className='h-6 w-1/4' />
  </div>
)
