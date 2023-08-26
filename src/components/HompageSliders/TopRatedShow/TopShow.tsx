import { useQuery,gql } from "@apollo/client";
import MoviesCarousel from "@/components/movieCarouselItems/MoviesCarousel";


const GET_TOP_SHOWS = gql`
  query GetTopShows {
    topShows {
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


export default  function TopRatedShows() {

 const {loading,error,data} = useQuery(GET_TOP_SHOWS)
 if(loading){
    return <p>Loading ...</p>
 }
 if(error){
    return <p>Error : {error.message}</p>
 }
  return <MoviesCarousel title={"Top Shows"} movies={data.topShows} />;
}
