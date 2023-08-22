"use client"
import {gql, useQuery} from '@apollo/client'
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";

type Props={}
const GET_UPCOMING_MOVIES=gql`
query GetUpcomingMovies{
    upcomingMovies{
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
export default function UpcomingMovies({}: Props) {
    const {loading,error,data} = useQuery(GET_UPCOMING_MOVIES)
    return <MoviesCarousel title={"Popular Movies"} movies={data} />;
}
