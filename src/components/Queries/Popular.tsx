"use client";
import { gql, useQuery } from "@apollo/client";
import { ShowType, MovieType } from "../UsefulTypes";

const GET_POPULAR = gql`
  query GetPopular {
    popularShows {
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
export default function PopularShowsAndMovies(): (MovieType | ShowType)[] {
  const { loading, error, data } = useQuery(GET_POPULAR);
  const popular = [...data.popularMovies, ...data.popularShows];

  for (let i = popular.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [popular[i], popular[j]] = [popular[j], popular[i]];
  }

  return popular;
}
