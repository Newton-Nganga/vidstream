/** @type {import('next').NextConfig} */

const nextConfig = {
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
        ],
      },
}

module.exports = nextConfig
