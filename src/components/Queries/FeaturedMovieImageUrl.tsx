
import { gql } from "@apollo/client";
export const GET_FEATURED_MOVIE = gql`
  query GetFeaturedMovie {
    featuredMovie {
      id
      media_type
      backdrop_path
      poster_path
    }
  }
`;

export type FeaturedMovie={
    id: number;
    media_type: string;
    backdrop_path: string;
    poster_path: string;
}
