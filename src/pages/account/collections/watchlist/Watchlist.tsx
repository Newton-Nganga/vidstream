

import InnerPage from '@/components/InnerPages/InnerPages'
import CollectionCard from '@/components/CollectionsCard/CollectionCard'
import {useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'



export default function WatchlistPage() {
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
    <InnerPage title='My Watchlist'>
      <section className='section'>
        <div className='inner-section'>
            {list?.map(watch=><CollectionCard key={watch.id}/>)}
          <CollectionCard/>
        </div>
      </section>
    </InnerPage>
  )
}