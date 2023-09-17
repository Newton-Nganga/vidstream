

import InnerPage from '@/components/InnerPages/InnerPages'
import CollectionCard from '@/components/CollectionsCard/CollectionCard'
import {useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'


type Watchlist={
  id:string,
  movie_id:string | number
  movie_title:string 
  backdrop_path:string 
  poster_path:string 
  media_type:string 
  collectionId:string
}

export default function WatchlistPage() {
    const [list,setList] = useState([])
    const {userId} = useParams()
    const url = `${import.meta.env.VITE_CLIENTS_SERVER_URL}/users/${userId}/watchlist`
    //fetch the watchlist movies for the user
    useEffect(()=>{
        async function fetchWatchlist(){
          const response = await  axios.get(url)
          if(response.status !== 200){
            toast.error("An error occurred whilst fetching the watchlist movies")
          }
          console.log("The response after fetching favourites:",response)
          setList(response.data.watchlist)
        }
        fetchWatchlist()
    },[list])
  return (
    <InnerPage title='My Watchlist'>
      <section className='section'>
        <div className='inner-section flex gap-2'>
            {list?.map(({...watchlist}:Watchlist)=><CollectionCard key={watchlist.id} data={watchlist} type='watchlist'/>)}
          
        </div>
      </section>
    </InnerPage>
  )
}