type Props = {
    previous:()=>void
    next:()=>void
};

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
export default function HeroSliderConrols({previous,next}: Props) {
  return (
    <div className="hero-controls">
      <button onClick={previous} className="hero-btn">
        <FaAngleLeft />
      </button>
      <button onClick={next} className="hero-btn">
        <FaAngleRight />
      </button>
    </div>
  );
}
