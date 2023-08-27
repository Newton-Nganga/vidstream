import Navbar from "@components/Navbar/Navbar";
import Footer from "@components/Footer/Footer";
import { useQuery, gql } from "@apollo/client";

const GET_FEATURED_MOVIE = gql`
  query GetFeaturedMovieFull {
    featuredMovie {
      id
      media_type
      backdrop_path
      poster_path
    }
  }
`;
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export default function VidstreamPage({ children }: Props) {
  const { loading, error, data } = useQuery(GET_FEATURED_MOVIE);
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    console.log(error);
  }
  //console.log("featured Movie data:", data.featuredMovie);
  const featuredMovieUrl =`${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}`+
    `${data.featuredMovie.backdrop_path
      ? data.featuredMovie.backdrop_path
      : data.featuredMovie.poster_path}`

  return (
    <main
      className={` flex  flex-col bg-cover bg-no-repeat bg-center bg-fixed h-auto `}
      style={{ backgroundImage: `url(${featuredMovieUrl})` }}
    >
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
