
import MovieCard from "@/components/MovieCards";
import InnerPage from "@/components/Pages/InnerPages";
import { MovieType } from "@/components/UsefulTypes";
import { getClient } from "../lib/client";
import { GET_POPULAR_MOVIES } from "@/components/Queries/PopularMovies";


type Props = {};


interface Response{
  popularMovies:MovieType[]
}
export default async function Page({}: Props) {
 const {data:{popularMovies}} = await getClient().query<Response>({query:GET_POPULAR_MOVIES})
  return (
    <InnerPage>
      <section className="section">
        <div className="inner-secion flex flex-wrap gap-4">
          {popularMovies?.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </section>
    </InnerPage>
  );
}
