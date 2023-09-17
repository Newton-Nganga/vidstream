import Stars from "@/components/Stars/Stars";
import {
  FullShowEpisode,
  FullShowSeason,
} from "@/__generated_types/UsefulTypes";
import React from "react";
import { RiHeartFill, RiShareLine, RiVolumeMuteFill } from "react-icons/ri";


type Props = {
  currentEpisodeNumber: number;
  currentSeasonNumber: number;
  currentSn: FullShowSeason;
  currentEp: FullShowEpisode;
  title: string;
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
      <span className="text-red-600 font-semibold">{list_title} : </span>{" "}
      {children}
    </p>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any

function GenericSpan({ text }: GenericSpanProps) {
  return <span className="text-sm">{text}</span>;
}

function ShowDetails({
  title,
  genres,
  currentSn,
  currentEp,
  currentEpisodeNumber,
  currentSeasonNumber,
}: Props) {
  const actorList = currentEp.credits.cast
    .slice(0, 5)
    .map((actor, index) => (
      <GenericSpan key={index} text={`${actor.name} ,`} />
    ));

  const genreList = genres.map((genre, index) => (
    <GenericSpan key={index} text={`${genre.name} ,`} />
  ));

  const crewList = currentEp.credits.crew
    .slice(0, 5)
    .map((crew, index) => <GenericSpan key={index} text={`${crew.name} ,`} />);
  console.log(currentEp);


  return (
    <section className="section">
      <div className="inner-section flex flex-col border-slice py-4 gap-4">
        <h4 className="texture my-4 w-fit mr-auto text-2xl font-extrabold leading-[3rem]">
          {title}
        </h4>
        <h1 className="font-mono">
          S{currentSeasonNumber}E{currentEpisodeNumber} -
          <span>Episode {currentEpisodeNumber}</span>
        </h1>
        <p>{currentEp.overview}</p>
        <div className="flex-col flex items-center md:flex-row gap-8">
          <div className="relative h-[250px] w-[180px] rounded-md overflow-clip">
            <img
              alt={`Episode ${currentEp.episode_number}`}
              src={
                import.meta.env.VITE_PUBLIC_IMAGE_PREFIX +
                `${
                  currentEp.still_path
                    ? currentEp.still_path
                    : currentSn.poster_path
                }`
              }
              className="absolute h-full w-full"
            />
          </div>
          <div className="flex flex-grow flex-col">
            <div className="flex items-center gap-4 my-3">
              <Stars vote_average={currentEp.vote_average} />
            </div>
            <div>
              <div className="text-sm md:text-lg">
                <ListingEl list_title="Actors">{actorList}...</ListingEl>
                <ListingEl list_title="Genres">{genreList} </ListingEl>
                <ListingEl list_title="Crew"> {crewList}...</ListingEl>
                <ListingEl list_title="Votes">{currentEp.vote_count}</ListingEl>
                <ListingEl list_title="Quality">
                  <span className="px-2 bg-red-500 rounded-md">HD</span>
                </ListingEl>
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <button className="details-icon-wrapper">
              <div className="details-icon">
                  <RiHeartFill key={1} />
                </div>
              </button>
              <div className="details-icon-wrapper">
              <div className="details-icon">
                  <RiShareLine key={3} />
                </div>
              </div>
              <div className="details-icon-wrapper">
              <div className="details-icon">
                  <RiVolumeMuteFill key={0} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShowDetails;
