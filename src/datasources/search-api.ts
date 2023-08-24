
import {RESTDataSource} from "@apollo/datasource-rest"
import { MovieModel, ShowModel } from "../models"

type queryResult={
    page:number
    results:[MovieModel|ShowModel]
    total_pages:number
    total_results:number
}
export class SearchAPI extends RESTDataSource{
    baseURL = "https://api.themoviedb.org/3/"
    appendApiKey="&api_key=14fc1a4b07ca3aea2cf869ddedc090c7&include_adult=true&language=en-US&page=1"

   async queryMoviesOrShows(query:string){
    console.log("our query string:",query)
    const response = await this.get<queryResult>(`search/multi?query=${query}${this.appendApiKey}`)
    const movies = response.results.filter((all) => all.media_type === 'movie')
    const shows = response.results.filter((all) => all.media_type === 'tv')
    return  [...movies,...shows]
   }
    
}
