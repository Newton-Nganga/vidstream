
import { getClient } from "@/app/lib/client";
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import { gql, useQuery } from "@apollo/client";
import { MovieType } from "../UsefulTypes";
type Props ={
  id:number
}
const GET_SUGGESTED_MOVIES=gql`
query GetSuggestedMovies($suggestedMoviesId: Int!) {
  recommendedMovies(id: $suggestedMoviesId) {
    name
    id
    original_name
    overview
    poster_path
    backdrop_path
    details {
      genres {
        name
      }
      media_type
      number_of_seasons
    }
  }
}`

interface Response{
  recommendedMovies:MovieType[]
}
export default async function SuggestedMovies({id}:Props) {
  //fetch using the getClient method @SSR components
  const {data:{recommendedMovies}} = await getClient().query<Response>({query:GET_SUGGESTED_MOVIES,variables:{suggestedMoviesId:id}})

  return (
    <MoviesCarousel title={"Suggested Movies For You"} movies={recommendedMovies} />
  );
}
