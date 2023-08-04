import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
type Movie ={
    name: string;
    id: number;
    backdrop_path: string;
    poster_path: string;
    release: any;
    media_type:string 
}
type Prop = {
 movie:Movie
}

export default function Search({movie}: Prop) {
  return (
   <Link href={movie.media_type === "tv"?`/show/${movie.id}`:`/movie/${movie.id}`}>
    <div className='w-1/2 md:w-1/3 lg:w-[200px] h-[250px] flex flex-col'>
        <Image src={"https://image.tmdb.org/t/p/original" + movie?.poster_path ? movie?.poster_path:movie?.backdrop_path} alt={movie.name} className='h-[200px] w-full rounded-md'/>
        <div className='w-full'>
            <p className='text-sm capitalize'>{movie?.name}</p>
            <p className='flex justify-between items-center text-xs'>{new Date(movie.release).getFullYear()} . {new Date(movie.release).getMinutes()} min <span className='bg-gray-700 rounded-sm p-[2px]'>{movie.media_type}</span></p>
        </div>
    </div>
   </Link>
  )
}