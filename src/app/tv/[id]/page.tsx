"use client"
export const dynamic="force-dynamic"
import React, { useState} from "react";
import InnerPage from "@/components/Pages/InnerPages";
import { ShowPlayer } from "@/components/MoviePlayer/ShowPlayer";
import { FullShowEpisode, FullShowSeason, FullShowType } from "@/components/UsefulTypes";
import { GET_SHOW} from "@/components/Queries/Show_id";
import ShowDetails from "./ShowDetails";
import SimilarShows from "@/components/Queries/SimilarShows";
import SuggestedShows from "@/components/Queries/SuggestedShows";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

type Props = {};

interface Response{
  show:FullShowType
}

export default  function Page({ params }: { params: { id: number } }) {
  const [trailer,setTrailer]=useState<boolean>(false)
  //console.log(params.id);
  const {data:{show}} = useSuspenseQuery<Response>(GET_SHOW)
  const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState<number>(0);
  const [currentSeasonNumber, setCurrentSeasonNumber] = useState<number>(0);

 //The current season and episode objects in play
  const currentSn:FullShowSeason = show.seasons[currentSeasonNumber];
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
       data={show} 
       trailer={trailer} 
       setTrailer={setTrailer}
       
       /> 
       {/* Details on the current season and episodes */}
       <ShowDetails 
       currentEp={currentEp} 
       currentSn={currentSn}
       currentEpisodeNumber={currentEpisodeNumber}
       currentSeasonNumber={currentSeasonNumber}
       genres={show.details.genres}
       />

       {/* similar shows like the current one in play */}
       <SimilarShows id={params.id}/>

       {/* suggestions on movies like the above genre */}
       <SuggestedShows id={params.id}/>
      </section>
    </InnerPage>
  );
}
