"use client";
import TopMovies from "../HompageSliders/TopMoviesCarousel/TopMovies";
import { gql, useQuery } from "@apollo/client";
import { MovieType } from "../UsefulTypes";

type Props = {};

const GET_TOP_MOVIES = gql`
uery GetTopRatedMovie {
  topMovies {
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
}`;
export default function TopRatedMovies({}: Props) {
  const { loading, error, data } = useQuery(GET_TOP_MOVIES);
  
  return <TopMovies movies={data} />;
}
