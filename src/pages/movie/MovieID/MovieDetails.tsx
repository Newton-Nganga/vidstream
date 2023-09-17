
import Stars from "@/components/Stars/Stars";
import { FullMovieType } from "@/__generated_types/UsefulTypes";
import WatchTime from "@/components/WatchTime";
import { RiHeartFill, RiShareLine, RiVolumeMuteFill } from "react-icons/ri";


type Props ={
    movie:FullMovieType
}
type ListProp={
    list_title:string
    children:React.ReactNode
}
type GenericSpanProps={
    text:string
}

const ListingEl=({list_title,children}:ListProp)=>{
    return (
        <p>
        <span className="text-red-600 font-semibold">{list_title} :</span>{" "}
        {children}
        </p>
    )
}

function GenericSpan({ text }: GenericSpanProps) {
    return <span className="ml-2 text-[15px]">{text}</span>;
  }
export function MovieDetails({movie}:Props){
    const actorList = movie.credits.cast.slice(0,5).map((actor, index) => (
        <GenericSpan key={index} text={`${actor.name},`} />
      ));
    
      const genreList = movie.details.genres.map((genre, index) => (
        <GenericSpan key={index} text={`${genre.name}`} />
      ));
    
      const crewList = movie.credits.crew.slice(0,5).map((crew, index) => (
        <GenericSpan key={index} text={`${crew.name},`} />
      ));
    
    return(
        <section className="section">
          <div className="inner-section flex flex-col border-slice py-4 gap-4">
            <h4 className="texture my-4 w-fit mr-auto text-2xl font-extrabold leading-[1.2]">
              {movie.title}
            </h4>
            <p>{movie.overview}</p>
            <div className="flex items-center gap-4 my-3">
              <Stars vote_average={movie.vote_average}/>
            </div>
            <div>
              <div className="text-sm md:text-lg">
             <ListingEl list_title="Actors">{actorList}...</ListingEl>
             <ListingEl list_title="Genres">{genreList} </ListingEl>
             <ListingEl list_title="Crew"> {crewList}...</ListingEl>
             <ListingEl list_title="Duration">
               <WatchTime runtime={movie.details.runtime}/>
             </ListingEl>
             <ListingEl list_title="Quality">
               <span className="px-2 ml-2 bg-red-500 rounded-md">HD</span>
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
        </section>
    )
}