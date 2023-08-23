"use client"
export const dynamic="force-dynamic"
import {gql, useQuery} from '@apollo/client'
import { ShowType,MovieType } from '../UsefulTypes';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';


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
interface Response{
  trending:{
    shows:ShowType[]
    movies:MovieType[]
  }
}
export default function TrendingShowsAndMovies():(MovieType | ShowType)[]{
const {data:{trending}} = useSuspenseQuery<Response>(GET_TRENDING)
const trendingData = [...trending.movies, ...trending.shows];

for (let i = trendingData.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [trendingData[i], trendingData[j]] = [trendingData[j], trendingData[i]];
}

return trendingData;
}