import { FaPlay } from "react-icons/fa6";
import MovieAddFavourite from "./MovieRating-el";
import WatchTime from "@/components/WatchTime";
import { MovieType, ShowType } from "@/__generated_types/UsefulTypes";

interface Props {
  data: MovieType | ShowType;
}

export default function Movie({ data }: Props) {
  const imagePath =
    `${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}${data?.backdrop_path}` ??
    `${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}${data?.poster_path}` ??
    "https://fontawesome.com/social/film?f=classic&s=&v=5";

  const mediaType =
    "media_type" in data ? data.media_type : data.details.media_type;
  const title = "title" in data ? data.title : data.name;

  return (
    <a href={`/${mediaType === "movie"? "movie":"tv"}/${data.id}`} data-placeholder_moviesection>
      <div className="relative my-5 w-full h-[160px] sm:w-[40vw] md:w-[28vw] lg:w-[22vw] xl:w-[285px] lg:h-[160px]  flex hover:z-10 hover:scale-[1.1] duration-[0.2s] group rounded-xl  border-[3px] border-white overflow-clip">
        <div className="absolute  w-full h-full flex">
          {/* slider card image */}
          <img src={`${imagePath}`} alt={title} className="w-full h-full" />
        </div>
        {/* slider card details that appear on hover */}
        <div className="absolute w-full h-full text-sm  opacity-0 group-hover:opacity-100 duration-1000 ease-in-out px-2 flex bg-black/70  items-center justify-between">
          <div className="flex flex-col text-left gap-3 text-white font-semibold">
            <p className="">{title}</p>
            <p className="font-normal text-[11px]">
              <span className="p-1 py-[2px] bg-slate-400 rounded-md mr-2 ">
                {"vote_count" in data ? data.vote_count : 10}+
              </span>
              {"runtime" in data.details ? (
                <WatchTime runtime={data?.details.runtime} />
              ) : (
                `${data?.details?.number_of_seasons} Seasons`
              )}
            </p>
            <button className="btn">
              <FaPlay />
              <span>Play Now</span>
            </button>
          </div>
          <MovieAddFavourite />
        </div>
      </div>
    </a>
  );
}
