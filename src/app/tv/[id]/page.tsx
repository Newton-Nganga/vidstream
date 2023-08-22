"use client";
import React, { useState} from "react";
import { usePathname } from "next/navigation";
import InnerPage from "@/components/Pages/InnerPages";
import { ShowPlayer } from "@/components/MoviePlayer/ShowPlayer";
import { FullShowEpisode, FullShowSeason } from "@/components/UsefulTypes";
import { useQuery } from "@apollo/client";
import { GET_SHOW } from "@/components/Queries/Show_id";
import ShowDetails from "./ShowDetails";
import SimilarShows from "@/components/Queries/SimilarShows";
import SuggestedShows from "@/components/Queries/SuggestedShows";

type Props = {};



export default function Page({ params }: { params: { id: number } }) {
  const [trailer,setTrailer]=useState<boolean>(false)
  //const breadcrumb = useBreadcrumb();
  const pathname = usePathname();
  //console.log(params.id);
  const {loading,error,data}= useQuery(GET_SHOW,{
    variables:{showId:params.id}
  })
  const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState<number>(0);
  const [currentSeasonNumber, setCurrentSeasonNumber] = useState<number>(0);

 //The current season and episode objects in play
  const currentSn:FullShowSeason = data.seasons[currentSeasonNumber];
  const currentEp:FullShowEpisode = currentSn.episodes[currentEpisodeNumber];
 

  return (
    <InnerPage>
      <section>
        {/* The Player to play the episodes and trailer */}
       <ShowPlayer 
       currentSn={currentSn} 
       currentEp={currentEp} 
       currentSeasonNumber={currentSeasonNumber} 
       currentEpisodeNumber={currentEpisodeNumber} 
       setCurrentSeasonNumber={setCurrentSeasonNumber}
       setCurrentEpisodeNumber={setCurrentEpisodeNumber}
       data={data} 
       trailer={trailer} 
       setTrailer={setTrailer}
       
       /> 
       {/* Details on the current season and episodes */}
       <ShowDetails 
       currentEp={currentEp} 
       currentSn={currentSn}
       currentEpisodeNumber={currentEpisodeNumber}
       currentSeasonNumber={currentSeasonNumber}
       genres={data.details.genres}
       />

       {/* similar shows like the current one in play */}
       <SimilarShows id={params.id}/>

       {/* suggestions on movies like the above genre */}
       <SuggestedShows id={params.id}/>
      </section>
    </InnerPage>
  );
}
