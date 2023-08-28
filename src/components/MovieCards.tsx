import { MovieType, ShowType } from "../__generated_types/UsefulTypes";
import WatchTime from "./WatchTime";
import Placeholder from "@assets/images/placehoder.png"
type Props = {
  data: MovieType | ShowType;
};
export default function MovieCard({ data }: Props) {
  return (
    <a href={"title" in data? `/movie/${data.id}`: `/tv/${data.id}`}>
    <div className="bg-[#040718] relative w-[180px] h-[200px] rounded-[20px] flex flex-col gap-2 overflow-clip">
      <div className="relative h-[120px] w-full rounded-[20px] overflow-clip">
        <img
          src={!data.backdrop_path && ! data.poster_path? Placeholder :`${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}${
            data.backdrop_path 
            ? data.backdrop_path
            : data.poster_path 
          }`}
          alt=""
          sizes=""
          className="absolute w-full h-full"
        />
      </div>
      <div className="text-left p-2">
        <p className="text-sm">{"name" in data ? data.name.slice(0,40) : data.title.slice(0,40)}</p>
        {"runtime" in data.details ? (
          <WatchTime runtime={data.details.runtime} />
        ) : (
          data.details.number_of_seasons + " Seasons"
        )}
      </div>
    </div>
    </a>
  );
}
