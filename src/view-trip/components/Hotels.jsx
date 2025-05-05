import React from 'react'
import { Link } from 'react-router-dom'
import Hotelscard from './Hotelscard'


function Hotels({trip}) {

 
  return (
    <div>
       <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

       <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-10 mt-2' >
         {trip?.tripData?.hotelOptions?.map((hotel,index)=>(
           <Hotelscard hotel={hotel}/>
         ))}
       </div>
    </div>
  )
}

export default Hotels