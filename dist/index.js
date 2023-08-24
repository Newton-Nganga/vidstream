import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import bs from 'body-parser';
import { typeDefs } from "./Schema.js";
import { resolvers } from "./Resolvers.js";
import { MovieAPI } from "./datasources/movie-api.js";
import { ShowAPI } from "./datasources/show-api.js";
import { SearchAPI } from "./datasources/search-api.js";
import { MovieOrShowAPI } from "./datasources/movieorshow-api.js";
import cors from 'cors';
const { json }= bs
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use('/vidstream-server/graphql', cors({ origin: ['https://vidstream.vercel.app', 'https://studio.apollographql.com'] }), json(), expressMiddleware(server, {
    context: async () => {
        const { cache } = server;
        return {
            dataSources: {
                movieAPI: new MovieAPI({ cache }),
                showAPI: new ShowAPI({ cache }),
                searchAPI: new SearchAPI({ cache }),
                movieOrShowAPI: new MovieOrShowAPI({ cache })
            },
        };
    }
}));
await new Promise((resolve) => httpServer.listen({ port: 3000 }, resolve));
console.log(`🚀 Server ready at http://localhost:3000/vidstream-server/graphql`);
