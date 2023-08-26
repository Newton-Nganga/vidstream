
import MovieCard from "@/components/MovieCards";
import InnerPage from "@/components/InnerPages/InnerPages";
import { MovieType,ShowType } from "@/__generated_types/UsefulTypes";
import { useState } from "react";
import { useLazyQuery,gql } from "@apollo/client";

const SEARCH = gql`
  query ExampleQuery($query: String!) {
    search(query: $query) {
      ... on Movie {
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
     
     ... on shows {
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
  }
`;
export default function Page() {
  const [keyword, setKeyword] = useState<string>("");

 const [getSearchResults,{loading,error,data}]= useLazyQuery(SEARCH,{variables:{query:keyword}})

  if(loading)return <p>Loading ...</p>
  if(error) return <p>Error:{error.message}</p>

  return (
    <InnerPage>
      <section className="section">
        <div className="inner-section">
          <div className="relative w-full rounded-[30px] text-base">
            <input
              type="search"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search for movies or shows by their titles"
              className="bg-transparent py-3 w-full relative"
            />
            <button
              onClick={()=>getSearchResults()}
              className="p-3 rounded-[30px] absolute right-0 shadow"
            >
              Search
            </button>
          </div>
          <h2>search results for &apos; {keyword} &apos;</h2>
          {/* map through the movies results */}
          <div className="flex flex-wrap gap-4 w-full justify-center ">
            {data && data.search?.map((el:MovieType | ShowType) => (
              <MovieCard data={el} key={el.id} />
            ))}
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
