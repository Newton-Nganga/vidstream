/* eslint-disable @typescript-eslint/no-explicit-any */

import  { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { TopMoviesBackground, TopMoviesSlider } from "./TopMovies-el";
import {TopMoviesControls,TopMoviesControlsLargeScreen} from "./TopMoviesControls";
import { useQuery,gql } from "@apollo/client";

import { MovieType } from "@/__generated_types/UsefulTypes";



const GET_TOP_MOVIES = gql`
  query GetTopRatedMovie {
    topMovies {
      id
      media_type
      original_title
      overview
      poster_path
      title
      vote_average
      vote_count
      backdrop_path
      details {
        runtime
        genres {
          name
        }
      }
    }
  }
`;
export default function TopMovies() {
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
  const {loading,error,data} = useQuery(GET_TOP_MOVIES)
  if(loading){
    return <p>Loading ...</p>
  }
  if(error){
    return <p>Error :{error.message}</p>
  }
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
               {data.topMovies?.map((movie:MovieType) => (
                 <TopMoviesBackground key={movie.id} movie={movie}/>
               ))}
             
            </Slider>
          </div>
          <div className="block md:hidden absolute top-[40%] -translae-y-[40%] w-full z-10">
           <TopMoviesControlsLargeScreen next={next} previous={previous}/>
          </div>

          <div className="hidden md:block absolute w-[230px] h-full left-[8%] bg-transparent py-4">
            <h4>Top Movies</h4>
            <div className="h-[550px] w-full flex flex-col">
              <Slider {...sliderSettings}>
              {data.topMovies.map((movie:MovieType,index:number)=>(
                <TopMoviesSlider key={movie.id} activeSlide={activeSlide} index={index} movie={movie}/>
              ))}
              </Slider>
            </div>
            <TopMoviesControls next={next} previous={previous}/>
          </div>
        </div>
      </section>
    </section>
  );
}
