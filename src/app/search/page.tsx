"use client"
import Movie from '@/components/Movie'
import InnerPage from '@/components/Pages/InnerPages'
import { useSearchParams } from 'next/navigation'
import React,{useState,useEffect} from 'react'
import axios,{AxiosRequestConfig} from 'axios'


type Props = {}

export default function Page({}: Props) {
    //get the query parameter
    const searchParams = useSearchParams()
 
    const search = searchParams.get('query')
    //path /query/s="movies"
    const [similarMovies, setSimilarMovies] = useState<Movies[] | null>(null);
    const similarOptions: AxiosRequestConfig = {
      method: "GET",
      url: `${process.env.BASE_ENDPOINT}movie/${id}/similar`,
      headers: {
        accept: "application/json",
        Authorization: process.env.API_AUTHORIZATION_TOKEN,
      },
    };
  
    useEffect(() => {
      async function getUpcoming() {
        try {
          const similarResponse = await axios.request(similarOptions);
  
          const similar_data: Movies[] = similarResponse.data.response.map(
            ({ title, id, backdrop_path, release_date, ...others }: any) => {
              return { title, id, backdrop_path, release_date } as Movies;
            }
          );
          setSimilarMovies(similar_data);
        } catch (error) {
          console.log(error);
        }
      }
      getUpcoming();
    }, []);
  
    

  return (
    <InnerPage>
        <section className='section'>
            <div className='inner-section'>
               <h2>search results for string</h2>
               {/* map through the movies */}
               <div className='flex flex-wrap gap-4 w-full '>
                    <Movie />
               </div>
            </div>
        </section>
    </InnerPage>
  )
}