
import { useQuery,gql } from "@apollo/client";
import { FeaturedMovieDetails, FeaturedMovieImage } from "./Featured-el";




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


export default  function FeaturedMovie() {
  //  query for the featured movie
  //Required details are:
 const {loading,error,data} = useQuery(GET_FEATURED_MOVIE)
 if(loading){
  return <p>Loading ...</p>
 }
 if(error){
  return <p>Error {error.message}</p>
 }
  return (
    <section className={`w-full bg-black/70`}>
      <div className="flex flex-col lg:flex-row my-16 text-white items-center justify-between gap-5 bg-transparent inner-section m-auto">
        <FeaturedMovieDetails data={data.featuredMovie}/>
        {/* pass the url enpoint */}
        <FeaturedMovieImage url={data.featuredMovie.backdrop_path ? data.featuredMovie.backdrop_path : data.featuredMovie.poster_path}/>
      </div>
    </section>
  );
}
