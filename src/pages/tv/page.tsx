import InnerPage from "@/components/InnerPages/InnerPages";
import MovieCard from "@/components/MovieCards";
import { ShowType } from "@/__generated_types/UsefulTypes";
import { useQuery,gql } from "@apollo/client";




const GET_TOP_SHOWS = gql`
  query GetTopShows {
    topShows {
      name
      id
      original_name
      overview
      poster_path
      backdrop_path
      details {
        genres {
          name
        }
        media_type
        number_of_seasons
      }
    }
  }
`;

export default function ShowFallbackPage() {
  const {loading,error,data} = useQuery(GET_TOP_SHOWS)
  if(loading)return <p>Loading ...</p>
  if(error) return <p>Error: {error.message}</p>
  return (
    <InnerPage title="Shows">
      <section className="section">
        <div className="inner-secion flex flex-wrap gap-4">
          {data.topShows?.map((show:ShowType, index:number) => (
            <MovieCard key={index} data={show} />
          ))}
        </div>
      </section>
    </InnerPage>
  );
}
