import InnerPage from "@components/InnerPages/InnerPages";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";


export default function ContactPage() {
  return (
    <InnerPage>
      <section className="section py-10">
        <div className="flex flex-col md:flex-row inner-section">
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
              <p>(+254) 779197025</p>
            </div>
            <div>
              <h3 className="form-label">
                <span className="t-head text-xl">
                  <FaEnvelope />
                </span>
                Email
              </h3>
              <p>nganga7newt@gmail.com</p>
            </div>
          </div>
          <div className="w-full inline-flex md:w-2/3 rounded-xl bg-[#0b1a2a]">
            <form className="p-4 w-full flex flex-col gap-4">
              <h1 className="text-red-600">Send Your Message</h1>
              <div className="flex md:gap-4 md:flex-row flex-col">
                <div className="form-el w-full">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input-el"
                  />
                </div>
                <div className="form-l w-full">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input-el"
                  />
                </div>
              </div>

              <div className="form-el">
                <label>Subject</label>
                <input type="text" placeholder="Subject" className="input-el" />
              </div>

              <div className="form-el">
                <label>Message</label>
                <textarea
                  placeholder="Message"
                  cols={12}
                  className="input-el resize-y w-full"
                />
              </div>
              <button className="w-fit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
