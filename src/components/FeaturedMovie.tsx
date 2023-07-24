"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import defaultPoster from "../../public/07.jpg";
import Link from "next/link";
import axios, { AxiosRequestConfig } from "axios";

type Props = {};

interface Movies {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  release_date: any;
  overview: string;
}
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

export default function FeaturedMovie({}: Props) {
  const [featured, setSuggested] = useState<Movies[] | null>(null);
  const featuredShowsOptions: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}discover/tv`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };

  useEffect(() => {
    async function getSimilar() {
      // console.log('popular function started')
      try {
        //   console.log("trying ...")
        const featuredResponse = await axios.request(featuredShowsOptions);

        //   console.log("popular response", popularResponse);
        const featured_data: Movies[] = featuredResponse.data.results.map(
          ({
            name: title,
            id,
            backdrop_path,
            overview,
            poster_path,
            release_date,
            ...others
          }: any) => {
            return {
              title,
              id,
              backdrop_path,
              overview,
              poster_path,
              release_date,
            } as Movies;
          }
        );
        //console.log("popular shows",popular_data);

        setSuggested(featured_data);
      } catch (error) {
        console.log(error);
      }
    }
    getSimilar();
    //eslint-disable-next-line
  }, []);

  //   if (popular && popular.length > 0) {
  //     console.log("popular ->", popular);
  //   }

  return (
    <section className={`w-full bg-black/70`}>
      <div className="flex flex-col lg:flex-row my-16 text-white items-center justify-between gap-5 bg-transparent inner-section m-auto">
        <div className="lg:w-1/3">
          <h1 className="texture leading-[1.2]">{featured && featured.length > 0 && featured[Math.floor(featured.length / 2)].title}</h1>
          <div className="flex items-center gap-4 my-3">
            <p className="flex gap-1 text-red-600">
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStar />
            </p>
            <span>8.0(imdb)</span>
          </div>
          <p className="my-4">
            {featured && featured.length > 0 && featured[Math.floor(featured.length / 2)].overview}
          </p>
          <div className="flex items-center gap-4">
            <button className="p-3 px-7 btn">Play Now</button>
            <Link
              href={`/movies/${
                featured && featured.length > 0 && featured[Math.floor(featured.length / 3)].id
              }`}
            >
              <p className="hover:text-red-600">More Details</p>
            </Link>
          </div>
        </div>
        <div className="relative w-full lg:w-2/3 rounded-xl overflow-clip">
          <Image
            src={`${
              featured && featured.length > 0 && featured[Math.floor(featured.length / 3)].backdrop_path ?
              "https://image.tmdb.org/t/p/original"+featured[Math.floor(featured.length / 3)].backdrop_path : 
              featured && featured[Math.floor(featured.length / 3)].poster_path ?
              "https://image.tmdb.org/t/p/original"+featured[Math.floor(featured?.length / 3)].poster_path :
              "https://fontawesome.com/social/film?f=classic&s=&v=5"
            }`}
            fill={true}
            alt="featured"
            className="!relative w-full h-[400px]"
          />
        </div>
      </div>
    </section>
  );
}
