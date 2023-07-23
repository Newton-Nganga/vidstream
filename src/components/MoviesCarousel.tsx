"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import Movie from "./Movie";
// const movies: React.FC[] = [
//  Movie,Movie,Movie,Movie,Movie,Movie,
// ];
interface Movies {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path:string
  release_date: any;
}
type Props={
  title:string
  movies:Movies[] | null
}

export default function MoviesCarousel({title,movies}:Props) {
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
   console.log('movies carousel',movies)
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: "10px",
    adaptiveHeight: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
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
    <div className="m-auto inner-section">
      <div className="w-full flex justify-between mb-3">
        <h4 className="text-xl hover:text-red-500">{title}</h4>
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
      <Slider ref={sliderRef} {...settings}>
        {movies?.map((movie,index:number)=>{
          return <Movie key={index} data={movie}/>
        })}
      </Slider>
    </div>
    </section>
  );
}
