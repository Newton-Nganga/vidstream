"use client"
export const dynamic="force-dynamic"
import MovieCard from "@/components/MovieCards";
import InnerPage from "@/components/Pages/InnerPages";
import SearchShowsOrMovies from "@/components/Queries/Search";
import { MovieType, ShowType } from "@/components/UsefulTypes";
import { useState } from "react";


type Props = {};

export default  function Page({}: Props) {
  const [keyword,setKeyword] = useState<String>('')
   let movieResults:(MovieType|ShowType)[]=[]
   
   const handleSearch=async ()=>{
   const movieResults = await SearchShowsOrMovies(keyword)
   return movieResults
  }
 
  return (
    <InnerPage>
      <section className="section">
        <div className="inner-section">
          <div className="relative w-full rounded-[30px] text-base">
            <input 
            type="search" 
            onChange={(e)=>setKeyword(e.target.value)}
            placeholder="Search for movies or shows by their titles"
            className="bg-transparent py-3 w-full relative"/>
            <button 
            onClick={handleSearch}
            className="p-3 rounded-[30px] absolute right-0 shadow">Search</button>
          </div>
          <h2>search results for &apos; {keyword} &apos;</h2>
          {/* map through the movies results */}
          <div className="flex flex-wrap gap-4 w-full justify-center ">
            {movieResults?.map((el) => (
              <MovieCard data={el} key={el.id}/>
            ))}
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
