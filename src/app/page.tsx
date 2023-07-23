import FeaturedMovie from "@/components/FeaturedMovie";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Movie from "@/components/Movie";
import MoviesCarousel from "@/components/MoviesCarousel";
import Navbar from "@/components/Navbar/Navbar";
import TopMovies from "@/components/TopMovies";
import Trending from "@/components/Trending";
import VidstreamPage from "@/components/VidstreamPage";
import PopularShows from "@/components/movieCarouselItems/PopularShows";
import SuggestedShows from "@/components/movieCarouselItems/SuggestedShows";
import TopRatedMovies from "@/components/movieCarouselItems/TopRatedMovies";
import UpcomingMovies from "@/components/movieCarouselItems/UpcomingMovies";


export default function Home() {
  return (
    <VidstreamPage>
      
      {/* hero section */}
      <Hero />

      {/* Popular Shows */}
      <PopularShows/>

      {/* upcoming movies */}
      <UpcomingMovies/>

       {/* Top movies */}
      <TopRatedMovies/>
     
      {/* Discover shows */}
      <SuggestedShows/>

      {/* featured movie */}
      <FeaturedMovie /> 

       {/* trending */}
      <Trending title="Trending" />
     
      
    </VidstreamPage>
  );
}
