import { useState } from "react";
import useScrollPosition from "@/utils/useScrollPosition";

import user from "@assets/images/user.png";
import logo from "@assets/images/logo.png";

import { useUser } from "@clerk/clerk-react";
import { MdMenu } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { VscBellDot } from "react-icons/vsc";

import Navlink from "./Navlink";
import {
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Navbar() {
  const scrolled = useScrollPosition();
  const [isOpen, setIsOpen] = useState({ type: "", state: false });
  const { isSignedIn } = useUser();

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
        <a href="/" className="w-[160px]">
          <img src={logo} alt="logo" />
        </a>

        <ul className={`hidden  md:flex flex-row items-center gap-6 md:p-3`}>
          <Navlink />
        </ul>

        <div className="flex  text-2xl">
          <div className="flex justify-between items-center gap-6">
            <a href="/search" className="p-0 bg-transparent hover:text-red-600">
              <FaSearch />
            </a>
            <button className="p-0 bg-transparent hover:text-red-600 w-fit">
              <VscBellDot />
            </button>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton afterSignInUrl="/">
                <button className="flex w-[45px] h-[45px] relative rounded-full overflow-clip bg-transparent p-0">
                <img
                  src={user}
                  alt="profile"
                  className="absolute w-full h-full "
                />
              </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>

      <ul
        className={` ${
          isOpen.state && isOpen.type === "left"
            ? "scale-100 animate-fade-right animate-duration-[2000ms]  !bg-[#0b1a2a] "
            : ""
        } flex flex-col gap-6 scale-0 left-0 z-40 md:hidden !bg-[#0b1a2a] min-w-[150px] w-[40vw] h-[100vh] pt-5 fixed  top-0 bottom-0 p-4`}
      >
        <Navlink />

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
