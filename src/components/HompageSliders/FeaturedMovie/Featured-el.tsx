import Stars from "@/components/Stars/Stars";
import { MovieType } from "@/__generated_types/UsefulTypes";
import WatchTime from "@/components/WatchTime";

export const FeaturedMovieDetails: React.FC<{ data: MovieType }> = ({
  data,
}) => {
  return (
    <div className="lg:w-1/3">
      <h1 className="texture leading-[1.2]">{data.title}</h1>
      <Stars vote_average={data.vote_average} />
      <p>
        <span className="px-2 rounded-md bg-gray-400 text-xs">
          {data.vote_count}+
        </span>
        <WatchTime runtime={data.details.runtime} />
      </p>
      <p className="my-4">{data.overview}</p>
      <div className="flex items-center gap-4">
        <button className="p-3 px-7 btn">Play Now</button>
        <a href={`/movie/${data.id}`}>
          <p className="hover:text-red-600">More Details</p>
        </a>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FeaturedMovieImage = (url: any) => {
  return (
    <div className="relative w-full lg:w-2/3 rounded-xl overflow-clip">
      <img
        src={`${
          url
            ? `${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX+url.url}`
            : "https://fontawesome.com/social/film?f=classic&s=&v=5"
        }`}
        alt="featured"
        className="!relative w-full h-[400px] max-h-[400px]"
      />
    </div>
  );
};
