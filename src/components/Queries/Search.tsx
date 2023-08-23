import { gql } from "@apollo/client";
import { ShowType, MovieType } from "../UsefulTypes";
import { getClient } from "@/app/lib/client";

const GET_POPULAR = gql`
query ExampleQuery($query: String!) {
  search(query: $query) {
    movies {
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
    queryString
    shows {
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
type Props={
  keyword:string
}
interface Results{
  querystring: string
  shows:ShowType[]
  movies:MovieType[]
}
export default async function SearchShowsOrMovies(keyword:String): Promise<(MovieType | ShowType)[]> {

  const {data:{shows,movies,querystring}}= await getClient().query<Results>({query:GET_POPULAR,variables:{query:keyword}})
  const searchResults = [...shows, ...movies];

  for (let i = searchResults.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [searchResults[i], searchResults[j]] = [searchResults[j], searchResults[i]];
  }

  return searchResults;
}