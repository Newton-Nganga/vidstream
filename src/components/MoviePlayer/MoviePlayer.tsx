
import { useState } from "react";
import ReactPlayer from "react-player";
import {Trailer } from "../../__generated_types/UsefulTypes";

type Props = {
  movieId:number|null
  trailerArray: Trailer[];
};

export function MoviePlayer({ trailerArray,movieId }: Props) {
  const [trailer, setTrailer] = useState<"trailer"|"2embed"|"multiembed">("2embed");
 //trailer,2embed,multiembed
  const oficialYTTrailers = trailerArray.filter(
    (trailer) => trailer.official && trailer.site === "YouTube"
  );
  return (
    <div className="section pt-0">
      {trailer === "trailer" ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${
            [...oficialYTTrailers].reverse()[0].key
          }`}
          width="100%"
          height="500px"
          controls={true}
          style={{}}
        />
      ) : (
        <iframe
           src={
            trailer === "2embed"
            ? `https://www.2embed.cc/embed/${movieId}`
            :`https://multiembed.mov/?video_id=${movieId}&tmdb=1`
           }
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
          <div className="flex gap-3 pt-2">
            <button className={`${trailer !== "trailer" && "bg-blue-400"}`} onClick={() => setTrailer("trailer")}>
            Trailer
          </button>
          <button className={`${trailer !== "2embed" && "bg-blue-400"}`}  onClick={() => setTrailer("2embed")}>
            server 1
          </button>
          <button className={`${trailer !== "multiembed" && "bg-blue-400"}`}  onClick={() => setTrailer("multiembed")}>
            server 2
          </button>
          </div>
          
          <p className="italic pt-2  text-[11px] text-center">
            The streaming service is offered by non-affiliated third party
            providers therefore some movies and shows may be unavailable and the
            available ones may contain ads- (use Brave browser to get rid of
            ads).
          </p>
        </div>
      </div>
    </div>
  );
}
