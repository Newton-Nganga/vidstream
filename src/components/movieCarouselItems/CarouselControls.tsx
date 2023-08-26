import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Slider from 'react-slick'

type Props = {
   sliderRef:React.RefObject<Slider>
};

export default function CarouselControls({sliderRef}: Props) {
    const next = () => {
        if (sliderRef.current) {
          sliderRef.current.slickNext();
        }
      };
      //eslint-disable-next-line
      //console.log('movies carousel',movies)
      const previous = () => {
        if (sliderRef.current) {
          sliderRef.current.slickPrev();
        }
      };
  return (
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
  );
}

