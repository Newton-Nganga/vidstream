"use client"
import {gql} from '@apollo/client'
export const GET_SHOW=gql`
query GetShow($showId: Int!) {
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
    }[]
    created_by {
      name
    }[]
    last_air_date
    media_type
    number_of_episodes
    number_of_seasons
    production_companies {
      name
    }[]
  }
  trailer {
    key
    name
    official
    site
  }[]
  backdrop_path
  credits {
    crew {
      job
      name
    }[]
    cast {
      character
      name
    }[]
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
  }[]
  poster_path
  overview
  air_date 
  credits {
    crew {
      job 
      name 
    }[]
    cast {
      name 
      character 
    }[]
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
  }[]
  credits {
    crew {
      job
      name
    }[]
    cast {
      name
      character
    }[]
  }
  }[]
  }[]
  }
}
`