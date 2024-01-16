import appConfig from '@/app.config'
import { Metadata } from 'next'
import { Header } from '@/app/components/Header'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${appConfig.name} - Bridge`,
    description: appConfig.meta.description
  }
}

const Homepage = () => {
  return (
    <>
      <Header />
      <main className='flex flex-1 flex-col items-center justify-center container'>
        #
      </main>
    </>
  )
}

export default Homepage
