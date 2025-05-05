import React from 'react'
import { Link } from 'react-router-dom'
import { GetPlacedetails , PHOTO_REF_URL } from '@/service/Globalapi';
import { useState , useEffect } from 'react';


function Placecard({place}) {

 const [picurl,setpicurl]=useState(); 
  useEffect(()=>{
   place&&GetplacePhoto();
  },[place]) 
  const GetplacePhoto=async()=>{
     console.log(place.placeName);
   const data={
     textQuery:place?.placeName
   }   
   const result= await GetPlacedetails(data).then(res=>{
    //  console.log(res.data);
    //  console.log(res.data.places[0].photos[1].name);
 
     const photourl=PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[1].name);
     //console.log(photourl);
     setpicurl(photourl);
     //console.log(picurl);
   })
  }
 
  return (
    <Link to={"https://www.google.com/maps/search/?api=1&query="+place?.placeName} target='_blank'>
    <div className='border rounded-xl p-3 mt-1 flex gap-6 hover:scale-105 transition-all hover:shadow-md cursor-pointer w-full'>
        <img src={picurl? picurl:"/travelpic.jpg"} className='w-[170px] h-[145px] rounded-xl object-cover'></img>
        <div>
            <h2 className='font-bold text-lg'>{place?.placeName}</h2>
            <p className='text-gray-400 text-sm mt-1 line-clamp-3'>{place?.placeDetails}</p>
            <h2 className='mt-2 line-clamp-2 text-slate-700'>🕙{place?.travelTime}</h2>
            <h2 className='mt-2 line-clamp-2'>🎫{place?.ticketPricing}</h2>
        </div>
         
    </div>
    </Link>
  )
}

export default Placecard