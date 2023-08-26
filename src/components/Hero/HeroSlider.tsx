import React from 'react'
import Slider from 'react-slick'

type Props = {
    sliderRef:React.RefObject<Slider>
    children:React.ReactNode
 };

function HeroSlider({sliderRef,children}: Props) {
  return (
    <Slider
    fade={false}
    arrows={false}
    adaptiveHeight={false}
    dots={false}
    slidesToShow={1}
    slidesToScroll={1}
    swipeToSlide={true}
    centerMode={true}
    centerPadding={"0px"}
    ref={sliderRef}
  >
    {children}
  </Slider>
  )
}

export default HeroSlider