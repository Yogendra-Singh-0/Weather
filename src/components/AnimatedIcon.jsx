import React from 'react';
import clearIcon from '../Icons/clear.svg';
import cloudsIcon from '../Icons/clouds.svg';
import rainIcon from '../Icons/rains.svg';
import snowIcon from '../Icons/snow.svg';
import thunderstormIcon from '../Icons/thunderstorm.svg';

const AnimatedIcon = ({ condition }) => {
  const cond = condition ? condition.toLowerCase() : 'clear';
  let src = clearIcon;

  if (cond.includes('clear')) {
    src = clearIcon;
  } else if (cond.includes('cloud')) {
    src = cloudsIcon;
  } else if (cond.includes('rain') || cond.includes('drizzle')) {
    src = rainIcon;
  } else if (cond.includes('snow')) {
    src = snowIcon;
  } else if (cond.includes('thunderstorm')) {
    src = thunderstormIcon;
  }

  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
      <img
        src={src}
        alt={condition}
        className="w-full h-full object-contain invert dark:invert-0 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:scale-110 transition-transform duration-500 ease-out"
      />
    </div>
  );
};

export default AnimatedIcon;
