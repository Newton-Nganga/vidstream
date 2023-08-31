import { RESTDataSource } from "@apollo/datasource-rest";
export class MovieAPI extends RESTDataSource {
    baseURL = process.env.MOVIES_BASE_URL;
    appendApiKey = `?api_key=${process.env.MOVIES_API_KEY}`;
    //resolve the queries
    async getSpecificMovie(id) {
        const movie = await this.get(`movie/${id}${this.appendApiKey}`);
        movie.media_type = "movie";
        return movie;
    }
    async getGenreMovies(genre) {
        const results = await this.get(`discover/movie${this.appendApiKey}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`);
        const genreMovies = results.results.map(({ media_type, ...rest }) => ({ media_type: "movie", ...rest }));
        return genreMovies;
    }
    async getFeaturedMovie() {
        const featuredMovies = await this.get(`movie/now_playing${this.appendApiKey}`);
        const featured = featuredMovies.results[0];
        featured.media_type = "movie";
        return featured;
    }
    async getTrendingMovies() {
        const trendingMovies = await this.get(`trending/movie/day${this.appendApiKey}&language=en-US`);
        const trending_movies = trendingMovies.results.map(({ media_type, ...rest }) => ({ media_type: "movie", ...rest }));
        return trending_movies;
    }
    async getPopularMovies() {
        const popular = await this.get(`movie/popular${this.appendApiKey}`);
        const popular_movies = popular.results.map(({ media_type, ...rest }) => ({ media_type: "movie", ...rest }));
        return popular_movies;
    }
    async getTopMovies() {
        const topMovies = await this.get(`movie/popular${this.appendApiKey}`);
        const top_ratedMovies = topMovies.results.map(({ media_type, ...rest }) => ({ media_type: "movie", ...rest }));
        return top_ratedMovies;
    }
    async getUpcomingMovies() {
        const upcomingMovies = await this.get(`movie/upcoming${this.appendApiKey}`);
        const upcoming_Movies = upcomingMovies.results.map(({ media_type, ...rest }) => ({ media_type: "movie", ...rest }));
        return upcoming_Movies;
    }
    async getSimilarMovies(id) {
        const similar = await this.get(`movie/${id}/similar${this.appendApiKey}`);
        const similar_movies = similar.results.map(({ media_type, ...rest }) => ({ media_type: "movie", ...rest }));
        return similar_movies;
    }
    async getRecommendedMovies(id) {
        const recommended = await this.get(`movie/${id}/recommendations${this.appendApiKey}`);
        const recommended_movies = recommended.results.map(({ media_type, ...rest }) => ({ media_type: "movie", ...rest }));
        return recommended_movies;
    }
    //---------------------------------------------------------
    //The fields in the movie object that need to be populated
    async getMovieTrailer(id) {
        try {
            const trailers = await this.get(`movie/${id}/videos${this.appendApiKey}`);
            return trailers.results;
        }
        catch (err) {
            return err;
        }
    }
    async getMovieDetails(id) {
        try {
            const details = await this.get(`movie/${id}${this.appendApiKey}`);
            return details;
        }
        catch (err) {
            return err;
        }
    }
    async getCredit(media_type, id) {
        try {
            const credit = await this.get(`${media_type}/${id}/credits${this.appendApiKey}`);
            //console.log(credit)
            return credit;
        }
        catch (err) {
            return err;
        }
    }
}
