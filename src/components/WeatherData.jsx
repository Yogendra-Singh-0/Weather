import React from 'react'
import { useNavigate } from 'react-router-dom'
import AnimatedIcon from './AnimatedIcon'
import mainLightBg from '../assets/bgs/main_light.png'
import mainDarkBg from '../assets/bgs/main_dark.png'
import forecastLightBg from '../assets/bgs/forecast_light.png'
import forecastDarkBg from '../assets/bgs/forecast_dark.png'

const WeatherData = ({ weather, forecast }) => {
    const navigate = useNavigate();

    // If no weather data, show a fallback
    if (!weather || !weather.main) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] dark:from-gray-900 dark:via-black dark:to-black z-0 pointer-events-none hidden dark:block"></div>

                <div className="relative z-10 text-center flex flex-col items-center bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-10 rounded-3xl shadow-xl dark:shadow-2xl">
                    <p className="text-2xl font-light mb-6">No weather data found.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-300 dark:border-white/20 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center font-medium tracking-wide"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    // Extract one forecast per day (around noon)
    const dailyForecast = forecast?.list?.filter(item => item.dt_txt.includes("12:00:00")) || [];

    const getDayName = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white p-4 relative overflow-hidden font-sans transition-colors duration-500">
            {/* Background dynamic gradient map */}
            <div className="absolute inset-0 dark:bg-linear-to-br dark:from-zinc-950 dark:via-neutral-950 dark:to-stone-950 opacity-80 z-0"></div>

            {/* Subtle light leak effect */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-white/5 blur-[120px] rounded-full z-0 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 dark:bg-blue-500/5 blur-[100px] rounded-full z-0 pointer-events-none"></div>

            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 md:top-10 md:left-10 px-6 py-2 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/20 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 rounded-full transition-all duration-300 hover:scale-[1.03] flex items-center gap-2 z-20 backdrop-blur-md shadow-md dark:shadow-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-700 dark:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span className="text-slate-700 dark:text-white font-medium">Back</span>
            </button>

            {/* Main Content Area - Responsive Grid */}
            <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row gap-8 items-stretch pt-16 md:pt-0">

                {/* Premium Weather Card */}
                <div className="flex-1 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 group overflow-hidden cursor-default relative">

                    {/* Animated Background */}
                    <img
                        src={mainLightBg}
                        alt="main background light"
                        className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none z-0 dark:hidden block"
                        style={{ animation: 'panBg 15s linear infinite alternate' }}
                    />
                    <img
                        src={mainDarkBg}
                        alt="main background dark"
                        className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none z-0 hidden dark:block"
                        style={{ animation: 'panBg 15s linear infinite alternate' }}
                    />

                    {/* City and Description */}
                    <div className="text-center mb-8 relative z-10">
                        <h1 className="text-4xl md:text-5xl font-semibold tracking-wide mb-2 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] dark:drop-shadow-lg text-slate-900 dark:text-white">{weather.name}</h1>
                        {weather.weather && weather.weather[0] && (
                            <p className="text-xl text-slate-800 dark:text-white/90 capitalize tracking-wider font-medium drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] dark:drop-shadow-sm">{weather.weather[0].description}</p>
                        )}
                    </div>

                    {/* Temperature and Icon */}
                    <div className="flex flex-col items-center justify-center gap-2 mb-10 relative z-10">
                        <div className="relative flex justify-center items-center py-4">
                            <AnimatedIcon condition={weather.weather?.[0]?.main || 'Clear'} />
                        </div>
                        <div className="flex items-start">
                            <h2 className="text-7xl md:text-8xl font-bold tracking-tighter drop-shadow-[0_4px_8px_rgba(255,255,255,0.8)] dark:drop-shadow-lg text-slate-900 dark:text-white">
                                {Math.round(weather.main.temp)}
                            </h2>
                            <span className="text-3xl md:text-4xl mt-2 md:mt-3 font-semibold text-slate-800 dark:text-white/90 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] dark:drop-shadow-sm">°C</span>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                        <div className="bg-white/80 dark:bg-black/40 hover:bg-white/90 dark:hover:bg-black/60 transition-colors duration-300 rounded-3xl p-5 flex flex-col items-center justify-center border border-slate-200/50 dark:border-white/5 flex-1 shadow-md dark:shadow-none backdrop-blur-sm">
                            <span className="text-slate-700 dark:text-white/80 text-[0.65rem] md:text-xs uppercase tracking-widest mb-2 font-bold drop-shadow-sm">Feels Like</span>
                            <span className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{Math.round(weather.main.feels_like)}°</span>
                        </div>

                        {weather.main.humidity && (
                            <div className="bg-white/80 dark:bg-black/40 hover:bg-white/90 dark:hover:bg-black/60 transition-colors duration-300 rounded-3xl p-5 flex flex-col items-center justify-center border border-slate-200/50 dark:border-white/5 flex-1 shadow-md dark:shadow-none backdrop-blur-sm">
                                <span className="text-slate-700 dark:text-white/80 text-[0.65rem] md:text-xs uppercase tracking-widest mb-2 font-bold drop-shadow-sm">Humidity</span>
                                <span className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{weather.main.humidity}%</span>
                            </div>
                        )}

                        {weather.wind && weather.wind.speed && (
                            <div className="bg-white/80 dark:bg-black/40 hover:bg-white/90 dark:hover:bg-black/60 transition-colors duration-300 rounded-3xl p-5 flex flex-row items-center justify-between border border-slate-200/50 dark:border-white/5 col-span-2 px-6 md:px-8 shadow-md dark:shadow-none backdrop-blur-sm">
                                <span className="text-slate-700 dark:text-white/80 text-[0.65rem] md:text-xs uppercase tracking-widest font-bold drop-shadow-sm">Wind Speed</span>
                                <span className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{weather.wind.speed} <span className="text-xs md:text-sm text-slate-600 dark:text-white/80 border-l border-slate-400 dark:border-white/30 pl-2 ml-1 font-semibold">m/s</span></span>
                            </div>
                        )}
                    </div>
                </div>

                {/* 5-Day Forecast Card */}
                {dailyForecast.length > 0 && (
                    <div className="lg:w-80 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[2.5rem] p-6 shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col relative overflow-hidden group">

                        {/* Animated Background */}
                        <img
                            src={forecastLightBg}
                            alt="forecast background light"
                            className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none z-0 dark:hidden block"
                            style={{ animation: 'panBg 12s linear infinite alternate-reverse' }}
                        />
                        <img
                            src={forecastDarkBg}
                            alt="forecast background dark"
                            className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none z-0 hidden dark:block"
                            style={{ animation: 'panBg 12s linear infinite alternate-reverse' }}
                        />

                        <h3 className="text-sm font-bold tracking-wide mb-6 text-slate-800 dark:text-white/90 text-center uppercase relative z-10 dark:drop-shadow-sm drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">5-Day Forecast</h3>

                        <div className="flex flex-col gap-4 flex-1 relative z-10">
                            {dailyForecast.map((day, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 hover:bg-white/90 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none backdrop-blur-sm">
                                    <span className="w-12 text-slate-800 dark:text-white/90 font-bold">
                                        {idx === 0 ? 'Tdy' : getDayName(day.dt_txt)}
                                    </span>

                                    <div className="w-12 h-12 flex items-center justify-center transform scale-[0.35] md:scale-50 -my-4 origin-center">
                                        <AnimatedIcon condition={day.weather?.[0]?.main || 'Clear'} />
                                    </div>

                                    <div className="flex gap-3 text-right">
                                        <span className="font-bold text-slate-900 dark:text-white w-8">{Math.round(day.main.temp_max)}°</span>
                                        <span className="font-semibold text-slate-600 dark:text-white/70 w-8">{Math.round(day.main.temp_min)}°</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default WeatherData