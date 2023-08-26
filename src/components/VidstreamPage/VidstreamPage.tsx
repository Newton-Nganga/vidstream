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
  const {
    loading,
    error,
    data,
  } = useQuery(GET_FEATURED_MOVIE);

  const featuredMovieUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${
    data.featuredMovie.backdrop_path
      ? data.featuredMovie.backdrop_path
      : data.featuredMovie.poster_path
  }`;
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    console.log(error);
  }
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
