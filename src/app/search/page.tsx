"use client"
import Movie from '@/components/Movie'
import InnerPage from '@/components/Pages/InnerPages'
import { useSearchParams } from 'next/navigation'
import React,{useState,useEffect} from 'react'
import axios,{AxiosRequestConfig} from 'axios'
import MoviesCarousel from '@/components/MoviesCarousel'


type Props = {}
interface Movies{
  title: string;
  id: number;
  backdrop_path: string;
  poster_path:string
  release_date: any;
}


export default function Page({}: Props) {
      //get the query parameter
      const searchParams = useSearchParams()
    //path /query/s="movies"
      const search = searchParams.get('query')
    const [movieresults,setMovieResults] = useState<Movies[] | null>(null)
    const [showresults,setShowResults] = useState<Movies[] | null>(null)
    const quryMovieOptions: AxiosRequestConfig = {
      method: "GET",
      url: `${process.env.BASE_ENDPOINT}movie?query=${search}&include_adult=true&language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization: process.env.API_AUTHORIZATION_TOKEN,
      },
    };
  const quryShowOptions: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.BASE_ENDPOINT}tv?query=${search}&include_adult=true&language=en-US&page=1`,
    headers: {
      accept: "application/json",
      Authorization: process.env.API_AUTHORIZATION_TOKEN,
    },
  };
 
  
  
    useEffect(() => {
      async function getSearch() {
        try {
          const qMovieResponse = await axios.request(quryMovieOptions);
          const qShowResponse = await axios.request(quryShowOptions);

          const qshow_data: Movies[] = qShowResponse.data.response.map(
            ({ name:title, id, backdrop_path, release_date, ...others }: any) => {
              return { title, id, backdrop_path, release_date } as Movies;
            }
          );
          const qmovie_data: Movies[] = qMovieResponse.data.response.map(
            ({ title, id, backdrop_path, release_date, ...others }: any) => {
              return { title, id, backdrop_path, release_date } as Movies;
            }
          );
          //const combinedData: Movies[] = qmovie_data.concat(qshow_data);
          setMovieResults(qmovie_data);
          setShowResults(qshow_data);
        } catch (error) {
          console.log(error);
        }
      }
      getSearch();
      //eslint-disable-next-line
    }, []);
  
    

  return (
    <InnerPage>
        <section className='section'>
            <div className='inner-section'>
               <h2>search results for {search}</h2>
               {/* map through the movies */}
               <div className='flex flex-wrap gap-4 w-full '>
               {/* {results?.map((movie:Movies,index:number)=>(
                 <Movie key={index} data={movie}/>
                ))} */}
                <MoviesCarousel title="Movies" movies={movieresults}/>
                <MoviesCarousel title="Tv Shows" movies={showresults}/>
               </div>
            </div>
        </section>
    </InnerPage>
  )
}