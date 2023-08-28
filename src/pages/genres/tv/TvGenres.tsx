

import { MovieType } from '@/__generated_types/UsefulTypes'
import InnerPage from '@/components/InnerPages/InnerPages'
import { useQuerygit ,gql } from '@apollo/client'
import {HiOutlinePlayCircle} from 'react-icons/hi2'
import { useParams } from 'react-router-dom'


const GET_GENRE=gql`
query GetByGenres($genreID:Int){
  genreShows(genre: $genreID){
    name
      id
      original_name
      overview
      poster_path
      popularity
      origin_country
      backdrop_path
      details {
        media_type
        number_of_seasons
    }
  }
}
`


export default function TvGenres() {
    const {id,genre}= useParams()
    const showID = id ? parseInt(id) : null
    const {loading,error,data}= useQuery(GET_GENRE,{variables:{genreID:showID}})
    if(loading){
        return <p>Loading ...</p>
     }
     if(error){
        return <p>Error : {error.message}</p>
     }
      
  return (
    <InnerPage>
        <section className='section'>
            <div className='inner-section'>
           <h1>Genre : {genre}</h1>
           <div className='flex flex-wrap justify-center'>
            {data.genreShows.map((show)=>(
                <a href={`/tv/${show.id}`} className='m-2 overflow-clip relative rounded-md'>
                <div className='group relative flex flex-col h-[300px] w-[200px] object-contain overflow-clip'>
                  <div className='absolute w-full h-full'>
                   <img src={`${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}${show.poster_path?show.poster_path:show.backdrop_path}`}/>
                  </div>
                  <div className='flex flex-col items-center justify-end mb-4 scale-0 group-hover:scale-100 duration-500 origin-bottom absolute w-full h-full bg-gradient-to-b from-black/30 from-30% via-black/60 via-60% to-black/80 to-99%'>
                   <div className='text-[6rem]'>
                     <HiOutlinePlayCircle/>
                   </div>
                   <p className='py-3 text-xl font-semibold text-white hover:text-red-600'>{show.name}</p>
                   <span className='text-base'>{show.details.number_of_seasons} Seasons</span>
                  </div>
                </div>
                </a>
            ))}
            </div>
            </div>
        </section>
    </InnerPage>
  )
}