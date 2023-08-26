
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import { gql, useQuery } from "@apollo/client";

type Props = {
  id: string | undefined;
};
const GET_SUGGESTED_MOVIES = gql`
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
