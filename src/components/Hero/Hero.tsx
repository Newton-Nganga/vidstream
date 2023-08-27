import {useRef} from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MovieType,ShowType } from "@/__generated_types/UsefulTypes";


import HeroSlider from "./HeroSlider";
import HeroSliderConrols from "./HeroSliderConrols";
import HeroDetails from "./HeroDetails";
import { useQuery,gql } from "@apollo/client";

const GET_TRENDING=gql`
  query GetTrendingForHeroSection {
    trending {
      ... on Show {
        name
        id
        original_name
        overview
        poster_path
        backdrop_path
        details {
          genres {
            name
          }
          media_type
          number_of_seasons
        }
        credits {
          cast {
            name
          }
          crew {
            name
          }
        }
      }
      ... on Movie {
        id
        media_type
        original_title
        overview
        poster_path
        title
        vote_average
        vote_count
        backdrop_path
        details {
          runtime
          genres {
            name
          }
        }
        credits {
          cast {
            name
          }
          crew {
            name
          }
        }
      }
    }
  }
`

export default function Hero() {
  const {loading,error,data} = useQuery(GET_TRENDING)
 const sliderRef = useRef<Slider | null>(null);
  if(loading){
    return<p>Loading ...</p>
  }
  if(error){
    return <p>Error : {error.message}</p>
  }
 

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

 
  console.log(data.trending[5])
  return (
    <section className="bg-black">
      <section className="">
        <HeroSlider sliderRef={sliderRef}>
          {data.trending.map((trendingMovie:MovieType|ShowType)=>(
            <HeroDetails trending={trendingMovie}>
            <HeroSliderConrols previous={previous} next={next} />
          </HeroDetails>
          ))}
        </HeroSlider>
      </section>
    </section>
  );
}
