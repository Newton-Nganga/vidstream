import { randomBytes } from 'crypto'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/api",
  cache: new InMemoryCache(),
});

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
   const nonce = randomBytes(128).toString('base64')
  return (
    <html lang="en">
      <meta httpEquiv={`Content-Security-Policy" content="object-src 'none';base-uri 'none';script-src 'self' 'unsafe-eval' 'unsafe-inline' frame-src https://www.youtube.com https://www.multiembed.mov/ https://www.2embed.cc; htps: http: 'nonce-${nonce}' 'strict-dynamic'`}/>
     <ApolloProvider client={client}>
      <body className={inter.className} suppressHydrationWarning={true} >{children}</body>
     </ApolloProvider>
    </html>
  )
}
