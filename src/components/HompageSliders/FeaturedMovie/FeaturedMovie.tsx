import Image from "next/image";
import Link from "next/link";

type Props = {};


import useFeaturedMovie from "../../../../Utils/useFeaturedMovie";
import { FeaturedMovieDetails, FeaturedMovieImage } from "./Featured-el";

export default function FeaturedMovie({}: Props) {
  //  query for the featured movie
  //Required details are:
  //* title,description ,backdrop,id,watchtime,genres
  return (
    <section className={`w-full bg-black/70`}>
      <div className="flex flex-col lg:flex-row my-16 text-white items-center justify-between gap-5 bg-transparent inner-section m-auto">
        <FeaturedMovieDetails movie={movie}/>
        {/* pass the url enpoint */}
        <FeaturedMovieImage url={""}/>
      </div>
    </section>
  );
}
