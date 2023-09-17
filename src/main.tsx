import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Pages from "./PageRoutes/Pages.tsx";
import { ClerkProvider } from "@clerk/clerk-react";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing publishable key");
}

const clerkPublicKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
//uri: 'https://vidstream-server.onrender.com/vidstream-server/graphql',
const client = new ApolloClient({
  uri: "http://localhost:4000/vidstream-server/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <ClerkProvider publishableKey={clerkPublicKey}> */}
      <ApolloProvider client={client}>
        <Pages />
      </ApolloProvider>
    {/* </ClerkProvider> */}
  </React.StrictMode>
);
