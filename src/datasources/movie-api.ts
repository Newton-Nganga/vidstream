import { MovieDetailsModel, TrailerModel, CastAndCrewModel, MovieModel  } from '../models';
import {RESTDataSource} from "@apollo/datasource-rest"
type result={
   page:Number
   results:[MovieModel]
   total_pages:Number
   total_results:Number
}
type trailerResult={
   id:number
   results:TrailerModel[]
}
export class MovieAPI extends RESTDataSource{
   baseURL = "https://api.themoviedb.org/3/"
   appendApiKey="?api_key=14fc1a4b07ca3aea2cf869ddedc090c7&adult=true"
   //resolve the queries

   async getSpecificMovie(id:number){
      const movie= await this.get<MovieModel>(`movie/${id}${this.appendApiKey}`)
      movie.media_type="movie"
      return movie
   }
  async getGenreMovies(genre:number){
    const results = await this.get<result>(`discover/movie${this.appendApiKey}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`)
    const genreMovies =  results.results.map(({media_type,...rest})=>({media_type:"movie",...rest}))
    return genreMovies
  }
   async getFeaturedMovie(){
      const featuredMovies= await this.get<result>(`movie/now_playing${this.appendApiKey}`)
      const featured = featuredMovies.results[0]
      featured.media_type = "movie"
      return featured
   }
   async getTrendingMovies(){
    const trendingMovies = await this.get<result>(`trending/movie/day${this.appendApiKey}&language=en-US`)
    const trending_movies = trendingMovies.results.map(({media_type,...rest}) => ({media_type:"movie",...rest}))
    return trending_movies
   }
   async getPopularMovies(){
      const popular=await this.get<result>(`movie/popular${this.appendApiKey}`)
      const popular_movies= popular.results.map(({media_type,...rest}) => ({media_type:"movie",...rest}))
      return popular_movies
   }
  
   async getTopMovies(){
      const topMovies = await this.get<result>(`movie/popular${this.appendApiKey}`)
      const top_ratedMovies = topMovies.results.map(({media_type,...rest}) => ({media_type:"movie",...rest}))
      return top_ratedMovies
   }
   
  async getUpcomingMovies(){
   const upcomingMovies = await this.get<result>(`movie/upcoming${this.appendApiKey}`)
   const upcoming_Movies = upcomingMovies.results.map(({media_type,...rest}) => ({media_type:"movie",...rest}))
   return upcoming_Movies
  }



  async getSimilarMovies(id:number){
   const similar = await this.get<result>(`movie/${id}/similar${this.appendApiKey}`)
   const similar_movies = similar.results.map(({media_type,...rest}) => ({media_type:"movie",...rest}))
   return similar_movies
  }
   
  async getRecommendedMovies(id:number){
   const recommended = await this.get<result>(`movie/${id}/recommendations${this.appendApiKey}`)
   const recommended_movies = recommended.results.map(({media_type,...rest}) => ({media_type:"movie",...rest}))
   return recommended_movies
  }





  //---------------------------------------------------------
   //The fields in the movie object that need to be populated
  async getMovieTrailer(id:number){
   try{
    const trailers = await this.get<trailerResult>(`movie/${id}/videos${this.appendApiKey}`)
    return trailers.results
   }catch(err){
      return err
   }
   
   }
   async getMovieDetails(id:number){
   try{
    const details = await this.get<MovieDetailsModel[]>(`movie/${id}${this.appendApiKey}`)
    return details
   }catch(err){
      return err
   }
   }
   async getCredit(media_type:String,id:number){
    try{
    const credit = await this.get<CastAndCrewModel>(`${media_type}/${id}/credits${this.appendApiKey}`)
    //console.log(credit)
    return credit
   }catch(err){
      return err
   }
   }
}