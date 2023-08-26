
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import { gql,useQuery } from "@apollo/client";

type Props = {
  id: string | undefined;
};

const GET_SIMILAR_MOVIES = gql`
  query GetSimilarMovies($similarMoviesID: Int) {
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
