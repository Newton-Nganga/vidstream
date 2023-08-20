"use client";
import React, { useState, useEffect } from "react";
import MoviesCarousel from "../movieCarouselItems/MoviesCarousel";
import axios, { AxiosRequestConfig } from "axios";

type Props = {};

interface Movies {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  release_date: any;
}
export default function UpcomingMovies({}: Props) {
  const [upcomingMovies, setUpcomingMovies] = useState<Movies[] | null>(null);
  const requestOptions: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}tv/top_rated`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };

  useEffect(() => {
    async function getUpcoming() {
      try {
        const upcomingResponse = await axios.request(requestOptions);

        const upcoming_data: Movies[] = upcomingResponse.data.results.map(
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
        setUpcomingMovies(upcoming_data);
      } catch (error) {
        console.log(error);
      }
    }
    getUpcoming();
    //eslint-disable-next-line
  }, []);

  return <MoviesCarousel title={"Upcoming Tv Shows"} movies={upcomingMovies} />;
}
