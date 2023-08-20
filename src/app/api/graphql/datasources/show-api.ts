import {RESTDataSource} from "@apollo/datasource-rest"
import {ShowModel,TrailerModel,CastAndCrewModel,ShowDetailsModel,SeasonModel} from "../models"

type result={
    page:Number
    results:[ShowModel]
    total_pages:Number
    total_results:Number
 }
 type trailerResult={
    id:number
    results:TrailerModel[]
 }
export class ShowAPI extends RESTDataSource{
    baseURL = "https://api.themoviedb.org/3/"
    appendApiKey="?api_key=14fc1a4b07ca3aea2cf869ddedc090c7"
   
   //resolve the queries
   async getSpecificShow(id:number){
    return await this.get<ShowModel>(`tv/${id}${this.appendApiKey}`)
   }
   async getTrendingShows(){
    const trendingShows = await this.get<result>(`trending/tv/day${this.appendApiKey}&language=en-US`)
    const trending_shows = trendingShows.results.map(({media_type,...rest}) => ({media_type:"tv",...rest}))
    return  trending_shows
   }
   async getMysteries(){
     const result = await this.get<result>(`discover/tv${this.appendApiKey}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=9648`)
     const mysteries = result.results.map(({media_type,...rest}) => ({media_type:"tv",...rest}))
     return mysteries
   }
   async getGenreShows(genre:number){
      const results = await this.get<result>(`discover/tv${this.appendApiKey}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`)
      const genreShows =  results.results.map(({media_type,...rest}) => ({media_type:"tv",...rest}))
      return genreShows
    }
   async getPopularShows(){
      const popular=await this.get<result>(`tv/popular${this.appendApiKey}`)
      const popular_shows= popular.results.map(({media_type,...rest}) => ({media_type:"tv",...rest}))
      return popular_shows
   }
  
   async getTopShows(){
      const topShows = await this.get<result>(`tv/top_rated${this.appendApiKey}`)
      const top_ratedShows = topShows.results.map(({media_type,...rest}) => ({media_type:"tv",...rest}))
      return top_ratedShows
   }
   
  async getUpcomingShows(){
   const upcomingShows = await this.get<result>(`tv/upcoming${this.appendApiKey}`)
   const upcoming_shows = upcomingShows.results.map(({media_type,...rest}) => ({media_type:"tv",...rest}))
   return upcoming_shows
  }

  async getSimilarShows(id:number){
   const similar = await this.get<result>(`tv/${id}/similar${this.appendApiKey}`)
   const similar_shows = similar.results.map(({media_type,...rest}) => ({media_type:"tv",...rest}))
   return similar_shows
  }
   
  async getRecommendedShows(id:number){
   const recommended = await this.get<result>(`tv/${id}/recommendations${this.appendApiKey}`)
   const recommended_shows = recommended.results.map(({media_type,...rest}) => ({media_type:"tv",...rest}))
   return recommended_shows
  }



   //------------------------------
   //a method to populate the details field for a specific show
   async getShowDetails(id:number){
    const details = await this.get<ShowDetailsModel>(`tv/${id}${this.appendApiKey}`)
    details.media_type = "show"
    return details
   }

   async getSeasons(id:number){
    //fetch the seasons till the number of seasons is reached
    const {number_of_seasons,...rest} = await this.get<ShowDetailsModel>(`tv/${id}${this.appendApiKey}`)
    let seasons = []
    for(let i=1;i <= number_of_seasons;i++){
       const season = await this.get<SeasonModel>(`tv/${id}/season/${i}${this.appendApiKey}`)
       season.show_id=id
       seasons.push(season)
    }
    return seasons
   }
   async getEpisodes(id:number,season_number:number){
     const response = await this.get(`tv/${id}/season/${season_number}${this.appendApiKey}`)
    return response.episodes;
  
   }
   //populates the trailers field in the show,season,episodes
    async getShowTrailer(id:number,season_number:number|null,episode_number:number|null){
    //returns episode trailer
     if(id && season_number && episode_number){
        const trailers = await this.get<trailerResult>(`tv/${id}/season/${season_number}/episode/${episode_number}/videos${this.appendApiKey}`)
        return trailers.results
     }
     //returns season trailers
     if(id && season_number && !episode_number){
        const trailers = await this.get<trailerResult>(`tv/${id}/season/${season_number}/videos${this.appendApiKey}`)
        return trailers.results
     }
     //returns show trailers
     if(id && !season_number && !episode_number){
        const trailers = await this.get<trailerResult>(`tv/${id}/videos${this.appendApiKey}`)
        return trailers.results
     }
   }
   //popultes the credits field in the show,season,episodes
   async getCredits(id:number,season_number:number|null,episode_number:number|null){
    //returns episode trailer
    if(id && season_number && episode_number){
        return await this.get<CastAndCrewModel[]>(`tv/${id}/season/${season_number}/episode/${episode_number}/credits${this.appendApiKey}`)
     }
     //returns season trailers
     if(id && season_number && !episode_number){
        return await this.get<CastAndCrewModel[]>(`tv/${id}/season/${season_number}/credits${this.appendApiKey}`)
     }
     //returns show trailers
     if(!season_number && !episode_number){
        return await this.get<CastAndCrewModel[]>(`tv/${id}/credits${this.appendApiKey}`)
     }
   }
}