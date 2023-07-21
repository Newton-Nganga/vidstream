import React from 'react'

type Props = {}

export default function loading({}: Props) {
  return (
   <section className='section'>
    <div className='inner-section'>
     <div className='loading'>
        <div className='loading-center'></div>
    </div>
    </div>
   </section>
  )
}