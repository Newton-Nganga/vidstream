import {gql} from '@apollo/client'

export const GET_FEATURED_MOVIE=gql`
query GetFeaturedMovie {
    featuredMovie {
    id
    media_type
    backdrop_path
    poster_path
    }
}
`

