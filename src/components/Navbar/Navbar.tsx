"use client";
import React, { useRef, useState } from "react";
import useScrollPosition from "../../../Utils/useScrollPosition";
import Image from "next/image";

type Props = {};

interface RefType {
  display: Boolean;
  open: String;
}
interface LinkD {
  name: String;
  links: String[];
  onecolumn: Boolean;
  width: String;
  height: String;
}

const LinkData: LinkD[] = [
  {
    name: "HOME",
    links: ["Home1", "Home2", "Home3"],
    onecolumn: true,
    width: "200px",
    height: "fit",
  },
  {
    name: "GENRES",
    links: [
      "Action",
      "Comedy",
      "Documentary",
      "Fantasy",
      "Horror",
      "Drama",
      "Music",
      "Action",
      "Comedy",
      "Documentary",
      "Fantasy",
      "Horror",
      "Drama",
      "Music",
    ],
    onecolumn: false,
    width: "200px",
    height: "fit",
  },
  {
    name: "PAGES",
    links: [
      "About Us",
      "Login",
      "Register",
      "My Profile",
      "404 Error",
      "Terms and Conditions",
    ],
    onecolumn: true,
    width: "200px",
    height: "fit",
  },
  {
    name: "TV SHOWS",
    links: ["Show Category", "Show Single", "Show Details"],
    onecolumn: true,
    width: "200px",
    height: "fit",
  },
  {
    name: "MOVIES",
    links: ["Movie Category", "Movie Single", "Movie Details"],
    onecolumn: true,
    width: "200px",
    height: "fit",
  },
  {
    name:"CONTACT",
    links:["Contact"],
    onecolumn:true,
    width: "200px",
    height: "fit",
  }
];

import user from "../../../public/user.png";
import logo from "../../../public/logo.png";

import { MdMenu } from "react-icons/md";
import { FaSearch, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { VscBellDot } from "react-icons/vsc";
import {
  BsRecordCircleFill,
  BsRecordCircle,
  BsThreeDots,
} from "react-icons/bs";
import Link from "next/link";
import Navlink from "./Navlink";

export default function Navbar({}: Props) {
  const scrolled = useScrollPosition();
  const [isOpen, setIsOpen] = useState({ type: "", state: false });

  const [display, setDisplay] = useState<RefType>({ display: false, open: "" });

  const handleClick = (key: String) => {
    setDisplay({ display: !display.display, open: key });
  };
  //console.log(display)
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-20 ${
        scrolled
          ? "bg-[#0b1a2a] shadow-xl animate-fade-down animate-duration-[1500ms]"
          : "bg-transparent"
      } `}
    >
      <div className="flex justify-between items-center inner-section py-3">
        <button
          onClick={() => setIsOpen({ type: "left", state: !isOpen.state })}
          className="flex w-fit text-2xl px-2 rounded-none bg-transparent md:hidden"
        >
          <MdMenu />
        </button>
        <div className="w-[160px]">
          <Image src={logo} alt="logo" />
        </div>

        <ul
          className={`hidden  md:flex flex-row items-center gap-6 md:p-3`}
        >
          <Navlink LinkData={LinkData} />
          
        </ul>

        <div className="flex  text-2xl">
          <div className="hidden md:flex justify-between items-center gap-6">
            <button className="p-0 bg-transparent hover:text-red-600">
              <FaSearch />
            </button>
            <button className="p-0 bg-transparent hover:text-red-600">
              <VscBellDot />
            </button>
            <Link href="/profile">
              <div className="w-[45px] h-[45px] relative block rounded-full overflow-clip bg-transparent p-0">
                <Image
                  src={user}
                  alt="profile"
                  className="absolute w-full h-full "
                />
              </div>
            </Link>
          </div>
          <button
            onClick={() => setIsOpen({ type: "right", state: !isOpen.state })}
            className="flex px-2 rounded-none bg-transparent md:hidden"
          >
            <BsThreeDots />
          </button>
        </div>
      </div>
       
      <ul
          className={` ${
            isOpen.state &&
            isOpen.type === "left" ?
            "scale-100 animate-fade-right animate-duration-[2000ms]  !bg-[#0b1a2a] " :''
          } flex flex-col gap-6 scale-0 left-0 z-40 md:hidden !bg-[#0b1a2a] min-w-[150px] w-[40vw] h-[100vh] pt-5 fixed  top-0 bottom-0 p-4`}
        >
          <Navlink LinkData={LinkData} />

            <button
              onClick={() => setIsOpen({ type: "", state: false })}
              className="fixed w-fit md:hidden bg-transparent shadow shadow-white bottom-[20px] px-6 rounded-md hover:shadow-red-600 hover:text-red-600"
            >
              Close
            </button>
        
      </ul>
    </nav>
  );
}
