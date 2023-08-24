import { GraphQLResolveInfo } from 'graphql';
import { MovieModel, ShowModel, SeasonModel, EpisodeModel } from './models';
import { DataSourceContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Details of a star/actors  in a movie or show */
export type Cast = {
  __typename?: 'Cast';
  /** Is the charecter an adult  */
  adult?: Maybe<Scalars['Boolean']['output']>;
  cast_id?: Maybe<Scalars['Int']['output']>;
  /** character played by the star */
  character: Scalars['String']['output'];
  /** The gender of the charcter */
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The name of the star */
  name?: Maybe<Scalars['String']['output']>;
  /** The chacters popularity rating */
  popularity?: Maybe<Scalars['Float']['output']>;
  /** Url to the profile picture of the character */
  profile_path?: Maybe<Scalars['String']['output']>;
};

export type CastAndCrew = {
  __typename?: 'CastAndCrew';
  cast: Array<Cast>;
  crew: Array<Crew>;
  id: Scalars['ID']['output'];
};

export type CreatedBy = {
  __typename?: 'CreatedBy';
  credit_id?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  profile_path?: Maybe<Scalars['String']['output']>;
};

/** Details of the Crew e.g Produces */
export type Crew = {
  __typename?: 'Crew';
  /** Members gender category */
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The role of the crew member */
  job: Scalars['String']['output'];
  /** The name of the crew member */
  name: Scalars['String']['output'];
  /** The popularity rating of the member */
  popularity?: Maybe<Scalars['Float']['output']>;
  /** Url to the members profile picture */
  profilePhoto?: Maybe<Scalars['String']['output']>;
};

export type Episode = {
  __typename?: 'Episode';
  air_date?: Maybe<Scalars['String']['output']>;
  /** cast and crew in an episode */
  credits?: Maybe<CastAndCrew>;
  episode_number?: Maybe<Scalars['Int']['output']>;
  episode_type?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  /** the season that holds this episode */
  season_number?: Maybe<Scalars['Int']['output']>;
  show_id?: Maybe<Scalars['Int']['output']>;
  still_path?: Maybe<Scalars['String']['output']>;
  /** trailer video for an episode */
  trailer?: Maybe<Array<Maybe<Trailer>>>;
  vote_average?: Maybe<Scalars['Float']['output']>;
  vote_count?: Maybe<Scalars['Int']['output']>;
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Movie = {
  __typename?: 'Movie';
  /** url to the backdrop path */
  backdrop_path?: Maybe<Scalars['String']['output']>;
  /** A list of the crew in the show or movie */
  credits: CastAndCrew;
  /** Details of the movie */
  details: MovieDetails;
  id: Scalars['ID']['output'];
  /** The media type */
  media_type?: Maybe<Scalars['String']['output']>;
  /** Movie/Tv 's original language */
  original_language: Scalars['String']['output'];
  /** The movie/shows original title */
  original_title: Scalars['String']['output'];
  /** A description of movie or show */
  overview: Scalars['String']['output'];
  /** Popularity rate of the movie */
  popularity?: Maybe<Scalars['Float']['output']>;
  /** The url to the poster path */
  poster_path?: Maybe<Scalars['String']['output']>;
  /** The date of release */
  release_date?: Maybe<Scalars['String']['output']>;
  /** The title of the movie */
  title?: Maybe<Scalars['String']['output']>;
  /** An object with trailerData */
  trailer?: Maybe<Array<Trailer>>;
  /** Vote average according to IMDB */
  vote_average: Scalars['Float']['output'];
  /** Total vote count by IMDB */
  vote_count: Scalars['Int']['output'];
};

export type MovieDetails = {
  __typename?: 'MovieDetails';
  genres: Array<Maybe<Genre>>;
  id: Scalars['ID']['output'];
  runtime: Scalars['Int']['output'];
  tagline?: Maybe<Scalars['String']['output']>;
};

export type MovieOrShow = Movie | Show;

export type ProductionCompany = {
  __typename?: 'ProductionCompany';
  id: Scalars['ID']['output'];
  logo_path?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  origin_country?: Maybe<Scalars['String']['output']>;
};

/** The entry point to our schema */
export type Query = {
  __typename?: 'Query';
  /**
   * Movies---
   * Returns a list of movies
   * Returns the featured movie of the day
   */
  featuredMovie: Movie;
  /** Returns a list of movies of the genre provided */
  genreMovies: Array<Movie>;
  /**
   * Shows---
   * Returns a list of Shows
   * Returns a list of shows belonging to a genre
   */
  genreShows: Array<Show>;
  movie: Movie;
  /** Returns a list of popular movies */
  popularMovies: Array<Movie>;
  /** Returns a list of the popular shows */
  popularShows: Array<Show>;
  /** Returns a list of recommended movies */
  recommendedMovies: Array<Movie>;
  /** Returns a list of recommended movies */
  recommendedShows: Array<Show>;
  /** fetch a list of movies and shows with the keyword */
  search?: Maybe<Array<Maybe<MovieOrShow>>>;
  show: Show;
  /** returns a list of similar movies */
  similarMovies: Array<Movie>;
  /** returns a list of similar movies */
  similarShows: Array<Show>;
  /** Returns a list of the top movies */
  topMovies: Array<Movie>;
  /** Returns a list of the top/popular shows */
  topShows?: Maybe<Array<Show>>;
  /** Movies|shows */
  trending?: Maybe<Array<Maybe<MovieOrShow>>>;
  /** Returns an array of trending movies */
  trendingMovies: Array<Movie>;
  /** Returns trending shows */
  trendingShows: Array<Show>;
  /** Returns a list of tv shows of genre thriller */
  tvMysteries: Array<Show>;
  /** Returns a list of upcoming movies */
  upcomingMovies: Array<Movie>;
  /** Returns a list of upcoming movies */
  upcomingShows: Array<Show>;
};


/** The entry point to our schema */
export type QueryGenreMoviesArgs = {
  genre?: InputMaybe<Scalars['Int']['input']>;
};


/** The entry point to our schema */
export type QueryGenreShowsArgs = {
  genre?: InputMaybe<Scalars['Int']['input']>;
};


/** The entry point to our schema */
export type QueryMovieArgs = {
  id: Scalars['Int']['input'];
};


/** The entry point to our schema */
export type QueryRecommendedMoviesArgs = {
  id: Scalars['Int']['input'];
};


/** The entry point to our schema */
export type QueryRecommendedShowsArgs = {
  id: Scalars['Int']['input'];
};


/** The entry point to our schema */
export type QuerySearchArgs = {
  query: Scalars['String']['input'];
};


/** The entry point to our schema */
export type QueryShowArgs = {
  id: Scalars['Int']['input'];
};


/** The entry point to our schema */
export type QuerySimilarMoviesArgs = {
  id: Scalars['Int']['input'];
};


/** The entry point to our schema */
export type QuerySimilarShowsArgs = {
  id: Scalars['Int']['input'];
};

export type Season = {
  __typename?: 'Season';
  air_date?: Maybe<Scalars['String']['output']>;
  /** The cast and crew in the season */
  credits?: Maybe<CastAndCrew>;
  /** The episodes array */
  episodes?: Maybe<Array<Maybe<Episode>>>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  poster_path?: Maybe<Scalars['String']['output']>;
  season_number?: Maybe<Scalars['Int']['output']>;
  show_id: Scalars['Int']['output'];
  /** the trailer for the season number */
  trailer?: Maybe<Array<Maybe<Trailer>>>;
};

export type Show = {
  __typename?: 'Show';
  backdrop_path?: Maybe<Scalars['String']['output']>;
  credits?: Maybe<CastAndCrew>;
  details: ShowDetails;
  first_air_date?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The title of the show */
  name?: Maybe<Scalars['String']['output']>;
  origin_country?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  original_language?: Maybe<Scalars['String']['output']>;
  original_name?: Maybe<Scalars['String']['output']>;
  /** Popularity rate of the show */
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  poster_path?: Maybe<Scalars['String']['output']>;
  seasons?: Maybe<Array<Maybe<Season>>>;
  /** the trailer for this series */
  trailer?: Maybe<Array<Maybe<Trailer>>>;
};

/** Details fetched by series id */
export type ShowDetails = {
  __typename?: 'ShowDetails';
  /** the cast and crew of this season */
  created_by?: Maybe<Array<Maybe<CreatedBy>>>;
  episode_run_time?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  genres?: Maybe<Array<Genre>>;
  id: Scalars['ID']['output'];
  languages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  last_air_date?: Maybe<Scalars['String']['output']>;
  last_air_episode?: Maybe<Scalars['Int']['output']>;
  last_episode_to_air: Episode;
  media_type?: Maybe<Scalars['String']['output']>;
  number_of_episodes?: Maybe<Scalars['Int']['output']>;
  number_of_seasons?: Maybe<Scalars['Int']['output']>;
  production_companies?: Maybe<Array<Maybe<ProductionCompany>>>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Trailer = {
  __typename?: 'Trailer';
  id?: Maybe<Scalars['Int']['output']>;
  /** The url = provider + key */
  key?: Maybe<Scalars['String']['output']>;
  /** The name of the trailer */
  name?: Maybe<Scalars['String']['output']>;
  /** Is the trailer video official */
  official?: Maybe<Scalars['Boolean']['output']>;
  /** Date of trailer being published */
  published_at?: Maybe<Scalars['String']['output']>;
  /** The trailer provider */
  site: Scalars['String']['output'];
  /** the size of the trailer video */
  size?: Maybe<Scalars['Int']['output']>;
};

export type MovieGenres = {
  __typename?: 'movieGenres';
  id: Scalars['Int']['output'];
  movie?: Maybe<Array<Maybe<Movie>>>;
};

export type ShowGenres = {
  __typename?: 'showGenres';
  id: Scalars['Int']['output'];
  show?: Maybe<Array<Maybe<Show>>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  MovieOrShow: ( MovieModel ) | ( ShowModel );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Cast: ResolverTypeWrapper<Cast>;
  CastAndCrew: ResolverTypeWrapper<CastAndCrew>;
  CreatedBy: ResolverTypeWrapper<CreatedBy>;
  Crew: ResolverTypeWrapper<Crew>;
  Episode: ResolverTypeWrapper<EpisodeModel>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Genre: ResolverTypeWrapper<Genre>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Movie: ResolverTypeWrapper<MovieModel>;
  MovieDetails: ResolverTypeWrapper<MovieDetails>;
  MovieOrShow: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MovieOrShow']>;
  ProductionCompany: ResolverTypeWrapper<ProductionCompany>;
  Query: ResolverTypeWrapper<{}>;
  Season: ResolverTypeWrapper<SeasonModel>;
  Show: ResolverTypeWrapper<ShowModel>;
  ShowDetails: ResolverTypeWrapper<Omit<ShowDetails, 'last_episode_to_air'> & { last_episode_to_air: ResolversTypes['Episode'] }>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Trailer: ResolverTypeWrapper<Trailer>;
  movieGenres: ResolverTypeWrapper<Omit<MovieGenres, 'movie'> & { movie?: Maybe<Array<Maybe<ResolversTypes['Movie']>>> }>;
  showGenres: ResolverTypeWrapper<Omit<ShowGenres, 'show'> & { show?: Maybe<Array<Maybe<ResolversTypes['Show']>>> }>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Cast: Cast;
  CastAndCrew: CastAndCrew;
  CreatedBy: CreatedBy;
  Crew: Crew;
  Episode: EpisodeModel;
  Float: Scalars['Float']['output'];
  Genre: Genre;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Movie: MovieModel;
  MovieDetails: MovieDetails;
  MovieOrShow: ResolversUnionTypes<ResolversParentTypes>['MovieOrShow'];
  ProductionCompany: ProductionCompany;
  Query: {};
  Season: SeasonModel;
  Show: ShowModel;
  ShowDetails: Omit<ShowDetails, 'last_episode_to_air'> & { last_episode_to_air: ResolversParentTypes['Episode'] };
  String: Scalars['String']['output'];
  Trailer: Trailer;
  movieGenres: Omit<MovieGenres, 'movie'> & { movie?: Maybe<Array<Maybe<ResolversParentTypes['Movie']>>> };
  showGenres: Omit<ShowGenres, 'show'> & { show?: Maybe<Array<Maybe<ResolversParentTypes['Show']>>> };
};

export type CastResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Cast'] = ResolversParentTypes['Cast']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  cast_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  character?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CastAndCrewResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CastAndCrew'] = ResolversParentTypes['CastAndCrew']> = {
  cast?: Resolver<Array<ResolversTypes['Cast']>, ParentType, ContextType>;
  crew?: Resolver<Array<ResolversTypes['Crew']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatedByResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CreatedBy'] = ResolversParentTypes['CreatedBy']> = {
  credit_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CrewResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Crew'] = ResolversParentTypes['Crew']> = {
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  job?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profilePhoto?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EpisodeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Episode'] = ResolversParentTypes['Episode']> = {
  air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  credits?: Resolver<Maybe<ResolversTypes['CastAndCrew']>, ParentType, ContextType>;
  episode_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  episode_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  season_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  show_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  still_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trailer?: Resolver<Maybe<Array<Maybe<ResolversTypes['Trailer']>>>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenreResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = {
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  credits?: Resolver<ResolversTypes['CastAndCrew'], ParentType, ContextType>;
  details?: Resolver<ResolversTypes['MovieDetails'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  original_title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  overview?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trailer?: Resolver<Maybe<Array<ResolversTypes['Trailer']>>, ParentType, ContextType>;
  vote_average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  vote_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieDetailsResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MovieDetails'] = ResolversParentTypes['MovieDetails']> = {
  genres?: Resolver<Array<Maybe<ResolversTypes['Genre']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  runtime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieOrShowResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['MovieOrShow'] = ResolversParentTypes['MovieOrShow']> = {
  __resolveType: TypeResolveFn<'Movie' | 'Show', ParentType, ContextType>;
};

export type ProductionCompanyResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ProductionCompany'] = ResolversParentTypes['ProductionCompany']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logo_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin_country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  featuredMovie?: Resolver<ResolversTypes['Movie'], ParentType, ContextType>;
  genreMovies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType, Partial<QueryGenreMoviesArgs>>;
  genreShows?: Resolver<Array<ResolversTypes['Show']>, ParentType, ContextType, Partial<QueryGenreShowsArgs>>;
  movie?: Resolver<ResolversTypes['Movie'], ParentType, ContextType, RequireFields<QueryMovieArgs, 'id'>>;
  popularMovies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  popularShows?: Resolver<Array<ResolversTypes['Show']>, ParentType, ContextType>;
  recommendedMovies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<QueryRecommendedMoviesArgs, 'id'>>;
  recommendedShows?: Resolver<Array<ResolversTypes['Show']>, ParentType, ContextType, RequireFields<QueryRecommendedShowsArgs, 'id'>>;
  search?: Resolver<Maybe<Array<Maybe<ResolversTypes['MovieOrShow']>>>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'query'>>;
  show?: Resolver<ResolversTypes['Show'], ParentType, ContextType, RequireFields<QueryShowArgs, 'id'>>;
  similarMovies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<QuerySimilarMoviesArgs, 'id'>>;
  similarShows?: Resolver<Array<ResolversTypes['Show']>, ParentType, ContextType, RequireFields<QuerySimilarShowsArgs, 'id'>>;
  topMovies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  topShows?: Resolver<Maybe<Array<ResolversTypes['Show']>>, ParentType, ContextType>;
  trending?: Resolver<Maybe<Array<Maybe<ResolversTypes['MovieOrShow']>>>, ParentType, ContextType>;
  trendingMovies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  trendingShows?: Resolver<Array<ResolversTypes['Show']>, ParentType, ContextType>;
  tvMysteries?: Resolver<Array<ResolversTypes['Show']>, ParentType, ContextType>;
  upcomingMovies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  upcomingShows?: Resolver<Array<ResolversTypes['Show']>, ParentType, ContextType>;
};

export type SeasonResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Season'] = ResolversParentTypes['Season']> = {
  air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  credits?: Resolver<Maybe<ResolversTypes['CastAndCrew']>, ParentType, ContextType>;
  episodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Episode']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  season_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  show_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trailer?: Resolver<Maybe<Array<Maybe<ResolversTypes['Trailer']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShowResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Show'] = ResolversParentTypes['Show']> = {
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  credits?: Resolver<Maybe<ResolversTypes['CastAndCrew']>, ParentType, ContextType>;
  details?: Resolver<ResolversTypes['ShowDetails'], ParentType, ContextType>;
  first_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin_country?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  seasons?: Resolver<Maybe<Array<Maybe<ResolversTypes['Season']>>>, ParentType, ContextType>;
  trailer?: Resolver<Maybe<Array<Maybe<ResolversTypes['Trailer']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShowDetailsResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ShowDetails'] = ResolversParentTypes['ShowDetails']> = {
  created_by?: Resolver<Maybe<Array<Maybe<ResolversTypes['CreatedBy']>>>, ParentType, ContextType>;
  episode_run_time?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  genres?: Resolver<Maybe<Array<ResolversTypes['Genre']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  languages?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  last_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_air_episode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  last_episode_to_air?: Resolver<ResolversTypes['Episode'], ParentType, ContextType>;
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  number_of_episodes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  number_of_seasons?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  production_companies?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductionCompany']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrailerResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Trailer'] = ResolversParentTypes['Trailer']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  official?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  published_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  site?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieGenresResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['movieGenres'] = ResolversParentTypes['movieGenres']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  movie?: Resolver<Maybe<Array<Maybe<ResolversTypes['Movie']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShowGenresResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['showGenres'] = ResolversParentTypes['showGenres']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  show?: Resolver<Maybe<Array<Maybe<ResolversTypes['Show']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  Cast?: CastResolvers<ContextType>;
  CastAndCrew?: CastAndCrewResolvers<ContextType>;
  CreatedBy?: CreatedByResolvers<ContextType>;
  Crew?: CrewResolvers<ContextType>;
  Episode?: EpisodeResolvers<ContextType>;
  Genre?: GenreResolvers<ContextType>;
  Movie?: MovieResolvers<ContextType>;
  MovieDetails?: MovieDetailsResolvers<ContextType>;
  MovieOrShow?: MovieOrShowResolvers<ContextType>;
  ProductionCompany?: ProductionCompanyResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Season?: SeasonResolvers<ContextType>;
  Show?: ShowResolvers<ContextType>;
  ShowDetails?: ShowDetailsResolvers<ContextType>;
  Trailer?: TrailerResolvers<ContextType>;
  movieGenres?: MovieGenresResolvers<ContextType>;
  showGenres?: ShowGenresResolvers<ContextType>;
};

