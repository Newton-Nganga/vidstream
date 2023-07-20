import React,{useRef,useState} from 'react'
import Slider from 'react-slick';

type Props = {}

export default function useTwoCarousel({}: Props):any {
    const [nav1, setNav1] = useState<Slider | any | null>(null);
    const [nav2, setNav2] = useState<Slider | any | null>(null);
    const slider1Ref = useRef<Slider | null>(null);
    const slider2Ref = useRef<Slider | null>(null);
    const [activeSlide, setActiveSlide] = useState<number>(0);
    
  
    //console.log("The acttive slide is :", activeSlide);

    return {nav1,nav2,setNav1,setNav2,slider1Ref,slider2Ref,activeSlide,setActiveSlide}
}