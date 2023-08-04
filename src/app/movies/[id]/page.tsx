"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import ReactPlayer from "react-player/youtube";

import { usePathname, useSearchParams } from "next/navigation";

import InnerPage from "@/components/Pages/InnerPages";
import { BsStarFill, BsStar } from "react-icons/bs";
import { RiHeartFill, RiShareLine, RiVolumeMuteFill } from "react-icons/ri";

import UpcomingMovies from "@/components/movieCarouselItems/UpcomingMovies";
import SimilarMovies from "@/components/movieCarouselItems/SimilarMovies";

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
}

export default function Page({ params }: { params: { id: number } }) {
  //get the query parameter

  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [trailerData, setTrailerData] = useState<TrailerData[] | null>(null);
  const [trailer, setTrailer] = useState<boolean>(false);

  const options: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}movie/${params.id}`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };
  const trailerOptions: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}movie/${params.id}/videos`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };

  useEffect(() => {
    async function getTrending() {
      try {
        const response = await axios.request(options);
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

        setMovieData(movieData);
        setTrailerData(trailer_data);
      } catch (error) {
        console.log(error);
      }
    }

    getTrending();
    //eslint-disable-next-line
  }, []);

  return (
    <InnerPage>
      <section>
        <div className="section">
          <div className="inner-section">
            {trailer ? (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailerData&& trailerData.length > 0 && trailerData[trailerData.length-1].key}`}
                width="100%"
                height="500px"
                controls={true}
              />
            ) : (
              <iframe
                src={`https://multiembed.mov/?video_id=${params.id}&tmdb=1`}
                width="100%"
                height="500"
                allowFullScreen
                allow="fullscreen"
              ></iframe>
            )}

            <div>
              <button
                className="w-fit my-3"
                onClick={() => setTrailer(!trailer)}
              >
                {trailer ? "Stream" : "Trailer"}
              </button>
              <i className="italic max-w-[400px]">
                The streaming option may not be available for some movies.Also
                its offered by non-affiliated third party providers therefore it
                may contain ads.
              </i>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="inner-section flex flex-col border-slice py-4 gap-4">
            <h4 className="texture my-4 w-fit mr-auto text-2xl font-extrabold leading-[1.2]">
              {movieData?.title}
            </h4>
            <p>{movieData?.overview}</p>
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
                  <span className="text-red-600 font-semibold">Genres:</span>{" "}
                  {movieData?.genres.map((genre) => (
                    <span key={genre.id}> {genre.name} </span>
                  ))}
                </p>
                <p>
                  <span className="text-red-600 font-semibold">Director:</span>{" "}
                  Josh David Barrett
                </p>
                <p>
                  <span className="text-red-600 font-semibold">Duration:</span>{" "}
                  {`${new Date(movieData?.runtime).getHours()}Hrs ${new Date(
                    movieData?.runtime
                  ).getMinutes()}Min`}
                </p>
                <p>
                  <span className="text-red-600 font-semibold">Quality:</span>
                  <span className="px-2 bg-red-500 rounded-md">HD</span>
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
        <SimilarMovies id={params.id} />
        <UpcomingMovies />
      </section>
    </InnerPage>
  );
}
