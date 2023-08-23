import InnerPage from "@/components/Pages/InnerPages";
import { GET_TOP_SHOWS } from "@/components/Queries/TopRatedShows";
import MovieCard from "@/components/MovieCards";
import { getClient } from "../lib/client";
import { ShowType } from "@/components/UsefulTypes";

type Props = {};

interface Response{
  topShows:ShowType[]
}

export default async function Page({}: Props) {
   const {data:{topShows}} = await getClient() .query<Response>({query:GET_TOP_SHOWS})

  return (
    <InnerPage>
      <section className="section">
        <div className="inner-secion flex flex-wrap gap-4">
          {topShows?.map((show, index) => (
            <MovieCard key={index} data={show} />
          ))}
        </div>
      </section>
    </InnerPage>
  );
}
