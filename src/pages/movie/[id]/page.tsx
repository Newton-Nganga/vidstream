
import InnerPage from "@/components/InnerPages/InnerPages";
import { useQuery, gql } from "@apollo/client";
import { MoviePlayer } from "@/components/MoviePlayer/MoviePlayer";
import { MovieDetails } from "./MovieDetails";
import SimilarMovies from "@/components/SimilarMovies/SimilarMovies";
import SuggestedMovies from "@/components/SuggestedMovies/SuggestedMovies";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query GetMovie($movieId: Int!) {
    movie(id: $movieId) {
      id
      media_type
      details {
        genres {
          name
        }
        runtime
        tagline
      }
      credits {
        crew {
          name
          job
        }
        cast {
          character
          name
        }
      }
      overview
      popularity
      poster_path
      release_date
      title
      original_title
      original_language
      vote_count
      vote_average
      trailer {
        key
        official
        site
        id
      }
      backdrop_path
    }
  }
`;
export default function MoviePage() {
  //get the query parameter
const {id} = useParams()

const {loading,error,data} = useQuery(GET_MOVIE,{variables:{movieId:id}})

 if(loading){
    return <p>Loading ...</p>
 }
 if(error){
    return <p>Error : {error.message}</p>
 }

  return (
    <InnerPage>
      <section>
        {/* The media Player Component */}
        <MoviePlayer data={data} />

        {/* The details about the specific movie */}
        <MovieDetails movie={data} />

        {/* A carousel of recommended movies */}
        <SuggestedMovies id={id} />

        {/* Movies similar to the one above */}
        <SimilarMovies id={id} />
      </section>
    </InnerPage>
  );
}
