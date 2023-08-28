
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import { gql, useQuery } from "@apollo/client";

type Props = {
  id: number | null;
};
const GET_SUGGESTED_MOVIES = gql`
  query GetSuggestedMovies($suggestedMoviesId: Int!) {
    recommendedMovies(id: $suggestedMoviesId) {
      id
      media_type
      original_title
      overview
      poster_path
      title
      vote_average
      vote_count
      backdrop_path
      details {
        runtime
        genres {
          name
        }
      }
  }
  }
`;


export default function SuggestedMovies({ id }: Props) {
  //fetch using the getClient method @SSR components
  const {loading,error,data} = useQuery(GET_SUGGESTED_MOVIES,{variables:{ suggestedMoviesId: id }})
 if(loading){
    return <p>Loading ...</p>
 }
 if(error){
    return <p>Error : {error.message}</p>
 }


  return (
    <MoviesCarousel
      title={"Suggested Movies For You"}
      movies={data.recommendedMovies}
    />
  );
}
