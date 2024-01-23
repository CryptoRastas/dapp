import appConfig from '@/app.config'
import { Metadata } from 'next'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { PageContainer } from './components/PageContainer'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${appConfig.name} - Bridge`,
    description: appConfig.meta.description
  }
}

const Homepage = () => (
  <>
    <Header />
    <PageContainer />
    <Footer className='pb-32 container' />
  </>
)

export default Homepage
