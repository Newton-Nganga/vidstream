import { Routes, Route, useNavigate } from "react-router-dom";
import { shadesOfPurple } from "@clerk/themes";
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
import LoginPage from "@/pages/login/Page";
import RegisterPage from "@/pages/register/Page";
import { ClerkProvider } from "@clerk/clerk-react";
import UserProfilePage from "@/pages/account/profile/Page";
import ProtectedRoute from "@/utils/PrivateRoutes";
import RegisterNewUser from "@/pages/newUser/NewUser";


const clerkPublicKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing publishable key");
}



export default function Pages() {
  
 const hours = new Date().getHours()

  const navigate = useNavigate();
  return (
    <ClerkProvider
      appearance={{ baseTheme: shadesOfPurple }}
      publishableKey={clerkPublicKey}
     // afterSignInUrl={`/register/${new Date().getMinutes()}`}
      navigate={(to) => navigate(to)}
    
    >
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register/*" element={<RegisterPage />} />
        <Route element={<HomePage />} path="/" />
        <Route element={<MoviePage />} path="/movie/:id" />
        <Route element={<MovieFallbackPage />} path="/movie" />
        <Route element={<ShowPage />} path="/tv/:id" />
        <Route element={<ShowFallbackPage />} path="/tv" />
        <Route element={<TvGenres />} path="/genres/tv/:id/:genre/tv" />
        <Route element={<MovieGenrePage />} path="/genres/movie/:id/:genre/mv" />
        <Route element={<SearchPage />} path="/search" />
        <Route element={<ContactPage />} path="/contact" />
        <Route element={<AboutPage />} path="/about" />
        <Route element={<NotFound />} path="*" />
        <Route
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
          path="/account/me"
        />
        <Route path="/account/favorites" element={
        <ProtectedRoute>
          <FavouritesPage />
        </ProtectedRoute>
        } />
        <Route path="/account/watchlist" element={
          <ProtectedRoute>
             <WatchlistPage />
          </ProtectedRoute>
       
        } />
        <Route path="/account/profile" element={
        <ProtectedRoute>
          <UserProfilePage />
        </ProtectedRoute>
        } />
        <Route element={<RegisterNewUser/>} 
        path={`/register/account/${hours}`} />
        <Route element={<NotFound />} path="*" />
      </Routes>
      <Toaster containerStyle={{ top: 90 }} />
    </ClerkProvider>
  );
}
