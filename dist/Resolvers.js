export const resolvers = {
    MovieOrShow: {
        __resolveType: obj => "title" in obj ? 'Movie' : 'Show'
    },
    Query: {
        //get specific movie by its id
        movie: (_, { id }, { dataSources }) => {
            return dataSources.movieAPI.getSpecificMovie(id);
        },
        show: (_, { id }, { dataSources }) => {
            return dataSources.showAPI.getSpecificShow(id);
        },
        //------------
        //get all movies|shows
        search: (_, { query }, { dataSources }) => {
            return dataSources.searchAPI.queryMoviesOrShows(query);
        },
        trending: (_, __, { dataSources }) => {
            return dataSources.movieOrShowAPI.getTrending();
        },
        //-------------
        //get  Movies
        genreMovies: (_, { genre }, { dataSources }) => {
            return dataSources.movieAPI.getGenreMovies(genre);
        },
        featuredMovie: (_, __, { dataSources }) => {
            return dataSources.movieAPI.getFeaturedMovie();
        },
        trendingMovies: (_, __, { dataSources }) => {
            return dataSources.movieAPI.getTrendingMovies();
        },
        popularMovies: (_, __, { dataSources }) => {
            return dataSources.movieAPI.getPopularMovies();
        },
        topMovies: (_, __, { dataSources }) => {
            return dataSources.movieAPI.getTopMovies();
        },
        upcomingMovies: (_, __, { dataSources }) => {
            return dataSources.movieAPI.getUpcomingMovies();
        },
        similarMovies: (_, { id }, { dataSources }) => {
            return dataSources.movieAPI.getSimilarMovies(id);
        },
        recommendedMovies: (_, { id }, { dataSources }) => {
            return dataSources.movieAPI.getRecommendedMovies(id);
        },
        //------------
        //get Shows
        genreShows: (_, { genre }, { dataSources }) => {
            return dataSources.showAPI.getGenreShows(genre);
        },
        tvMysteries: (_, __, { dataSources }) => {
            return dataSources.showAPI.getMysteries();
        },
        trendingShows: (_, __, { dataSources }) => {
            const trending = dataSources.showAPI.getTrendingShows();
            return trending;
        },
        popularShows: (_, __, { dataSources }) => {
            return dataSources.showAPI.getPopularShows();
        },
        topShows: (_, __, { dataSources }) => {
            return dataSources.showAPI.getTopShows();
        },
        upcomingShows: (_, __, { dataSources }) => {
            return dataSources.showAPI.getUpcomingShows();
        },
        similarShows: (_, { id }, { dataSources }) => {
            return dataSources.showAPI.getSimilarShows(id);
        },
        recommendedShows: (_, { id }, { dataSources }) => {
            return dataSources.showAPI.getRecommendedShows(id);
        }
    },
    Movie: {
        //(parent,args,contextValue,info)=>{}
        //resolves for the trailer field using id from the parent
        trailer: ({ id }, _, { dataSources }) => {
            return dataSources.movieAPI.getMovieTrailer(id);
        },
        //resolves for the details field using parents id
        details: ({ id }, _, { dataSources }) => {
            return dataSources.movieAPI.getMovieDetails(id);
        },
        //resolves for credits field using id from parent and media_type
        credits: ({ media_type, id }, _, { dataSources }) => {
            return dataSources.movieAPI.getCredit(media_type, id);
        }
    },
    Show: {
        //in the show object resolve the fields below
        details: ({ id }, _, { dataSources }) => {
            return dataSources.showAPI.getShowDetails(id);
        },
        trailer: ({ id }, _, { dataSources }) => {
            return dataSources.showAPI.getShowTrailer(id, null, null);
        },
        credits: ({ id }, _, { dataSources }) => {
            return dataSources.showAPI.getCredits(id, null, null);
        },
        seasons: ({ id }, _, { dataSources }) => {
            return dataSources.showAPI.getSeasons(id);
        },
    },
    //populates the season object fields trailer and credits
    Season: {
        trailer: ({ show_id, season_number }, _, { dataSources }) => {
            return dataSources.showAPI.getShowTrailer(show_id, season_number, null);
        },
        credits: ({ show_id, season_number }, _, { dataSources }) => {
            return dataSources.showAPI.getCredits(show_id, season_number, null);
        }
    },
    //populates the trailer and credits field in our episode object
    Episode: {
        trailer: ({ show_id, season_number, episode_number }, _, { dataSources }) => {
            return dataSources.showAPI.getShowTrailer(show_id, season_number, episode_number);
        },
        credits: ({ show_id, season_number, episode_number }, _, { dataSources }) => {
            return dataSources.showAPI.getCredits(show_id, season_number, episode_number);
        }
    }
};
