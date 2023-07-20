import React from "react";
import Image from "next/image";
import featured from "../../public/07.jpg";
import Link from "next/link";
type Props = {};

import {BsStar,BsStarFill,BsStarHalf} from 'react-icons/bs'

export default function FeaturedMovie({}: Props) {
  return (
    <section className={`w-full bg-black/70`} >
      <div className="flex flex-col lg:flex-row my-16 text-white items-center justify-between gap-5 bg-transparent inner-section m-auto">
        <div className="lg:w-1/3">
          <h1 className="texture">Avatar</h1>
          <div className="flex items-center gap-4 my-3">
            <p className="flex gap-1 text-red-600">
             <BsStarFill/>
             <BsStarFill/>
             <BsStarFill/>
             <BsStarFill/>
             <BsStar/>
            </p>
            <span>8.0(imdb)</span>
          </div>
          <p className="my-4">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters.
          </p>
          <div className="flex items-center gap-4">
            <button className="p-3 px-7 btn">
            Play Now
          </button>
          <Link href='#'>
          <p className="hover:text-red-600">More Details</p>
          </Link>
          </div>
          
        </div>
        <div className="w-full lg:w-2/3 rounded-xl overflow-clip">
          <Image src={featured} alt="featured" className="w-full h-[400px]"/>
        </div>
      </div>
    </section>
  );
}
