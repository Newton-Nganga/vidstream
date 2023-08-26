

import VidstreamPage from "@/components/VidstreamPage/VidstreamPage";

import titlecover from "@assets/images/title.jpg";


type Props = {
  children: React.ReactNode;
};

export default function InnerPage({ children }: Props) {

  return (
    <VidstreamPage>
      <section className="section p-0">
        <div className="relative  w-full h-[300px] overflow-clip">
          <img
            src={titlecover}
            alt="title cover"
            className="absolute h-full w-full"
          />
          <div className="absolute  py-12 z-10 bg-gradient-to-r from-black/95 from-40% via-black/70 via-70% to-black/50 to-100%  w-full h-full">
            <div className="flex flex-col absolute w-[90vw] max-w-[1200px] top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]  center-absolute text-white">
              <h1>Movie/Show  Details</h1>
              <p>
                <a href={"/"} className="hover:text-red-600">
                  Home
                </a>{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>{children}</section>
    </VidstreamPage>
  );
}
