import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-8'>
        <h1 className='font-extrabold text-[50px] text-center mt-15'><span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
        <Link to="/create-trip"><Button className="hover:cursor-pointer">Get Started, It's Free</Button></Link>
        <img src='./landing.png'></img>
    </div>
  )
}

export default Hero