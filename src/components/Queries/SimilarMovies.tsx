
import { getClient } from "@/app/lib/client";
import { MovieType } from "../UsefulTypes";
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import {gql} from '@apollo/client';

type Props={
  id:number
}

const GET_SIMILAR_MOVIES=gql`
query GetSimilarMovies($similarMoviesID:Int){
  similarMovies(id: $similarMoviesId) {
    backdrop_path
    details {
      genres {
        name
      }
      runtime
    }
    id
    media_type
    overview
    original_title
    poster_path
    title
    vote_average
    vote_count
  }
}`
interface Response{
  similarMovies:MovieType[]
}
export default async function SimilarMovies({id }:Props) {
  
  const {data:{similarMovies}} = await getClient().query<Response>({query:GET_SIMILAR_MOVIES,variables:{similarMoviesId:id}})

  return <MoviesCarousel title={"Similar Movies"} movies={similarMovies} />;
}
