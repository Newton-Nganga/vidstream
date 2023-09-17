

import InnerPage from '@/components/InnerPages/InnerPages'
import mypic from '@assets/images/my-pic.png'


export default function AboutPage() {
  return (
    <InnerPage title={"About"}>
        <section className='section'>
            <div className='inner-section bg-[#081523] p-4 rounded-md'>
                <div className='max-w-[600px] mx-auto text-center text-sm'>
                    <p>
                        Welcome to vidstream,an app created to showcase my development skills
                    </p>
                    <p>
                        I developed vidstream web application to provide users with a free and easy platform to get
                        the latest ,trending ,upcoming and popular movies and shows to stream just on the same platform.
                    </p>
                    <p>
                        Some of the technologies used are Reactjs,TailwindCSS,Typescript,Graphql-Apollo Express JS and MongoDB with prisma ORM among many more.
                    </p>
                    <p>
                        My goal with vidstream is to continiously improve the user experience
                        and add new features as per user feedback,bug reports and feature requests.
                    </p>
                    <p>
                        Reach out to us via <span className='italic underline'>Email: vidsream.app@gmail.com</span> or <a href='/contact' className='italic underline'>Contact Me</a>
                    </p>
                    <div className='flex mt-4 justify-center items-center gap-4 flex-wrap'>
                       <div className='w-[150px] h-[150px] rounded-full relative overflow-clip hover:shadow-lg border border-[#393950]  hover:shadow-red-500'>
                       <img src={mypic} alt="myself" className='w-full h-full absolute animate-me rounded-full'/>
                       </div>
                      <div className='text-base cursive text-left'>
                        <p className=' text-2xl'>- Newton Nganga -</p>
                        <p>Role: FullStack Web developer</p>
                        <p>Github: <a href='https://github.com/Newton-Nganga/' target='__blank'>Newton-Nganga</a></p>
                        <p><a href="https://newton-nganga.vercel.app" target='__blank'>View Professional Portfolio </a></p>
                      </div>
                    </div>
                   
                </div>
            </div>
        </section>
    </InnerPage>
  )
}