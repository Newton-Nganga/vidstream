
import {gql} from '@apollo/client'
import { FullMovieType } from '../UsefulTypes'
import { getClient } from '@/app/lib/client'

export const GET_MOVIE=gql`
query GetMovie($movieId: Int!) {
  movie(id: $movieId) {
    id
    media_type
    details {
      genres {
        name
      }
      runtime
      tagline
    }
    credits {
      crew {
        name
        job
      }
      cast {
        character
        name
      }
    }
    overview
    popularity
    poster_path
    release_date
    title
    original_title
    original_language
    vote_count
    vote_average
    trailer {
      key
      official
      site
      id
    }
    backdrop_path
  }
}`
interface Response{
  movie:FullMovieType
}
export async function getSpecificMovie(id:number):Promise<FullMovieType>{
  const {data:{movie}} = await getClient().query<Response>({query:GET_MOVIE,variables:{movieId:id}})
  return movie
}