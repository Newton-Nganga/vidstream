
import InnerPage from "@components/InnerPages/InnerPages"



export default function NotFound() {
    return (
      <InnerPage>
          <section className='section'>
              <div className='inner-section'>
                 <div className="flex flex-col justify-center items-center">
                  <h1 className="text-red-600 text-5xl leading-normal">404 Not Found</h1>
                  <h2 className="text-xl">Oops! Page Not Found.</h2>
                  <h5>The page you are looking for is either removed or does not exist.</h5>
                  <a href={'/'}>
                  <button className="w-fit">Go Home</button>
                  </a>
                 </div>
              </div>
          </section>
      </InnerPage>
    )
  }