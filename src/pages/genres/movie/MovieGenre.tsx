import { FullMovieType } from "@/__generated_types/UsefulTypes";
import GenreCard from "@/components/GenreCard/GenreCard";
import InnerPage from "@/components/InnerPages/InnerPages";
import { useQuery, gql } from "@apollo/client";

import { useParams } from "react-router-dom";

const GET_GENRE = gql`
  query GetByGenres($genreID: Int) {
    genreMovies(genre: $genreID) {
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
      }
    }
  }
`;

export default function MovieGenrePage() {
  const { id, genre } = useParams();
  const movieID = id ? parseInt(id) : null;
  const { loading, error, data } = useQuery(GET_GENRE, {
    variables: { genreID: movieID },
  });
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Error : {error.message}</p>;
  }
  
  return (
    <InnerPage title="Movie Genres">
      <section className="section">
        <div className="inner-section">
          <h1 className="py-4">Genre : {genre}</h1>
          <div className="flex flex-wrap justify-center">
            {data.genreMovies.map((movie: FullMovieType) => (
              <GenreCard key={data.id} data={movie} />
            ))}
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
