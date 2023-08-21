"use client"
import {gql, useQuery} from '@apollo/client'
import { ShowType,MovieType } from '../UsefulTypes';


const GET_TRENDING=gql`
query GetTrending{
  trending{
    shows{
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
    credits{
      cast{
        name
      }
      crew{
        name
      }
    }
    }
    movies{
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
    credits{
      cast{
        name
      }
      crew{
        name
      }
    }
    }
  }
}`
export default function TrendingShowsAndMovies(): (MovieType | ShowType)[]{
const {loading,error,data} = useQuery(GET_TRENDING)
const trending = [...data.movies, ...data.shows];

for (let i = trending.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [trending[i], trending[j]] = [trending[j], trending[i]];
}

return trending;
}