import Stars from "@/components/Stars/Stars";
import Image from "next/image"
import Link
 from "next/link";
export const FeaturedMovieDetails =({data}:FeaturedMovieDetails)=>{
    return (
        <div className="lg:w-1/3">
          <h1 className="texture leading-[1.2]">
            {data.title}
          </h1>
          <Stars vote_average={8.0}/>
          <p className="my-4">
            {data.overview}
          </p>
          <div className="flex items-center gap-4">
            <button className="p-3 px-7 btn">Play Now</button>
            <Link
              href={`/movies/${data.id
              }`}
            >
              <p className="hover:text-red-600">More Details</p>
            </Link>
          </div>
        </div>
    )
}

export const FeaturedMovieImage=({url}:String)=>{
    return (
        <div className="relative w-full lg:w-2/3 rounded-xl overflow-clip">
          <Image
            src={`${url ? url: "https://fontawesome.com/social/film?f=classic&s=&v=5"
            }`}
            fill={true}
            alt="featured"
            className="!relative w-full h-[400px] max-h-[400px]"
          />
        </div>
    )
}