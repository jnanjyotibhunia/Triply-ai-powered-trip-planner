import React from 'react'
import Placecard from './Placecard'

function Places({trip}) {
  return (
    <div className='mt-8'>
        <h2 className='font-bold text-xl'>Places to Visit</h2>
        {console.log(trip?.tripData?.itinerary)}
        <div className='mt-4'>
            
            {trip?.tripData?.itinerary?.map((item,index)=>(
                <div className='mb-5'>
                    <h2 className='font-medium text-lg'>{item?.day}</h2>
                    <div className='grid md:grid-cols-2 gap-7 mt-3'>
                    {item.plan.map((place,index)=>(
                        <div className=''>
                         <h2 className='text-orange-600 font-medium text-sm mb-3'>🔴{place?.bestTimeToVisit}</h2>   
                        <Placecard place={place}/>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Places