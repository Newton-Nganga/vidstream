
import {gql} from '@apollo/client'
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import { getClient } from '@/app/lib/client';
import { ShowType } from '../UsefulTypes';

type Props={}
export const GET_TOP_SHOWS=gql`
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
interface Response{
  topShows:ShowType[]
}
export default async function TopRatedShows({}: Props) {
    const {data:{topShows}} = await getClient().query<Response>({query:GET_TOP_SHOWS})
    return <MoviesCarousel title={"Top Shows"} movies={topShows} />;
}