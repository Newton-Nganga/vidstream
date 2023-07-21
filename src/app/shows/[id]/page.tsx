"use client"
import { usePathname } from "next/navigation";

import InnerPage from "@/components/Pages/InnerPages";
import { BsStarFill, BsStar } from "react-icons/bs";
import { RiHeartFill, RiShareLine, RiVolumeMuteFill } from "react-icons/ri";
import MoviesCarousel from "@/components/MoviesCarousel";

type Props = {};

export default function Page({}: Props) {
  //const breadcrumb = useBreadcrumb();
  const pathname = usePathname();
  console.log(pathname);
  return (
    <InnerPage>
      <section>
        <video width="100%" height="400" controls>
          <source src="https://youtu.be/GJELT-Ng8rw" type="video/mp4" />
        </video>
        <section className="section">
          <div className="inner-section flex flex-col border-slice py-4 gap-4">
            <h4 className="texture my-4 w-fit mr-auto text-2xl font-extrabold">
              The black panther
            </h4>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using Content here, content
              here, making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text.
            </p>
            <div className="flex items-center gap-4 my-3">
              <p className="flex gap-1 text-red-600">
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStar />
              </p>
              <span>8.0(imdb)</span>
            </div>
            <div>
              <div className="text-sm md:text-lg">
                <p>
                  <span className="text-red-600 font-semibold">Actor:</span>{" "}
                  Josh Duhamel,Bruce Willis,Rosario Dawson
                </p>
                <p>
                  <span className="text-red-600 font-semibold">Genres:</span>{" "}
                  Josh Action,Drama,Thriller,Crime
                </p>
                <p>
                  <span className="text-red-600 font-semibold">Director:</span>{" "}
                  Josh David Barrett
                </p>
                <p>
                  <span className="text-red-600 font-semibold">Duration:</span>{" "}
                  Josh 2h 10m
                </p>
                <p>
                  <span className="text-red-600 font-semibold">Quality:</span>
                  <span className="px-2 bg-red-500 rounded-md">HD</span>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 p-1 flex justify-center items-center rounded-full bg-white/50">
                <div className="flex items-center justify-center rounded-full bg-white text-red-600 hover:text-white hover:bg-red-600 text-xl p-1">
                  <RiVolumeMuteFill />
                </div>
              </div>
              <div className="h-10 w-10 p-1 flex justify-center items-center rounded-full bg-white/50">
                <div className="flex items-center justify-center rounded-full bg-white text-red-600 hover:text-white hover:bg-red-600 text-xl p-1">
                  <RiHeartFill />
                </div>
              </div>
              <div className="h-10 w-10 p-1 flex justify-center items-center rounded-full bg-white/50">
                <div className="flex items-center justify-center rounded-full bg-white text-red-600 opacity-100 hover:text-white hover:bg-red-600 text-xl p-1">
                  <RiShareLine />
                </div>
              </div>
            </div>
          </div>
        </section>
        <MoviesCarousel title={'You May Also Like'}/>
        <MoviesCarousel title={'Upcoming Movies'}/>
      </section>
    </InnerPage>
  );
}
