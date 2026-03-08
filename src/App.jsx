import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import LightRays from './LightRays';
import searchIcon from './Icons/search.svg'
import WeatherData from './components/WeatherData'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'

function Home({ city, setcity, setweather }) {
  const navigate = useNavigate();

  const searchweather = async () => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const response = await fetch(url)
    const data = await response.json()
    setweather(data)
    console.log(data)
    navigate("/city")
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', background: 'black', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div className='flex flex-col items-center justify-center min-h-screen gap-0' style={{ position: 'relative', zIndex: 10, color: 'white' }}>
        <Navbar />
        <div className="SearchBar hover:scale-[1.02] hover:bg-black/30 hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-300 ease-in-out border-2 w-11/12 md:w-2/3 lg:w-1/3 border-white/20 rounded-full text-lg md:text-2xl text-white flex justify-between px-3 py-1 items-center container mx-auto my-4">
          <input className='outline-none m-2 md:m-3 text-white w-full bg-transparent' type="text" placeholder='Enter Your City' onChange={(e) => {
            setcity(e.target.value)
          }} value={city} />
          <img src={searchIcon} alt="search" className='h-8 w-8 md:h-10 md:w-10 mr-1 md:mr-3 cursor-pointer shrink-0' onClick={searchweather} />
        </div>
      </div>
    </div>
  )
}

function App() {
  const [city, setcity] = useState("")
  const [weather, setweather] = useState(null)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home city={city} setcity={setcity} setweather={setweather} />
    },
    {
      path: "/city",
      element: <WeatherData weather={weather} />
    }
  ])

  return <RouterProvider router={router} />
}

export default App
