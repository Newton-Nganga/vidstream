import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";

type Props={}
const GET_TOP_SHOWS=gql`
query GetTopShows{
    topShows{
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
`
export default function TopRatedShows({}: Props) {
    const {loading,error,data} = useQuery(GET_TOP_SHOWS)
    return <MoviesCarousel title={"Top Shows"} movies={data} />;
}