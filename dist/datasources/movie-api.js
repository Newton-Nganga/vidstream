var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { RESTDataSource } from "@apollo/datasource-rest";
export class MovieAPI extends RESTDataSource {
    constructor() {
        super(...arguments);
        this.baseURL = "https://api.themoviedb.org/3/";
        this.appendApiKey = "?api_key=14fc1a4b07ca3aea2cf869ddedc090c7&adult=true";
    }
    //resolve the queries
    async getSpecificMovie(id) {
        const movie = await this.get(`movie/${id}${this.appendApiKey}`);
        movie.media_type = "movie";
        return movie;
    }
    async getGenreMovies(genre) {
        const results = await this.get(`discover/movie${this.appendApiKey}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`);
        const genreMovies = results.results.map((_a) => {
            var { media_type } = _a, rest = __rest(_a, ["media_type"]);
            return (Object.assign({ media_type: "movie" }, rest));
        });
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
        const trending_movies = trendingMovies.results.map((_a) => {
            var { media_type } = _a, rest = __rest(_a, ["media_type"]);
            return (Object.assign({ media_type: "movie" }, rest));
        });
        return trending_movies;
    }
    async getPopularMovies() {
        const popular = await this.get(`movie/popular${this.appendApiKey}`);
        const popular_movies = popular.results.map((_a) => {
            var { media_type } = _a, rest = __rest(_a, ["media_type"]);
            return (Object.assign({ media_type: "movie" }, rest));
        });
        return popular_movies;
    }
    async getTopMovies() {
        const topMovies = await this.get(`movie/popular${this.appendApiKey}`);
        const top_ratedMovies = topMovies.results.map((_a) => {
            var { media_type } = _a, rest = __rest(_a, ["media_type"]);
            return (Object.assign({ media_type: "movie" }, rest));
        });
        return top_ratedMovies;
    }
    async getUpcomingMovies() {
        const upcomingMovies = await this.get(`movie/upcoming${this.appendApiKey}`);
        const upcoming_Movies = upcomingMovies.results.map((_a) => {
            var { media_type } = _a, rest = __rest(_a, ["media_type"]);
            return (Object.assign({ media_type: "movie" }, rest));
        });
        return upcoming_Movies;
    }
    async getSimilarMovies(id) {
        const similar = await this.get(`movie/${id}/similar${this.appendApiKey}`);
        const similar_movies = similar.results.map((_a) => {
            var { media_type } = _a, rest = __rest(_a, ["media_type"]);
            return (Object.assign({ media_type: "movie" }, rest));
        });
        return similar_movies;
    }
    async getRecommendedMovies(id) {
        const recommended = await this.get(`movie/${id}/recommendations${this.appendApiKey}`);
        const recommended_movies = recommended.results.map((_a) => {
            var { media_type } = _a, rest = __rest(_a, ["media_type"]);
            return (Object.assign({ media_type: "movie" }, rest));
        });
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
