import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import {BrowserRouter} from  "react-router-dom"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Pages from "./PageRoutes/Pages.tsx";



//uri: 'https://vidstream-server.onrender.com/vidstream-server/graphql',
const client = new ApolloClient({
  uri: import.meta.env.VITE_MOVIES_SERVER_URL || "http://localhost:4000/vidstream-server/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <ApolloProvider client={client}>
     <BrowserRouter>
    
        <Pages />
        
      </BrowserRouter>
      </ApolloProvider>
  </React.StrictMode>
);
