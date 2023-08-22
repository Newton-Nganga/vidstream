
import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { GET_FEATURED_MOVIE } from "../Queries/FeaturedMovieImageUrl";
import { getClient } from "@/app/lib/client";

type Props = {
  children: any;
};

interface Response{
  featuredMovie:{
  id:number
  media_type:string
  backdrop_path:string
  poster_path:string
  }
}

export default async function VidstreamPage({ children }: Props) {
 
    const {data:{featuredMovie}} = await getClient().query<Response>({query:GET_FEATURED_MOVIE})

  // const {data:{featuredMovie}} = useSuspenseQuery<any>(GET_FEATURED_MOVIE)
  
 const featuredMovieUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${featuredMovie.backdrop_path ? featuredMovie.backdrop_path: featuredMovie.poster_path}`
  return (
    <main
      className={` flex  flex-col bg-cover bg-no-repeat bg-center bg-fixed h-auto `}
      style={{ backgroundImage: `url(${featuredMovieUrl})` }}
    >
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
