

import React from 'react'
import { MdOutlineDelete } from 'react-icons/md'
import {HiOutlineExternalLink} from 'react-icons/hi'
import user from "@assets/images/user.png";
type Props = {}

export default function CollectionCard({}: Props) {

  return (
    <div className='w-[180px]'>
        <div className='w-full h-[200px] relative bg-red-400 rounded-md'>
          <img src={user} alt="" className='w-full h-full rounded-md '/>
        </div>
        <div className='flex gap-2 my-3 '>
          <a
           href='/movies/1234'
          className='relative flex-grow flex items-center justify-center text-sm text-center  rounded-md bg-[#081523]'>
            visit
            <HiOutlineExternalLink className="absolute top-2 right-2"/>
          </a>
          <button className='w-fit rounded-md p-2 text-xl  hover:bg-red-300'>
            <MdOutlineDelete/>
          </button>
        </div>
    </div>
  )
}