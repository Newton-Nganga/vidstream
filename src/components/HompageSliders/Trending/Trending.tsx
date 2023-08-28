/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useRef, useState } from "react";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import DetailsSlider, { DetailsTopSlider } from "./DetailsSlider-el";
import { useQuery, gql } from "@apollo/client";
import { MovieType, ShowType } from "@/__generated_types/UsefulTypes";
import { useShuffle } from "@/utils/useSufflle";

type Props = {
  title: string;
};

const GET_POPULAR = gql`
  query GetPopular {
    popularShows {
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
        id
        media_type
        number_of_seasons
        last_air_date
      }
      credits {
        cast {
          id
          name
        }
        crew {
          id
          name
        }
      }
    }
    popularMovies {
      id
      media_type
      original_title
      overview
      poster_path
      title
      vote_average
      release_date
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
          id
          name
        }
        crew {
          name
          id
        }
      }
    }
  }
`;

export default function Trending({ title = "Trending" }: Props) {
  const { loading, error, data } = useQuery(GET_POPULAR);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [nav1, setNav1] = useState<Slider | undefined>();
  // const [nav2, setNav2] =useState<Slider |undefined>();
  const slider1Ref = useRef<Slider | undefined>();
  const slider2Ref = useRef<Slider | any>(null);

  const setSlider1Ref = useCallback((slider: any) => {
    slider1Ref.current = slider;
  }, []);
  const setSlider2Ref = useCallback((slider: any) => {
    slider2Ref.current = slider;
  }, []);
  // pass setSlider1Ref as ref

  const [activeSlide, setActiveSlide] = useState<number>(0);

  // setNav1(slider1Ref.current);
  // setNav2(slider2Ref.current);

  const next = () => {
    if (slider1Ref.current) {
      slider1Ref.current.slickNext();
    }
  };

  const previous = () => {
    if (slider1Ref.current) {
      slider1Ref.current.slickPrev();
    }
  };
  const handleBeforeChange = (current: number, next: number) => {
    setActiveSlide(next);
  };

  const sliderSettings = {
    asNavFor: slider2Ref.current,
    // ref: (slider: Slider ) => (slider1Ref.current = slider),
    ref: setSlider1Ref,
    centerMode: true,
    centerPadding: "10px",
    arrows: false,
    adaptiveHeight: true,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    beforeChange: handleBeforeChange,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return <p>Loading ...</p>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const shuffledPopular = useShuffle(data);
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  //console.log("data",data)
  //console.log("Popular movie",shuffledPopular[0])

  return (
    <section className="section">
      <section className="relative inner-section h-auto m-auto">
        <div className="w-full flex justify-between mb-3">
          <h4>{title}</h4>
          <div className="flex gap-3">
            <button
              className="rounded-md bg-red-600 text-white p-1 text-xl hover:text-red-600 hover:bg-white"
              onClick={previous}
            >
              <FaAngleLeft />
            </button>
            <button
              className="rounded-md bg-red-600 text-white p-1 text-xl hover:text-red-600 hover:bg-white"
              onClick={next}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <Slider {...sliderSettings}>
          {shuffledPopular.map((movie: MovieType | ShowType, index: number) => (
            <DetailsTopSlider
              key={movie.id}
              index={index}
              movie={movie}
              activeSlide={activeSlide}
            />
          ))}
        </Slider>
        <Slider
          fade={true}
          asNavFor={slider1Ref.current}
          //asNavFor={nav1}
          // ref={slider2Ref}
          ref={setSlider2Ref}
          arrows={false}
          adaptiveHeight={false}
          dots={false}
          slidesToShow={1}
          slidesToScroll={1}
          swipeToSlide={false}
          centerMode={true}
          centerPadding={"0px"}
        >
          {shuffledPopular.map((movie: MovieType | ShowType, index: number) => (
            <DetailsSlider
              key={movie.id}
              index={index}
              movie={movie}
              activeSlide={activeSlide}
            />
          ))}
        </Slider>
      </section>
    </section>
  );
}
