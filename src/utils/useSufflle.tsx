import { MovieType, ShowType } from "@/__generated_types/UsefulTypes";
import { useMemo } from "react";


interface Params{
    popularMovies:MovieType[];
    popularShows:ShowType[];
}[];

export function useShuffle(data:Params){
   const shuffledPopular = useMemo(() => {
    const popular = [...data.popularMovies, ...data.popularShows];
    
    // Shuffle logic...
  
    for (let i = popular.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [popular[i], popular[j]] = [popular[j], popular[i]];
    }
    return popular;
  }, [data]); 

  return shuffledPopular
}
