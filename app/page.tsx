import appConfig from '@/app.config'
import { Metadata } from 'next'
import { Header } from '@/app/components'
import { Bridge } from '@/app/components/bridge'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${appConfig.name}`,
    description: appConfig.meta.description
  }
}

export function generateStaticParams() {}

const Homepage = () => {
  return (
    <>
      <Header />
      <main className='flex flex-1 flex-col items-center justify-center container'>
        <Bridge />
      </main>
    </>
  )
}

export default Homepage
