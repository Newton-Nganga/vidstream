import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";

type Props={}
const GET_TV_MYSTERIES=gql`
query tvMysteries{
    tvMysteries{
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
`
export default function TvMysteries({}: Props) {
    const {loading,error,data} = useQuery(GET_TV_MYSTERIES)
    return <MoviesCarousel title={"Tv Mysteries"} movies={data} />;
}