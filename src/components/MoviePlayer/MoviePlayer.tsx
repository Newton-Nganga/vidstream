"use client"
export const dynamic="force-dynamic"
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { FullMovieType } from "../UsefulTypes";

type Props = {
  data: FullMovieType;
};

export function MoviePlayer({ data}: Props){

  const [trailer,setTrailer]= useState(false)

 const oficialYTTrailers= data.trailer.filter(trailer => trailer.official && trailer.site === 'YouTube')
  return (
    <div className="section">
      {trailer ? (
        <ReactPlayer
          url={
            `https://www.youtube.com/watch?v=${[...oficialYTTrailers].reverse()[0].key}`
          }
          width="100%"
          height="500px"
          controls={true}
          style={{}}
        />
      ) : (
        <iframe
          src={`https://multiembed.mov/?video_id=${data.id}&tmdb=1`}
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
      </div>
    </div>
  );
};
