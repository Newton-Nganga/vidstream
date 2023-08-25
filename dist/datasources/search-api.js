import { RESTDataSource } from "@apollo/datasource-rest";
export class SearchAPI extends RESTDataSource {
    baseURL = "https://api.themoviedb.org/3/";
    appendApiKey = "&api_key=14fc1a4b07ca3aea2cf869ddedc090c7&include_adult=true&language=en-US&page=1";
    async queryMoviesOrShows(query) {
        const response = await this.get(`search/multi?query=${query}${this.appendApiKey}`);
        const movies = response.results.filter((all) => all.media_type === 'movie');
        const shows = response.results.filter((all) => all.media_type === 'tv');
        return [...movies, ...shows];
    }
}
