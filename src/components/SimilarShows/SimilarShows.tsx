
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import { gql, useQuery } from "@apollo/client";

type Props = {
  id: number |null
};

const GET_SIMILAR_SHOWS = gql`
  query GetSimilarShows($similarShowsId: Int!) {
    similarShows(id: $similarShowsId) {
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

export default  function SimilarShows({ id }: Props) {
  const {loading,error,data} = useQuery(GET_SIMILAR_SHOWS,{variables:{ similarShowsId: id }})
 if(loading){
    return <p>Loading ...</p>
 }
 if(error){
    return <p>Error : {error.message}</p>
 }
  

  return <MoviesCarousel title={"Similar Shows"} movies={data.similarShows} />;
}
