import './globals.css'
import { type ReactNode } from 'react'
import { Inter } from 'next/font/google'
import classNames from 'classnames'
import Providers from './Providers'

const font = Inter({ subsets: ['latin'], preload: true })

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang={'en'} className='h-screen'>
      <body
        className={classNames(
          font.className,
          'flex h-full flex-col bg-[#0ee37d] text-black'
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
