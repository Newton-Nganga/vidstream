import { FullMovieType, FullShowType } from "@/__generated_types/UsefulTypes";
import {HiOutlinePlayCircle} from 'react-icons/hi2'
import WatchTime from "../WatchTime";

type Props = {
    data:FullShowType | FullMovieType 
};

export default function GenreCard({data}: Props) {
    
  return (
    <a
      href={"title" in data ?`/movie/${data.id}` :`/tv/${data.id}`}
      className="m-2 overflow-clip relative rounded-md"
    >
      <div className="group relative flex flex-col h-[300px] w-[200px] object-contain overflow-clip">
        <div className="absolute w-full h-full">
          <img
            src={`${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}${
              data.poster_path ? data.poster_path : data.backdrop_path
            }`}
          />
        </div>
        <div className="flex flex-col items-center justify-end mb-4 scale-0 group-hover:scale-100 duration-500 origin-bottom absolute w-full h-full bg-gradient-to-b from-black/30 from-30% via-black/60 via-60% to-black/80 to-99%">
          <div className="text-[6rem]">
            <HiOutlinePlayCircle />
          </div>
          <p className="py-3 text-xl font-semibold text-white hover:text-red-600">
            {"name" in data ? data.name : data.title}
          </p>
          <span className="text-base">
            {
                "name" in data ?
                `${data.details.number_of_seasons} Seasons`
                :<WatchTime runtime={data.details.runtime}/>
            }
            
          </span>
        </div>
      </div>
    </a>
  );
}
