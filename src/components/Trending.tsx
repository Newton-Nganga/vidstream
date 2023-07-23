"use client";
import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import trending from "../../public/05.jpg";
import logo from "../../public/logo.png";

import { FaPlay, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

import axios, { AxiosRequestConfig } from "axios";
type Props = {
  title: String;
};
interface Movies {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  release_date: any;
  genre_ids: number[];
  overview: string;
  media_type: string;
  vote_average: number;
  popularity: number;
}
export default function Trending({ title = "Trending" }: Props) {
  const [trending, setTrending] = useState<Movies[] | null>(null);
  const trendingMoviesOptions: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}trending/movie/day`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };

  const [nav1, setNav1] = useState<Slider | any | null>(null);
  const [nav2, setNav2] = useState<Slider | any | null>(null);
  const slider1Ref = useRef<Slider | null>(null);
  const slider2Ref = useRef<Slider | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  useEffect(() => {
    setNav1(slider1Ref.current);
    setNav2(slider2Ref.current);

    async function getTrendingMovies() {
      try {
        const trendingResponse = await axios.request(trendingMoviesOptions);
        const trending_data: Movies[] = trendingResponse.data.results.map(
          ({
            title,
            id,
            backdrop_path,
            poster_path,
            genre_ids,
            popularity,
            vote_average,
            media_type,
            overview,
            release_date,
            ...others
          }: any) => {
            return {
              title,
              id,
              backdrop_path,
              genre_ids,
              popularity,
              vote_average,
              media_type,
              overview,
              poster_path,
              release_date,
            } as Movies;
          }
        );
        setTrending(trending_data);
      } catch (error) {
        console.log(error);
      }
    }

    getTrendingMovies();

    //eslint-disable-next-line
  }, [setNav1, setNav2, slider1Ref, slider2Ref]);

  // //console.log("The acttive slide is :", activeSlide);

  const next = () => {
    if (slider1Ref.current) {
      slider1Ref.current.slickNext();
    }
  };

  const previous = () => {
    if (slider1Ref.current) {
      slider1Ref.current.slickPrev();
    }
  };
  const handleBeforeChange = (current: number, next: number) => {
    setActiveSlide(next);
  };

  const sliderSettings = {
    asNavFor: nav2,
    ref: (slider: Slider | null) => (slider1Ref.current = slider),
    centerMode: true,
    centerPadding: "10px",
    arrows: false,
    adaptiveHeight: true,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    beforeChange: handleBeforeChange,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="section">
      <section className="relative inner-section h-auto m-auto">
        <div className="w-full flex justify-between mb-3">
          <h4>{title}</h4>
          <div className="flex gap-3">
            <button
              className="rounded-md bg-red-600 text-white p-1 text-xl hover:text-red-600 hover:bg-white"
              onClick={previous}
            >
              <FaAngleLeft />
            </button>
            <button
              className="rounded-md bg-red-600 text-white p-1 text-xl hover:text-red-600 hover:bg-white"
              onClick={next}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <Slider {...sliderSettings}>
          {trending?.map((movie: Movies, index: number) => (
            <div
              key={index}
              className={`${
                activeSlide === index ? "slide-active" : "border-white"
              } slide-item`}
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${
                  movie?.backdrop_path
                    ? movie?.backdrop_path
                    : movie?.poster_path
                }`}
                alt="trending"
                fill={true}
                className="absolute h-full w-full rounded-xl"
              />
            </div>
          ))}
        </Slider>
        <Slider
          fade={true}
          asNavFor={nav1}
          ref={slider2Ref}
          arrows={false}
          adaptiveHeight={false}
          dots={false}
          slidesToShow={1}
          slidesToScroll={1}
          swipeToSlide={false}
          centerMode={true}
          centerPadding={"0px"}
        >
          {trending?.map((movie: Movies, index: number) => (
            <div
              key={index}
              className="relative my-4 w-full h-[650px] rounded-xl overflow-clip"
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${
                  movie?.backdrop_path
                    ? movie?.backdrop_path
                    : movie?.poster_path
                }`}
                alt="trending"
                className="absolute h-full w-full"
              />
              <div className="absolute px-4 sm:px-12 z-10 bg-gradient-to-r from-black/95 from-10% via-black/70 via-40% to-black/5 to-90%  w-full h-full">
                <div className="flex flex-col py-4 text-white">
                  <div className="w-fit sm:w-[255px] p-3 pr-4 mb-8 mr-auto bg-red-600/40 border-r-4 border-l-4 border-red-600">
                    <Image src={logo} alt="logo" className="w-[130px]" />
                  </div>
                  <h1 className="texture my-4 w-fit mr-auto">{movie?.title}</h1>
                  <div className="mb-8">
                    <div className="flex items-center gap-4 text-sm md:text-xl font-normal">
                      Type: {movie?.media_type}
                    </div>
                  </div>
                  <div>
                    <p className="w-[90%] md:w-[35%] mb-8">{movie?.overview}</p>
                  </div>
                  <div className="mb-8">
                    <div className="flex gap-4 items-center">
                      <Link href={`/shows/${movie.id}`}>
                        <button className="px-6 p-3 gap-2 btn">
                          <FaPlay />
                          <span>Play Now</span>
                        </button>
                      </Link>
                      <p className="text-lg hover:text-red-600">+My List</p>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm md:text-lg">
                      <p>
                        <span className="text-red-600 font-semibold">
                          Actor:
                        </span>{" "}
                        Josh Duhamel,Bruce Willis,Rosario Dawson
                      </p>
                      <p>
                        <span className="text-red-600 font-semibold">
                          Genres:
                        </span>{" "}
                        {movie?.genre_ids.map((genre: number) => (
                          <span key={genre}>{genre} </span>
                        ))}
                      </p>
                      <p>
                        <span className="text-red-600 font-semibold">
                          Popularity:
                        </span>{" "}
                        J{movie?.popularity}
                      </p>
                      <p>
                        <span className="text-red-600 font-semibold">
                          Release date:
                        </span>{" "}
                        {new Date(movie?.release_date).getFullYear()}
                        {new Date(movie?.release_date).getUTCMonth()}
                      </p>
                      <p>
                        <span className="text-red-600 font-semibold">
                          vote:
                        </span>
                        <span className="px-2 bg-red-500 rounded-md">
                          {movie?.vote_average}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </section>
  );
}
