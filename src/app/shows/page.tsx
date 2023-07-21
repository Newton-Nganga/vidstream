

import MoviesCarousel from "@/components/MoviesCarousel"
import InnerPage from "@/components/Pages/InnerPages"
import Image from "next/image"

type Props = {}

export default function page({}: Props) {
  return (
   <InnerPage>
    <section className="section">
     <div className="inner-secion flex flex-wrap gap-4">
      <div className="h-[400px] w-full">
         <Image src='' alt='series banner' className="w-full h-full"/>
      </div>
      <MoviesCarousel title='Season 1'/>
      <MoviesCarousel title='Season 1'/>
     </div>
    </section>   
    </InnerPage>
  )
}