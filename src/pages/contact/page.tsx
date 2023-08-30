import InnerPage from "@components/InnerPages/InnerPages";
import ContactForm from "./ContactForm";
import GetInTouch from "./GetInTouch";


export default function ContactPage() {
  return (
    <InnerPage title="Contact US">
      <section className="section py-10">
        <div className="flex flex-col md:flex-row inner-section">
          <GetInTouch/>
           <ContactForm/>
        </div>
      </section>
    </InnerPage>
  );
}
