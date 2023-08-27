
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Stars({vote_average}:any) {
  const calc = 0.5 * Number(vote_average)
  const fullStars = Math.floor(calc)
  const halfstars = calc - fullStars !== 0 ? 1 : 0;
  const emptyStars =
    (fullStars + halfstars) !== 5 ? 5 - (fullStars + halfstars) : 0;

 const childComponents = []
 for(let i = 0; i < fullStars; i++){
    childComponents.push(<BsStarFill key={'full'+i}/>)
 }
 for(let i = 0; i < halfstars; i++){
    childComponents.push(<BsStarHalf key={"half"+i}/>)
 }
 for(let i = 0; i < emptyStars; i++){
    childComponents.push(<BsStar key={"star"+i}/>)
 }


  return (
    <div className="flex items-center gap-4 my-3">
      <p className="flex gap-1 text-red-600">
        {childComponents}
      </p>
      <span>{`${vote_average}(imdb)`}</span>
    </div>
  );
}
