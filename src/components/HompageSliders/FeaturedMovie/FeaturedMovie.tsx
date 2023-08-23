
import { FeaturedMovieDetails, FeaturedMovieImage } from "./Featured-el";
import gql from "graphql-tag";
import { getClient } from "@/app/lib/client";
import { MovieType } from "@/components/UsefulTypes";
type Props = {};
const GET_FEATURED_MOVIE=gql`
query GetFeaturedMovie {
  featuredMovie {
    id
    media_type
    original_title
    overview
    popularity
    backdrop_path
    poster_path
    title
    vote_count
    vote_average
    details {
      genres {
        name
      }
      runtime
    }
  }
}`

interface Result{
  featuredMovie:MovieType
}
export default async function FeaturedMovie({}: Props) {
  //  query for the featured movie
  //Required details are:
  const {data:{featuredMovie}} = await getClient().query<Result>({query:GET_FEATURED_MOVIE})

  return (
    <section className={`w-full bg-black/70`}>
      <div className="flex flex-col lg:flex-row my-16 text-white items-center justify-between gap-5 bg-transparent inner-section m-auto">
        <FeaturedMovieDetails data={featuredMovie}/>
        {/* pass the url enpoint */}
        <FeaturedMovieImage url={featuredMovie.backdrop_path ? featuredMovie.backdrop_path : featuredMovie.poster_path}/>
      </div>
    </section>
  );
}
