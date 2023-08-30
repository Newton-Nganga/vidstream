

import InnerPage from '@/components/InnerPages/InnerPages'



export default function About() {
  return (
    <InnerPage title={"About"}>
        <section className='section'>
            <div className='inner-section'>
                <div>
                    <p>
                        Welcome to vidstream,an app created to showcase my development skills
                    </p>
                    <p>
                        I developed vidstream web application to provide users with a free and easy platform to get
                        the latest ,trending ,upcoming and popular movies and shows to stream just on the same platform.
                    </p>
                    <p>
                        Some of the technologies used are Reactjs,TailwindCSS,Typescript,Graphql Apollo Express JS and MongoDB with prisma ORM,Clerk
                    </p>
                    <p>
                        My goal with vidstream is to continiously improve the user experience
                        and add new features as per user feedback,bug reports and feature requests.
                    </p>
                    <p>
                        Reach out to me via Email: vidsream.app@gmail.com or <a href='/contact'>Contact Me</a>
                        You can also view my professional portfolio @ <a href='https://newton-nganga.vercel.app'>Newton Nganga</a>
                    </p>

                </div>
            </div>
        </section>
    </InnerPage>
  )
}