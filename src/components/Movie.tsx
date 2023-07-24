import React from "react";
import Link from "next/link";
import Image from "next/image";

import defaultPoster from "../../public/01.jpg";

import { FaPlay } from "react-icons/fa6";
import { RiAddLine, RiHeartFill, RiVolumeMuteFill } from "react-icons/ri";
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
    <Link href={`/movies/${data.id}`}>
      <div className="relative my-5 w-full h-[160px] sm:w-[40vw] md:w-[28vw] lg:w-[22vw] xl:w-[270px] lg:h-[160px]  flex hover:z-10 hover:scale-[1.20] duration-[0.2s] group rounded-xl  border-[3px] border-white overflow-clip ">
        <div className="absolute  w-full h-full flex">
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

        <div className="absolute w-full h-full text-sm  opacity-0 group-hover:opacity-100 duration-1000 ease-in-out px-2 flex bg-black/70  items-center justify-between">
          <div className="flex flex-col text-left gap-3 text-white font-semibold">
            <p className="">{data.title}</p>
            <p className="font-normal">{data.release_date}</p>
            <button className="btn">
              <FaPlay />
              <span>Play Now</span>
            </button>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="h-10 w-10 p-1 flex justify-center items-center rounded-full bg-white/50">
              <div className="flex items-center justify-center rounded-full bg-white text-red-600 hover:text-white hover:bg-red-600 text-xl p-1">
                <RiVolumeMuteFill />
              </div>
            </div>
            <div className="h-10 w-10 p-1 flex justify-center items-center rounded-full bg-white/50">
              <div className="flex items-center justify-center rounded-full bg-white text-red-600 hover:text-white hover:bg-red-600 text-xl p-1">
                <RiHeartFill />
              </div>
            </div>
            <div className="h-10 w-10 p-1 flex justify-center items-center rounded-full bg-white/50">
              <div className="flex items-center justify-center rounded-full bg-white text-red-600 opacity-100 hover:text-white hover:bg-red-600 text-xl p-1">
                <RiAddLine />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
