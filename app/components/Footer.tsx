import { Media, Partners } from './social'

export const Footer = () => {
  return (
    <footer className='flex justify-between max-lg:flex-col max-lg:space-y-8 lg:space-x-8'>
      <div className='flex max-lg:justify-center'>
        <Media />
      </div>
      <Partners />
    </footer>
  )
}

export default Footer
