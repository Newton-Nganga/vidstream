

import CollectionCard from '@/components/CollectionsCard/CollectionCard'
import InnerPage from '@/components/InnerPages/InnerPages'
import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'



export default function FavouritesPage() {
  const [list,setList] = useState(null)
    const {userId} = useParams()
    const url = import.meta.env.VITE_CLIENTS_SERVER + `/users/${userId}/watchlist`
    //fetch the watchlist movies for the user
    useEffect(()=>{
        async function fetchWatchlist(){
          const response = await  axios.get(url)
          if(response.status !== 200){
            return "An error occurred whilst fetching the watchlist movies"
          }
          setList(response.data)
        }
        fetchWatchlist()
    },[])
  return (
    <InnerPage title='Favourites'>
      <section className='section'>
        <div className='inner-section'>
        {list?.map(favourite=><CollectionCard key={favourite.id}/>)}
          <CollectionCard/>
        </div>
      </section>
    </InnerPage>
  )
}

