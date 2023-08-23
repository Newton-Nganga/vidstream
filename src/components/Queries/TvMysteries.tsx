import { useQuery,gql } from "@apollo/client";
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import { ShowType } from "../UsefulTypes";
import { getClient } from "@/app/lib/client";

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
interface Response{
  tvMysteries:ShowType[]
}
export default async function TvMysteries({}: Props) {
    const {data:{tvMysteries}} = await getClient().query({query:GET_TV_MYSTERIES})
    return <MoviesCarousel title={"Tv Mysteries"} movies={tvMysteries} />;
}