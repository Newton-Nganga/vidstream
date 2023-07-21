import InnerPage from "@/components/Pages/InnerPages"
import Link from "next/link"

type Props ={}

export default function page({}: Props) {
    return (
      <InnerPage>
          <section className='section'>
              <div className='inner-section'>
                 <div className="flex flex-col justify-center items-center">
                  <h1 className="text-red-600 text-5xl leading-normal">404 Not Found</h1>
                  <h2 className="text-xl">Oops! Page Not Found.</h2>
                  <h5>The page you are looking for is either removed or does not exist.</h5>
                  <Link href={'/'}>
                  <button className="w-fit">Go Home</button>
                  </Link>
                 </div>
              </div>
          </section>
      </InnerPage>
    )
  }