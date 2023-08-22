"use client"
import {gql} from '@apollo/client'

export const GET_MOVIE=gql`
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