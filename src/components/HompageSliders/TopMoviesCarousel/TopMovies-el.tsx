import Slider from "react-slick"
import Image from "next/image"



const TopSlider =({Props}:TopSlider)=>{
    return(
        <Slider
        fade={true}
        asNavFor={nav1}
        ref={slider2Ref}
        arrows={false}
        adaptiveHeight={false}
        dots={false}
        slidesToShow={1}
        slidesToScroll={1}
        swipeToSlide={false}
      >
        {movies?.map((movie: Movies, index: number) => (
          <div
            key={index}
            className="relative w-full h-[500px] md:h-[600px]"
          >
            <Image
              fill={true}
              src={`${
                  movie?.backdrop_path
                  ? "https://image.tmdb.org/t/p/original"+movie?.backdrop_path
                  : movie?.poster_path
                  ? "https://image.tmdb.org/t/p/original"+movie?.poster_path
                  : "https://fontawesome.com/social/film?f=classic&s=&v=5"
              }`}
              alt="top movie"
              className="w-full h-full object-cover"
            />
            <span className="absolute block w-full h-full bg-black/25"></span>
          </div>
        ))}
      </Slider>
    )
}