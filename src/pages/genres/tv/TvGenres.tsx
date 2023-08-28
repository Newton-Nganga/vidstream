

import { FullShowType} from '@/__generated_types/UsefulTypes'
import GenreCard from '@/components/GenreCard/GenreCard'
import InnerPage from '@/components/InnerPages/InnerPages'
import { useQuery,gql } from '@apollo/client'

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
            {data.genreShows.map((show:FullShowType)=>(
               <GenreCard data={show}/>
            ))}
            </div>
            </div>
        </section>
    </InnerPage>
  )
}