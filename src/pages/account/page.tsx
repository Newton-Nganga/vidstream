

import InnerPage from '@/components/InnerPages/InnerPages'

import userFallbackImage from "@assets/images/user.png";
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface ListType{
  id:string,
  movie_id:string | number
  movie_title:string 
  backdrop_path:string 
  poster_path:string 
  media_type:string 
  collectionId:string
}
type ListingElProps={
    fieldname:string 
    data:ListType[]
}
const ListingEl=({fieldname,data}:ListingElProps)=>{

  return(
    <div className='w-full flex flex-col bg-[#081523] rounded-xl mt-2 p-4'>
    <div className='w-[70vw] mx-auto'>
      <p className='text-3xl font-semibold underline underline-offset-[10px]'>{fieldname}</p>  
      <table className='w-full mt-4 text-left rounded-lg'>
        <thead className='bg-[#050d16]'>
            <tr >
            <th className='p-2 py-3'>Title</th>
            <th className='p-2 py-3'>Type</th>
            <th className='p-2 py-3'>visit</th> 
            </tr>
        </thead>
        <tbody className='my-2 bg-[#01030541]'>
          {data?.map((item)=>{
            return(
              <tr key={item.id}>
              <td className='p-2'>{item.movie_title}</td>
              <td className='p-2'>{item.media_type}</td>
              <td className='p-2'><a href={item.media_type === "movie" ? `/movie/${item.movie_id}` :`/tv/${item.movie_id}`} className='text-blue-400'>view</a></td>
              </tr>
            )
          })}
            
        </tbody>
        <tfoot className='bg-[#050d16]'>
            <tr>
                <td colSpan={3} className='p-2 pr-0 text-right'>
                    <a href={fieldname === "Favourites" ? `/account/favorites`: `/account/watchlist`} className='w-fit px-4 py-2 bg-blue-500 hover:text-white'>Manage {fieldname}</a>
                </td>
            </tr>
        </tfoot>
      </table>
    </div>
    </div>
  )
}


export default function AccountPage() { 
  const {isLoaded,user} = useUser()


  const checkIfClerkIsInitialized = async():Promise<void>=>{
    //check if clerk is initialized && isLoaded === true
    //else await for 100ms then call the while loop again
     while(!isLoaded || !isLoaded == null){
       await new Promise(resolve => setTimeout(resolve,100))
     }
     
   }
   checkIfClerkIsInitialized()
 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //const {id,username,primaryEmailAddress,imageUrl}:any= user
  const [favourites,setFavourites] = useState([])
  const [watchlist,setWatchlist] = useState([])

  const userProfile = useRef({
    clientId:user?.id,
    username:user?.username,
    email:user?.primaryEmailAddress?.emailAddress,
    imageUrl:user?.imageUrl ?  user.imageUrl : " "
  })
 

 
  const fetchuserobject = `${import.meta.env.VITE_CLIENTS_SERVER_URL}/users/${user?.id}/`
//a method to fetch the favourites
  useEffect(()=>{
    async function fetchUserObject(){
      const response = await  axios.patch(fetchuserobject,{
        ...userProfile.current
      })
      if(response.status !== 200){
        toast.error("An error occurred whilst fetching the watchlist movies")
      }
      //console.log("The response after fetching favourites:",response)
      //console.log(response.data.user);
      const {collection,...user}= response.data.user
      userProfile.current = user
      setFavourites(collection.favourites)
      setWatchlist(collection.watchList)
    }
    fetchUserObject()
  },[])
  //get the deleteAccount function from the custom hook

 
const handleDeleteAccount = async()=>{
  const uri = `${import.meta.env.VITE_CLIENTS_SERVER_URL}/users/${user?.id}/`
   const response = await axios.delete(uri)
   if(response.status !== 200){
  //  console.log("Error deleting user account",response);
    toast.error("Error deleting user account")
   }
   toast.success("Success :: Account deleted")
   //console.log(response)
  
}
  return (
    <InnerPage title='My Account'>
     <section className='section'>
      <div className='inner-section '>
        <div className='w-full bg-[#081523] rounded-xl p-4'>
            <div className='flex items-center gap-4 max-w-[400px] mx-auto'>
                <div className='rounded-full h-[150px] w-[150px] border p-1 border-red-300 felx justify-center items-center'>
                    <img src={user?.imageUrl ? user?.imageUrl : userFallbackImage} alt='user' className='rounded-full w-full h-full'/></div>
                <div>
                    <p className='text-xs'>Name : {userProfile.current.username}</p>
                    <p className='text-xs'>Email : {userProfile.current.email}</p>
                </div>
            </div>
        </div>
        <ListingEl key="fav" data={favourites} fieldname='Favourites'/>
        <ListingEl key="list"  data={watchlist} fieldname='WatchList'/> 
       

       <article className='w-full bg-[#081523] mt-8 border rounded-md border-red-600 p-4'>
         <div className='text-center max-w-[600px] mx-auto'>
            <p> Caution!! This action is irreversible and you wanna be sure before you proceed with deletion.Get rid of this account</p>
            <button className='w-fit my-4' onClick={handleDeleteAccount}>
                Delete My Account
            </button>
         </div>
       </article>
      </div>
     </section>
    </InnerPage>
  )
}