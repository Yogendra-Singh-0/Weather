import React from 'react'
import { useNavigate } from 'react-router-dom'
import weatherIcon from '../Icons/weather.svg'

const WeatherData = ({ weather }) => {
    const navigate = useNavigate();

    // If no weather data, show a fallback
    if (!weather || !weather.main) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-gray-900 via-black to-black z-0 pointer-events-none"></div>

                <div className="relative z-10 text-center flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-3xl shadow-2xl">
                    <p className="text-2xl font-light mb-6">No weather data found.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center font-medium tracking-wide"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 relative overflow-hidden font-sans">
            {/* Background dynamic gradient map */}
            <div className="absolute inset-0 bg-linear-to-br from-zinc-950 via-neutral-950 to-stone-950 opacity-80 z-0"></div>

            {/* Subtle light leak effect */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[120px] rounded-full z-0 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full z-0 pointer-events-none"></div>

            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 md:top-10 md:left-10 px-6 py-2 bg-white/5 hover:bg-white/20 border border-white/10 hover:border-white/30 rounded-full transition-all duration-300 hover:scale-[1.03] flex items-center gap-2 z-20 backdrop-blur-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
            </button>

            {/* Premium Weather Card */}
            <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-white/20 group overflow-hidden cursor-default">

                {/* Internal card highlight */}
                <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                {/* City and Description */}
                <div className="text-center mb-8 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-2 drop-shadow-md">{weather.name}</h1>
                    {weather.weather && weather.weather[0] && (
                        <p className="text-xl text-white/50 capitalize tracking-wider font-light">{weather.weather[0].description}</p>
                    )}
                </div>

                {/* Temperature and Icon */}
                <div className="flex flex-col items-center justify-center gap-2 mb-10 relative z-10">
                    <div className="relative flex justify-center items-center">
                        <img
                            src={weatherIcon}
                            alt="weather icon"
                            className="w-24 h-24 md:w-28 md:h-28 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] group -hover:scale-110 transition-transform duration-700 ease-out"
                        />
                    </div>
                    <div className="flex items-start">
                        <h2 className="text-8xl font-light tracking-tighter drop-shadow-lg">
                            {Math.round(weather.main.temp)}
                        </h2>
                        <span className="text-4xl mt-3 font-light text-white/70">°C</span>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="bg-black/40 hover:bg-black/60 transition-colors duration-300 rounded-3xl p-5 flex flex-col items-center justify-center border border-white/5 flex-1">
                        <span className="text-white/40 text-[0.65rem] md:text-xs uppercase tracking-widest mb-2 font-medium">Feels Like</span>
                        <span className="text-2xl md:text-3xl font-light">{Math.round(weather.main.feels_like)}°</span>
                    </div>

                    {weather.main.humidity && (
                        <div className="bg-black/40 hover:bg-black/60 transition-colors duration-300 rounded-3xl p-5 flex flex-col items-center justify-center border border-white/5 flex-1">
                            <span className="text-white/40 text-[0.65rem] md:text-xs uppercase tracking-widest mb-2 font-medium">Humidity</span>
                            <span className="text-2xl md:text-3xl font-light">{weather.main.humidity}%</span>
                        </div>
                    )}

                    {weather.wind && weather.wind.speed && (
                        <div className="bg-black/40 hover:bg-black/60 transition-colors duration-300 rounded-3xl p-5 flex flex-row items-center justify-between border border-white/5 col-span-2 px-6 md:px-8">
                            <span className="text-white/40 text-[0.65rem] md:text-xs uppercase tracking-widest font-medium">Wind Speed</span>
                            <span className="text-xl md:text-2xl font-light">{weather.wind.speed} <span className="text-xs md:text-sm text-white/50 border-l border-white/20 pl-2 ml-1">m/s</span></span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default WeatherData