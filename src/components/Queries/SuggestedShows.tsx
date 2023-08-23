
import React from "react";
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import { gql, useQuery } from "@apollo/client";
import { getClient } from "@/app/lib/client";
import { ShowType } from "../UsefulTypes";
type Props ={
  id:number
}
const GET_SUGGESTED_SHOWS=gql`
query GetSuggestedShows($suggestedShowsId: Int!) {
 recommendedShows(id: $suggestedShowsId) {
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
}`

interface Results{
  recommendedShows:ShowType[]
}

export default async function SuggestedShows({id}:Props) {
  const {data:{recommendedShows}} = await  getClient().query<Results>({query:GET_SUGGESTED_SHOWS,variables:{suggestedShowsId:id}})
  

  return (
    <MoviesCarousel title={"Suggested Shows For You"} movies={recommendedShows} />
  );
}
