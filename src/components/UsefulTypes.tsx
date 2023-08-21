

export interface MovieType {
    id:number
    media_type:string
    original_title:string
    overview:string
    popularity:number
    poster_path:string
    backdrop_path:string
    release_date:string
    title:string
    vote_count:number
    vote_average:number
    details :{ 
      runtime:number
      genres:{
        name:string
      }[]
    }
    credits:{
        crew :{
          name:string
        }[]
        cast :{
          name:string
        }[]
      }
  }
export interface ShowType{
    name:string
    id:number
    original_name:string
    overview:string
    poster_path:string
    backdrop_path:string
    details :{
      media_type:string
      number_of_seasons:number
      last_air_date:string
      genres :{
        name:string
      }[] 
    }
    credits:{
        crew :{
          name:string
        }[]
        cast :{
          name:string
        }[]
    }
}