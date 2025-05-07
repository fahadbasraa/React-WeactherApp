import { useState } from 'react'
import { Search } from "lucide-react";


import useWeatherInfo from './hooks/useWeatherInfo'

function App() {
  const [location, setLocation] = useState("Lahore")
  

  const weather = useWeatherInfo(location || "lahore");

  console.log(weather?.current?.temp_c);

  const localtime = weather?.location?.localtime;
  const dayName = localtime
  ? new Date(localtime).toLocaleDateString("en-US", { weekday: "long" })
  : "";

  const condition = weather?.current?.condition?.text?.toLowerCase() || "";

const backgroundImageMap = {
  sunny: "https://www.tovima.com/wp-content/uploads/2024/10/24/KON1385-scaled.jpg",
  clear: "https://s7d2.scene7.com/is/image/TWCNews/img_3214_jpg-2",
  overcast: "https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/sky-1107579_1920.jpg",
  rain: "https://donegalnews.com/wp-content/uploads/2024/08/Weather-6.jpg",
  snow: "https://i.natgeofe.com/n/851de5e8-cd91-4140-a8e1-252f4fd7155a/M2GM1G.jpg",
  mist: "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/fog--mist/foggy-morning-in-a-meadow.jpg",
  cloud:"https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/sky-1107579_1920.jpg"
};

const backgroundImage =
  Object.entries(backgroundImageMap).find(([key]) =>
    condition.includes(key)
  )?.[1] || "https://wallpapercave.com/wp/wp9011231.jpg";



  return (
    <>
    <div
  className="flex flex-row h-screen"
  style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
    <div className=' bg-white/15  rounded-r-2xl backdrop-blur-[4px] w-sm h-screen'>
    
    <div className="flex items-center gap-2 ml-22 m-15">
  <div className="flex items-center relative right-10 px-2 py-2 rounded-xl bg-white/10 backdrop-blur-md shadow-2xl  w-fit">
  <input
    type="text"
    className="bg-transparent text-white placeholder-gray-300 focus:outline-none w-64"
    placeholder="Search city..."
    value={location}
    onChange={(e) => setLocation(e.target.value)}
  />
  <Search className="text-white w-5 h-5 cursor-pointer hover:text-green-300 transition duration-200" />
</div>


</div>
    <div className='text-white space-y-4'>
      <p className='text-3xl ml-10'>
         {dayName}
      </p>
      <p className='text-8xl font-light ml-10'>
        {weather?.current?.temp_c}°
      </p>
      <p className="flex items-center gap-6 ml-10 mt-4 text-white text-sm">
  <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm shadow">
    💨 <span className="font-semibold">{weather?.current?.wind_kph}</span> kph
  </span>
  <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm shadow">
    💦 <span className="font-semibold">{weather?.current?.humidity}</span>%
  </span>
  
</p>
<p className="ml-10 text-sm text-gray-300">
  Feels like: <span className="font-semibold text-white">{weather?.current?.feelslike_c}°C</span>
</p>
<p className="ml-10 text-sm text-yellow-400">
  ☀️ UV Index: <span className="font-semibold">{weather?.current?.uv}</span>
</p>
<p className="ml-10 text-sm text-white mt-2">
  🌅 Sunrise: <span className="font-semibold">{weather?.forecast?.forecastday[0]?.astro?.sunrise}</span> | 
  🌇 Sunset: <span className="font-semibold">{weather?.forecast?.forecastday[0]?.astro?.sunset}</span>
</p>
<p className="ml-10 text-sm text-white">
  👁️ Visibility: <span className="font-semibold">{weather?.current?.vis_km}</span> km
</p>
<p className="ml-10 text-sm text-white">
  📈 Pressure: <span className="font-semibold">{weather?.current?.pressure_mb}</span> mb
</p>

    </div>
  </div>
  <div className='flex flex-col w-290 text-white '>
  <h1 className="font-serif font-extrabold text-2xl mt-5 ml-8 ">
  Weather<span className="text-green-900">ly</span>
  </h1>
    <div className='font-sans text-[70px] font-semibold mt-6 ml-15'>
    <h1>
      {weather?.current?.condition?.text }
    </h1>
    </div>
    <p className="ml-10 mt-4 flex items-center gap-5  p-4 rounded-2xl text-white font-medium">
  <img
    src={`https:${weather?.current?.condition?.icon}`}
    alt="Weather icon"
    className="w-20 h-20"
  />
  <div className="leading-snug">
    <p className="text-lg font-semibold">
      {weather?.location?.name}, {weather?.location?.region}
    </p>
    <p className="text-sm text-gray-300">{weather?.location?.country}</p>
    <p className="text-sm text-gray-400">{weather?.location?.localtime}</p>
  </div>
</p>

    <div className="ml-5 mt-20">
  <h2 className="text-xl font-bold text-white mb-3">Next 6 Days</h2>
  <div className="flex overflow-x-auto space-x-4 pb-2">
    {weather?.forecast?.forecastday?.map((day) => (
      <div
        key={day.date}
        className="min-w-[160px] bg-white/10 p-3 rounded-lg shadow-sm backdrop-blur-sm flex-shrink-0"
      >
        <p className="text-sm font-semibold text-white">
          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
        </p>
        <p className="text-xs text-gray-300 mb-1">{day.date}</p>
        <img
          src={`https:${day.day.condition.icon}`}
          alt="Icon"
          className="w-10 h-10 mx-auto"
        />
        <p className="text-sm text-center mt-1">{day.day.condition.text}</p>
        <p className="text-center text-white mt-2 text-sm font-bold">
          🌡️ {day.day.avgtemp_c}°C
        </p>
      </div>
    ))}
  </div>
</div>


      </div>
      
    </div>
    
      
    </>
  )
}

export default App
