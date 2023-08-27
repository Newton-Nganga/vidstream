import { MovieType } from "@/__generated_types/UsefulTypes";
import WatchTime from "@/components/WatchTime";
import { FaPlay } from "react-icons/fa";

type Props = {
  movie: MovieType;
};

export const TopMoviesBackground = ({ movie }: Props) => {
  return (
        <div key={movie.id} className="relative w-full h-[500px] md:h-[600px]">
          <img
            sizes=""
            src={
              `${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}${
                movie?.backdrop_path
              }` ??
              `${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}${
                movie?.poster_path
              }` ??
              "https://fontawesome.com/social/film?f=classic&s=&v=5"
            }
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute block w-full h-full bg-black/25"></span>
        </div>
  );
};

type SliderType = {
  movie: MovieType;
  activeSlide: number;
  index:number
};
export const TopMoviesSlider = ({ movie, activeSlide,index }: SliderType) => {
  return (
        <div
          key={movie?.id}
          className={`${
            activeSlide === index ? "topmovie-active-slide " : "border-white"
          } !w-[200px] !h-[110px] overflow-clip my-2  slide-item group`}
        >
          <img
            sizes=""
            src={
              `${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}${
                movie?.backdrop_path
              }` ??
              `${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}${
                movie?.poster_path
              }` ??
              "https://fontawesome.com/social/film?f=classic&s=&v=5"
            }
            alt={movie.title}
            className="h-full w-full"
          />
          <div className="hidden group-[.topmovie-active-slide]:flex group-[.topmovie-active-slide]:flex-col justify-between bg-black/50 px-3 py-1 absolute h-full w-full">
            <p>{movie?.title}</p>
            <div className="flex gap-2 items-center">
              <span>{movie.vote_count}+</span>
              <WatchTime runtime={movie.details.runtime} />
            </div>
            <a href={`/movie/${movie?.id}`}>
              <button className="btn">
                <FaPlay className="" />
                Play Now
              </button>
            </a>
          </div>
        </div>
  );
};
