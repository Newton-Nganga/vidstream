import Navbar from "@components/Navbar/Navbar";
import Footer from "@components/Footer/Footer";
import { useQuery, gql } from "@apollo/client";
import { match } from "ts-pattern";

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
  
  const { backdrop_path, poster_path } = data.featuredMovie;
  const featuredMovieUrl = `${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}` + match(data.featuredMovie)
    .with({ backdrop_path }, () => backdrop_path)
    .with({ poster_path }, () => poster_path)
    .otherwise(() => "");

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
