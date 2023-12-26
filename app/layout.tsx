'use client'

import './globals.css'
import { type ReactNode } from 'react'
import { Inter } from 'next/font/google'
import classNames from 'classnames'
import Providers from './Providers'

const font = Inter({ subsets: ['latin'], preload: true })

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang={'en'}>
      <body className={classNames(font.className, 'bg-yellow-500 text-black')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
