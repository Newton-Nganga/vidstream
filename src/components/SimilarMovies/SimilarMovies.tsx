
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import { gql,useQuery } from "@apollo/client";

type Props = {
  id: number | null;
};

const GET_SIMILAR_MOVIES = gql`
  query GetSimilarMovies($similarMoviesId: Int!) {
    similarMovies(id: $similarMoviesId) {
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

export default  function SimilarMovies({ id }: Props) {

   const {loading,error,data} = useQuery(GET_SIMILAR_MOVIES,{variables:{ similarMoviesId: id }})
 if(loading){
    return <p>Loading ...</p>
 }
 if(error){
    return <p>Error : {error.message}</p>
 }

  return <MoviesCarousel title={"Similar Movies"} movies={data.similarMovies} />;
}
