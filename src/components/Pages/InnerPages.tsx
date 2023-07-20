"use client"

import VidstreamPage from "@/components/VidstreamPage";
import Image from "next/image";


import titlecover from "../../../public/title.jpg";
import useBreadcrumb from "../../../Utils/useBreadCrumb";
import Link from "next/link";

type Props = {
    children:any
};

export default function InnerPage({children}: Props) {
  const breadcrumb = useBreadcrumb();
  

  return (
    <VidstreamPage>
      <section className="section p-0">
        <div className="relative  w-full h-[300px] overflow-clip">
          <Image
            src={titlecover}
            alt="title cover"
            className="absolute h-full w-full"
          />
          <div className="absolute  py-12 z-10 bg-gradient-to-r from-black/95 from-40% via-black/70 via-70% to-black/50 to-100%  w-full h-full">
            <div className="flex flex-col absolute w-[90vw] max-w-[1200px] top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]  center-absolute text-white">
              <h1>Movie Details</h1>
              <p>
                <Link href={'/'} className="hover:text-red-600">Home</Link> / 
               {/* {
               breadcrumb.map(item =>{
                return(
                   <Link href={} className="hover:text-red-600">
                  
                </Link> / 
                )
               })  }*/}
              
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        {children}
      </section>
    </VidstreamPage>
  );
}
