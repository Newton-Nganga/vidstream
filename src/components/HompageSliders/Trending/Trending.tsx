
import { useRef, useState } from "react";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import DetailsSlider, { DetailsTopSlider } from "./DetailsSlider-el";
import { useQuery,gql } from "@apollo/client";

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
        media_type
        number_of_seasons
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
      vote_count
      backdrop_path
      details {
        runtime
        genres {
          name
        }
      }
    }
  }
`;


export default function Trending({ title = "Trending" }: Props) {
  const [nav1, setNav1] = useState<Slider | undefined>();
  const [nav2, setNav2] =useState<Slider |undefined>();
  const slider1Ref = useRef<Slider | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const slider2Ref = useRef<Slider | any>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  setNav1(slider1Ref.current);
  setNav2(slider2Ref.current);

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
    asNavFor: nav2,
    ref: (slider: Slider ) => (slider1Ref.current = slider),
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
  const {loading,error,data} = useQuery(GET_POPULAR)


  const popular = [...data.popularMovies, ...data.popularShows];

  for (let i = popular.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [popular[i], popular[j]] = [popular[j], popular[i]];
  }

  if(error){
    return <p>Error: {error.message}</p>
  }
  if(loading){
    return <p>Loading ...</p>
  }
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
          <DetailsTopSlider trending={popular} activeSlide={activeSlide}/>
        </Slider>
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
          centerMode={true}
          centerPadding={"0px"}
        >
          <DetailsSlider trending={popular} activeSlide={activeSlide}/>
        </Slider>
      </section>
    </section>
  );
}
