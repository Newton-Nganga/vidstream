

import React from 'react'
import {
    FaAngleDown,
    FaAngleUp,
    FaAngleLeft,
    FaAngleRight,
  } from "react-icons/fa6";

type Props = {
    previous:()=>void
    next:()=>void
}

export function TopMoviesControlsLargeScreen({previous,next}:Props){
    return (
        <div className="flex justify-between items-center w-full">
        <button
          onClick={previous}
          className="h-10 w-10  p-0 flex justify-center items-center text-xl"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={next}
          className="h-10 w-10 p-0  flex justify-center items-center text-xl"
        >
          <FaAngleRight />
        </button>
      </div>
    )
}
export function TopMoviesControls({previous,next}: Props) {
  return (
    <center className="z-10 absolute bottom-0 left-[45%] -translate-x-[50%] gap-4 flex flex-col text-5xl ">
    <button
      onClick={previous}
      className="bg-transparent p-0 rounded-none"
    >
      <FaAngleUp />
    </button>
    <button
      onClick={next}
      className="bg-transparent p-0 rounded-none"
    >
      <FaAngleDown />
    </button>
  </center>
  )
}

