"use client";
import React, { useState, useEffect } from "react";
import MoviesCarousel from "../MoviesCarousel";
import axios, { AxiosRequestConfig } from "axios";

type Props = {

};

interface Movies {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path:string
  release_date: any;
}

export default function SuggestedShows({  }: Props) {
  const [suggested, setSuggested] = useState<Movies[] | null>(null);
  const suggestedShowsOptions: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}discover/tv`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };
  
  useEffect(()=>{
    async function getSimilar() {
    // console.log('popular function started')
    try {
    //   console.log("trying ...")
      const suggestedResponse = await axios.request(suggestedShowsOptions);
      
    //   console.log("popular response", popularResponse);
      const suggested_data: Movies[] = suggestedResponse.data.results.map(
        ({ name:title, id, backdrop_path,poster_path, release_date, ...others }: any) => {
          return { title, id,backdrop_path , poster_path, release_date } as Movies;
        }
      );
      //console.log("popular shows",popular_data);
      

      setSuggested(suggested_data);
    } catch (error) {
      console.log(error);
    }
  }
  getSimilar();
  //eslint-disable-next-line
  },[])


//   if (popular && popular.length > 0) {
//     console.log("popular ->", popular);
//   }

  return <MoviesCarousel title={"Suggested Shows For You"} movies={suggested} />;
}