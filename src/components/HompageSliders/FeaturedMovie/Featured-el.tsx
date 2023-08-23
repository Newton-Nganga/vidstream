import Stars from "@/components/Stars/Stars";
import { MovieType } from "@/components/UsefulTypes";
import WatchTime from "@/components/WatchTime";
import Image from "next/image"
import Link from "next/link";


export const FeaturedMovieDetails:React.FC<{data: MovieType}> =({data})=>{
    return (
        <div className="lg:w-1/3">
          <h1 className="texture leading-[1.2]">
            {data.title}
          </h1>
          <Stars vote_average={data.vote_average}/>
          <p>
            <span className="px-2 rounded-md bg-gray-400 text-xs">
              {data.vote_count}+
            </span>
          <WatchTime runtime={data.details.runtime}/>
          </p>
          <p className="my-4">
            {data.overview}
          </p>
          <div className="flex items-center gap-4">
            <button className="p-3 px-7 btn">Play Now</button>
            <Link href={`/movie/${data.id}`}>
              <p className="hover:text-red-600">More Details</p>
            </Link>
          </div>
        </div>
    )
}

export const FeaturedMovieImage=(url:any)=>{
    return (
        <div className="relative w-full lg:w-2/3 rounded-xl overflow-clip">
          <Image
            src={`${url ? `${process.env.NEXT_PUBLIC_IMAGE_PREFIX}${url}`: "https://fontawesome.com/social/film?f=classic&s=&v=5"
            }`}
            fill={true}
            alt="featured"
            className="!relative w-full h-[400px] max-h-[400px]"
          />
        </div>
    )
}