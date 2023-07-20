import React from 'react'

type Props = {
    children:any
}

import Navbar from './Navbar/Navbar';
import Footer from './Footer';

export default function VidstreamPage({children}: Props) {
    return (
      <main
        className={` flex  flex-col bg-cover bg-no-repeat bg-center bg-fixed bg-[url("https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg")] h-auto `}
      >
        <Navbar />
        {children}
        <Footer />
      </main>
    );
  }