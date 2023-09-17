import { RiAddLine, RiHeartFill, RiVolumeMuteFill } from "react-icons/ri";
import { MovieType, ShowType } from "@/__generated_types/UsefulTypes";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  data: MovieType | ShowType;
}

export default function MovieAddFavourite({ data }: Props) {
  const handleAddFavourites = async () => {
    //check if the user exists or is logged in
    //add to the favourites then redirect to /account/id/
    const url =
      import.meta.env.VITE_CLIENTS_SERVER_URL + "/users/2021/favourites";
    const response = await axios.post(url, {
      media_type: "title" in data ? "movie" : "tv",
      movie_id: `${data.id}`,
      poster_path: data.poster_path ? data.poster_path : "",
      backdrop_path: data.backdrop_path ? data.backdrop_path : "",
      movie_title: "title" in data ? data.title : data.name,
    });
    
    if (response.status  !== 201 ) {
      toast.error(
        "message" in response.data
          ? response.data.message
          : "Movie was not added to your favourites"
      );
    }
    toast.success(
      "message" in response.data
        ? response.data.message
        : "Movie was added to the favourites"
    );
  };

  const handleAddWatchlist = async () => {
    //check if the user exists or is logged in
    //add to the favourites then redirect to /account/id/
    const url =
      import.meta.env.VITE_CLIENTS_SERVER_URL + "/users/2021/watchlist";
    const response = await axios.post(url, {
      media_type: "title" in data ? "movie" : "tv",
      movie_id: `${data.id}`,
      poster_path: data.poster_path ? data.poster_path : "",
      backdrop_path: data.backdrop_path ? data.backdrop_path : "",
      movie_title: "title" in data ? data.title : data.name,
    });
    console.log("add watchlist",response)
    if (response.status !== 201) {
      toast.error(
       "Movie was not added to your list"
      );
    }
    toast.success(
      "message" in response.data
        ? response.data.message
        : "Movie was added to the watchlist"
    );
  };

  return (
    <div className="add-container">
      <a href="" className="add-container_inner-el">
        <div className="add-container_icon-wrapper">
          <RiVolumeMuteFill />
        </div>
      </a>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleAddFavourites();
        }}
        className="add-container_inner-el"
      >
        <div className="add-container_icon-wrapper">
          <RiHeartFill />
        </div>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleAddWatchlist();
        }}
        className="add-container_inner-el"
      >
        <div className="add-container_icon-wrapper">
          <RiAddLine />
        </div>
      </button>
    </div>
  );
}
