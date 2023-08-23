import { randomBytes } from 'crypto'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from './lib/apollo-provider'

// Make the slider styles accessible 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ['latin'] })

//The Aplications metadata
export const metadata: Metadata = {
  title: 'Vidstream',
  description: 'Get Movies and Shows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
   const nonce = randomBytes(128).toString('base64')
  return (
    <html lang="en">
      <meta httpEquiv={`Content-Security-Policy" content="object-src 'none';base-uri 'none';script-src 'self' 'unsafe-eval' 'unsafe-inline' frame-src https://www.youtube.com https://www.multiembed.mov/ https://www.2embed.cc; htps: http: 'nonce-${nonce}' 'strict-dynamic'`}/>
     
      <body className={inter.className} suppressHydrationWarning={true} >
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
     
    </html>
  )
}
