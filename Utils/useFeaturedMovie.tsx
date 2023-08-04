"use client"
import React,{useEffect,useState} from 'react'

import axios, { AxiosRequestConfig } from "axios";


interface Movies {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  release_date: any;
  overview: string;
}
export default function useFeaturedMovie() {
    const [featured, setFeatured] = useState<Movies[] | null>(null);
   const featuredShowsOptions: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}discover/tv`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };

  useEffect(() => {
    async function getFeatured() {
      // console.log('popular function started')
      try {
        //   console.log("trying ...")
        const featuredResponse = await axios.request(featuredShowsOptions);

        //   console.log("popular response", popularResponse);
        const featured_data: Movies[] = featuredResponse.data.results.map(
          ({
            name: title,
            id,
            backdrop_path,
            overview,
            poster_path,
            release_date,
            ...others
          }: any) => {
            return {
              title,
              id,
              backdrop_path,
              overview,
              poster_path,
              release_date,
            } as Movies;
          }
        );
        //console.log("popular shows",popular_data);

        setFeatured(featured_data);
      } catch (error) {
        console.log(error);
      }
    }
    getFeatured();
    //eslint-disable-next-line
  }, []);

  return featured
}