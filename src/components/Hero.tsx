"use client";

import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import trending from "../../public/05.jpg";
import logo from "../../public/logo.png";

type Props = {};
import { FaPlay } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { LiaAngleRightSolid, LiaAngleLeftSolid } from "react-icons/lia";
import axios from "axios";

type Response ={
  id: number;
  name: string;
  title: string;
  backdrop_path: string;
  overview: string;
  media_type: string;
  vote_count: number;
  vote_average:number
  original_title:string
  original_language:string 
  adult:boolean
  video:boolean 
  poster_path:string 
  release_date: string;
  genre_ids:number[]
  popularity:number

}
export default function Hero({}: Props) {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/trending/all/day",
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };

  useEffect(() => {
    let response:any = []
    async function getTrending() {
      await axios.request(options).then((data) => {
        data.data.results.map(
          ({popularity,genre_ids,poster_path,video,adult,original_language,original_title,vote_average,...movieData}:Response)=>{
          response.push(movieData)
         });
     }).catch(err=>console.log(err))

    //  return response
  }
   getTrending()
   console.log(response);
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
          fade={true}
          arrows={false}
          adaptiveHeight={false}
          dots={false}
          slidesToShow={1}
          slidesToScroll={1}
          swipeToSlide={false}
          centerMode={true}
          centerPadding={"0px"}
        >
          <div className="relative  w-full h-[680px]  rounded-xl overflow-clip">
            <Image
              src={trending}
              alt="trending"
              className="absolute h-full w-full"
            />
            <div className="absolute  py-12 z-10 bg-gradient-to-r from-black/95 from-40% via-black/70 via-70% to-black/50 to-100%  w-full h-full">
              <div className="flex flex-col absolute w-[90vw] max-w-[1200px] top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]  center-absolute text-white">
                <div className="w-fit md:w-[255px] p-3 pr-4 mb-8 mr-auto bg-red-600/40 border-r-4 border-l-4 border-red-600">
                  <Image src={logo} alt="logo" className="w-[130px]" />
                </div>
                <h1 className="texture my-4 w-fit mr-auto text-2xl lg:!text-[4.5rem] !font-extrabold leading-[1.3]">
                  The War
                </h1>
                <div className="mb-8">
                  <div className="flex items-center gap-4 text-sm lg:text-xl font-normal">
                    <span className=" px-2 rounded-md bg-gray-400">12+</span>
                    <p>2h 10min</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm md:text-base w-[70vw] md:w-[35%] mb-8">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters.
                  </p>
                </div>
                <div className="mb-8">
                  <div className="flex gap-4 items-center">
                    <button className="md:px-6 md:p-3 gap-2 btn">
                      <FaPlay />
                      <span>Play Now</span>
                    </button>
                    <p className="text-lg hover:text-red-600">+My List</p>
                  </div>
                </div>
                <div></div>
              </div>
              <div className="flex justify-between absolute w-full py-4 sm:p-4 z-20 top-[40%] -translate-y-[-40%]">
                <button
                  onClick={previous}
                  className="flex items-center justify-center md:text-xl rounded-full border-2 border-solid border-gray-400 bg-transparent h-[30px] w-[30px] md:h-[45px] md:w-[45px] p-0"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={next}
                  className="flex items-center justify-center md:text-xl rounded-full border-2 border-solid border-gray-400 bg-transparent h-[30px] w-[30px] md:h-[45px] md:w-[45px] p-0"
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>
          </div>
        </Slider>
      </section>
    </section>
  );
}
