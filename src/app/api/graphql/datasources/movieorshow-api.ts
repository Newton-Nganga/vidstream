import {RESTDataSource} from "@apollo/datasource-rest"
import { MovieModel, ShowModel } from "../models"

type queryResult={
    page:number
    results:[MovieModel|ShowModel]
    total_pages:number
    total_results:number
}
export class MovieOrShowAPI extends RESTDataSource{
    baseURL = "https://api.themoviedb.org/3/"
    appendApiKey="?api_key=14fc1a4b07ca3aea2cf869ddedc090c7&include_adult=true&language=en-US&page=1"

   //fetch trending this day
   async getTrending(){
    const response = await this.get<queryResult>(`trending/all/day${this.appendApiKey}`)
    const moviesAndShows = response.results.filter(all => all.media_type === "movie" || "tv")
    const movies = moviesAndShows.filter(all => all.media_type === "movie")
    const shows = moviesAndShows.filter(all =>all.media_type === "tv")
    return {movies,shows}
   }

    
}
