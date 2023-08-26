import {useRef} from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



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
  const sliderRef = useRef<Slider | null>(null);

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

 const {loading,error,data}=useQuery(GET_TRENDING)
  if(loading){
    return<p>Loading ...</p>
  }
  if(error){
    return <p>Error : {error.message}</p>
  }
  return (
    <section className="bg-black">
      <section className="">
        <HeroSlider sliderRef={sliderRef}>
          <HeroDetails trending={data.trending}>
            <HeroSliderConrols previous={previous} next={next} />
          </HeroDetails>
        </HeroSlider>
      </section>
    </section>
  );
}
