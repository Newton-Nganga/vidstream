import FeaturedMovie from "@/components/HompageSliders/FeaturedMovie/FeaturedMovie";
import Hero from "@/components/Hero/Hero";

import Trending from "@/components/HompageSliders/Trending/Trending";
import VidstreamPage from "@/components/VidstreamPage/VidstreamPage";
import UpcomingMovies from "@/components/Queries/UpcomingMovies";
import TopRatedShows from "@/components/Queries/TopRatedShows";
import TopRatedMovies from "@/components/Queries/TopRatedMovies";
import TvMysteries from "@/components/Queries/TvMysteries";

export default function Home() {
  return (
    <VidstreamPage>
      {/* hero section */}
      <Hero />

      {/* Popular Shows */}
      <TopRatedShows/>

      {/* upcoming movies */}
      <UpcomingMovies />

      {/* Top movies */}
      <TopRatedMovies/>

      {/* Discover shows */}
      <TvMysteries/>

      {/* featured movie */}
      {/* <FeaturedMovie /> */}

      {/* trending */}
      <Trending title="Trending" />

    </VidstreamPage>
  );
}
