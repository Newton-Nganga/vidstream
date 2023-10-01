

import CollectionCard from '@/components/CollectionsCard/CollectionCard'
import InnerPage from '@/components/InnerPages/InnerPages'
import {useState,useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useUser } from '@clerk/clerk-react'



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

  const {isLoaded,user} = useUser()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkIfClerkIsInitialized = async():Promise<void>=>{
    //check if clerk is initialized && isLoaded === true
    //else await for 100ms then call the while loop again
     while(!isLoaded || !isLoaded == null){
       await new Promise(resolve => setTimeout(resolve,100))
     }
   }
   checkIfClerkIsInitialized()
    
    const url = `${import.meta.env.VITE_CLIENTS_SERVER_URL}/users/${user?.id}/favourites`
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

