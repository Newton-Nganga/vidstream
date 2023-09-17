


import { MdOutlineDelete } from 'react-icons/md'
import {HiOutlineExternalLink} from 'react-icons/hi'

import axios from 'axios';
import toast from 'react-hot-toast';


type Favourite={
  id:string,
  movie_id:string | number
  movie_title:string 
  backdrop_path:string 
  poster_path:string 
  media_type:string 
  collectionId:string
}
type Props = {
  data:Favourite
  type:string
}

export default function CollectionCard({data,type}: Props) {
  const handleDelete = async()=>{
    const response = await axios.delete(import.meta.env.VITE_CLIENTS_SERVER_URL+`/users/2021/${type}/${data.movie_id}`)
    if(response.status !== 200){
      toast.error("Movie could'nt be deleted")
    }
    toast.success("Movie deleted successfully")
  }
  return (
    <div className='w-[180px]'>
        <div className='w-full h-[200px] relative hover:shadow-md hover:shadow-red-800 rounded-md'>
          <img src={`${import.meta.env.VITE_PUBLIC_IMAGE_PREFIX}${data.poster_path ? data.poster_path : data.backdrop_path}`} alt="" className='w-full h-full rounded-md '/>
        </div>
        <div className='flex gap-2 my-3 '>
          <a
           href={data.media_type === "movie" ? `/movie/${data.movie_id}`:`/tv/${data.id}`}
          className='relative flex-grow flex items-center justify-center text-sm text-center  rounded-md bg-[#081523]'>
            visit
            <HiOutlineExternalLink className="absolute top-2 right-2"/>
          </a>
          <button onClick={()=>handleDelete()} className='w-fit rounded-md p-2 text-xl  hover:bg-red-300'>
            <MdOutlineDelete/>
          </button>
        </div>
    </div>
  )
}