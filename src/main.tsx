import React from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Pages from './PageRoutes/Pages.tsx';

//uri: 'https://vidstream-server.onrender.com/vidstream-server/graphql',
const client = new ApolloClient({
  uri: 'http://localhost:4000/vidstream-server/graphql',
  cache: new InMemoryCache(),
});

// client.query({ 
//   query: gql`
//     query {
//       __typename
//     }
//   `
// })
// .then(res => console.log(res)) 
// .catch(err => console.log(err))

// client.query({
//   query:gql`
//   query GetFeaturedMovieTry {
//     featuredMovie {
//       id
//       media_type
//       backdrop_path
//       poster_path
//     }
//  }`
// }).then(
//   res => console.log("fetched data:-->", res.data.featuredMovie)
// )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Pages />
    </ApolloProvider>
  </React.StrictMode>,
)
