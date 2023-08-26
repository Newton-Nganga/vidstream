import  { useState, Fragment } from "react";
import { BsRecordCircle } from "react-icons/bs";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface LinkD {
    name: string;
    links: string[];
    onecolumn: boolean;
    prelink:string
  }
  
type Props = {
  LinkData:LinkD[]
};

interface StateType {
  display: boolean;
  open: string;
}

export default function Navlink({LinkData}:Props) {
  const [display, setDisplay] = useState<StateType>({
    display: false,
    open: "",
  });

  const handleClick = (key: string) => {
    setDisplay({display:false,open:''})
    setDisplay({ display: !display.display, open: key });
  };
  const modifyLink =(url :string):string=>{
   const str = url.toLowerCase().replace(/\s/g, "")
   return str
  }
  return (
    <Fragment>
      {LinkData?.map((navlink) => {
        return (
          <li key={navlink.name.toString()} className="relative text-xl font-semibold">
            <button
              onClick={() => handleClick(navlink.name)}
              className="flex items-center p-0 text-base justify-between bg-transparent hover:text-red-600"
            >
              {navlink.name}
              {display.display && display.open === navlink.name ? (
                <FaAngleUp />
              ) : (
                <FaAngleDown />
              )}
            </button>
            <div
              className={`absolute top-[100%] mt-6 ${
                display.display && display.open == navlink.name
                  ? "scale-100 animate-fade-up animate-duration-[2000ms]"
                  : "scale-0 animate-fade animate-duration-[2000ms]"
              } p-2 rounded-md bg-[#0b1a2a] flex flex-col z-20`}
            >
              {navlink.onecolumn ? (
                <div className="flex flex-col">
                  {navlink.links.map((link) => {
                    return (
                      <a key={link.toString()} href={navlink.prelink + modifyLink(link)}>
                        <div className="nav-item">
                          <BsRecordCircle className="text-red-600" />
                         <p className="w-max">{link}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-row justify-between gap-4  items-center">
                  <div>
                  {navlink.links.slice(0,(navlink.links.length / 2)).map((link) => {
                    return (
                      <a key={link.toString()} href={navlink.prelink+modifyLink(link)}>
                        <div className="nav-item">
                          <BsRecordCircle className="text-red-600" />
                          <p className="w-max">{link}</p>
                        </div>
                      </a>
                    );
                  })}
                  </div>
                  <div>
                  {navlink.links.slice((navlink.links.length / 2)).map((link) => {
                    return (
                      <a key={link.toString()} href={navlink.prelink+modifyLink(link)}>
                        <div className="nav-item">
                          <BsRecordCircle className="text-red-600" />
                          <p className="w-max">{link}</p>
                        </div>
                      </a>
                    );
                  })}
                  </div>
                </div>
              )}
              </div>
          </li>
        );
      })}
    </Fragment>
  );
}
