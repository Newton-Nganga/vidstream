"use client"
import React from 'react'

type Props = {
    children:any
}

import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import useFeaturedMovie from '../../Utils/useFeaturedMovie';

export default function VidstreamPage({children}: Props) {

  const featured = useFeaturedMovie()
  const featuredMovieUrl = featured && featured.length > 0 && featured[Math.floor(featured.length / 3)].backdrop_path ?
  "https://image.tmdb.org/t/p/original"+featured[Math.floor(featured.length / 3)].backdrop_path : 
  featured && featured[Math.floor(featured.length / 3)].poster_path ?
  "https://image.tmdb.org/t/p/original"+featured[Math.floor(featured?.length / 3)].poster_path :
  "https://fontawesome.com/social/film?f=classic&s=&v=5" 

    return (
      <main
        className={` flex  flex-col bg-cover bg-no-repeat bg-center bg-fixed h-auto `}
        style={{backgroundImage:`url(${featuredMovieUrl})`}}
       // className={` flex  flex-col bg-cover bg-no-repeat bg-center bg-fixed bg-[url("https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg")] h-auto `} 
      >
        <Navbar />
        {children}
        <Footer />
      </main>
    );
  }