import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";

type Props={}
const GET_POPULAR_MOVIES=gql`
query GetPopularMovies{
    popularMovies{
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
`
export default function PopularMovies({}: Props) {
    const {loading,error,data} = useQuery(GET_POPULAR_MOVIES)
    return <MoviesCarousel title={"Popular Movies"} movies={data} />;
}