
import React from "react";
import { RiAddLine, RiHeartFill, RiVolumeMuteFill } from "react-icons/ri";
import { useWatchTime } from "../../../../Utils/useWatchTime";

type Props = {

};

export default function MovieAddFavourite() {
  return (
    <div className="add-container">
      <div className="add-container_inner-el">
        <div className="add-container_icon-wrapper">
          <RiVolumeMuteFill />
        </div>
      </div>
      <div className="add-container_inner-el">
        <div className="add-container_icon-wrapper">
          <RiHeartFill />
        </div>
      </div>
      <div className="add-container_inner-el">
        <div className="add-container_icon-wrapper">
          <RiAddLine />
        </div>
      </div>
    </div>
  );
}

