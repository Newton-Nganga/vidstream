import { useQuery,gql } from "@apollo/client";
import MoviesCarousel from "@/components/movieCarouselItems/MoviesCarousel";



const GET_TV_MYSTERIES = gql`
  query tvMysteries {
    tvMysteries {
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


export default  function TvMysteries() {

 const {loading,error,data} = useQuery(GET_TV_MYSTERIES)
 if(loading){
    return <p>Loading ...</p>
 }
 if(error){
    return <p>Error : {error.message}</p>
 }
  return <MoviesCarousel title={"Tv Mysteries"} movies={data.tvMysteries} />;
}
