import React from 'react'
import weatherIcon from '../Icons/weather.svg'

const Navbar = () => {
  return (
    <div className='h-16 md:h-20 w-11/12 md:w-3/4 lg:w-1/2 bg-black/10 backdrop-blur-sm border-2 border-white/20 rounded-full text-2xl md:text-4xl text-white flex justify-between px-6 md:px-10 items-center container mx-auto my-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-black/30 hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] cursor-pointer'>
      <h1 className='text-center'>Weather</h1>
      <img src={weatherIcon} alt="Weather Icon" className='h-8 w-8 md:h-10 md:w-10 drop-shadow-md' />
    </div>
  )
}

export default Navbar
