
import {RESTDataSource} from "@apollo/datasource-rest"
import { MovieModel, ShowModel } from "../models"

type queryResult={
    page:number
    results:[MovieModel|ShowModel]
    total_pages:number
    total_results:number
}
export class SearchAPI extends RESTDataSource{
    baseURL = process.env.MOVIES_BASE_URL
    appendApiKey=`?api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=1`

   async queryMoviesOrShows(query:string){
    const response = await this.get<queryResult>(`search/multi?query=${query}${this.appendApiKey}`)
    const movies = response.results.filter((all) => all.media_type === 'movie')
    const shows = response.results.filter((all) => all.media_type === 'tv')
    return  [...movies,...shows]
   }
    
}
