import { MovieType, ShowType } from "@/__generated_types/UsefulTypes";
import WatchTime from "@/components/WatchTime";
import logo from "@assets/images/logo.png";
import { FaPlay } from "react-icons/fa";

type DataProps = {
  movie: MovieType | ShowType;
  activeSlide: number;
  index:number
};

export function DetailsTopSlider({ movie,index, activeSlide }: DataProps) {
  return (
        <div
          key={movie.id}
          className={`${
            activeSlide === index ? "slide-active" : "border-white"
          } slide-item`}
        >
          <img
            src={
              `${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}${
                movie?.backdrop_path
              }` ??
              `${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}${
                movie?.poster_path
              }` ??
              "https://fontawesome.com/social/film?f=classic&s=&v=5"
            }
            alt={"name" in movie ? movie.name : movie.title}
            className="absolute h-full w-full rounded-xl"
          />
        </div>
  );
}
export default function DetailsSlider({ movie}: DataProps) {
  //console.log("release_date" in movie ? movie.release_date : "no release date");
  return (
        <div
          key={movie.id}
          className="relative my-4 w-full h-[650px] rounded-xl overflow-clip"
        >
          <img
            src={
              `${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}${
                movie?.backdrop_path
              }` ??
              `${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}${
                movie?.poster_path
              }` ??
              "https://fontawesome.com/social/film?f=classic&s=&v=5"
            }
            alt={"name" in movie ? movie.name : movie.title}
            className="absolute h-full w-full"
          />
          <div className="absolute px-4 sm:px-12 z-10 bg-gradient-to-r from-black/95 from-10% via-black/70 via-40% to-black/5 to-90%  w-full h-full">
            <div className="flex flex-col py-4 text-white">
              <div className="w-fit sm:w-[255px] p-3 pr-4 mb-8 mr-auto bg-red-600/40 border-r-4 border-l-4 border-red-600">
                <img src={logo} alt="logo" className="w-[130px]" />
              </div>
              <h1 className="texture my-4 w-fit mr-auto">
                {"title" in movie ? movie?.title : movie?.name}
              </h1>

              <div className="mb-8">
                <div className="flex items-center gap-4 text-sm md:text-xl font-normal">
                  <span className="bg-slate-400 rounded-md px-2">{"vote_count" in movie ? movie.vote_count : 10}+</span>
                  <span>
                    {"runtime" in movie.details ? (
                      <WatchTime runtime={movie.details.runtime} />
                    ) : (
                      `${movie.details.number_of_seasons} Seasons .`
                    )}
                  </span>
                  {"release_date" in movie
                    ? new Date(movie?.release_date).getFullYear()
                    : new Date(movie.details?.last_air_date).getFullYear()}
                </div>
              </div>
              <div>
                <p className="w-[90%] md:w-[35%] mb-8 text-[15px]">{movie?.overview.slice(0,300)}...</p>
              </div>
              <div className="mb-8">
                <div className="flex gap-4 items-center">
                  <a
                    href={`/${
                      "media_type" in movie
                        ? movie.media_type
                        : "tv"
                    }/${movie.id}`}
                  >
                    <button className="px-6 p-3 gap-2 btn">
                      <FaPlay />
                      <span className="text-sm">Play Now</span>
                    </button>
                  </a>
                  <p className="text-lg hover:text-red-600">+My List</p>
                </div>
              </div>
              <div>
                <div className="text-sm md:text-lg">
                  <p>
                    <span className="text-red-600 font-semibold">Genres:</span>{" "}
                    {movie.details.genres.map(({ name }, index: number) => (
                      <span className="text-sm" key={index}>{name}, </span>
                    ))}
                  </p>
                  <p>
                    <span className="text-red-600 font-semibold">Crew:</span>{" "}
                    {movie.credits?.crew?.slice(0,3).map(({ name,id }) => (
                      <span className="text-sm" key={id}>{name} , </span>
                    ))}...
                  </p>
                  <p>
                    <span className="text-red-600 font-semibold">Actors:</span>{" "}
                    {movie.credits?.cast?.slice(0,3).map(({ name,id }) => (
                      <span className="text-sm" key={id}>{name} , </span>
                    ))}...
                  </p>
                  <p>
                    <span className="text-red-600 font-semibold">Type:</span>
                    <span className="p-2 py-1 ml-2 bg-red-500 rounded-md text-sm">
                      {"media_type" in movie
                        ? movie.media_type
                        : movie.details.media_type}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
