import { useQuery,gql } from "@apollo/client";
import MoviesCarousel from "@/components/movieCarouselItems/MoviesCarousel";



const GET_UPCOMING_MOVIES = gql`
  query GetUpcomingMovies {
    upcomingMovies {
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


export default  function UpcomingMovies() {

 const {loading,error,data} = useQuery(GET_UPCOMING_MOVIES)
 if(loading){
    return <p>Loading ...</p>
 }
 if(error){
    return <p>Error : {error.message}</p>
 }
  return <MoviesCarousel title={"Popular Movies"} movies={data.upcomingMovies} />;
}
