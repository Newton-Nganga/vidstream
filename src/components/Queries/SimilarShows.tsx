
import { getClient } from "@/app/lib/client";
import { ShowType } from "../UsefulTypes";
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import {gql} from '@apollo/client';

type Props={
  id:number
}

const GET_SIMILAR_SHOWS=gql`
query GetSimilarShows($similarShowsID:Int){
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
}`
interface Response{
  similarShows:ShowType[]
}
export default async function SimilarShows({id }:Props) {
  const {data:{similarShows}} = await getClient().query<Response>({query:GET_SIMILAR_SHOWS,variables:{similarShowsId:id}})

  return <MoviesCarousel title={"Similar Shows"} movies={similarShows} />;
}
