"use client";
import React, { useState, useEffect } from "react";
import MoviesCarousel from "../MoviesCarousel";
import axios, { AxiosRequestConfig } from "axios";
import TopMovies from "../TopMovies";

type Props = {
};

interface Movies {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path:string
  release_date: any;
}

export default function TopRatedMovies({ }: Props) {
  const [topMovies, setTopMovies] = useState<Movies[] | null>(null);
  const topMovieOptions: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}movie/top_rated`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };
  
  useEffect(()=>{
    async function getSimilar() {
    //console.log('similar function started')
    try {
      //console.log("trying ...")
      const topResponse = await axios.request(topMovieOptions);
    //   console.log("top rated response", topResponse);
      const toprated_data: Movies[] = topResponse.data.results.map(
        ({ title, id, backdrop_path,poster_path, release_date, ...others }: any) => {
          return { title, id,backdrop_path , poster_path, release_date } as Movies;
        }
      );
      console.log("toprated_data",toprated_data);
      

      setTopMovies(toprated_data);
    } catch (error) {
      console.log(error);
    }
  }
  getSimilar();
  //eslint-disable-next-line
  },[])


  if (topMovies && topMovies.length > 0) {
    console.log("similar ->", topMovies);
  }

  return <TopMovies movies={topMovies} />;
}
