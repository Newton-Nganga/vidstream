
import {gql, useQuery} from '@apollo/client'
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import { getClient } from '@/app/lib/client';
import { MovieType } from '../UsefulTypes';

type Props={}
export const GET_POPULAR_MOVIES=gql`
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
interface Response{
  popularMovies:MovieType[]
}
export default async function PopularMovies({}: Props) {
    const {data:{popularMovies}} = await getClient().query<Response>({query:GET_POPULAR_MOVIES})

    return <MoviesCarousel title={"Popular Movies"} movies={popularMovies} />;
}