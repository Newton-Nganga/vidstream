import React,{useState} from "react";
import ReactPlayer from "react-player";
import {match} from "ts-pattern"
import {
  FullShowEpisode,
  FullShowSeason,
  FullShowType,
  Trailer,
} from "../../__generated_types/UsefulTypes";

type Props = {
  data: FullShowType;
  currentSeasonNumber: number;
  currentEpisodeNumber: number;
  currentSn: FullShowSeason;
  currentEp: FullShowEpisode;
  setCurrentEpisodeNumber: React.Dispatch<React.SetStateAction<number>>;
  setCurrentSeasonNumber: React.Dispatch<React.SetStateAction<number>>;
};

export const ShowPlayer = ({
  data,
  currentEp,
  currentSn,
  currentEpisodeNumber,
  currentSeasonNumber,
  setCurrentEpisodeNumber,
  setCurrentSeasonNumber,
}: Props) => {
  const [frame, setFrame] = useState<"trailer"|"2embed"|"multiembed"|"vidsrc">("2embed");
  //A filtering function
  const filterOfficialYouTubeTrailers = (trailers: Trailer[]): Trailer[] =>
    trailers.filter(
      (trailer) => trailer.official && trailer.site === "YouTube"
    );

  const oficialYTShowTrailers = filterOfficialYouTubeTrailers(data.trailer);
  const officialYTSeasonTrailers = filterOfficialYouTubeTrailers(
    currentSn.trailer
  );
  const officialYTEpisodeTrailers = filterOfficialYouTubeTrailers(
    currentEp.trailer
  );
 
  //Arrays to help render the buttons to switch btwn the playing sn and ep
  const seasonsArray = Array.from(
    { length: data.details.number_of_seasons },
    (_, index) => index + 1
  );
  const episodes_count = [...currentSn.episodes].reverse()[0].episode_number;
  const episodesArray = Array.from(
    { length: episodes_count },
    (_, index) => index + 1
  );

  const trailerKey =
    [...officialYTEpisodeTrailers].reverse()[0]?.key ||
    [...officialYTSeasonTrailers].reverse()[0]?.key ||
    [...oficialYTShowTrailers].reverse()[0]?.key;

    console.log(`current sn ${currentSeasonNumber} current epoisode ${currentEpisodeNumber}`)
  return (
    <div className="section pt-0">
      {frame === "trailer" ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          width="100%"
          height="500px"
          controls={true}
          style={{}}
        />
      ) : (
        <iframe
          src={
            match(frame)
            .with("2embed",()=>`https://www.2embed.cc/embed/${data.id}&s=${currentSeasonNumber}&e=${currentEpisodeNumber}`)
            .with("multiembed",()=>`https://multiembed.mov/?video_id=${data.id}&s=${currentSeasonNumber}&e=${currentEpisodeNumber}&tmdb=1`)
            .otherwise(()=>`https://vidsrc.to/embed/tv/${data.id}/${currentSeasonNumber}/${currentEpisodeNumber}`)
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
        <div className="w-full flex flex-col py-4">
        <div className="flex gap-3 pt-2">
            <button className={`${frame !== "trailer" && "bg-blue-400"} rounded-md w-fit`} onClick={() => setFrame("trailer")}>
            Trailer
          </button>
          <button className={`${frame !== "2embed" && "bg-blue-400"}`}  onClick={() => setFrame("2embed")}>
            server 1
          </button>
          <button className={`${frame !== "multiembed" && "bg-blue-400"}`}  onClick={() => setFrame("multiembed")}>
            server 2
          </button>
          <button className={`${frame !== "vidsrc" && "bg-blue-400"}`}  onClick={() => setFrame("vidsrc")}>
            server 3
          </button>
          </div>
          <div className="w-full flex gap-4 py-2 pt-4">
            {seasonsArray.map((snButton, index) => (
              <button
                key={index}
                onClick={() => setCurrentSeasonNumber(index + 1)}
                className={`${
                  currentSeasonNumber !== index + 1
                   ?"bg-slate-500" :"bg-slate-800"
                } px-8 rounded-md  w-fit text-white`}
              >
                S{index + 1}
              </button>
            ))}
          </div>
          <div className="w-full flex gap-4 flex-wrap text-slate-200"> 
            {episodesArray.map((epButton, index) => (
              <button
                key={index}
                onClick={() => setCurrentEpisodeNumber(index + 1)}
                className={`${
                  currentEpisodeNumber !== index + 1
                  ?"bg-slate-500" :"bg-slate-800"
                } px-4 rounded-md  w-fit`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
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
};
