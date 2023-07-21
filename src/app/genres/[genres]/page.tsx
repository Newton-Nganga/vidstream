import Movie from '@/components/Movie'
import InnerPage from '@/components/Pages/InnerPages'


type Props = {}

export default function page({}: Props) {
  return (
    <InnerPage>
        <section className='section'>
            <div className='inner-section'>
               <h2>Genre</h2>
               {/* map through the movies */}
               <div className='flex flex-wrap gap-4 w-full '>
                    <Movie/>
               </div>
            </div>
        </section>
    </InnerPage>
  )
}