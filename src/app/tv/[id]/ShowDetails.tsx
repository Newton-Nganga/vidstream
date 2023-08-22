import Stars from "@/components/Stars/Stars";
import {
  FullShowEpisode,
  FullShowSeason,
} from "@/components/UsefulTypes";
import Image from "next/image";
import React from "react";
import { RiHeartFill, RiShareLine, RiVolumeMuteFill } from "react-icons/ri";

type Props = {
  currentEpisodeNumber: number;
  currentSeasonNumber: number;
  currentSn: FullShowSeason;
  currentEp: FullShowEpisode;
  genres: {
    name: string;
  }[];
};
type ListProp = {
  list_title: string;
  children: React.ReactNode;
};
type GenericSpanProps = {
  text: string;
};

const ListingEl = ({ list_title, children }: ListProp) => {
  return (
    <p>
      <span className="text-red-600 font-semibold">{list_title}</span>{" "}
      {children}
    </p>
  );
};
const IconEl = ({ icon }: any) => {
  return (
    <div className="h-10 w-10 p-1 flex justify-center items-center rounded-full bg-white/50">
      <div className="flex items-center justify-center rounded-full bg-white text-red-600 opacity-100 hover:text-white hover:bg-red-600 text-xl p-1">
        {icon}
      </div>
    </div>
  );
};
function GenericSpan({ text }: GenericSpanProps) {
  return <span>{text}</span>;
}

function ShowDetails({
  genres,
  currentSn,
  currentEp,
  currentEpisodeNumber,
  currentSeasonNumber,
}: Props) {
  const actorList = currentEp.credits.cast.map((actor, index) => (
    <GenericSpan key={index} text={`${actor.name},`} />
  ));

  const genreList = genres.map((genre, index) => (
    <GenericSpan key={index} text={`${genre.name}`} />
  ));

  const crewList = currentEp.credits.crew.map((crew, index) => (
    <GenericSpan key={index} text={`${crew.name},`} />
  ));
  return (
    <section className="section">
      <div className="inner-section flex flex-col border-slice py-4 gap-4">
        <h4 className="texture my-4 w-fit mr-auto text-2xl font-extrabold">
          {currentSn.name}
        </h4>
        <h1>
          S{currentSeasonNumber}E{currentEpisodeNumber}
          <span>{currentEp.name}</span>
        </h1>
        <p>{currentEp.overview}</p>
        <div className="flex gap-2">
          <div className="relative h-[200px] w-[180px] rounded-md overflow-clip">
            <Image
              fill={true}
              alt={`Episode ${currentEp.episode_number}`}
              src={`
                  ${process.env.IMAGE_PREFIX}
                  ${
                    currentEp.still_path
                      ? currentEp.still_path
                      : currentSn.poster_path
                  }`}
              className="absolute"
            />
          </div>
          <div className="flex flex-grow">
            <div className="flex items-center gap-4 my-3">
              <Stars vote_average={currentEp.vote_average} />
            </div>
            <div>
              <div className="text-sm md:text-lg">
                <ListingEl list_title="Actors">{actorList}</ListingEl>
                <ListingEl list_title="Genres">{genreList} </ListingEl>
                <ListingEl list_title="Crew"> {crewList}</ListingEl>
                <ListingEl list_title="Votes">{currentEp.vote_count}</ListingEl>
                <ListingEl list_title="Quality">
                  <span className="px-2 bg-red-500 rounded-md">HD</span>
                </ListingEl>
              </div>
            </div>
            <div className="flex gap-4">
              {[
                <RiVolumeMuteFill key={0} />,
                <RiHeartFill key={1} />,
                <RiShareLine key={3} />,
              ].map((icon, index) => (
                <IconEl key={index}>{icon}</IconEl>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShowDetails;
