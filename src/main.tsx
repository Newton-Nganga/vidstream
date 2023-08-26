import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Pages from './PageRoutes/Pages.tsx';

const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Pages />
    </ApolloProvider>
  </React.StrictMode>,
)
