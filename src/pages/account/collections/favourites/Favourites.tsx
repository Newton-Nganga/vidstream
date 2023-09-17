

import CollectionCard from '@/components/CollectionsCard/CollectionCard'
import InnerPage from '@/components/InnerPages/InnerPages'
import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'


type Favourite={
  id:string,
  movie_id:string | number
  movie_title:string 
  backdrop_path:string 
  poster_path:string 
  media_type:string 
  collectionId:string
}
export default function FavouritesPage() {
  const [list,setList] = useState([])
    const {userId} = useParams()
    const url = `${import.meta.env.VITE_CLIENTS_SERVER_URL}/users/${userId}/favourites`
    //fetch the watchlist movies for the user
    useEffect(()=>{
        async function fetchFavourites(){
          const response = await  axios.get(url)
          if(response.status !== 200){
            toast.error("An error occurred whilst fetching the watchlist movies")
          }
          //console.log("The response after fetching favourites:",response)
          setList(response.data.favorites)
        }
        fetchFavourites()
    },[list])

  return (
    <InnerPage title='Favourites'>
      <section className='section'>
        <div className='inner-section flex gap-2'>
        {list?.map(({...favourite}:Favourite)=><CollectionCard key={favourite.id} data={favourite} type="favourites"/>)}
        </div>
      </section>
    </InnerPage>
  )
}

