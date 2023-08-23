
import TopMovies from "../HompageSliders/TopMoviesCarousel/TopMovies";
import { gql } from "@apollo/client";
import { MovieType } from "../UsefulTypes";
import { getClient } from "@/app/lib/client";


type Props = {};

const GET_TOP_MOVIES = gql`
query GetTopRatedMovie {
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
interface Response{
  topMovies:MovieType[]
  }
export default async function TopRatedMovies({}: Props) {
  const {data:{topMovies}} = await getClient().query<Response>({query:GET_TOP_MOVIES})
  //const {data,error} = useSuspenseQuery<Response>(GET_TOP_MOVIES)
  return <TopMovies movies={topMovies} />;
}
