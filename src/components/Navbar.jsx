import React, { useState, useEffect } from 'react'
import weatherIcon from '../Icons/weather.svg'

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <div className='h-16 md:h-20 w-11/12 md:w-3/4 lg:w-1/2 bg-slate-200/50 dark:bg-black/10 backdrop-blur-sm border-2 border-slate-300 dark:border-white/20 rounded-full text-2xl md:text-4xl text-slate-900 dark:text-white flex justify-between px-6 md:px-10 items-center container mx-auto my-4 transition-all duration-300 ease-in-out hover:scale-[1.02] dark:hover:bg-black/30 dark:hover:border-white/40 shadow-lg dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] cursor-default'>
      <div className="flex items-center gap-3 md:gap-4">
        <img src={weatherIcon} alt="Weather Icon" className='h-8 w-8 md:h-10 md:w-10 drop-shadow-md invert dark:invert-0' />
        <h1 className='text-center font-medium'>Weather</h1>
      </div>
      
      <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-300/50 dark:hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer">
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default Navbar
