// import React from 'react'
// import { Button } from '../ui/button'
// import { Link } from 'react-router-dom'


// function Hero() {
//   return (
//     <div className='flex flex-col items-center mx-56 gap-8'>
//         <video src="/bg video.mp4" loop autoPlay muted className='w-full h-auto object-cover'></video>
//         <h1 className='font-extrabold text-[50px] text-center mt-15'><span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
//         <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
//         <Link to="/create-trip"><Button className="hover:cursor-pointer">Get Started, It's Free</Button></Link>
//         <img src='./landing.png'></img>
//     </div>
//   )
// }

// export default Hero
import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Marquee } from '../magicui/marquee'
import { MarqueeDemo } from '../magicui/MarqueeDemo'


function Hero() {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Video background section */}
      <div className="relative w-full h-screen overflow-hidden flex items-center justify-center" preload="auto">
        {/* Background video */}
        <video
          src="/bg video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* Optional dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        {/* Overlay content */}
        <div className="relative z-10 text-center px-6 max-w-4xl ">
          <h1 className="font-extrabold text-2xl md:text-5xl lg:text-6xl xl:text-9xl text-white text-center leading-tight">
            <span className="text-[#f56551]">Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
          </h1>
          <p className="text-xl text-gray-200 mt-4">
            Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
          </p>
          <div className="mt-6">
            <Link to="/create-trip">
              <Button className="hover:cursor-pointer">Get Started, It's Free</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Image shown below the video section */}
      <img src="./landing.png" alt="Landing" className="w-[600px] mt-2" />
      <MarqueeDemo></MarqueeDemo>
      <footer className='mt-8 p-5 font-medium bg-gray-200 w-full text-center'>Made by Jnanjyoti ❤️</footer>
    </div>
  )
}

export default Hero
