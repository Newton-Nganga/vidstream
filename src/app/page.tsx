import FeaturedMovie from "@/components/HompageSliders/FeaturedMovie/FeaturedMovie";
import Hero from "@/components/Hero/Hero";

import Trending from "@/components/HompageSliders/Trending";
import VidstreamPage from "@/components/VidstreamPage/VidstreamPage";
import PopularShows from "@/components/movieCarouselItems/PopularShows";
import SuggestedShows from "@/components/movieCarouselItems/SuggestedShows";
import TopRatedMovies from "@/components/movieCarouselItems/TopRatedMovies";
import UpcomingMovies from "@/components/HompageSliders/UpcomingMovies";

export default function Home() {
  return (
    <VidstreamPage>
      {/* hero section */}
      <Hero />

      {/* Popular Shows */}
      <PopularShows />

      {/* upcoming movies */}
      <UpcomingMovies />

      {/* Top movies */}
      <TopRatedMovies />

      {/* Discover shows */}
      <SuggestedShows />

      {/* featured movie */}
      <FeaturedMovie />

      {/* trending */}
      <Trending title="Trending" />
    </VidstreamPage>
  );
}
