const { randomBytes } = require('crypto')

/** @type {import('next').NextConfig} */
const nounce = randomBytes(128).toString('base64')
const nextConfig = {
  async headers(){
     return [
      { source: '/movie/:id*', headers: [{ 
        key: "Content-Security-Policy",
        value:`default-src 'self; script-src 'self' 'unsafe-inline' 'nonce-${nounce}' https://www.youtube.com/ https://www.multiembed.mov/ https://www.2embed.cc; frame-src https://www.youtube.com/ https://www.multiembed.mov/ https://www.2embed.cc; style-src 'self' 'unsafe-inline';`
      }]}
     ]
  },
    env:{
        BASE_ENDPOINT:"https://api.themoviedb.org/3/",
        API_AUTHORIZATION_TOKEN:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGZjMWE0YjA3Y2EzYWVhMmNmODY5ZGRlZGMwOTBjNyIsInN1YiI6IjY0Yjk5NTNmMTEzODZjMDEwYzE4MmU3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n64MkwcoV6EAm-aDu9YzOzf7twtBmfKOPTzivUi9Ikc",
        API_KEY:"Bearer 14fc1a4b07ca3aea2cf869ddedc090c7"
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            port: '',
            pathname: '/t/p/original/**',
          },
          {
            protocol: 'https',
            hostname: 'fontawesome.com',
            port: '',
            pathname: '/social/film/**',
          },{
            protocol:'https',
            hostname:"m.media-amazon.com",
            port:'',
            pathname:'/images/**'
          }
        ],
      },
}

module.exports = nextConfig
