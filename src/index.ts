import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import { json } from 'body-parser';
import { typeDefs } from "./Schema"
import { resolvers } from "./Resolvers"
import { MovieAPI } from "./datasources/movie-api"
import {ShowAPI} from "./datasources/show-api"
import { SearchAPI } from "./datasources/search-api"
import { MovieOrShowAPI } from "./datasources/movieorshow-api"
import cors from 'cors';
require('dotenv').config()
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/vidstream-server/graphql',
  cors<cors.CorsRequest>({ origin: ['https://vidstream.vercel.app', 'https://studio.apollographql.com','http://localhost:5173','*'] }),
  json(),
  expressMiddleware(server,{
    context: async () => {
        const { cache } = server;
        return{
          dataSources: {
          movieAPI:new MovieAPI({cache}),
          showAPI:new ShowAPI({cache}),
          searchAPI:new SearchAPI({cache}),
          movieOrShowAPI:new MovieOrShowAPI({cache})
        },
        }
      }
  }),
);
const PORT = process.env.PORT || 4000

await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at :${PORT}/vidstream-server/graphql`);