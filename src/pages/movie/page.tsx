import MovieCard from "@/components/MovieCards";
import InnerPage from "@/components/InnerPages/InnerPages";
import { MovieType } from "@/__generated_types/UsefulTypes";
import { useQuery,gql } from "@apollo/client";


const GET_POPULAR_MOVIES = gql`
  query GetPopularMovies {
    popularMovies {
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
  }
`;

export default  function MovieFallbackPage() {
  const {loading,error,data} = useQuery(GET_POPULAR_MOVIES)
 if(loading){
    return <p>Loading ...</p>
 }
 if(error){
    return <p>Error : {error.message}</p>
 }
  return (
    <InnerPage title="Movies">
      <section className="section">
        <div className="inner-secion flex flex-wrap gap-4">
          {data.popularMovies?.map((movie:MovieType) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </section>
    </InnerPage>
  );
}
