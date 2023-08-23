import Image from "next/image"
import { MovieType, ShowType } from "./UsefulTypes"
import WatchTime from "./WatchTime"


type Props={
   data:(MovieType | ShowType)
}
export default function MovieCard({data}:Props){
    return (
        <div className="relative w-[180px] h-[200px] rounded-[20px] overflow clip">
          <div className="relative h-[120px] w-full rounded-[30px] overflow-clip">
            <Image 
            src={`${process.env.NEXT_PUBLIC_IMAGE_PREFIX}${data.backdrop_path}`} 
            alt="" 
            fill={true} 
            sizes="" 
            className="absolute"/>
          </div>
          <div>
            <p className="text-sm">{"name" in data? data.name : data.title}</p>
             {"runtime" in data.details 
             ? <WatchTime runtime={ data.details.runtime }/>
             : data.details.number_of_seasons +' Seasons'
            }
          </div>
        </div>
    )
}