import  { useState, Fragment } from "react";
import { BsRecordCircle } from "react-icons/bs";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { PagesLinks,MovieGenres,ShowGenres } from "./NavData";
import { Link } from "react-router-dom";

interface StateType {
  section: string | null;
  state:boolean
}
type WrapperProps={
  title:string
  children:React.ReactNode
  display:StateType
  setDisplay:React.Dispatch<React.SetStateAction<StateType>>
}

type LinkProps={
  links:{id:number|string,name:string,link:string}[]
}


function NavLinkWrapper({title,setDisplay,display,children}:WrapperProps){
 return(
  <li key={title} className="relative text-xl font-semibold">
  <button
    onClick={() => setDisplay({section:title,state:!display.state})}
    className="flex items-center p-0 text-base justify-between bg-transparent hover:text-red-600"
  >
    {title}
    {display.state && display.section === title ? (
      <FaAngleUp />
    ) : (
      <FaAngleDown />
    )}
  </button>
  <div
    className={`absolute top-[100%] mt-6 ${
      display.state && display.section == title
        ? "scale-100 animate-fade-up animate-duration-[2000ms]"
        : "scale-0 animate-fade animate-duration-[2000ms]"
    } p-2 rounded-md bg-[#0b1a2a] flex flex-col z-20`}
  >
 {children}
 </div>
</li>
 )
}


const SingleColumnLink =({links}:LinkProps)=>{
  return(
    <div className="flex flex-col">
        {links.map((link) => {
          return (
            <Link key={link.id} to={link.link} replace={true}>
              <div className="nav-item">
                <BsRecordCircle className="text-red-600" />
               <p className="w-max text-[15px] ">{link.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
  )
}

const DoubleColumnLink=({links}:LinkProps)=>{
  return(
    <div className="flex flex-row justify-between gap-4  items-start">
        <div>
        {links.slice(0,(links.length / 2)).map((link) => {
          return (
            <Link key={link.id} to={link.link} replace={true}>
              <div className="nav-item">
                <BsRecordCircle className="text-red-600" />
                <p className="w-max text-[15px] ">{link.name}</p>
              </div>
            </Link>
          );
        })}
        </div>
        <div>
        {links.slice((links.length / 2)).map((link) => {
          return (
            <Link key={link.id} to={link.link} replace={true}>
              <div className="nav-item">
                <BsRecordCircle className="text-red-600" />
                <p className="w-max text-[15px] ">{link.name}</p>
              </div>
            </Link>
          );
        })}
        </div>
      </div>
  )
}



export default function Navlink() {
  const [display, setDisplay] = useState<StateType>({
    section: null,
    state:false
  });

  return (
    <Fragment>
      <NavLinkWrapper title="Home" display={display} setDisplay={setDisplay}>
        <SingleColumnLink links={[{id:"home",link:"/",name:"HomePage"}]}/>
      </NavLinkWrapper>  
      <NavLinkWrapper title="MOVIES" display={display} setDisplay={setDisplay}>
        <DoubleColumnLink links={MovieGenres}/>
      </NavLinkWrapper>
      <NavLinkWrapper title="TV SHOWS" display={display} setDisplay={setDisplay}>
        <DoubleColumnLink links={ShowGenres}/>
      </NavLinkWrapper>
      <NavLinkWrapper title="PAGES" display={display} setDisplay={setDisplay}>
        <SingleColumnLink links={PagesLinks}/>
      </NavLinkWrapper>
      <NavLinkWrapper title="CONTACT" display={display} setDisplay={setDisplay}>
        <SingleColumnLink links={[{id:"contact",link:"/contact",name:"Contact"}]}/>
      </NavLinkWrapper> 
    </Fragment>
  );
}
