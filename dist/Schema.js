import { gql } from 'graphql-tag';
export const typeDefs = gql `
union MovieOrShow = Movie |Show
"The entry point to our schema"
type Query{
    movie(id:Int!):Movie!
    show(id:Int!):Show!
    """
    Movies|shows
    """
    trending:[MovieOrShow]
   "fetch a list of movies and shows with the keyword"
    search(query:String!):[MovieOrShow]
    """ 
    Movies---
    Returns a list of movies
    Returns the featured movie of the day
    """
    featuredMovie:Movie!
    "Returns a list of movies of the genre provided"
    genreMovies(genre:Int):[Movie!]!
    "Returns an array of trending movies"
    trendingMovies:[Movie!]!
     "Returns a list of the top movies"
    topMovies:[Movie!]!
    "Returns a list of popular movies"
    popularMovies:[Movie!]!
    "Returns a list of upcoming movies"
    upcomingMovies:[Movie!]!
    "returns a list of similar movies"
    similarMovies(id:Int!):[Movie!]!
    "Returns a list of recommended movies"
    recommendedMovies(id:Int!):[Movie!]!
    """
    Shows---
    Returns a list of Shows
    Returns a list of shows belonging to a genre
    """
    genreShows(genre:Int):[Show!]!
    "Returns trending shows"
    trendingShows:[Show!]!
    "Returns a list of the top/popular shows"
    topShows:[Show!]
    "Returns a list of the popular shows"
    popularShows:[Show!]!
    "Returns a list of upcoming movies"
    upcomingShows:[Show!]!
    "returns a list of similar movies"
    similarShows(id:Int!):[Show!]!
    "Returns a list of recommended movies"
    recommendedShows(id:Int!):[Show!]!
    "Returns a list of tv shows of genre thriller"
    tvMysteries:[Show!]!
}
type movieGenres{
    id:Int! 
    movie:[Movie]
}
type showGenres{
    id:Int!
    show:[Show]
}
type Movie{
    id:ID!
    "The title of the movie"
    title:String 
   "Popularity rate of the movie"
    popularity:Float
    "The media type"
    media_type:String
    "The date of release"
    release_date:String
    "The movie/shows original title"
    original_title:String!
    "Movie/Tv 's original language"
    original_language:String!
    "The url to the poster path"
    poster_path:String
    "url to the backdrop path"  
    backdrop_path:String
    "A description of movie or show"
    overview:String!
    "Vote average according to IMDB"
    vote_average:Float!
    "Total vote count by IMDB"
    vote_count:Int! 
    "Details of the movie"
    details:MovieDetails!
    "An object with trailerData"
    trailer:[Trailer!]
    "A list of the crew in the show or movie"
    credits:CastAndCrew!
}
type CastAndCrew{
    id:ID!
    cast:[Cast!]!
    crew:[Crew!]!
}
type MovieDetails{
    id:ID!
    genres:[Genre]!
    runtime:Int!
    tagline:String
}
type Genre{
    id:Int!
    name:String
}
type Trailer{
    id:Int
    "The name of the trailer"
    name:String
    "The url = provider + key"
    key:String
    "Date of trailer being published"
    published_at:String
    "Is the trailer video official"
    official:Boolean
    "the size of the trailer video"
    size:Int
    "The trailer provider"
    site:String!
}
type Show{
    id:ID!
    "The title of the show"
    name:String 
   "Popularity rate of the show"
    overview:String
    poster_path:String
    backdrop_path:String
    popularity:Float
    origin_country:[String]
    original_name:String
    original_language:String
    first_air_date:String
    credits:CastAndCrew
    "the trailer for this series"
    trailer:[Trailer]
    details:ShowDetails!
    seasons:[Season]
}
"Details fetched by series id"
type ShowDetails{
    id:ID!
    number_of_seasons:Int
    number_of_episodes:Int
    media_type:String
    languages:[String]
    last_air_date:String
    last_air_episode:Int
    last_episode_to_air:Episode!
    episode_run_time:[Int]
    status:String
    type:String
    production_companies:[ProductionCompany]
    genres:[Genre!]
    "the cast and crew of this season"
    created_by:[CreatedBy] 
}
type CreatedBy{
    id:ID!
    credit_id:String
    name:String
    gender:Int
    profile_path:String
}
type Season{
    id:ID!
    show_id:Int!
    name:String
    overview:String
    poster_path:String
    season_number:Int
    air_date:String
    "The episodes array"
    episodes:[Episode]
    "The cast and crew in the season"
    credits:CastAndCrew
    "the trailer for the season number"
    trailer:[Trailer]
}
type Episode{
    id:ID!
    name:String
    overview:String
    air_date:String
    episode_number:Int
    episode_type:String
    "the season that holds this episode"
    season_number:Int
    show_id:Int
    still_path:String
    vote_average:Float
    vote_count:Int
    "cast and crew in an episode"
    credits:CastAndCrew
    "trailer video for an episode"
    trailer:[Trailer]
}
type ProductionCompany{
    id:ID!
    name:String
    logo_path:String
    origin_country:String
}
"Details of the Crew e.g Produces"
type Crew{
    id:ID!
    "The role of the crew member"
    job:String!
    "The name of the crew member"
    name:String!
    "The popularity rating of the member"
    popularity:Float
    "Url to the members profile picture"
    profilePhoto:String
    "Members gender category"
    gender:String
}
"Details of a star/actors  in a movie or show"
type Cast{
    id:ID!
    cast_id:Int
    "character played by the star"
    character:String!
    "The name of the star"
    name:String 
    "Url to the profile picture of the character"
    profile_path:String 
    "Is the charecter an adult "
    adult:Boolean
    "The gender of the charcter"
    gender:String
    "The chacters popularity rating"
    popularity:Float
}
`;
