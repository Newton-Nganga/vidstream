"use client";
import React, { useState, useEffect } from "react";
import MoviesCarousel from "./MoviesCarousel";
import axios, { AxiosRequestConfig } from "axios";

type Props = {};

interface Movies {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  release_date: any;
}

export default function PopularShows({}: Props) {
  const [popular, setPopular] = useState<Movies[] | null>(null);
  const popularShowsOptions: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}tv/popular`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };

  useEffect(() => {
    async function getSimilar() {
      // console.log('popular function started')
      try {
        //   console.log("trying ...")
        const popularResponse = await axios.request(popularShowsOptions);

        //   console.log("popular response", popularResponse);
        const popular_data: Movies[] = popularResponse.data.results.map(
          ({
            name: title,
            id,
            backdrop_path,
            poster_path,
            release_date,
            ...others
          }: any) => {
            return {
              title,
              id,
              backdrop_path,
              poster_path,
              release_date,
            } as Movies;
          }
        );
        //console.log("popular shows",popular_data);

        setPopular(popular_data);
      } catch (error) {
        console.log(error);
      }
    }
    getSimilar();
    //eslint-disable-next-line
  }, []);

  return <MoviesCarousel title={"Popular Shows"} movies={popular} />;
}
