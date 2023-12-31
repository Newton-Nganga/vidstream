"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import defaultPoster from "../../public/04.jpg";
import { FaPlay } from "react-icons/fa";
import {
  FaAngleDown,
  FaAngleUp,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa6";
import Link from "next/link";

interface Movies {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  release_date: any;
}

type Props = {
  movies: Movies[] | null;
};

export default function TopMovies({ movies }: Props) {
  const [nav1, setNav1] = useState<Slider | any | null>(null);
  const [nav2, setNav2] = useState<Slider | any | null>(null);
  const slider1Ref = useRef<Slider | null>(null);
  const slider2Ref = useRef<Slider | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  useEffect(() => {
    setNav1(slider1Ref.current);
    setNav2(slider2Ref.current);
  }, []);

  //console.log("The acttive slide is :", activeSlide);

  const next = () => {
    if (slider1Ref.current) {
      slider1Ref.current.slickNext();
    }
    if (slider2Ref.current) {
      slider2Ref.current.slickNext();
    }
  };

  const previous = () => {
    if (slider1Ref.current) {
      slider1Ref.current.slickPrev();
    }
    if (slider2Ref.current) {
      slider2Ref.current.slickPrev();
    }
  };
  const handleBeforeChange = (current: number, next: number) => {
    setActiveSlide(next);
  };

  const sliderSettings = {
    asNavFor: nav2,
    ref: (slider: Slider | null) => (slider1Ref.current = slider),
    // centerMode: false,
    // centerPadding: "10px",
    arrows: false,
    // adaptiveHeight: true,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    beforeChange: handleBeforeChange,
  };

  return (
    <section className="section">
      <section className="inner-section">
        <h4 className="md:hidden py-2 text-xl hover:text-red-500">
          Top Movies
        </h4>
        <div className="relative w-full h-[500px] md:h-[600px] rounded-xl border-[3px] border-white overflow-clip">
          <div className="absolute w-full h-full top-[50%] -translate-y-[50%]">
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
            >
              {movies?.map((movie: Movies, index: number) => (
                <div
                  key={index}
                  className="relative w-full h-[500px] md:h-[600px]"
                >
                  <Image
                    fill={true}
                    src={`${
                        movie?.backdrop_path
                        ? "https://image.tmdb.org/t/p/original"+movie?.backdrop_path
                        : movie?.poster_path
                        ? "https://image.tmdb.org/t/p/original"+movie?.poster_path
                        : "https://fontawesome.com/social/film?f=classic&s=&v=5"
                    }`}
                    alt="top movie"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute block w-full h-full bg-black/25"></span>
                </div>
              ))}
            </Slider>
          </div>
          <div className="block md:hidden absolute top-[40%] -translae-y-[40%] w-full z-10">
            <div className="flex justify-between items-center w-full">
              <button
                onClick={previous}
                className="h-10 w-10  p-0 flex justify-center items-center text-xl"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={next}
                className="h-10 w-10 p-0  flex justify-center items-center text-xl"
              >
                <FaAngleRight />
              </button>
            </div>
          </div>

          <div className="hidden md:block absolute w-[230px] h-full left-[8%] bg-transparent py-4">
            <h4>Top Movies</h4>
            <div className="h-[550px] w-full flex flex-col">
              <Slider {...sliderSettings}>
                {movies?.map((movie: Movies, index: number) => (
                  <div
                    key={movie?.id}
                    className={`${
                      activeSlide === index
                        ? "topmovie-active-slide "
                        : "border-white"
                    } !w-[200px] !h-[110px] overflow-clip my-2  slide-item group`}
                  >
                    <Image
                      fill={true}
                      src={`${movie?.backdrop_path
                        ? "https://image.tmdb.org/t/p/original"+movie?.backdrop_path
                        : movie?.poster_path
                        ? "https://image.tmdb.org/t/p/original"+movie?.poster_path
                        : "https://fontawesome.com/social/film?f=classic&s=&v=5"
                      }`}
                      alt="trending"
                      className="h-full w-full"
                    />
                    <div className="hidden group-[.topmovie-active-slide]:flex group-[.topmovie-active-slide]:flex-col justify-between bg-black/50 px-3 py-1 absolute h-full w-full">
                      <p>{movie?.title}</p>
                      <div className="flex gap-2 items-center">
                        {movie.release_date}
                      </div>
                      <Link href={`/movies/${movie?.id}`}>
                        <button className="btn">
                          <FaPlay className="" />
                          Play Now
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            <center className="z-10 absolute bottom-0 left-[45%] -translate-x-[50%] gap-4 flex flex-col text-5xl ">
              <button
                onClick={previous}
                className="bg-transparent p-0 rounded-none"
              >
                <FaAngleUp />
              </button>
              <button
                onClick={next}
                className="bg-transparent p-0 rounded-none"
              >
                <FaAngleDown />
              </button>
            </center>
          </div>
        </div>
      </section>
    </section>
  );
}
