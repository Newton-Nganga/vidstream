type Props = {};
import { FeaturedMovieDetails, FeaturedMovieImage } from "./Featured-el";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

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
    release_date
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
export default function FeaturedMovie({}: Props) {
  //  query for the featured movie
  //Required details are:
  const {loading,error,data}= useQuery(GET_FEATURED_MOVIE)
  
  return (
    <section className={`w-full bg-black/70`}>
      <div className="flex flex-col lg:flex-row my-16 text-white items-center justify-between gap-5 bg-transparent inner-section m-auto">
        <FeaturedMovieDetails data={data}/>
        {/* pass the url enpoint */}
        <FeaturedMovieImage url={data.backdrop_path ? data.backdrop_path : data.poster_path}/>
      </div>
    </section>
  );
}
