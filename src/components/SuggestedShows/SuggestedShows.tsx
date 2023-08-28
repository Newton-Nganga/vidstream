
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import { gql, useQuery } from "@apollo/client";

type Props = {
 id: number |null
};
const GET_SUGGESTED_SHOWS = gql`
  query GetSuggestedShows($suggestedShowsId: Int!) {
    recommendedShows(id: $suggestedShowsId) {
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



export default function SuggestedShows({ id }: Props) {
  const {loading,error,data} = useQuery(GET_SUGGESTED_SHOWS,{variables:{ suggestedShowsId: id }})
 if(loading){
    return <p>Loading ...</p>
 }
 if(error){
    return <p>Error : {error.message}</p>
 }

  return (
    <MoviesCarousel
      title={"Suggested Shows For You"}
      movies={data.recommendedShows}
    />
  );
}
