"use client";

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { useQuery, gql } from "@apollo/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import trending from "../../public/05.jpg";

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
