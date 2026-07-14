import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import LightRays from './LightRays';
import searchLightBg from './assets/bgs/search_light.png';
import searchIcon from './Icons/search.svg'
import WeatherData from './components/WeatherData'
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'

function Home({ city, setcity, setweather, setForecast, error, setError, loading, setLoading }) {
  const navigate = useNavigate();

  const fetchWeather = async (urlWeather, urlForecast) => {
    setLoading(true);
    setError(null);
    try {
      const resWeather = await fetch(urlWeather);
      const dataWeather = await resWeather.json();
      
      if (dataWeather.cod !== 200 && dataWeather.cod !== "200") {
        setError(dataWeather.message || "City not found.");
        setLoading(false);
        return;
      }

      const resForecast = await fetch(urlForecast);
      const dataForecast = await resForecast.json();

      setweather(dataWeather);
      setForecast(dataForecast);
      navigate("/city");
    } catch (err) {
      setError("An error occurred while fetching data.");
    }
    setLoading(false);
  }

  const searchweather = () => {
    if (!city.trim()) return;
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const urlW = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${apiKey}&units=metric`
    const urlF = `https://api.openweathermap.org/data/2.5/forecast?q=${city.trim()}&appid=${apiKey}&units=metric`
    fetchWeather(urlW, urlF);
  }

  const handleLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const urlW = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        const urlF = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        fetchWeather(urlW, urlF);
      }, (err) => {
        setError("Location access denied or unavailable.");
        setLoading(false);
      });
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-black overflow-hidden transition-colors duration-500">
      
      {/* Light Mode Background Image */}
      <img 
        src={searchLightBg} 
        alt="light mode sky" 
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-100 dark:hidden block"
        style={{ animation: 'panBg 20s linear infinite alternate' }}
      />

      {/* Dark Mode Light Rays */}
      <div className="absolute top-0 left-0 w-full h-full z-0 mix-blend-difference pointer-events-none hidden dark:block">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={1.2}
          rayLength={4}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.2}
          distortion={0.1}
          className="custom-rays-dark"
          pulsating={true}
          fadeDistance={1.2}
          saturation={1}
        />
      </div>

      <div className='flex flex-col items-center justify-center min-h-screen gap-0 relative z-10 text-slate-900 dark:text-white transition-colors duration-500'>
        <Navbar />
        <div className="SearchBar group hover:scale-[1.02] dark:hover:bg-black/30 dark:hover:border-white/40 dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] bg-white dark:bg-transparent shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out border-2 w-11/12 md:w-2/3 lg:w-1/3 border-slate-200 dark:border-white/20 rounded-full text-lg md:text-2xl flex justify-between px-3 py-1 items-center container mx-auto my-4 relative">
          <button 
            onClick={handleLocation}
            className="p-2 md:p-3 text-slate-400 hover:text-blue-500 dark:text-white/70 dark:hover:text-white transition-colors flex-shrink-0"
            title="Use Current Location"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
          
          <input className='outline-none m-2 md:m-3 w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/50' 
            type="text" placeholder='Enter Your City' onChange={(e) => setcity(e.target.value)} 
            value={city} 
            onKeyDown={(e) => e.key === 'Enter' && searchweather()}
          />
          
          <button onClick={searchweather} className="p-1 md:p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 md:w-8 md:h-8 text-slate-500 dark:text-white">
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
        
        {loading && (
          <div className="mt-4 flex items-center gap-2 text-slate-600 dark:text-white/70">
            <div className="w-5 h-5 border-2 border-t-transparent border-slate-600 dark:border-white rounded-full animate-spin"></div>
            Loading...
          </div>
        )}
        
        {error && (
          <div className="mt-4 px-6 py-3 bg-red-100 dark:bg-red-500/20 border border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-400 rounded-xl max-w-md text-center shadow-sm capitalize">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  const [city, setcity] = useState("")
  const [weather, setweather] = useState(() => {
    const saved = localStorage.getItem('weatherData');
    return saved ? JSON.parse(saved) : null;
  });
  const [forecast, setForecast] = useState(() => {
    const saved = localStorage.getItem('forecastData');
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Persist data across refreshes
  useEffect(() => {
    if (weather) localStorage.setItem('weatherData', JSON.stringify(weather));
  }, [weather]);

  useEffect(() => {
    if (forecast) localStorage.setItem('forecastData', JSON.stringify(forecast));
  }, [forecast]);

  // Initialize theme
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Home city={city} setcity={setcity} setweather={setweather} setForecast={setForecast} error={error} setError={setError} loading={loading} setLoading={setLoading} />} 
        />
        <Route 
          path="/city" 
          element={<WeatherData weather={weather} forecast={forecast} />} 
        />
      </Routes>
    </HashRouter>
  )
}

export default App
