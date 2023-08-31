import { RESTDataSource } from "@apollo/datasource-rest";
export class ShowAPI extends RESTDataSource {
    baseURL = process.env.MOVIES_BASE_URL;
    appendApiKey = `?api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=1`;
    //resolve the queries
    async getSpecificShow(id) {
        return await this.get(`tv/${id}${this.appendApiKey}`);
    }
    async getTrendingShows() {
        const trendingShows = await this.get(`trending/tv/day${this.appendApiKey}&language=en-US`);
        const trending_shows = trendingShows.results.map(({ media_type, ...rest }) => ({ media_type: "tv", ...rest }));
        return trending_shows;
    }
    async getMysteries() {
        const result = await this.get(`discover/tv${this.appendApiKey}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=9648`);
        const mysteries = result.results.map(({ media_type, ...rest }) => ({ media_type: "tv", ...rest }));
        return mysteries;
    }
    async getGenreShows(genre) {
        const results = await this.get(`discover/tv${this.appendApiKey}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`);
        const genreShows = results.results.map(({ media_type, ...rest }) => ({ media_type: "tv", ...rest }));
        return genreShows;
    }
    async getPopularShows() {
        const popular = await this.get(`tv/popular${this.appendApiKey}`);
        const popular_shows = popular.results.map(({ media_type, ...rest }) => ({ media_type: "tv", ...rest }));
        return popular_shows;
    }
    async getTopShows() {
        const topShows = await this.get(`tv/top_rated${this.appendApiKey}`);
        const top_ratedShows = topShows.results.map(({ media_type, ...rest }) => ({ media_type: "tv", ...rest }));
        return top_ratedShows;
    }
    async getUpcomingShows() {
        const upcomingShows = await this.get(`tv/upcoming${this.appendApiKey}`);
        const upcoming_shows = upcomingShows.results.map(({ media_type, ...rest }) => ({ media_type: "tv", ...rest }));
        return upcoming_shows;
    }
    async getSimilarShows(id) {
        const similar = await this.get(`tv/${id}/similar${this.appendApiKey}`);
        const similar_shows = similar.results.map(({ media_type, ...rest }) => ({ media_type: "tv", ...rest }));
        return similar_shows;
    }
    async getRecommendedShows(id) {
        const recommended = await this.get(`tv/${id}/recommendations${this.appendApiKey}`);
        const recommended_shows = recommended.results.map(({ media_type, ...rest }) => ({ media_type: "tv", ...rest }));
        return recommended_shows;
    }
    //------------------------------
    //a method to populate the details field for a specific show
    async getShowDetails(id) {
        try {
            const details = await this.get(`tv/${id}${this.appendApiKey}`);
            details.media_type = "show";
            return details;
        }
        catch (err) {
            return err;
        }
    }
    async getSeasons(id) {
        //fetch the seasons till the number of seasons is reached
        const { number_of_seasons, ...rest } = await this.get(`tv/${id}${this.appendApiKey}`);
        let seasons = [];
        for (let i = 1; i <= number_of_seasons; i++) {
            const season = await this.get(`tv/${id}/season/${i}${this.appendApiKey}`);
            season.show_id = id;
            seasons.push(season);
        }
        return seasons;
    }
    async getEpisodes(id, season_number) {
        const response = await this.get(`tv/${id}/season/${season_number}${this.appendApiKey}`);
        return response.episodes;
    }
    //populates the trailers field in the show,season,episodes
    async getShowTrailer(id, season_number, episode_number) {
        //returns episode trailer
        if (id && season_number && episode_number) {
            try {
                const trailers = await this.get(`tv/${id}/season/${season_number}/episode/${episode_number}/videos${this.appendApiKey}`);
                return trailers.results;
            }
            catch (err) {
                return err;
            }
        }
        //returns season trailers
        if (id && season_number && !episode_number) {
            try {
                const trailers = await this.get(`tv/${id}/season/${season_number}/videos${this.appendApiKey}`);
                return trailers.results;
            }
            catch (err) {
                return err;
            }
        }
        //returns show trailers
        if (id && !season_number && !episode_number) {
            try {
                const trailers = await this.get(`tv/${id}/videos${this.appendApiKey}`);
                return trailers.results;
            }
            catch (err) {
                return err;
            }
        }
    }
    //popultes the credits field in the show,season,episodes
    async getCredits(id, season_number, episode_number) {
        //returns episode trailer
        if (id && season_number && episode_number) {
            try {
                return await this.get(`tv/${id}/season/${season_number}/episode/${episode_number}/credits${this.appendApiKey}`);
            }
            catch (err) {
                return err;
            }
        }
        //returns season trailers
        if (id && season_number && !episode_number) {
            try {
                return await this.get(`tv/${id}/season/${season_number}/credits${this.appendApiKey}`);
            }
            catch (err) {
                return err;
            }
        }
        //returns show trailers
        if (!season_number && !episode_number) {
            try {
                return await this.get(`tv/${id}/credits${this.appendApiKey}`);
            }
            catch (err) {
                return err;
            }
        }
    }
}
