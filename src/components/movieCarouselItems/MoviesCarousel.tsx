
import React, { useRef } from "react";
import Slider from "react-slick";

import Movie from "../HompageSliders/Movie-Cel/Movie";
import CarouselControls from "./CarouselControls";
import Carousel from "./Carousel";
import { MovieType } from "../UsefulTypes";

interface Movies {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  release_date: any;
}
type Props = {
  title: string;
  movies: MovieType[];
};

export default function MoviesCarousel({ title, movies }: Props) {
  const sliderRef = useRef<Slider | null>(null);

  return (
    <section className="section">
      <div className="m-auto inner-section">
        <div className="w-full flex justify-between mb-3">
          <h4 className="text-xl hover:text-red-500">{title}</h4>
          <div className="flex gap-3">
            <CarouselControls sliderRef={sliderRef}/>
          </div>
        </div>
        <Carousel sliderRef={sliderRef}>
          {/* pass in the data as required */}
           {movies?.map((movie:MovieType) => {
            return <Movie key={movie.id} data={movie} />;
          })}
        </Carousel>
      </div>
    </section>
  );
}
