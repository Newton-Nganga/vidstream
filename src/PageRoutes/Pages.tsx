
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
export default function Pages(){
    return(
        <BrowserRouter>
         <Routes>
            <Route element={<HomePage/>} path="/"/>
            <Route element={<MoviePage/>} path="/movie/:id"/> 
            <Route element={<MovieFallbackPage/>} path="/movie"/>
            <Route element={<ShowPage/>} path="/tv/:id"/>
            <Route element={<ShowFallbackPage/>} path="/tv"/>
            <Route element={<TvGenres/>} path="/genres/tv/:id/:genre"/>
            <Route element={""} path="/genres/movie/:id/:genre"/>
            <Route element={<SearchPage/>} path="/search"/>
            <Route element={<ContactPage/>} path="/contact"/>
            <Route element={<NotFound/>} path="*"/>
          </Routes>
    </BrowserRouter>
    )
}
