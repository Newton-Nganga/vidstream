import Slider from "react-slick";
type Props = {
 sliderRef:React.RefObject<Slider>
 children:React.ReactNode
}

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: "10px",
    adaptiveHeight: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
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
export default function Carousel({children,sliderRef}: Props) {
  return (
    <Slider ref={sliderRef} {...settings}>
          {children}
    </Slider>
  )
}