import Image from 'next/image'
import Link from 'next/link'

export const Greatings = () => {
  const [asset1, asset2, asset3, asset4] = [
    '/assets/collection/4761.png',
    '/assets/collection/5002.png',
    '/assets/collection/6981.png',
    '/assets/collection/9491.png'
  ]

  return (
    <Link
      href='https://opensea.io/collection/cryptorastas-collection'
      className='relative h-72 w-80'
      target='_blank'
    >
      <Image
        priority
        alt={`CryptoRastas Collection Token 4761`}
        src={asset1}
        width={85}
        height={100}
        className='absolute left-24 top-12 z-[1] rounded-2xl border-4 border-yellow-400 shadow-lg blur transition-all duration-700 hover:scale-105'
      />
      <Image
        priority
        alt={`CryptoRastas Collection Token 5002`}
        src={asset2}
        width={115}
        height={130}
        className='absolute left-8 top-24 z-[3] rotate-[-5deg] rounded-2xl border-4 border-yellow-400 shadow-lg transition-all duration-700 hover:scale-105'
      />
      <Image
        priority
        alt={`CryptoRastas Collection Token 6981`}
        src={asset3}
        width={150}
        height={165}
        className='absolute bottom-16 right-6 z-[2] rotate-[5deg] rounded-2xl border-4 border-yellow-400 shadow-lg transition-all duration-700 hover:scale-105'
      />
      <Image
        priority
        alt={`CryptoRastas Collection Token 9491`}
        src={asset4}
        width={85}
        height={100}
        className='absolute bottom-4 left-32 z-[4] rotate-[15deg] rounded-2xl border-4 border-yellow-400 shadow-lg transition-all duration-700 hover:scale-105'
      />
    </Link>
  )
}

export default Greatings
