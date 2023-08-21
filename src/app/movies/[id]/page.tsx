"use client";
import React, { useState} from "react";
import InnerPage from "@/components/Pages/InnerPages";
import { useQuery,gql } from "@apollo/client";
import { MoviePlayer } from "@/components/MoviePlayer/MoviePlayer";
import { MovieDetails } from "./MovieDetails";
import SuggestedMovies from "@/components/Queries/SuggestedMovies";
import SimilarMovies from "@/components/Queries/SimilarMovies";

const GET_MOVIE=gql`
query GetMovie($movieId: Int!) {
  movie(id: $movieId) {
    id
    media_type
    details {
      genres {
        name
      }
      runtime
      tagline
    }
    credits {
      crew {
        name
        job
      }
      cast {
        character
        name
      }
    }
    overview
    popularity
    poster_path
    release_date
    title
    original_title
    original_language
    vote_count
    vote_average
    trailer {
      key
      official
      site
      id
    }
    backdrop_path
  }
}`

export default function Page({ params }: { params: { id: number } }) {
  //get the query parameter
  const [trailer,setTrailer]= useState(false)
  const {loading,error,data} = useQuery(GET_MOVIE,{
    variables:{movieId:params.id}
  })
  return (
    <InnerPage>
      <section>
      {/* The media Player Component */}
      <MoviePlayer data={data} trailer={trailer} setTrailer={setTrailer}/>

      {/* The details about the specific movie */}
        <MovieDetails movie={data}/>
      
      {/* A carousel of recommended movies */}
        <SuggestedMovies id={params.id} />
        
      {/* Movies similar to the one above */}
        <SimilarMovies id={params.id} />
      </section>
    </InnerPage>
  );
}
