import {ApolloServer} from "@apollo/server"
import {startServerAndCreateNextHandler} from "@as-integrations/next"
import { NextRequest } from "next/server"
import { cache } from "react"
import { typeDefs } from "./Schema"
import { resolvers } from "./Resolvers"
import { MovieAPI } from "./datasources/movie-api.ts"
import {ShowAPI} from "./datasources/show-api"
import { SearchAPI } from "./datasources/search-api"
import { MovieOrShowAPI } from "./datasources/movieorshow-api"

const server = new ApolloServer({
    typeDefs,resolvers
})
//eslint-disable-next-line
const handler = startServerAndCreateNextHandler<NextRequest>(server,{
  context: async () => {
    //Add shared data to the context object
    //like dataSources,databaseConnection,authentication,tokens e.t.c
    return {
      dataSources: {
        movieAPI:new MovieAPI(),
        showAPI:new ShowAPI(),
        searchAPI:new SearchAPI(),
        movieOrShowAPI:new MovieOrShowAPI()
      },
    };
  },
})



export { handler as GET, handler as POST };
// export async function GET(request: NextRequest) {
//   return handler(request);
// }
// export async function POST(request: NextRequest) {
//   return handler(request);
// }