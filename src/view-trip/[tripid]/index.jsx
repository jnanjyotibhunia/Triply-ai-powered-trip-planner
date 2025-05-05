import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '@/service/Firebaseconfig';
import { doc , getDoc } from 'firebase/firestore';
import Infosection from '../components/infoSection';
import Hotels from '../components/Hotels';
import Places from '../components/Places';
import Footer from '../components/Footer';

function Viewtrip() {

  const {tripid} =useParams();
  const [trip,settrip]=useState([]);

  useEffect(()=>{
     tripid&&getTripData();

  },[tripid])

  const getTripData=async()=>{
    const docRef=doc(db, "Trips", tripid);
    const docSnap= await getDoc(docRef);

    if(docSnap.exists()){
      console.log(docSnap.data());
      settrip(docSnap.data());
    }else{
      
    }


  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* infromation section */}
        <Infosection trip={trip}/>
      {/* hotel recommendation */}
        <Hotels trip={trip}/>
      {/* places to visits - daywise plane */}
        <Places trip={trip}/>
      {/* footer */}
        <Footer/>
    </div>
  )
}

export default Viewtrip;