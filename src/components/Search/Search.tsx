
type Movie = {
  name: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  release: any;
  media_type: string;
};
type Prop = {
  movie: Movie;
};

export default function Search({ movie }: Prop) {
  return (
    <a
      href={
        movie.media_type === "tv" ? `/shows/${movie.id}` : `/movies/${movie.id}`
      }
    >
      <div className="min-w-[150px] group w-1/2 md:w-1/3 lg:w-[180px] flex flex-col sm:m-3">
        <div className="relative w-full h-[200px]  rounded-md overflow-clip">
          <img
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path
                ? movie?.poster_path
                : movie?.backdrop_path
            }`}
            alt={movie.name}
            className="group-hover:scale-110"
          />
        </div>

        <div className="w-full my-2">
          <p className="text-sm uppercase font-semibold">{movie?.name}</p>
          <p className="flex justify-between items-center text-xs pt-3">
            {movie.release}
            <span className="bg-gray-700 rounded-md px-1 p-[2px]">
              {movie.media_type}
            </span>
          </p>
        </div>
      </div>
    </a>
  );
}
