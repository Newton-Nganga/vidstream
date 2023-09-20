import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import {
  SignIn,
  SignUp,
  SignedOut,
  UserProfile,
  SignedIn,
} from "@clerk/clerk-react";

import { ClerkProvider } from "@clerk/clerk-react";


const clerkPublicKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing publishable key");
}

export default function Pages() {
  
  const navigate = useNavigate()
  return (
    <ClerkProvider
      publishableKey={clerkPublicKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/login" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/signup" />}
        />
        
        <Route element={<HomePage />} path="/" />
        <Route element={<MoviePage />} path="/movie/:id" />
        <Route element={<MovieFallbackPage />} path="/movie" />
        <Route element={<ShowPage />} path="/tv/:id" />
        <Route element={<ShowFallbackPage />} path="/tv" />
        <Route element={<TvGenres />} path="/genres/tv/:id/:genre/tv" />
        <Route
          element={<MovieGenrePage />}
          path="/genres/movie/:id/:genre/mv"
        />
        <Route element={<SearchPage />} path="/search" />
        <Route element={<ContactPage />} path="/contact" />
        <Route element={<AboutPage />} path="/about" />
        
        <Route element={<NotFound />} path="*" />
      </Routes>{" "}

     {/* protected routes */}
      <SignedIn>
           <Routes>
        <Route
          path="/profile/*"
          element={<UserProfile routing="path" path="/profile" />}
        />
          <Route path="/account/:userId/">
            <Route element={<AccountPage />} path="me" />
            <Route path="favorites" element={<FavouritesPage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>  
        </Routes> 
        </SignedIn>

        <SignedOut>
            <Navigate to={'/'}/>
        </SignedOut>

      <Toaster containerStyle={{ top: 90 }} />
    </ClerkProvider>
  );
}
