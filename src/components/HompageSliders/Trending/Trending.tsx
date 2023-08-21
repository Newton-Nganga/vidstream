"use client"
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import DetailsSlider, { DetailsTopSlider } from "./DetailsSlider-el";
import gql from "graphql-tag";
import TrendingShowsAndMovies from "@/components/Queries/Trending";
import PopularShowsAndMovies from "@/components/Queries/Popular";

type Props = {
  title: String;
};



export default function Trending({ title = "Trending" }: Props) {
  const [nav1, setNav1] = useState<Slider | any | null>(null);
  const [nav2, setNav2] = useState<Slider | any | null>(null);
  const slider1Ref = useRef<Slider | null>(null);
  const slider2Ref = useRef<Slider | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  setNav1(slider1Ref.current);
  setNav2(slider2Ref.current);

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
  
  const data = PopularShowsAndMovies()
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
          <DetailsTopSlider trending={data} activeSlide={activeSlide}/>
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
          <DetailsSlider trending={data} activeSlide={activeSlide}/>
        </Slider>
      </section>
    </section>
  );
}
