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
  return (
    <html lang="en">
      {/* <meta httpEquiv="Content-Security-Policy"
      content="default-src 'self'; img-src https://*; child-src 'none'; frame-src youtube.com https://www.youtube.com;"></meta> */}
      <meta httpEquiv="Content-Security-Policy" content="frame-src https://www.youtube.com;"/>
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; frame-src 'self' www.youtube.com www.2embed.cc;"/>
      <body className={inter.className} suppressHydrationWarning={true} >{children}</body>
    </html>
  )
}
