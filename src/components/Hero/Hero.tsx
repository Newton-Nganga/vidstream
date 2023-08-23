"use client";
export const dynamic="force-dynamic"
import React,{useRef} from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


type Props = {};

import HeroSlider from "./HeroSlider";
import HeroSliderConrols from "./HeroSliderConrols";
import TrendingShowsAndMovies from "../Queries/Trending";
import HeroDetails from "./HeroDetails";

export default function Hero({}: Props) {
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

  const trending = TrendingShowsAndMovies();
  
  return (
    <section className="bg-black">
      <section className="">
        <HeroSlider sliderRef={sliderRef}>
          <HeroDetails trending={trending}>
            <HeroSliderConrols previous={previous} next={next} />
          </HeroDetails>
        </HeroSlider>
      </section>
    </section>
  );
}
