import FeaturedMovie from "@/components/HompageSliders/FeaturedMovie/FeaturedMovie";
import VidstreamPage from "@components/VidstreamPage/VidstreamPage";
import Trending from "@components/HompageSliders/Trending/Trending";
import Hero from "@components/Hero/Hero";
import TopMovies from "@/components/HompageSliders/TopMoviesCarousel/TopMovies";
import UpcomingMovies from "@/components/HompageSliders/UpcomingMovies/Upcoming";
import TvMysteries from "@/components/HompageSliders/TvMysteries/TvMysteries";
import TopRatedShows from "@/components/HompageSliders/TopRatedShow/TopShow";

export default function HomePage() {
  console.log("prefix env var", import.meta.env.VITE_PUBLIC_IMAGE_PREFIX);
  return (
    <VidstreamPage>
      {/* hero section */}
      <Hero />

      {/* Popular Shows */}
      <TopRatedShows />

      {/* upcoming movies */}
      {/* <UpcomingMovies /> */}
      <UpcomingMovies />
      {/* Top movies */}
      {/* <TopRatedMovies/> */}
      <TopMovies />
      {/* Discover shows */}
      <TvMysteries />

      {/* featured movie */}
      <FeaturedMovie />

      {/* trending */}
      <Trending title="Trending" />
    </VidstreamPage>
  );
}
