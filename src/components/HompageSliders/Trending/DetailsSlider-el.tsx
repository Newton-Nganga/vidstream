
import { MovieType, ShowType } from '@/components/UsefulTypes'
import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import Link from 'next/link'
import WatchTime from '@/components/WatchTime'
import logo from "../../../../public/logo.png";
import { FaPlay} from "react-icons/fa";

type DataProps = {
    trending:(MovieType|ShowType)[]
    activeSlide:number
}

export function DetailsTopSlider({trending,activeSlide}:DataProps){
    return <>
    {trending?.map((movie,index) => (
        <div
          key={movie.id}
          className={`${
            activeSlide === index ? "slide-active" : "border-white"
          } slide-item`}
        >
          <Image
            src={
            `${process.env.IMAGE_PREFIX}${movie?.backdrop_path}` ?? 
            `${process.env.IMAGE_PREFIX}${movie?.poster_path}` ?? 
             "https://fontawesome.com/social/film?f=classic&s=&v=5"
            }
            alt={"name" in movie ? movie.name : movie.title}
            fill={true}
            className="absolute h-full w-full rounded-xl"
          />
        </div>
      ))}
      </>
}
export default function DetailsSlider({trending,activeSlide}: DataProps) {

  return (
    <>
    {trending?.map((movie) => (
      <div
        key={movie.id}
        className="relative my-4 w-full h-[650px] rounded-xl overflow-clip"
      >
        <Image
          fill={true}
          src={
            `${process.env.IMAGE_PREFIX}${movie?.backdrop_path}` ?? 
            `${process.env.IMAGE_PREFIX}${movie?.poster_path}` ?? 
             "https://fontawesome.com/social/film?f=classic&s=&v=5"
          }
          alt={"name" in movie ? movie.name: movie.title}
          className="absolute h-full w-full"
        />
        <div className="absolute px-4 sm:px-12 z-10 bg-gradient-to-r from-black/95 from-10% via-black/70 via-40% to-black/5 to-90%  w-full h-full">
          <div className="flex flex-col py-4 text-white">
            <div className="w-fit sm:w-[255px] p-3 pr-4 mb-8 mr-auto bg-red-600/40 border-r-4 border-l-4 border-red-600">
              <Image src={logo} alt="logo" className="w-[130px]" />
            </div>
            <h1 className="texture my-4 w-fit mr-auto">
              
            {"title" in movie ? movie?.title : movie?.name}</h1>

            <div className="mb-8">
              <div className="flex items-center gap-4 text-sm md:text-xl font-normal">
                <span>{"vote_count" in movie ? movie.vote_count : 10}+</span>
                <span>
                    {"runtime" in movie.details 
                    ?<WatchTime runtime={movie.details.runtime}/> 
                    :`${movie.details.number_of_seasons} Seasons .`
                    }
                </span>
                {"release_date" in movie 
                ? new Date(movie.release_date).getFullYear()
                :new Date(movie.details.last_air_date).getFullYear()}
              </div>
            </div>
            <div>
              <p className="w-[90%] md:w-[35%] mb-8">{movie?.overview}</p>
            </div>
            <div className="mb-8">
              <div className="flex gap-4 items-center">
                <Link href={`/${"media_type" in movie ? movie.media_type : movie.details.media_type}/${movie.id}`}>
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
                    Genres:
                  </span>{" "}
                  {movie.details.genres.map(({name},index:number) => (
                    <span key={index}>{name} </span>
                  ))}
                </p>
                <p>
                  <span className="text-red-600 font-semibold">
                    Crew:
                  </span>{" "}
                  {movie.credits.crew.map(({name})=><span key={name}>`${name} ,` </span>)}
                </p>
                <p>
                  <span className="text-red-600 font-semibold">
                    Actors:
                  </span>{" "}
                 {movie.credits.cast.map(({name})=><span key={name}>`${name} ,` </span>)}
                </p>
                <p>
                  <span className="text-red-600 font-semibold">
                    Type:
                  </span>
                  <span className="px-2 bg-red-500 rounded-md">
                    {"media_type" in movie ? movie.media_type :movie.details.media_type}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
  )
}