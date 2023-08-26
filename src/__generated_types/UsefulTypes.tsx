export interface MovieType {
  id: number;
  media_type: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  title: string;
  vote_count: number;
  vote_average: number;
  details: {
    runtime: number;
    genres: {
      name: string;
    }[];
  };
  credits: {
    crew: {
      name: string;
    }[];
    cast: {
      name: string;
    }[];
  };
}
export interface ShowType {
  name: string;
  id: number;
  original_name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  details: {
    media_type: string;
    number_of_seasons: number;
    last_air_date: string;
    genres: {
      name: string;
    }[];
  };
  credits: {
    crew: {
      name: string;
    }[];
    cast: {
      name: string;
    }[];
  };
}

export interface FullMovieType {
  id: number;
  media_type: string;
  details: {
    genres: {
      name: string;
    }[];
    runtime: number;
    tagline: string;
  };
  credits: {
    crew: {
      name: string;
      job: string;
    }[];
    cast: {
      character: string;
      name: string;
    }[];
  };
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  original_title: string;
  original_language: string;
  vote_count: number;
  vote_average: number;
  trailer: Trailer[];
  backdrop_path: string;
}
export interface FullShowType {
  name: string;
  id: number;
  original_name: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  details: {
    genres: {
      name: string;
    }[];
    created_by: {
      name: string;
    }[];
    last_air_date: string;
    media_type: string;
    number_of_episodes: number;
    number_of_seasons: number;
    production_companies: {
      name: string;
    }[];
  };
  trailer: Trailer[];
  backdrop_path: string;
  credits: {
    crew: {
      job: string;
      name: string;
    }[];
    cast: {
      character: string;
      name: string;
    }[];
  };
  seasons: FullShowSeason[];
}

export type FullShowSeason = {
  //season details
  name: string;
  season_number: number;
  show_id: number;
  trailer: Trailer[];
  poster_path: string;
  overview: string;
  air_date: string;
  credits: {
    crew: {
      job: string;
      name: string;
    }[];
    cast: {
      name: string;
      character: string;
    }[];
  };
  //episodes in this season
  episodes: FullShowEpisode[];
};
export type FullShowEpisode = {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  trailer: Trailer[];
  credits: {
    crew: {
      job: string;
      name: string;
    }[];
    cast: {
      name: string;
      character: string;
    }[];
  };
};

export type Trailer = {
  key: string;
  name: string;
  official: boolean;
  site: string;
};
