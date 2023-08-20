import React from "react";
import Link from "next/link";
import Image from "next/image";

import defaultPoster from "../../public/01.jpg";

import { FaPlay } from "react-icons/fa6";
import { RiAddLine, RiHeartFill, RiVolumeMuteFill } from "react-icons/ri";
import MovieAddFavourite from "./MovieRating-el";
interface Movie {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  release_date: any;
}
type Props = {
  data: Movie;
};

export default function Movie({ data }: Props) {
  return (
    <Link href={`/movies/${data.id}?op="trailer"`}>
      <div className="relative my-5 w-full h-[160px] sm:w-[40vw] md:w-[28vw] lg:w-[22vw] xl:w-[270px] lg:h-[160px]  flex hover:z-10 hover:scale-[1.1] duration-[0.2s] group rounded-xl  border-[3px] border-white overflow-clip">
        <div className="absolute  w-full h-full flex">
          {/* slider card image */}
          <Image
            src={`${
                data?.backdrop_path
                ? "https://image.tmdb.org/t/p/original"+data?.backdrop_path
                : data?.poster_path
                ? "https://image.tmdb.org/t/p/original"+data?.poster_path
                : "https://fontawesome.com/social/film?f=classic&s=&v=5"
            }`}
            fill={true}
            alt="upcoming"
            className="w-fit h-fit"
          />
        </div>
        {/* slider card details that appear on hover */}
        <div className="absolute w-full h-full text-sm  opacity-0 group-hover:opacity-100 duration-1000 ease-in-out px-2 flex bg-black/70  items-center justify-between">
          <div className="flex flex-col text-left gap-3 text-white font-semibold">
            <p className="">{data.title}</p>
            <p className="font-normal">{data.release_date}</p>
            <button className="btn">
              <FaPlay />
              <span>Play Now</span>
            </button>
          </div>
          <MovieAddFavourite/>
        </div>
      </div>
    </Link>
  );
}
