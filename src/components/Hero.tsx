"use client";

import React, { useEffect, useRef,useState } from "react";
import Slider from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import trending from "../../public/05.jpg";
import logo from "../../public/logo.png";

type Props = {};

import { FaPlay } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import axios,{AxiosRequestConfig} from "axios";
import Link from "next/link";
import SimilarMovies from "./movieCarouselItems/SimilarMovies";

type Response = {
  id: number;
  name: string;
  title: string;
  backdrop_path: string;
  overview: string;
  media_type: string;
  vote_count: number;
  vote_average: number;
  original_title: string;
  original_language: string;
  adult: boolean;
  video: boolean;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
  popularity: number;
};
interface MovieData {
  id: number;
  name: string;
  title: string;
  backdrop_path: string;
  overview: string;
  media_type: string;
  vote_count: number;
}

export default function Hero({}: Props) {
  const [movieData, setMovieData] = useState<MovieData[] | null>(null);
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}trending/all/day`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };


  

  useEffect(() => {
    async function getTrending() {
      try {
        const response = await axios.request(options);
        const movie_data: MovieData[] = response.data.results.map(
          ({
            popularity,
            genre_ids,
            poster_path,
            video,
            adult,
            original_language,
            original_title,
            vote_average,
            ...movieData
          }: any) => {
            return movieData as MovieData;
          }
        );

        setMovieData(movie_data)
      } catch (error) {
        console.log(error);
      }
    }

    getTrending();
  }, []);


  const sliderRef = useRef<Slider | null>(null);
  
  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <section className="bg-black">
      <section className="">
        <Slider
          fade={false}
          arrows={false}
          adaptiveHeight={false}
          dots={false}
          slidesToShow={1}
          slidesToScroll={1}
          swipeToSlide={true}
          centerMode={true}
          centerPadding={"0px"}
          ref={sliderRef}
        >
          {movieData?.map((trending) => {
            return (
             
                <div key={trending?.id} className="relative  w-full h-[680px]  rounded-xl overflow-clip">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${trending?.backdrop_path}`}
                    alt={trending?.title}
                    className="absolute h-full w-full"
                    fill={true}
                    
                  />
                  <div className="hero-movie-details-wrapper">
                    <div className="hero-movie-details-container">
                      <div className="hero-logo">
                        <Image src={logo} alt="logo" className="w-[130px]" />
                      </div>
                      <h1 className="texture trending-title">
                        {trending?.title}
                      </h1>
                      <div className="mb-8">
                        <div className="flex items-center gap-4 text-sm lg:text-xl font-normal">
                          <span className=" px-2 rounded-md bg-gray-400">
                            {trending?.vote_count}
                          </span>
                          <p>{trending?.media_type}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm md:text-base w-[70vw] md:w-[35%] mb-8">
                          {trending?.overview.length > 217 ? trending?.overview.slice(0,217)+'...' : trending?.overview }
                        </p>
                      </div>
                      <div className="mb-8">
                        <div className="flex gap-4 items-center w-fit">
                          <Link href={`/movies/${trending?.id}`}>
                          <button className="md:px-6 md:p-3 gap-2 btn">
                            <FaPlay />
                            <span>Play Now</span>
                          </button>
                          </Link>
                          <Link href={`/movies/${trending?.id}`}>
                            <p className="text-lg hover:text-red-600">+My List</p>
                          </Link>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="hero-controls">
                      <button
                        onClick={previous}
                        className="hero-btn"
                      >
                        <FaAngleLeft />
                      </button>
                      <button
                        onClick={next}
                        className="hero-btn"
                      >
                        <FaAngleRight />
                      </button>
                    </div>
                  </div>
                </div>
            );
          })}
        </Slider>
      </section>
    </section>
  );
}
