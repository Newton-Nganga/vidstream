import { RESTDataSource } from "@apollo/datasource-rest";
export class MovieOrShowAPI extends RESTDataSource {
    baseURL = process.env.MOVIES_BASE_URL;
    appendApiKey = `?api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=1`;
    //fetch trending this day
    async getTrending() {
        const response = await this.get(`trending/all/day${this.appendApiKey}`);
        const moviesAndShows = response.results.filter(all => all.media_type === "movie" || "tv");
        const movies = moviesAndShows.filter(all => all.media_type === "movie");
        const shows = moviesAndShows.filter(all => all.media_type === "tv");
        return [...movies, ...shows];
    }
}
