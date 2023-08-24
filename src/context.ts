import { SearchAPI } from './datasources/search-api';
import { MovieAPI } from "./datasources/movie-api";
import {ShowAPI} from "./datasources/show-api"
import {MovieOrShowAPI} from './datasources/movieorshow-api'

export type DataSourceContext ={
    dataSources:{
        movieAPI:MovieAPI,
        showAPI:ShowAPI,
        searchAPI:SearchAPI,
        movieOrShowAPI:MovieOrShowAPI
    }
}