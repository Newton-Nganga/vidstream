import { RESTDataSource } from "@apollo/datasource-rest";
export class SearchAPI extends RESTDataSource {
    baseURL = process.env.MOVIES_BASE_URL;
    appendApiKey = `?api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=1`;
    async queryMoviesOrShows(query) {
        const response = await this.get(`search/multi?query=${query}${this.appendApiKey}`);
        const movies = response.results.filter((all) => all.media_type === 'movie');
        const shows = response.results.filter((all) => all.media_type === 'tv');
        return [...movies, ...shows];
    }
}
