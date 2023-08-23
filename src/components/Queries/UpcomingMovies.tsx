
import {gql} from '@apollo/client'
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import { MovieType } from '../UsefulTypes';
import { getClient } from '@/app/lib/client';

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
interface Response{
  upcomingMovies:MovieType[]
}

export default async function UpcomingMovies({}: Props) {
  const {data:{upcomingMovies}} = await getClient().query<Response>({query:GET_UPCOMING_MOVIES})

    return <MoviesCarousel title={"Popular Movies"} movies={upcomingMovies} />;
}
