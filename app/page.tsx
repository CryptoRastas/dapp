import appConfig from '@/app.config'
import { Metadata } from 'next'
import { Header } from '@/app/components'

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
      <main className='container'>...</main>
    </>
  )
}

export default Homepage
