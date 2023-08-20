"use client";
import React, { useState, useEffect } from "react";
import MoviesCarousel from "./MoviesCarousel";
import axios, { AxiosRequestConfig } from "axios";

type Props = {
  id: number;
};

interface Movies {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  release_date: any;
}

export default function SimilarMovies({ id }: Props) {
  const [similarMovies, setSimilarMovies] = useState<Movies[] | null>(null);
  const similarOptions: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}movie/${id}/similar`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };

  useEffect(() => {
    async function getSimilar() {
      //console.log('similar function started')
      try {
        // console.log("trying ...")
        const similarResponse = await axios.request(similarOptions);
        // console.log("similar response", similarResponse);
        const similar_data: Movies[] = similarResponse.data.results.map(
          ({
            title,
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
        // console.log("similar_data",similar_data);

        setSimilarMovies(similar_data);
      } catch (error) {
        console.log(error);
      }
    }
    getSimilar();
    //eslint-disable-next-line
  }, []);

  // if (similarMovies && similarMovies.length > 0) {
  //   console.log("similar ->", similarMovies);
  // }

  return <MoviesCarousel title={"Similar Movies"} movies={similarMovies} />;
}
