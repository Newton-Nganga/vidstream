import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"
import { typeDefs } from "./Schema"
import { resolvers } from "./Resolvers"
import { MovieAPI } from "./datasources/movie-api"
import {ShowAPI} from "./datasources/show-api"
import { SearchAPI } from "./datasources/search-api"
import { MovieOrShowAPI } from "./datasources/movieorshow-api"


const PORT = process.env.PORT || 4000 
//eslint-disable-next-line


async function startApolloServer(){
  const server = new ApolloServer({
    typeDefs,resolvers
  });

  const { url } = await startStandaloneServer(server, {
  listen: { port:4000 } ,
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
    
  },
  })
  console.log(`[Server]:Server listening at ${url}`)
}

startApolloServer()




