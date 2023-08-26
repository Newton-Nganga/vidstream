
import  { useState } from "react";
import useScrollPosition from "@/utils/useScrollPosition";


interface LinkD {
  name: string;
  links: string[];
  onecolumn: boolean;
  prelink:string
}

const LinkData: LinkD[] = [
  {
    name: "HOME",
    links: ["Home1", "Home2", "Home3"],
    onecolumn: true,
    prelink:'/'
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
    prelink:'/genres/'
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
    prelink:'/'
  },
  {
    name: "TV SHOWS",
    links: ["Show Category", "Show Single", "Show Details"],
    onecolumn: true,
    prelink:'/shows/'
  },
  {
    name: "MOVIES",
    links: ["Movie Category", "Movie Single", "Movie Details"],
    onecolumn: true,
    prelink:'/movies/'
  },
  {
    name:"CONTACT",
    links:["Contact"],
    onecolumn:true,
    prelink:'/'
  }
];

import user from "@assets/images/user.png";
import logo from "@assets/images/logo.png";

import { MdMenu } from "react-icons/md";
import { FaSearch} from "react-icons/fa";
import { VscBellDot } from "react-icons/vsc";

import Navlink from "./Navlink";

type searchelProp ={
search:boolean
query:string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
setQuery:any
}
const SearchEl =({search,query,setQuery}:searchelProp)=>{
  return(
    <div
         className={`absolute top-[100%] right-0 mt-6 ${
          search 
            ? "scale-100 animate-fade-up animate-duration-[2000ms]"
            : "scale-0 animate-fade animate-duration-[2000ms]"
        } p-2 rounded-md bg-[#0b1a2a] flex flex-row z-20`}
        > 
          <input type="search" onChange={(e)=>setQuery(e.target.value)} value={query} name="query" className="border border-blue-400 mr-2 rounded-md min-w-[130px]"/>
          <a href={`/search?query=${query}`} >
            <button className="rounded-md text-sm p-2">search</button>
          </a>
    </div>
  )
}
export default function Navbar() {
  const scrolled = useScrollPosition();
  const [isOpen, setIsOpen] = useState({ type: "", state: false });
  const [search,setSearch] = useState(false)
  const [query,setQuery]=useState('')
  //const [display, setDisplay] = useState<RefType>({ display: false, open: "" });

  //const handleClick = (key: string) => {
  //  setDisplay({ display: !display.display, open: key });
  //};

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
          <img src={logo} alt="logo" />
        </div>

        <ul
          className={`hidden  md:flex flex-row items-center gap-6 md:p-3`}
        >
          <Navlink LinkData={LinkData} />
          
        </ul>
        <div className="hidden md:block relative">
          <SearchEl query={query} search={search} setQuery={setQuery}/>
        </div>
        
        <div className="flex  text-2xl">

          <div className="hidden md:flex justify-between items-center gap-6">
            <button 
               onClick={()=>setSearch(!search)}
              className="p-0 bg-transparent hover:text-red-600">
              <FaSearch />
            </button>
            <button className="p-0 bg-transparent hover:text-red-600">
              <VscBellDot />
            </button>
            <a href="/profile">
              <div className="w-[45px] h-[45px] relative block rounded-full overflow-clip bg-transparent p-0">
                <img
                  src={user}
                  alt="profile"
                  className="absolute w-full h-full "
                />
              </div>
            </a>
          </div>
          <button
            onClick={() => {setIsOpen({ type: "right", state: !isOpen.state });setSearch(!search)}}
            className="flex px-2 rounded-none bg-transparent md:hidden"
          >
            <FaSearch />
          </button>
            {isOpen.state && isOpen.type === "right" && (
              <SearchEl query={query} search={search} setQuery={setQuery}/>
            )} 
         
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
