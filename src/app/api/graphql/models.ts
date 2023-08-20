export type MovieModel={
    id:number
    title:String 
    popularity:String
    media_type:String
    release_date:String
    original_title:String
    original_language:String
    poster_path:String 
    backdrop_path:String
    overview:String
    vote_average:number
    vote_count:number
    trailer:[TrailerModel]
    details:MovieDetailsModel
    credits:CastAndCrewModel
}
export type MovieDetailsModel ={
    id:number
    genres:[Genre]
    runtime:number
    tagline:String
}
type Genre={
    id:number
    name:String
}
export type TrailerModel ={
    id:String
    name:String
    key:String
    published_at:String
    official:Boolean
    size:number
    site:String
}
export type CastAndCrewModel ={
   id:number
   cast:[Cast]
   crew:[Crew]
}
type Cast={
    id:number
    cast_id:number
    character:String
    name:String 
    profile_path:String 
    adult:Boolean
    gender:String
    popularity:number
}
type Crew ={
    id:number
    job:String
    department:String
    name:String
    popularity:number
    profilePhoto:String
    gender:number
}
type CastOrCrew={
    created_by:[Cast|Crew]
}
export type MovieOrShowModel={
    movieOrShow:[MovieModel|ShowModel]
}
//show response from the api endpoint
export type ShowModel={
    id:number
    name:String 
    overview:String
    media_type:string
    poster_path:String
    backdrop_path:String
    popularity:number
    origin_country:[String]
    original_name:String
    original_language:String
    first_air_date:String
    trailer:[TrailerModel]
    details:ShowDetailsModel
    credits:CastAndCrewModel
}

export type ShowDetailsModel={
    id:number
    number_of_seasons:number
    number_of_episodes:number
    media_type:String
    languages:[String]
    last_air_date:String
    last_air_episode:number
    last_episode_to_air:EpisodeModel
    episode_run_time:number
    production_companies:[ProductionCompany]
    genres:[Genre]
    created_by:[CastOrCrew]
    status:String
    type:String 
}
type ProductionCompany={
    id:number
    name:String
    logo_path:String
    origin_country:String
}
//seasons object from the api endpoint
export type SeasonModel={
    id:number
    show_id:number
    name:String
    overview:String
    poster_path:String
    season_number:number
    episode_count:number
    air_date:String
    episodes:[EpisodeModel]
    trailer:[TrailerModel]
    credits:CastAndCrewModel
}
//episode object from the api endpoint
export type EpisodeModel={
    id:number
    name:String
    overview:String
    air_date:String
    episode_number:number
    episode_type:String
    season_number:number
    show_id:number
    still_path:String
    vote_average:number
    vote_count:number
    trailer:[TrailerModel]
    credits:CastAndCrewModel
}