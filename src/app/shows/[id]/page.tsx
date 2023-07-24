"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import InnerPage from "@/components/Pages/InnerPages";
import { BsStarFill, BsStar } from "react-icons/bs";
import { RiHeartFill, RiShareLine, RiVolumeMuteFill } from "react-icons/ri";
import MoviesCarousel from "@/components/MoviesCarousel";
import axios, { AxiosRequestConfig } from "axios";
type Props = {};

//movie details
interface MovieData {
  genres: { id: number; name: string }[];
  id: number;
  imdb_id: string;
  overview: string;
  popularity: number;
  release_date: string;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  runtime: any;
  poster: string;
  backdrop_path: string;
}
interface TrailerData {
  id: string;
  site: string;
  key: string;
  official: boolean;
  size: number;
  name: string;
  type: string;
  iso_3166_1: string;
  iso_639_1: string;
  published_at: string;
}
interface Movies {
  title: string;
  id: number;
  backdrop_path: string;
  release_date: any;
  poster_path: string;
}

export default function Page({ params }: { params: { id: number } }) {
  //const breadcrumb = useBreadcrumb();
  const pathname = usePathname();
  //console.log(params.id);

  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [trailerData, setTrailerData] = useState<TrailerData[] | null>(null);
  const [suggested, setSuggested] = useState<Movies[] | null>(null);
  const [upcomingMovies, setUpcomingMovies] = useState<Movies[] | null>(null);
  const suggestedShowsOptions: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}discover/tv`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}tv/${params.id}`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };
  const trailerOptions: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}tv/${params.id}/videos`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };

  const requestOptions: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}movie/upcoming`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };
  useEffect(() => {
    async function getTrending() {
      try {
        const response = await axios.request(options);
        const suggestedResponse = await axios.request(suggestedShowsOptions);
        const trailerResponse = await axios.request(trailerOptions);
        // console.log(trailerResponse)

        const {
          adult,
          spoken_languages,
          video,
          poster_path,
          budget,
          belongs_to_collection,
          homepage,
          original_title,
          original_language,
          production_countries,
          production_languages,
          vote_count,
          revenue,
          ...rest
        }: any = response.data;

        const movieData: MovieData = rest;

        const trailer_data: TrailerData[] = trailerResponse.data.results.filter(
          (data: any) =>
            // data.name === "Official Trailer" &&
            data.official && data.site === "YouTube"
        );
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
        //   console.log("popular response", popularResponse);
        const suggested_data: Movies[] = suggestedResponse.data.results.map(
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
        //c
        setMovieData(movieData);
        setTrailerData(trailer_data);
        setSuggested(suggested_data);
        setUpcomingMovies(upcomingMovies)
      } catch (error) {
        console.log(error);
      }
    }

    getTrending();
    //eslint-disable-next-line
  }, []);
  if (trailerData && trailerData.length > 0) {
    console.log("data", trailerData[trailerData.length - 1]);
  }

  return (
    <InnerPage>
      <section>
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${
          (trailerData && trailerData.length > 0 )&& trailerData[trailerData.length -1]
        }`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture,full-screen"
      ></iframe>
        <section className="section">
          <div className="inner-section flex flex-col border-slice py-4 gap-4">
            <h4 className="texture my-4 w-fit mr-auto text-2xl font-extrabold">
              {movieData?.title}
            </h4>
            <p>
              {movieData?.overview}
            </p>
            <div className="flex items-center gap-4 my-3">
              <p className="flex gap-1 text-red-600">
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStar />
              </p>
              <span>{movieData?.vote_average}(imdb)</span>
            </div>
            <div>
              <div className="text-sm md:text-lg">
                <p>
                  <span className="text-red-600 font-semibold">Tagline:</span>{" "}
                 {movieData?.tagline}
                </p>
                <p>
                  <span className="text-red-600 font-semibold">Duration:</span>{" "}
                  {new Date(movieData?.runtime).getHours()}Hrs
                  {new Date(movieData?.runtime).getMinutes()}Min
                </p>
                <p>
                  <span className="text-red-600 font-semibold">Popularity:</span>
                  <span className="px-2 bg-red-500 rounded-md">{movieData?.popularity}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 p-1 flex justify-center items-center rounded-full bg-white/50">
                <div className="flex items-center justify-center rounded-full bg-white text-red-600 hover:text-white hover:bg-red-600 text-xl p-1">
                  <RiVolumeMuteFill />
                </div>
              </div>
              <div className="h-10 w-10 p-1 flex justify-center items-center rounded-full bg-white/50">
                <div className="flex items-center justify-center rounded-full bg-white text-red-600 hover:text-white hover:bg-red-600 text-xl p-1">
                  <RiHeartFill />
                </div>
              </div>
              <div className="h-10 w-10 p-1 flex justify-center items-center rounded-full bg-white/50">
                <div className="flex items-center justify-center rounded-full bg-white text-red-600 opacity-100 hover:text-white hover:bg-red-600 text-xl p-1">
                  <RiShareLine />
                </div>
              </div>
            </div>
          </div>
        </section>
        <MoviesCarousel movies={suggested} title={"You May Also Like"} />
        <MoviesCarousel movies={upcomingMovies} title={"Upcoming Movies"} />
      </section>
    </InnerPage>
  );
}
