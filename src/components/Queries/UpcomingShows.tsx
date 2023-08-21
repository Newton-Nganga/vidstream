import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";

type Props={}
const GET_UPCOMING_SHOWS=gql`
query GetUpcomingShows{
    upcomingShows{
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
export default function UpcomingShows({}: Props) {
    const {loading,error,data} = useQuery(GET_UPCOMING_SHOWS)
    return <MoviesCarousel title={"Popular Movies"} movies={data} />;
}
