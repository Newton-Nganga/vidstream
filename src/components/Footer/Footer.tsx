
import logo from "@assets/images/logo.png";
import { FaFacebookF, FaLinkedinIn, FaSkype, FaWhatsapp } from "react-icons/fa";
export interface IAppProps {}

export default function Footer() {
  return (
    <section className=" bg-[#0b1a2a] section">
    <div className="inner-section py-4">
      <div className="footer px-0">
      <div className="w-full gap-4 flex flex-col md:w-1/3 lg:w-1/4">
        <div className="">
         <img src={logo} alt="logo" className='w-[200px] md:w-[300px] lg:w-[75%]'/> 
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
        <li><a href='#'>About</a></li>
        <li><a href='#'>Movies</a></li>
        <li><a href='#'>Tv Shows</a></li>
        <li><a href='#'>Privacy Policy</a></li>
        <li><a href='#'>Terms & Conditions</a></li>
       </ul>
      </div>
      <div className="w-full gap-4 flex flex-col md:w-1/3 lg:w-1/4">
      <h4 className="footer-title">Important a</h4>
       <ul>
        <li><a href='#'>Support</a></li>
        <li><a href='#'>FAQ</a></li>
        <li><a href='#'>Contact US</a></li>
        <li><a href='#'>Latest News</a></li>
        <li><a href='#'>Pricing Plan</a></li>
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
