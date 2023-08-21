import React, { useState } from "react";
import ReactPlayer from "react-player";
import { FullShowEpisode, FullShowSeason, FullShowType,Trailer } from "../UsefulTypes";

type Props = {
  data: FullShowType;
  trailer: boolean;
  setTrailer: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ShowPlayer = ({ data, trailer, setTrailer }: Props) => {
 const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState<number>(0);
 const [currentSeasonNumber, setCurrentSeasonNumber] = useState<number>(0);

 //The current season and episode objects in play
 const currentSn:FullShowSeason = data.seasons[currentSeasonNumber];
 const currentEp:FullShowEpisode = currentSn.episodes[currentEpisodeNumber];
 
 //A filtering function 
 const filterOfficialYouTubeTrailers = (trailers: Trailer[]): Trailer[] =>
    trailers.filter(trailer => trailer.official && trailer.site === 'YouTube');

 const oficialYTShowTrailers = filterOfficialYouTubeTrailers(data.trailer);
 const officialYTSeasonTrailers = filterOfficialYouTubeTrailers(currentSn.trailer);
 const officialYTEpisodeTrailers = filterOfficialYouTubeTrailers(currentEp.trailer); 

 //Arrays to help render the buttons to switch btwn the playing sn and ep
 const seasosnArray =  Array.from({ length: data.details.number_of_seasons }, (_, index) => index + 1);
 const episodes_count = [...currentSn.episodes].reverse()[0].episode_number 
 const episodesArray = Array.from({ length: episodes_count}, (_, index) => index + 1);



 const trailerKey =
  [...officialYTEpisodeTrailers].reverse()[0]?.key ||
  [...officialYTSeasonTrailers].reverse()[0]?.key ||
  [...oficialYTShowTrailers].reverse()[0]?.key;
  return (
    <div className="section">
      {trailer ? (
        <ReactPlayer
          url={
            `https://www.youtube.com/watch?v=${trailerKey}`
          }
          width="100%"
          height="500px"
          controls={true}
          style={{}}
        />
      ) : (
        <iframe
          src={`https://multiembed.mov/?video_id=${data.id}&s=${currentSeasonNumber}&e=${currentEpisodeNumber}&tmdb=1`}
          width="100%"
          height="500"
          allowFullScreen={true}
          allow="fullscreen; picture-in-picture;"
          loading="lazy"
          className=""
        ></iframe>
      )}
      <div className="inner-section flex-col">
        <div className="flex flex-col">
          <button className="w-fit my-3 " onClick={() => setTrailer(!trailer)}>
            {trailer ? "Stream" : "Trailer"}
          </button>
          <p className="italic pt-2  text-[11px]">
            The streaming service is offered by non-affiliated third party
            providers therefore some movies and shows may be unavailable and the
            available ones may contain ads- (use Brave browser to get rid of
            ads).
          </p>
        </div>
        <div className="w-full flex flex-col">
           <div className="w-full flex gap-4">
             {seasosnArray.map((snButton,index) => 
                <button 
                key={index} 
                onClick={()=>setCurrentSeasonNumber(index + 1) } 
                className="p-2 px-4 rounded-md bg-blue-500 text-black">
                    {index + 1}
                </button>
            )}
           </div>
           <div className="w-full flex gap-4 flex-wrap">
             {seasosnArray.map((epButton,index) => 
                <button 
                key={index} 
                onClick={()=>setCurrentEpisodeNumber(index + 1)} 
                className="p-2 px-4 rounded-md bg-blue-500 text-black">
                    {index + 1}
                </button>
            )}
           </div>
        </div>
      </div>
    </div>
  );
};