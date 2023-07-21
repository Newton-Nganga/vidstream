/** @type {import('next').NextConfig} */

const nextConfig = {
    env:{
        BASE_ENDPOINT:"https://api.themoviedb.org/3/",
        API_AUTHORIZATION_TOKEN:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGZjMWE0YjA3Y2EzYWVhMmNmODY5ZGRlZGMwOTBjNyIsInN1YiI6IjY0Yjk5NTNmMTEzODZjMDEwYzE4MmU3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n64MkwcoV6EAm-aDu9YzOzf7twtBmfKOPTzivUi9Ikc"
    }
}

module.exports = nextConfig
