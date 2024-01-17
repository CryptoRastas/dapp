import Image from 'next/image'

export const Greatings = () => {
  const [asset1, asset2, asset3, asset4] = [
    '/assets/collection/4761.png',
    '/assets/collection/5002.png',
    '/assets/collection/6981.png',
    '/assets/collection/9491.png'
  ]

  return (
    <div className='relative h-72 w-80'>
      <Image
        alt={`collection token`}
        src={asset1}
        width={85}
        height={100}
        className='absolute  left-24 top-12 z-[1] rounded-2xl border-4 border-yellow-400 shadow-lg blur'
      />
      <Image
        alt={`collection token`}
        src={asset2}
        width={115}
        height={130}
        className='absolute left-8 top-24 z-[3] rotate-[-5deg] rounded-2xl border-4 border-yellow-400 shadow-lg'
      />
      <Image
        alt={`collection token`}
        src={asset3}
        width={150}
        height={165}
        className='absolute bottom-16 right-6 z-[2] rotate-[5deg] rounded-2xl border-4 border-yellow-400 shadow-lg'
      />
      <Image
        alt={`collection token`}
        src={asset4}
        width={85}
        height={100}
        className='absolute bottom-4 left-32 z-[4] rotate-[15deg] rounded-2xl border-4 border-yellow-400 shadow-lg blur-[0.2rem]'
      />
    </div>
  )
}

export default Greatings
