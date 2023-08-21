"use client";
import React, { useState, useEffect } from "react";
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import axios, { AxiosRequestConfig } from "axios";
import { gql, useQuery } from "@apollo/client";
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

export default function SuggestedShows({id}:Props) {
  const {loading,error,data} = useQuery(GET_SUGGESTED_SHOWS,{
    variables:{suggestedShowsId:id}
  })

  return (
    <MoviesCarousel title={"Suggested Shows For You"} movies={data} />
  );
}
