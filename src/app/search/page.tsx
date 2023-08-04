"use client";
import Movie from "@/components/Movie";
import InnerPage from "@/components/Pages/InnerPages";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import MoviesCarousel from "@/components/MoviesCarousel";
import Search from "@/components/Search";

type Props = {};
interface Movies {
  name: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  release: any;
  media_type:string 
}

export default function Page({}: Props) {
  //get the query parameter
  const searchParams = useSearchParams();
  //path /query/s="movies"
  const search = searchParams.get("query");
  const [movieresults, setMovieResults] = useState<Movies[] | null>(null);
  const quryMovieOptions: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}search/multi?query=${search}&include_adult=true&language=en-US&page=2`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };

  useEffect(() => {
    async function getSearch() {
      try {
        const qMovieResponse = await axios.request(quryMovieOptions);
       
       const filteredResults = qMovieResponse.data.results.filter((m_data:any) => m_data.media_type !== "person")
        const qmovie_data: Movies[] = filteredResults.map(
          ({ name,title, id, backdrop_path,media_type,first_air_date,poster_path,release_date, ...others }: any) => {
            return {name:name ? name: title, id, backdrop_path,media_type,release:first_air_date ? first_air_date :release_date,poster_path} as Movies;
          }
        );
        
        setMovieResults(qmovie_data);
   
      } catch (error) {
        console.log(error);
      }
    }
    getSearch();
    //eslint-disable-next-line
  }, []);
//console.log("movie results",movieresults);
  return (
    <InnerPage>
      <section className="section">
        <div className="inner-section">
          <h2>search results for &apos; {search} &apos;</h2>
          {/* map through the movies results */}
          <div className="flex flex-wrap gap-4 w-full justify-center "> 
          {movieresults?.map(el => <Search key={el.id} movie={el}/>)}
        </div>
        </div>
      </section>
    </InnerPage>
  );
}
