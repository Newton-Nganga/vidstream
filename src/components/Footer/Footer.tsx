import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { FaFacebookF, FaLinkedin, FaLinkedinIn, FaSkype, FaWhatsapp } from "react-icons/fa";
export interface IAppProps {}

export default function Footer(props: IAppProps) {
  return (
    <section className=" bg-[#0b1a2a] section">
    <div className="inner-section py-4">
      <div className="footer px-0">
      <div className="w-full gap-4 flex flex-col md:w-1/3 lg:w-1/4">
        <div className="">
         <Image src={logo} alt="logo" className='w-[200px] md:w-[300px] lg:w-[75%]'/> 
        </div>
        <p>
         A free HD streaming and search engine for movies, shows, trailers.No account creation is required!
        </p>
        <div className="flex gap-3  items-center">
          <div className="footer-social-btn">
            <FaFacebookF/>
          </div>
          <div className="footer-social-btn">
            <FaSkype/>
          </div>
          <div className="footer-social-btn">
            <FaLinkedinIn/>
          </div>
          <div className="footer-social-btn">
            <FaWhatsapp/>
          </div>
        </div>
      </div>
      <div className="w-full gap-4 flex flex-col md:w-1/3 lg:w-1/4">
        <h4 className="footer-title">Quick Link</h4>
       <ul>
        <li><Link href='#'>About</Link></li>
        <li><Link href='#'>Movies</Link></li>
        <li><Link href='#'>Tv Shows</Link></li>
        <li><Link href='#'>Privacy Policy</Link></li>
        <li><Link href='#'>Terms & Conditions</Link></li>
       </ul>
      </div>
      <div className="w-full gap-4 flex flex-col md:w-1/3 lg:w-1/4">
      <h4 className="footer-title">Important Link</h4>
       <ul>
        <li><Link href='#'>Support</Link></li>
        <li><Link href='#'>FAQ</Link></li>
        <li><Link href='#'>Contact US</Link></li>
        <li><Link href='#'>Latest News</Link></li>
        <li><Link href='#'>Pricing Plan</Link></li>
       </ul>
      </div>
      <div className="w-full flex flex-col gap-4 lg:w-1/4">
      <h4 className="footer-title">Our Contacts</h4>
      <p>Subscribe our newsletter to get latest update & news.</p>
      <form className="flex flex-col w-full gap-4">
        <input type="email" placeholder="Enter email"/>
        <button>Subscribe</button>
      </form>
      </div>
    </div>
    <div className="py-3 text-center border-t-2 mt-4 border-blue-500 border-dashed">
      <p>VIDSTREAM - {new Date().getFullYear()}<span className="text-sm"> All Rights Reserved </span></p>
    </div>
   </div>
    </section>
  );
}
