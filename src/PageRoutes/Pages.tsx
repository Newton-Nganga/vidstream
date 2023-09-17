
import { BrowserRouter,Routes,Route } from "react-router-dom";
import HomePage from "@/pages/Homepage/page";
import NotFound from "@/pages/NotFound/page";
import ContactPage from "@/pages/contact/page";
import MoviePage from "@/pages/movie/MovieID/page";
import MovieFallbackPage from "@/pages/movie/page";
import ShowPage from "@/pages/tv/TvID/page";
import ShowFallbackPage from "@/pages/tv/page";
import SearchPage from "@/pages/search/page";
import TvGenres from "@/pages/genres/tv/TvGenres";
import MovieGenrePage from "@/pages/genres/movie/MovieGenre";
import AccountPage from "@/pages/account/page";
import FavouritesPage from "@/pages/account/collections/favourites/Favourites";
import WatchlistPage from "@/pages/account/collections/watchlist/Watchlist";
import AboutPage from "@/pages/about/About";
import { Toaster } from "react-hot-toast";

//Fetch the featured movie details and provide it across the pages


export default function Pages(){
   
    return(
        <BrowserRouter>
         <Routes>
            <Route element={<HomePage/>} path="/"/>
            <Route element={<MoviePage/>} path="/movie/:id"/> 
            <Route element={<MovieFallbackPage/>} path="/movie"/>
            <Route element={<ShowPage/>} path="/tv/:id"/>
            <Route element={<ShowFallbackPage/>} path="/tv"/>
            <Route element={<TvGenres/>} path="/genres/tv/:id/:genre/tv"/>
            <Route element={<MovieGenrePage/>} path="/genres/movie/:id/:genre/mv"/>
            <Route element={<SearchPage/>} path="/search"/>
            <Route element={<ContactPage/>} path="/contact"/>
            <Route element={<AboutPage/>} path="/about"/>
            <Route element={<FavouritesPage/>} path="/account/:userId/favourites"/>
            <Route element={<WatchlistPage/>} path="/account/:userId/watchlist"/>
            <Route element={<AccountPage/>} path="/account/:userId/me"/>
            <Route element={<NotFound/>} path="*"/>
          </Routes>
          <Toaster containerStyle={{ top: 90 }} />
    </BrowserRouter>
    )
}
