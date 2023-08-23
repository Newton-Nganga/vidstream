import React, { useState} from "react";
import InnerPage from "@/components/Pages/InnerPages";
import { useQuery,gql } from "@apollo/client";
import { MoviePlayer } from "@/components/MoviePlayer/MoviePlayer";
import { MovieDetails } from "./MovieDetails";
import SuggestedMovies from "@/components/Queries/SuggestedMovies";
import SimilarMovies from "@/components/Queries/SimilarMovies";
import { GET_MOVIE, getSpecificMovie } from "@/components/Queries/Movie_id";


export default async function Page({ params }: { params: { id: number } }) {
  //get the query parameter


  const data = await getSpecificMovie(params.id)
  
  return (
    <InnerPage>
      <section>
      {/* The media Player Component */}
      <MoviePlayer data={data} />

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
