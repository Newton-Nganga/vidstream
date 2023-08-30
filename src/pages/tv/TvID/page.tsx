
import { useState } from "react";
import InnerPage from "@/components/InnerPages/InnerPages";
import { ShowPlayer } from "@/components/MoviePlayer/ShowPlayer";
import { FullShowEpisode,FullShowSeason } from "@/__generated_types/UsefulTypes";
import { useParams } from "react-router-dom";
import { useQuery,gql } from "@apollo/client";
import SimilarShows from "@/components/SimilarShows/SimilarShows";
import SuggestedShows from "@/components/SuggestedShows/SuggestedShows";
import ShowDetails from "./ShowDetails";

const GET_SHOW=gql`
query GetSpecificShow($showId: Int!){
  show(id: $showId) {
  name
  id
  original_name
  original_language
  overview
  popularity
  poster_path
  first_air_date
  details {
    genres {
      name
    }
    created_by {
      name
    }
    last_air_date
    media_type
    number_of_episodes
    number_of_seasons
    production_companies {
      name
    }
  }
  trailer {
    key
    name
    official
    site
  }
  backdrop_path
  credits {
    crew {
      job
      name
    }
    cast {
      character
      name
    }
  }
  seasons {
  name
  season_number 
  show_id
  trailer{
    key
    name
    official
    site
  }
  poster_path
  overview
  air_date 
  credits {
    crew {
      job 
      name 
    }
    cast {
      name 
      character 
    }
  }
  episodes {
  air_date
  episode_number
  id
  name
  overview
  season_number
  show_id
  still_path
  vote_average
  vote_count
  trailer {
    key
    name
    official
    site
  }
  credits {
    crew {
      job
      name
    }
    cast {
      name
      character
    }
  }
  }
  }
  }
}
`


export default function ShowPage() {
  const {id} = useParams()
  const showId= id ? parseInt(id) : null
  const {loading,error,data} = useQuery(GET_SHOW,{variables:{showId:showId}})

  //console.log(params.id);
  const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState<number>(1);
  const [currentSeasonNumber, setCurrentSeasonNumber] = useState<number>(1);



 if(loading){
    return <p>Loading ...</p>
 }
 if(error){
    return <p>Error : {error.message}</p>
 }
  console.log("show",data)
  //The current season and episode objects in play
  const currentSn: FullShowSeason = data.show.seasons[currentSeasonNumber];
  const currentEp: FullShowEpisode = currentSn.episodes[currentEpisodeNumber];

  return (
    <InnerPage title="Tv Show Details ">
      <section>
        {/* The Player to play the episodes and trailer */}
        <ShowPlayer
          currentSn={currentSn}
          currentEp={currentEp}
          currentSeasonNumber={currentSeasonNumber}
          currentEpisodeNumber={currentEpisodeNumber}
          setCurrentSeasonNumber={setCurrentSeasonNumber}
          setCurrentEpisodeNumber={setCurrentEpisodeNumber}
          data={data.show}
        />
        {/* Details on the current season and episodes */}
        <ShowDetails
          currentEp={currentEp}
          currentSn={currentSn}
          currentEpisodeNumber={currentEpisodeNumber}
          currentSeasonNumber={currentSeasonNumber}
          genres={data.show.details.genres}
          title={data.show.name}
        />

        {/* similar shows like the current one in play */}
        <SimilarShows id={showId} />

        {/* suggestions on movies like the above genre */}
        <SuggestedShows id={showId} />
      </section>
    </InnerPage>
  );
}
