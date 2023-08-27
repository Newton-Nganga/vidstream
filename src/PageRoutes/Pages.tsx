
import { BrowserRouter,Routes,Route } from "react-router-dom";
import HomePage from "@/pages/Homepage/page";
import NotFound from "@/pages/NotFound/page";
import ContactPage from "@/pages/contact/page";
import MoviePage from "@/pages/movie/[id]/page";
import MovieFallbackPage from "@/pages/movie/page";
export default function Pages(){
    return(
        // <BrowserRouter>
        //  <Routes>
        //     <Route element={<HomePage/>} path="/"/>
        //     <Route element={<MoviePage/>} path="/movie/:id"/>
        //     <Route element={<MovieFallbackPage/>} path="/movie"/>
        //     <Route element={<ContactPage/>} path="/contact"/>
        //     <Route element={<NotFound/>} path="*"/>
        //  </Routes>
        // </BrowserRouter>
        <HomePage/>
    )
}
