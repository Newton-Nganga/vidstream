import { randomBytes } from 'crypto'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vidstream',
  description: 'Get Movies and Shows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
   const nounce = randomBytes(128).toString('base64')
  return (
    <html lang="en">
      <meta httpEquiv="Content-Security-Policy" content="frame-src https://www.youtube.com;"/>
      <meta httpEquiv="Content-Security-Policy" content={`default-src 'self';'nonce-${nounce}' frame-src 'self' https://www.youtube.com/ https://www.multiembed.mov/ https://www.2embed.cc;`}/>
      <body className={inter.className} suppressHydrationWarning={true} >{children}</body>
    </html>
  )
}
