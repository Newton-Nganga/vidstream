import FeaturedMovie from "@/components/FeaturedMovie";
import Hero from "@/components/Hero";


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
