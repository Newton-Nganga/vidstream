
//import Movie from '@/components/HompageSliders/Movie-Cel/Movie'
import InnerPage from '@/components/InnerPages/InnerPages'
import Loading from '@/components/Loading/loading'
import { gql, useQuery } from '@apollo/client'

const GET_GENRE=gql`
query GetByGenres($genreID:number){
  genreShows(genre: $genreID){

  }
  genreMovies(genre:$genreID){

  }
}
`

export default function Page(id:number) {
  const {loading,error,data} = useQuery(GET_GENRE,{variables:{genreId:id}})
  if(loading){
    return(
      <InnerPage>
       <Loading/>
      </InnerPage>
    )
  }
  if(error){
    return(
      <p>Loading..</p>
    )
  }
  return (
    <InnerPage>
        <section className='section'>
            <div className='inner-section'>
               <h2>Genre</h2>
               {/* map through the movies */}
               
            </div>
        </section>
    </InnerPage>
  )
}