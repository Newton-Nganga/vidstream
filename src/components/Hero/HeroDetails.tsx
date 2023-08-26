import React from "react";
import { FaPlay } from "react-icons/fa";
import logo from "@assets/images/logo.png"
import WatchTime from "../WatchTime";
import { MovieType,ShowType } from "@/__generated_types/UsefulTypes";
type Props = {
  trending: (MovieType | ShowType)[];
  children: React.ReactNode;
};

function HeroDetails({ trending, children }: Props) {
  return (
    <>
      {trending?.reverse().map((trending) => {
        return (
          <div
            key={trending?.id}
            className="relative  w-full h-[680px] overflow-clip"
          >
            {/* The backgroung image at the hero section */}

            <img
              src={
                `${process.env.NEXT_PUBLIC_IMAGE_PREFIX}${trending?.backdrop_path}` ??
                `${process.env.NEXT_PUBLIC_IMAGE_PREFIX}${trending?.poster_path}` ??
                "https://fontawesome.com/social/film?f=classic&s=&v=5"
              }
              alt={"title" in trending ? trending.title : trending.name}
              className="absolute h-full w-full"
            />

            {/* The details of the movie or show */}

            <div className="hero-movie-details-wrapper">
              <div className="hero-movie-details-container">
                <div className="hero-logo">
                  <img src={logo} alt="logo" className="w-[130px]" />
                </div>
                <h1 className="texture trending-title">
                  {"title" in trending ? trending?.title : trending?.name}
                </h1>
                <div className="mb-8">
                  <div className="flex items-center gap-4 text-sm lg:text-xl font-normal">
                    <span className=" px-2 rounded-md bg-gray-400">
                      {"vote_count" in trending ? trending.vote_count : "10 +"}
                    </span>
                    <p>
                      {"media_type" in trending
                        ? trending.media_type
                        : trending.details.media_type}
                      <span>
                        {"runtime" in trending.details ? (
                          <WatchTime runtime={trending.details.runtime} />
                        ) : (
                          `${trending.details.number_of_seasons} Seasons`
                        )}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm md:text-base w-[70vw] md:w-[35%] mb-8">
                    {trending?.overview.length > 217
                      ? trending?.overview.slice(0, 217) + "..."
                      : trending?.overview}
                  </p>
                </div>
                <div className="mb-8">
                  <div className="flex gap-4 items-center w-fit">
                    <a
                      href={`/${
                        "media_type" in trending
                          ? trending.media_type
                          : trending.details.media_type
                      }/${trending?.id}`}
                    >
                      <button className="md:px-6 md:p-3 gap-2 btn">
                        <FaPlay />
                        <span>Play Now</span>
                      </button>
                    </a>
                    <a
                      href={`/${
                        "media_type" in trending
                          ? trending.media_type
                          : trending.details.media_type
                      }/${trending?.id}`}
                    >
                      <p className="text-lg hover:text-red-600">+My List</p>
                    </a>
                  </div>
                </div>
              </div>
              {children}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default HeroDetails;
