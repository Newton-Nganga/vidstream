import FeaturedMovie from "@/components/FeaturedMovie";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Movie from "@/components/Movie";
import MoviesCarousel from "@/components/MoviesCarousel";
import Navbar from "@/components/Navbar/Navbar";
import TopMovies from "@/components/TopMovies";
import Trending from "@/components/Trending";
import VidstreamPage from "@/components/VidstreamPage";
import Image from "next/image";

export default function Home() {
  return (
    <VidstreamPage>
      <Hero />
      {/* hero section */}
      {/* <MoviesCarousel title="Favorite Movies" />
      <MoviesCarousel title="Upcoming Movies" /> */}
      <TopMovies />
      {/* Top movies */}
      {/* <MoviesCarousel title="Suggested For You" />*/}
      {/* <FeaturedMovie />  */}
      {/* featured movie */}
      <Trending title="Trending" />
      {/* trending */}
      {/* <MoviesCarousel title="Tv Thrillers" /> */}
    </VidstreamPage>
  );
}
