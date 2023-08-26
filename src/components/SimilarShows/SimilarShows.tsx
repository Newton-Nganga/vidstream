
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import { gql, useQuery } from "@apollo/client";

type Props = {
  id: string | undefined;
};

const GET_SIMILAR_SHOWS = gql`
  query GetSimilarShows($similarShowsID: Int) {
    similarShows(id: $similarShowsId) {
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
