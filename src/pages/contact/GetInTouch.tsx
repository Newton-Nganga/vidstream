

import { FaLocationDot } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";


export default function GetInTouch(){
    return(
        <div className="w-full flex gap-5 flex-col md:w-1/3">
            <h1 className="t-head">Get In Touch</h1>
            <div>
              <h3 className="form-label">
                <span className="t-head text-xl">
                  <FaLocationDot />
                </span>
                Address
              </h3>
              <p>Nairobi ,kenya</p>
            </div>
            <div>
              <h3 className="form-label">
                <span className="t-head text-xl">
                  <BiSolidPhoneCall />
                </span>
                Phone
              </h3>
              <p className="line-through">(+254) 7777777777</p>
            </div>
            <div>
              <h3 className="form-label">
                <span className="t-head text-xl">
                  <FaEnvelope />
                </span>
                Email
              </h3>
              <a href="mailto:vidstreamapp@gmail.com">vidstreamapp@gmail.com</a>
            </div>
          </div>
    )
}