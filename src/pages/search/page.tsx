
import MovieCard from "@/components/MovieCards";
import InnerPage from "@/components/InnerPages/InnerPages";
import { MovieType,ShowType } from "@/__generated_types/UsefulTypes";
import { useRef } from "react";

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
     
     ... on Show {
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
export default function SearchPage() {
  const keyword = useRef<string>("")
  //const [keyword, setKeyword] = useState<string>("");

 const [getSearchResults,{loading,error,data}]= useLazyQuery(SEARCH,{variables:{query:keyword.current}})

  if(loading)return <p>Loading ...</p>
  if(error) return <p>Error:{error.message}</p>

  return (
    <InnerPage>
      <section className="section">
        <div className="inner-section">
          <div className="flex relative p-1 border w-full rounded-[30px] text-base">
            <input
              type="search"
              onChange={(e) => keyword.current = e.target.value}
              placeholder="Search for movies or shows by their titles"
              className="bg-transparent border-0 py-3 w-full relative"
            />
            <button
              onClick={(e)=>{
                e.preventDefault()
                getSearchResults()}
              }
              className="p-3 rounded-[30px]  mx-2 max-w-[200px] right-0 shadow"
            >
              Search
            </button>
          </div>
          <h2 className="my-4">search results for &apos; {keyword.current} &apos;</h2>
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
